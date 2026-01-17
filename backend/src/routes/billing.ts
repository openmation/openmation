import { Router, Request, Response } from "express";
import { upsertSubscription } from "../db.js";

const router = Router();

function verifyWebhook(req: Request): boolean {
  const secret = process.env.EXTENSIONPAY_WEBHOOK_SECRET;
  if (!secret) return true;
  const header = req.headers["x-extensionpay-secret"];
  return header === secret;
}

router.post("/webhook/extensionpay", (req: Request, res: Response) => {
  if (!verifyWebhook(req)) {
    res.status(401).json({ error: "Invalid webhook signature" });
    return;
  }

  const payload = req.body as {
    user_id?: string;
    plan_id?: string;
    status?: string;
    current_period_end?: number;
    cancel_at_period_end?: boolean;
    data?: {
      user_id?: string;
      plan_id?: string;
      status?: string;
      current_period_end?: number;
      cancel_at_period_end?: boolean;
    };
  };

  const data = payload.data ?? payload;
  if (!data.user_id || !data.plan_id || !data.status) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  upsertSubscription({
    id: `${data.user_id}-extensionpay`,
    userId: data.user_id,
    provider: "extensionpay",
    planId: data.plan_id,
    status: data.status,
    currentPeriodEnd: data.current_period_end,
    cancelAtPeriodEnd: data.cancel_at_period_end,
  });

  res.json({ success: true });
});

export default router;
