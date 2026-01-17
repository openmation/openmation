import { Router, Request, Response } from "express";
import { requireAuth, getAuthUserId } from "../middleware.js";
import { getSubscriptionByUser, getUsage, incrementUsage } from "../db.js";
import { resolvePlanId, getPlanLimits } from "../plans.js";

const router = Router();

router.post("/schedule/run", requireAuth, (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  if (!userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  const subscription = getSubscriptionByUser(userId);
  const planId = resolvePlanId(subscription);
  const limits = getPlanLimits(planId);
  const period = new Date().toISOString().slice(0, 7);
  const usage = getUsage(userId, period);

  if (Number.isFinite(limits.scheduledRunLimit) && (usage?.scheduled_runs || 0) >= limits.scheduledRunLimit) {
    res.status(402).json({
      error: "Scheduled run limit reached for this month",
      planId,
      limit: limits.scheduledRunLimit,
    });
    return;
  }

  const updated = incrementUsage(userId, period, "scheduled_runs", 1);
  res.json({ success: true, usage: updated });
});

export default router;
