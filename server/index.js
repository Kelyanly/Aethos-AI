import crypto from "crypto";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDatabase, getDatabase } from "./lib/database.js";
import { validateAndSanitizeContact } from "./lib/validation.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8080);
const allowedOrigin = process.env.CORS_ORIGIN || "*";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: "1mb" }));

app.get("/health", async (_req, res) => {
  try {
    const db = getDatabase();
    await db.get("SELECT 1");
    res.json({ ok: true, timestamp: new Date().toISOString() });
  } catch {
    res.status(500).json({ ok: false, error: "Database is unavailable." });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const validated = validateAndSanitizeContact(req.body || {});

    if (!validated.ok) {
      return res.status(400).json({ success: false, error: validated.error });
    }

    const payload = validated.data;
    const record = {
      id: crypto.randomUUID(),
      ...payload,
      createdAt: new Date().toISOString(),
    };

    const db = getDatabase();
    await db.run(
      `
      INSERT INTO consultations (
        id,
        fullName,
        email,
        company,
        website,
        businessType,
        projectGoal,
        budgetRange,
        desiredTimeline,
        message,
        createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        record.id,
        record.fullName,
        record.email,
        record.company,
        record.website,
        record.businessType,
        record.projectGoal,
        record.budgetRange,
        record.desiredTimeline,
        record.message,
        record.createdAt,
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Consultation request received.",
      id: record.id,
      createdAt: record.createdAt,
    });
  } catch (error) {
    console.error("Failed to store consultation request", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error while storing request.",
    });
  }
});

async function start() {
  try {
    await initDatabase();
    app.listen(port, () => {
      console.log(`API listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start API", error);
    process.exit(1);
  }
}

start();
