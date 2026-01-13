import { z } from 'zod';

// Mouse position for tracking movements
export const MousePositionSchema = z.object({
  x: z.number(),
  y: z.number(),
  timestamp: z.number(),
});

// Individual recorded event
export const RecordedEventSchema = z.object({
  id: z.string(),
  type: z.enum([
    'click', 'dblclick', 'input', 'change', 'scroll', 
    'keydown', 'keyup', 'mousedown', 'mouseup', 'mousemove', 
    'focus', 'blur', 'submit', 'navigate'
  ]),
  timestamp: z.number(),
  x: z.number().optional(),
  y: z.number().optional(),
  selector: z.string().optional(),
  tagName: z.string().optional(),
  innerText: z.string().optional(),
  value: z.string().optional(),
  key: z.string().optional(),
  keyCode: z.number().optional(),
  scrollX: z.number().optional(),
  scrollY: z.number().optional(),
  scrollTargetSelector: z.string().optional(),
  url: z.string().optional(),
  mousePath: z.array(MousePositionSchema).optional(),
});

// Complete automation
export const AutomationSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(200),
  description: z.string().optional(),
  events: z.array(RecordedEventSchema),
  createdAt: z.number(),
  updatedAt: z.number(),
  cron: z.string().optional(),
  isEnabled: z.boolean(),
  startUrl: z.string().url(),
  mouseMovements: z.array(MousePositionSchema).optional(),
  duration: z.number(),
});

// API request/response types
export const CreateAutomationRequestSchema = z.object({
  automation: AutomationSchema,
});

export type MousePosition = z.infer<typeof MousePositionSchema>;
export type RecordedEvent = z.infer<typeof RecordedEventSchema>;
export type Automation = z.infer<typeof AutomationSchema>;
export type CreateAutomationRequest = z.infer<typeof CreateAutomationRequestSchema>;

// Database row type
export interface AutomationRow {
  id: string;
  name: string;
  data: string;
  start_url: string;
  event_count: number;
  created_at: number;
  run_count: number;
}
