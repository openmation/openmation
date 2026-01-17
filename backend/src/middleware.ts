import type { Request, Response, NextFunction } from "express";
import { getUserFromRequest } from "./auth.js";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const user = getUserFromRequest(req);
  if (!user) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  (req as Request & { userId?: string }).userId = user.id;
  next();
}

export function getAuthUserId(req: Request): string | null {
  return (req as Request & { userId?: string }).userId ?? null;
}
