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

const labKnowledgeBase = [
  {
    source: "Lead Automation Playbook",
    text: "AI assistants for websites improve lead conversion by qualifying intent before human handoff.",
  },
  {
    source: "Workflow Blueprint",
    text: "AI workflow automation usually starts with repetitive processes such as follow-up emails, onboarding forms, and internal reporting.",
  },
  {
    source: "SME Delivery Guide",
    text: "AI consulting for SMEs works best when focused on one measurable objective in the first 30 days.",
  },
];

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

app.post("/api/lab/lead-qualification", (req, res) => {
  const businessDescription = String(req.body?.businessDescription || "").trim();

  if (!businessDescription) {
    return res.status(400).json({ error: "Business description is required." });
  }

  const keywords = ["lead", "sales", "website", "automation", "service", "sme", "b2b"];
  const normalized = businessDescription.toLowerCase();
  const matches = keywords.filter((keyword) => normalized.includes(keyword)).length;

  const score = Math.min(100, 45 + matches * 8 + Math.min(20, businessDescription.length / 12));
  const rounded = Math.round(score);

  const recommendation =
    rounded >= 80
      ? "High fit for AI lead generation automation and website assistants."
      : rounded >= 65
        ? "Good fit. Start with one lead qualification workflow and iterate."
        : "Potential fit. Clarify offer and inbound process before automation.";

  return res.json({ score: rounded, recommendation });
});

app.post("/api/lab/mini-rag", (req, res) => {
  const question = String(req.body?.question || "").trim();

  if (!question) {
    return res.status(400).json({ error: "Question is required." });
  }

  const normalized = question.toLowerCase();

  let best = labKnowledgeBase[0];
  let bestScore = -1;

  for (const item of labKnowledgeBase) {
    const tokens = item.text.toLowerCase().split(/\W+/).filter(Boolean);
    const score = tokens.reduce((acc, token) => (normalized.includes(token) ? acc + 1 : acc), 0);
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  return res.json({
    answer: best.text,
    source: best.source,
  });
});

app.post("/api/lab/automation-potential", (req, res) => {
  const companySize = Number(req.body?.companySize);
  const weeklyManualHours = Number(req.body?.weeklyManualHours);

  if (!Number.isFinite(companySize) || !Number.isFinite(weeklyManualHours)) {
    return res.status(400).json({ error: "Company size and workload are required." });
  }

  const sizeFactor = Math.min(1, companySize / 50);
  const workloadFactor = Math.min(1, weeklyManualHours / 80);
  const automationPotential = Math.round((0.4 + sizeFactor * 0.3 + workloadFactor * 0.3) * 100);
  const hoursSaved = Math.round((weeklyManualHours * automationPotential) / 100);

  return res.json({
    automationPotential,
    hoursSaved,
    summary:
      "Start by automating repetitive qualification, reporting, and internal knowledge tasks for the fastest ROI.",
  });
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
