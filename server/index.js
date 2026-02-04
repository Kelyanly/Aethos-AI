import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const allowedOrigin = process.env.CORS_ORIGIN || "*";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.post("/api/contact", (req, res) => {
  const { name, email, company, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // TODO: Replace with email service, CRM, or database.
  console.log("New contact request:", {
    name,
    email,
    company,
    message,
    receivedAt: new Date().toISOString(),
  });

  return res.status(200).json({ received: true });
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
