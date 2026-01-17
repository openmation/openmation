import type { SubscriptionRow, PlanId } from "./types.js";
import { PLAN_LIMITS } from "./types.js";

const ACTIVE_STATUSES = new Set(["active", "trialing", "paid"]);

export function resolvePlanId(subscription: SubscriptionRow | null): PlanId {
  if (!subscription || !ACTIVE_STATUSES.has(subscription.status)) {
    return "free";
  }
  const planId = subscription.plan_id as PlanId;
  return PLAN_LIMITS[planId] ? planId : "free";
}

export function getPlanLimits(planId: PlanId) {
  return PLAN_LIMITS[planId];
}
