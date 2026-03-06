import path from "path";
import { fileURLToPath } from "url";
import { mkdir } from "fs/promises";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "../data");
const dbPath = path.resolve(dataDir, "consultations.db");

let db;

export async function initDatabase() {
  await mkdir(dataDir, { recursive: true });
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS consultations (
      id TEXT PRIMARY KEY,
      fullName TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      website TEXT,
      businessType TEXT NOT NULL,
      projectGoal TEXT NOT NULL,
      budgetRange TEXT NOT NULL,
      desiredTimeline TEXT NOT NULL,
      message TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS analytics_events (
      id TEXT PRIMARY KEY,
      eventType TEXT NOT NULL,
      path TEXT NOT NULL,
      metadata TEXT,
      createdAt TEXT NOT NULL
    )
  `);
}

export function getDatabase() {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
}
