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

export interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  password_salt: string;
  created_at: number;
  updated_at: number;
}

export interface SessionRow {
  id: string;
  user_id: string;
  token_hash: string;
  created_at: number;
  expires_at: number;
}

export interface SubscriptionRow {
  id: string;
  user_id: string;
  provider: string;
  plan_id: string;
  status: string;
  current_period_end?: number | null;
  cancel_at_period_end?: number;
  created_at: number;
  updated_at: number;
}

export interface UsageRow {
  id: string;
  user_id: string;
  period: string;
  shares_created: number;
  share_views: number;
  scheduled_runs: number;
  updated_at: number;
}

export type PlanId = "free" | "starter" | "pro" | "starter_annual" | "pro_annual";

export interface PlanLimits {
  shareLimit: number;
  shareViewLimit: number;
  scheduledRunLimit: number;
  includesAIProxy: boolean;
}

export const PLAN_LIMITS: Record<PlanId, PlanLimits> = {
  free: {
    shareLimit: 100,
    shareViewLimit: 10,
    scheduledRunLimit: 30,
    includesAIProxy: false,
  },
  starter: {
    shareLimit: 1000,
    shareViewLimit: 500,
    scheduledRunLimit: 500,
    includesAIProxy: false,
  },
  pro: {
    shareLimit: Number.POSITIVE_INFINITY,
    shareViewLimit: Number.POSITIVE_INFINITY,
    scheduledRunLimit: Number.POSITIVE_INFINITY,
    includesAIProxy: false,
  },
  starter_annual: {
    shareLimit: 1000,
    shareViewLimit: 500,
    scheduledRunLimit: 500,
    includesAIProxy: true,
  },
  pro_annual: {
    shareLimit: Number.POSITIVE_INFINITY,
    shareViewLimit: Number.POSITIVE_INFINITY,
    scheduledRunLimit: Number.POSITIVE_INFINITY,
    includesAIProxy: true,
  },
};
