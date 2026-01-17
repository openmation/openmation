import crypto from "crypto";
import type { Request } from "express";
import {
  createSession,
  deleteSessionByTokenHash,
  getSessionByTokenHash,
  getUserById,
} from "./db.js";

const SESSION_COOKIE = "om_session";
const SESSION_TTL_DAYS = 30;

export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100_000, 64, "sha512").toString("hex");
}

export function createPasswordHash(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  return { salt, hash: hashPassword(password, salt) };
}

export function verifyPassword(password: string, salt: string, hash: string): boolean {
  const computed = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(computed, "hex"), Buffer.from(hash, "hex"));
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function issueSession(userId: string): { token: string; expiresAt: number } {
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt =
    Math.floor(Date.now() / 1000) + SESSION_TTL_DAYS * 24 * 60 * 60;
  createSession({
    id: crypto.randomUUID(),
    userId,
    tokenHash,
    expiresAt,
  });
  return { token, expiresAt };
}

export function clearSession(token?: string | null): void {
  if (!token) return;
  deleteSessionByTokenHash(hashToken(token));
}

export function getTokenFromRequest(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim();
  }
  const cookieHeader = req.headers.cookie || "";
  const match = cookieHeader.match(/om_session=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function getUserFromRequest(req: Request) {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  const session = getSessionByTokenHash(hashToken(token));
  if (!session) return null;
  if (session.expires_at < Math.floor(Date.now() / 1000)) {
    clearSession(token);
    return null;
  }
  return getUserById(session.user_id);
}

export function setSessionCookie(res: { setHeader: (name: string, value: string) => void }, token: string, expiresAt: number) {
  const expires = new Date(expiresAt * 1000).toUTCString();
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires}`
  );
}
