import Database, { type Database as DatabaseType } from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import type { AutomationRow, Automation } from './types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'data', 'automations.db');

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

// Cleanup old automations on startup (older than 30 days)
cleanupOldAutomations(30);

export default db;
