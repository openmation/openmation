import { Router, Request, Response } from "express";
import { nanoid } from "nanoid";
import {
  createUser,
  getUserByEmail,
  getSubscriptionByUser,
  getUsage,
} from "../db.js";
import {
  createPasswordHash,
  verifyPassword,
  issueSession,
  getUserFromRequest,
  setSessionCookie,
  clearSession,
  getTokenFromRequest,
} from "../auth.js";
import { resolvePlanId, getPlanLimits } from "../plans.js";

const router = Router();

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

router.post("/signup", (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password || password.length < 8) {
    res.status(400).json({ error: "Email and password are required (min 8 chars)." });
    return;
  }
  const normalized = normalizeEmail(email);
  const existing = getUserByEmail(normalized);
  if (existing) {
    res.status(409).json({ error: "Email already in use." });
    return;
  }
  const { hash, salt } = createPasswordHash(password);
  const userId = nanoid(12);
  createUser({
    id: userId,
    email: normalized,
    passwordHash: hash,
    passwordSalt: salt,
  });
  const session = issueSession(userId);
  setSessionCookie(res, session.token, session.expiresAt);
  res.status(201).json({
    success: true,
    token: session.token,
    user: { id: userId, email: normalized },
  });
});

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }
  const normalized = normalizeEmail(email);
  const user = getUserByEmail(normalized);
  if (!user || !verifyPassword(password, user.password_salt, user.password_hash)) {
    res.status(401).json({ error: "Invalid credentials." });
    return;
  }
  const session = issueSession(user.id);
  setSessionCookie(res, session.token, session.expiresAt);
  res.json({
    success: true,
    token: session.token,
    user: { id: user.id, email: user.email },
  });
});

router.post("/logout", (req: Request, res: Response) => {
  const token = getTokenFromRequest(req);
  clearSession(token);
  res.setHeader(
    "Set-Cookie",
    "om_session=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );
  res.json({ success: true });
});

router.get("/me", (req: Request, res: Response) => {
  const user = getUserFromRequest(req);
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const subscription = getSubscriptionByUser(user.id);
  const planId = resolvePlanId(subscription);
  const limits = getPlanLimits(planId);
  const period = new Date().toISOString().slice(0, 7);
  const usage = getUsage(user.id, period);
  res.json({
    success: true,
    user: { id: user.id, email: user.email },
    plan: {
      id: planId,
      limits,
    },
    usage: usage ?? {
      shares_created: 0,
      share_views: 0,
      scheduled_runs: 0,
      period,
    },
    subscription,
  });
});

export default router;
