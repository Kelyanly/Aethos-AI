import crypto from "crypto";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDatabase, getDatabase } from "./lib/database.js";
import { validateAndSanitizeContact } from "./lib/validation.js";
import din0Router from "./src/routes/din0.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8080);
const allowedOrigin = process.env.CORS_ORIGIN || "*";

const labKnowledgeBase = [
  {
    source: "Lead Automation Playbook",
    text: "AI assistants for websites improve lead conversion with instant responses, qualification questions, personalized interactions, and appointment scheduling.",
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
    source: "Knowledge Assistant Guide",
    text: "An AI knowledge assistant for internal teams enables searchable access to documentation, onboarding material, and support procedures.",
  },
  {
    source: "Din_0 Widget Integration Notes",
    text: "Din_0 widget agents can connect to CRM systems and internal knowledge bases to automate lead capture and support responses.",
  },
];

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: "1mb" }));
app.use("/api/din0", din0Router);

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

  const keywords = ["lead", "sales", "website", "automation", "service", "sme", "b2b", "crm", "real estate", "accounting"];
  const normalized = businessDescription.toLowerCase();
  const matches = keywords.filter((keyword) => normalized.includes(keyword)).length;

  const score = Math.min(100, 42 + matches * 8 + Math.min(20, businessDescription.length / 11));
  const rounded = Math.round(score);

  const recommendation =
    rounded >= 80
      ? "High fit for AI lead generation automation and Din_0-powered assistants."
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

  const automationPotential = Math.max(
    10,
    Math.min(80, Math.round(25 + companySize * 0.5 + weeklyManualHours * 0.25))
  );

  const hoursSavedPerMonth = Math.round(weeklyManualHours * 3.9 * (automationPotential / 100));

  return res.json({
    automationPotential,
    hoursSavedPerMonth,
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
  const leadOpsHours = monthlyLeads * 0.22;
  const totalManualHours = supportHours + leadOpsHours;

  const automationPotential = Math.max(
    10,
    Math.min(80, Math.round(24 + employees * 0.35 + totalManualHours / 12))
  );

  const hoursSavedPerMonth = Math.round((totalManualHours * automationPotential) / 100);
  const estimatedMonthlySavings = Math.round(hoursSavedPerMonth * hourlyCost);
  const estimatedAnnualSavings = Math.round(estimatedMonthlySavings * 12);

  const estimatedAnnualInvestment = 18000;
  const estimatedAnnualRoi = Math.max(
    0,
    Math.round(((estimatedAnnualSavings - estimatedAnnualInvestment) / estimatedAnnualInvestment) * 100)
  );

  return res.json({
    hoursSavedPerMonth,
    automationPotential,
    estimatedMonthlySavings,
    estimatedAnnualSavings,
    estimatedAnnualRoi,
  });
});

app.post("/api/generate-use-cases", (req, res) => {
  const industry = String(req.body?.industry || "service").toLowerCase();
  const companySize = Number(req.body?.companySize);
  const repetitiveTask = String(req.body?.repetitiveTask || "").trim().toLowerCase();

  if (!Number.isFinite(companySize) || companySize <= 0 || !repetitiveTask) {
    return res.status(400).json({ error: "Industry, company size and repetitive task are required." });
  }

  const byIndustry = {
    agency: [
      "AI lead qualification assistant for inbound forms and chat.",
      "AI proposal drafting assistant for faster commercial response.",
      "AI campaign reporting workflow automation.",
    ],
    accounting: [
      "AI intake assistant for tax/advisory qualification.",
      "Internal AI knowledge assistant for compliance documentation.",
      "Workflow automation for recurring document collection.",
    ],
    real_estate: [
      "Lead intent qualification assistant for buyer/seller inquiries.",
      "Appointment scheduling assistant with readiness scoring.",
      "Property Q&A assistant connected to listing data.",
    ],
    saas: [
      "AI support assistant for repetitive ticket types.",
      "Onboarding knowledge assistant for customer activation.",
      "Lead qualification and CRM handoff automation.",
    ],
    service: [
      "AI lead capture assistant for website visitors.",
      "Internal knowledge assistant for SOP retrieval.",
      "Workflow automation for repetitive intake and follow-up tasks.",
    ],
  };

  const useCases = byIndustry[industry] || byIndustry.service;
  const impactScore = Math.min(90, 35 + companySize + (repetitiveTask.length > 30 ? 12 : 6));
  const estimatedImpact = impactScore >= 75 ? "High" : impactScore >= 55 ? "Medium" : "Moderate";

  return res.json({ useCases, estimatedImpact });
});

app.post("/api/automation-score", (req, res) => {
  const employees = Number(req.body?.employees);
  const monthlyLeads = Number(req.body?.monthlyLeads);
  const supportTickets = Number(req.body?.supportTickets);
  const manualTasks = Number(req.body?.manualTasks);
  const softwareStack = String(req.body?.softwareStack || "").trim();

  const values = [employees, monthlyLeads, supportTickets, manualTasks];
  if (values.some((value) => !Number.isFinite(value) || value < 0) || !softwareStack) {
    return res.status(400).json({ error: "All five fields are required with valid values." });
  }

  const scoreRaw =
    20 +
    Math.min(20, employees * 0.8) +
    Math.min(20, monthlyLeads / 12) +
    Math.min(20, supportTickets / 20) +
    Math.min(20, manualTasks * 2);
  const score = Math.max(10, Math.min(100, Math.round(scoreRaw)));

  const level = score >= 75 ? "Advanced" : score >= 50 ? "Intermediate" : "Beginner";
  const recommendation =
    level === "Advanced"
      ? "Prioritize multi-step automation with assistant + workflow + CRM integration."
      : level === "Intermediate"
        ? "Start with one lead or support assistant and automate one downstream workflow."
        : "Start with a scoped pilot focused on one repetitive process and one measurable KPI.";

  return res.json({ score, level, recommendation });
});

app.post("/api/analytics/event", async (req, res) => {
  try {
    const eventType = String(req.body?.eventType || "").trim();
    const path = String(req.body?.path || "").trim();
    const metadata = req.body?.metadata && typeof req.body.metadata === "object" ? req.body.metadata : {};

    if (!eventType || !path) {
      return res.status(400).json({ error: "eventType and path are required." });
    }

    const db = getDatabase();
    await db.run(
      `
      INSERT INTO analytics_events (id, eventType, path, metadata, createdAt)
      VALUES (?, ?, ?, ?, ?)
      `,
      [crypto.randomUUID(), eventType, path, JSON.stringify(metadata), new Date().toISOString()]
    );

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error("analytics event store failed", error);
    return res.status(500).json({ error: "Failed to store analytics event." });
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
