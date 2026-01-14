import { Router, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { CreateAutomationRequestSchema } from '../types.js';
import { createAutomation, getAutomation, recordRun } from '../db.js';
import { getShareBaseUrl } from '../public-url.js';

const router = Router();

// Max automation size: 500KB
const MAX_AUTOMATION_SIZE = 500 * 1024;

// POST /api/automations - Create a shareable automation
router.post('/', (req: Request, res: Response) => {
  try {
    // Check size
    const bodySize = JSON.stringify(req.body).length;
    if (bodySize > MAX_AUTOMATION_SIZE) {
      res.status(413).json({ 
        error: 'Automation too large', 
        maxSize: MAX_AUTOMATION_SIZE,
        actualSize: bodySize,
      });
      return;
    }

    // Validate request
    const parsed = CreateAutomationRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ 
        error: 'Invalid automation data', 
        details: parsed.error.issues,
      });
      return;
    }

    const { automation } = parsed.data;

    // Generate a short, URL-friendly ID
    const shareId = nanoid(10);
    
    // Override the ID with our share ID
    const automationToStore = {
      ...automation,
      id: shareId,
    };

    // Store in database
    createAutomation(automationToStore);

    // Build share URL
    const shareUrl = `${getShareBaseUrl()}/run/${shareId}`;

    res.status(201).json({
      success: true,
      id: shareId,
      shareUrl,
    });
  } catch (error) {
    console.error('Error creating automation:', error);
    res.status(500).json({ error: 'Failed to create automation' });
  }
});

// GET /api/automations/:id - Fetch automation by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!id || id.length < 5) {
      res.status(400).json({ error: 'Invalid automation ID' });
      return;
    }

    const automation = getAutomation(id);

    if (!automation) {
      res.status(404).json({ error: 'Automation not found' });
      return;
    }

    // Record the run
    recordRun(id);

    res.json({
      success: true,
      automation,
    });
  } catch (error) {
    console.error('Error fetching automation:', error);
    res.status(500).json({ error: 'Failed to fetch automation' });
  }
});

export default router;
