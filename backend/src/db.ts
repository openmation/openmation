import Database, { type Database as DatabaseType } from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import type {
  AutomationRow,
  Automation,
  UserRow,
  SessionRow,
  SubscriptionRow,
  UsageRow,
} from './types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use environment variable for database path (for Railway deployment with volumes)
// Falls back to local data folder for development
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '..', 'data', 'automations.db');

// Initialize database
const db: DatabaseType = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS automations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    data TEXT NOT NULL,
    start_url TEXT NOT NULL,
    event_count INTEGER DEFAULT 0,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    run_count INTEGER DEFAULT 0
  );
  
  CREATE INDEX IF NOT EXISTS idx_automations_created_at ON automations(created_at);

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token_hash TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
  CREATE INDEX IF NOT EXISTS idx_sessions_token_hash ON sessions(token_hash);

  CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    provider TEXT NOT NULL,
    plan_id TEXT NOT NULL,
    status TEXT NOT NULL,
    current_period_end INTEGER,
    cancel_at_period_end INTEGER DEFAULT 0,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    UNIQUE(user_id),
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
  CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);

  CREATE TABLE IF NOT EXISTS usage (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    period TEXT NOT NULL,
    shares_created INTEGER DEFAULT 0,
    share_views INTEGER DEFAULT 0,
    scheduled_runs INTEGER DEFAULT 0,
    updated_at INTEGER NOT NULL,
    UNIQUE(user_id, period),
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
  CREATE INDEX IF NOT EXISTS idx_usage_user_period ON usage(user_id, period);
`);

// Prepared statements for better performance
const insertAutomation = db.prepare(`
  INSERT INTO automations (id, name, data, start_url, event_count, created_at)
  VALUES (@id, @name, @data, @start_url, @event_count, @created_at)
`);

const getAutomationById = db.prepare(`
  SELECT * FROM automations WHERE id = ?
`);

const incrementRunCount = db.prepare(`
  UPDATE automations SET run_count = run_count + 1 WHERE id = ?
`);

const deleteOldAutomations = db.prepare(`
  DELETE FROM automations WHERE created_at < ?
`);

const insertUser = db.prepare(`
  INSERT INTO users (id, email, password_hash, password_salt, created_at, updated_at)
  VALUES (@id, @email, @password_hash, @password_salt, @created_at, @updated_at)
`);

const getUserByEmailStmt = db.prepare(`
  SELECT * FROM users WHERE email = ?
`);

const getUserByIdStmt = db.prepare(`
  SELECT * FROM users WHERE id = ?
`);

const insertSession = db.prepare(`
  INSERT INTO sessions (id, user_id, token_hash, created_at, expires_at)
  VALUES (@id, @user_id, @token_hash, @created_at, @expires_at)
`);

const getSessionByTokenStmt = db.prepare(`
  SELECT * FROM sessions WHERE token_hash = ?
`);

const deleteSessionByTokenStmt = db.prepare(`
  DELETE FROM sessions WHERE token_hash = ?
`);

const insertUsage = db.prepare(`
  INSERT INTO usage (id, user_id, period, shares_created, share_views, scheduled_runs, updated_at)
  VALUES (@id, @user_id, @period, @shares_created, @share_views, @scheduled_runs, @updated_at)
`);

const getUsageStmt = db.prepare(`
  SELECT * FROM usage WHERE user_id = ? AND period = ?
`);

const updateUsageStmt = db.prepare(`
  UPDATE usage
  SET shares_created = @shares_created,
      share_views = @share_views,
      scheduled_runs = @scheduled_runs,
      updated_at = @updated_at
  WHERE id = @id
`);

const upsertSubscriptionStmt = db.prepare(`
  INSERT INTO subscriptions (id, user_id, provider, plan_id, status, current_period_end, cancel_at_period_end, created_at, updated_at)
  VALUES (@id, @user_id, @provider, @plan_id, @status, @current_period_end, @cancel_at_period_end, @created_at, @updated_at)
  ON CONFLICT(user_id) DO UPDATE SET
    provider = excluded.provider,
    plan_id = excluded.plan_id,
    status = excluded.status,
    current_period_end = excluded.current_period_end,
    cancel_at_period_end = excluded.cancel_at_period_end,
    updated_at = excluded.updated_at
`);

const getSubscriptionByUserStmt = db.prepare(`
  SELECT * FROM subscriptions WHERE user_id = ?
`);

// Database operations
export function createAutomation(automation: Automation): string {
  const id = automation.id;
  
  insertAutomation.run({
    id,
    name: automation.name,
    data: JSON.stringify(automation),
    start_url: automation.startUrl,
    event_count: automation.events?.length || 0,
    created_at: Math.floor(Date.now() / 1000),
  });
  
  return id;
}

export function getAutomation(id: string): Automation | null {
  const row = getAutomationById.get(id) as AutomationRow | undefined;
  
  if (!row) return null;
  
  try {
    return JSON.parse(row.data) as Automation;
  } catch {
    return null;
  }
}

export function recordRun(id: string): void {
  incrementRunCount.run(id);
}

export function cleanupOldAutomations(daysOld: number = 30): number {
  const cutoff = Math.floor(Date.now() / 1000) - (daysOld * 24 * 60 * 60);
  const result = deleteOldAutomations.run(cutoff);
  return result.changes;
}

export function createUser(user: {
  id: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
}): void {
  const now = Math.floor(Date.now() / 1000);
  insertUser.run({
    id: user.id,
    email: user.email,
    password_hash: user.passwordHash,
    password_salt: user.passwordSalt,
    created_at: now,
    updated_at: now,
  });
}

export function getUserByEmail(email: string): UserRow | null {
  const row = getUserByEmailStmt.get(email) as UserRow | undefined;
  return row ?? null;
}

export function getUserById(id: string): UserRow | null {
  const row = getUserByIdStmt.get(id) as UserRow | undefined;
  return row ?? null;
}

export function createSession(session: {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: number;
}): void {
  insertSession.run({
    id: session.id,
    user_id: session.userId,
    token_hash: session.tokenHash,
    created_at: Math.floor(Date.now() / 1000),
    expires_at: session.expiresAt,
  });
}

export function getSessionByTokenHash(tokenHash: string): SessionRow | null {
  const row = getSessionByTokenStmt.get(tokenHash) as SessionRow | undefined;
  return row ?? null;
}

export function deleteSessionByTokenHash(tokenHash: string): void {
  deleteSessionByTokenStmt.run(tokenHash);
}

export function getUsage(userId: string, period: string): UsageRow | null {
  const row = getUsageStmt.get(userId, period) as UsageRow | undefined;
  return row ?? null;
}

export function upsertUsage(userId: string, period: string): UsageRow {
  const existing = getUsage(userId, period);
  if (existing) {
    return existing;
  }
  const row: UsageRow = {
    id: `${userId}-${period}`,
    user_id: userId,
    period,
    shares_created: 0,
    share_views: 0,
    scheduled_runs: 0,
    updated_at: Math.floor(Date.now() / 1000),
  };
  insertUsage.run(row);
  return row;
}

export function updateUsage(row: UsageRow): void {
  updateUsageStmt.run({
    id: row.id,
    shares_created: row.shares_created,
    share_views: row.share_views,
    scheduled_runs: row.scheduled_runs,
    updated_at: Math.floor(Date.now() / 1000),
  });
}

export function incrementUsage(
  userId: string,
  period: string,
  field: "shares_created" | "share_views" | "scheduled_runs",
  amount: number = 1
): UsageRow {
  const row = upsertUsage(userId, period);
  const updated = { ...row, [field]: (row as UsageRow)[field] + amount } as UsageRow;
  updateUsage(updated);
  return updated;
}

export function upsertSubscription(subscription: {
  id: string;
  userId: string;
  provider: string;
  planId: string;
  status: string;
  currentPeriodEnd?: number | null;
  cancelAtPeriodEnd?: boolean;
}): void {
  const now = Math.floor(Date.now() / 1000);
  upsertSubscriptionStmt.run({
    id: subscription.id,
    user_id: subscription.userId,
    provider: subscription.provider,
    plan_id: subscription.planId,
    status: subscription.status,
    current_period_end: subscription.currentPeriodEnd ?? null,
    cancel_at_period_end: subscription.cancelAtPeriodEnd ? 1 : 0,
    created_at: now,
    updated_at: now,
  });
}

export function getSubscriptionByUser(userId: string): SubscriptionRow | null {
  const row = getSubscriptionByUserStmt.get(userId) as SubscriptionRow | undefined;
  return row ?? null;
}

// Cleanup old automations on startup (older than 30 days)
cleanupOldAutomations(30);

export default db;
