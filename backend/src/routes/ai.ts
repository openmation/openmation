import { Router, Request, Response } from "express";
import { requireAuth, getAuthUserId } from "../middleware.js";
import { getSubscriptionByUser } from "../db.js";
import { resolvePlanId, getPlanLimits } from "../plans.js";
import {
  openaiFindElement,
  openaiDescribeAction,
  anthropicFindElement,
  anthropicDescribeAction,
} from "../ai/provider.js";

const router = Router();

function getProviderKey(provider: "openai" | "anthropic"): string | null {
  if (provider === "openai") {
    return process.env.OPENAI_API_KEY || null;
  }
  return process.env.ANTHROPIC_API_KEY || null;
}

router.post("/find-element", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = getAuthUserId(req);
    if (!userId) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }
    const subscription = getSubscriptionByUser(userId);
    const planId = resolvePlanId(subscription);
    const limits = getPlanLimits(planId);
    if (!limits.includesAIProxy) {
      res.status(403).json({ error: "AI proxy not available on this plan" });
      return;
    }

    const provider = (req.body?.provider || "openai") as "openai" | "anthropic";
    const apiKey = getProviderKey(provider);
    if (!apiKey) {
      res.status(500).json({ error: "AI provider key not configured" });
      return;
    }

    const result =
      provider === "anthropic"
        ? await anthropicFindElement(apiKey, req.body.request)
        : await openaiFindElement(apiKey, req.body.request);

    res.json({ success: true, result });
  } catch (error) {
    console.error("[Openmation] AI proxy find-element failed:", error);
    res.status(500).json({ error: "AI request failed" });
  }
});

router.post("/describe-action", requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = getAuthUserId(req);
    if (!userId) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }
    const subscription = getSubscriptionByUser(userId);
    const planId = resolvePlanId(subscription);
    const limits = getPlanLimits(planId);
    if (!limits.includesAIProxy) {
      res.status(403).json({ error: "AI proxy not available on this plan" });
      return;
    }

    const provider = (req.body?.provider || "openai") as "openai" | "anthropic";
    const apiKey = getProviderKey(provider);
    if (!apiKey) {
      res.status(500).json({ error: "AI provider key not configured" });
      return;
    }

    const result =
      provider === "anthropic"
        ? await anthropicDescribeAction(apiKey, req.body.request)
        : await openaiDescribeAction(apiKey, req.body.request);

    res.json({ success: true, result });
  } catch (error) {
    console.error("[Openmation] AI proxy describe-action failed:", error);
    res.status(500).json({ error: "AI request failed" });
  }
});

router.get("/status", requireAuth, (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  if (!userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  const subscription = getSubscriptionByUser(userId);
  const planId = resolvePlanId(subscription);
  const limits = getPlanLimits(planId);
  res.json({
    success: true,
    planId,
    includesAIProxy: limits.includesAIProxy,
    providers: {
      openai: !!process.env.OPENAI_API_KEY,
      anthropic: !!process.env.ANTHROPIC_API_KEY,
    },
  });
});

export default router;
