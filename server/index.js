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
  {
    source: "ChatHive Integration Notes",
    text: "ChatHive agents can connect to CRM systems and internal knowledge bases to automate lead capture and support responses.",
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

  const keywords = ["lead", "sales", "website", "automation", "service", "sme", "b2b", "crm"];
  const normalized = businessDescription.toLowerCase();
  const matches = keywords.filter((keyword) => normalized.includes(keyword)).length;

  const score = Math.min(100, 40 + matches * 9 + Math.min(22, businessDescription.length / 10));
  const rounded = Math.round(score);

  const recommendation =
    rounded >= 80
      ? "High fit for AI lead generation automation and ChatHive-powered assistants."
      : rounded >= 65
        ? "Good fit. Start with one lead qualification assistant and measurable KPI tracking."
        : "Potential fit. Clarify your inbound process before scaling AI automation.";

  return res.json({ score: rounded, recommendation });
});

app.post("/api/lab/knowledge-assistant", (req, res) => {
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

  return res.json({ answer: best.text, source: best.source });
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

app.post("/api/lab/roi-calculator", (req, res) => {
  const employees = Number(req.body?.employees);
  const monthlySupportTickets = Number(req.body?.monthlySupportTickets);
  const monthlyLeads = Number(req.body?.monthlyLeads);
  const timePerSupportRequest = Number(req.body?.timePerSupportRequest);
  const hourlyCost = Number(req.body?.hourlyCost);

  const values = [employees, monthlySupportTickets, monthlyLeads, timePerSupportRequest, hourlyCost];
  if (values.some((value) => !Number.isFinite(value) || value < 0)) {
    return res.status(400).json({ error: "All calculator inputs must be valid positive numbers." });
  }

  const supportHours = (monthlySupportTickets * timePerSupportRequest) / 60;
  const leadOpsHours = monthlyLeads * 0.25;
  const totalManualHours = supportHours + leadOpsHours;

  const scaleFactor = Math.min(1, employees / 120);
  const automationPotential = Math.round((0.3 + scaleFactor * 0.25 + Math.min(0.35, totalManualHours / 800)) * 100);
  const hoursSavedPerMonth = Math.round((totalManualHours * automationPotential) / 100);
  const monthlySavings = hoursSavedPerMonth * hourlyCost;
  const estimatedAnnualSavings = Math.round(monthlySavings * 12);

  const estimatedAnnualInvestment = 18000;
  const estimatedAnnualRoi = Math.max(
    0,
    Math.round(((estimatedAnnualSavings - estimatedAnnualInvestment) / estimatedAnnualInvestment) * 100)
  );

  return res.json({
    hoursSavedPerMonth,
    automationPotential,
    estimatedAnnualSavings,
    estimatedAnnualRoi,
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
