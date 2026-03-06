const maxLengthByField = {
  fullName: 120,
  email: 160,
  company: 120,
  website: 200,
  businessType: 120,
  projectGoal: 180,
  budgetRange: 80,
  desiredTimeline: 80,
  message: 3000,
};

const requiredFields = [
  "fullName",
  "email",
  "company",
  "businessType",
  "projectGoal",
  "budgetRange",
  "desiredTimeline",
  "message",
];

function sanitizeString(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[<>]/g, "")
    .slice(0, maxLength);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeWebsite(website) {
  if (!website) {
    return "";
  }

  try {
    const url = new URL(website.startsWith("http") ? website : `https://${website}`);
    return url.toString();
  } catch {
    return null;
  }
}

export function validateAndSanitizeContact(input) {
  const cleaned = {
    fullName: sanitizeString(input.fullName, maxLengthByField.fullName),
    email: sanitizeString(input.email, maxLengthByField.email).toLowerCase(),
    company: sanitizeString(input.company, maxLengthByField.company),
    website: sanitizeString(input.website, maxLengthByField.website),
    businessType: sanitizeString(input.businessType, maxLengthByField.businessType),
    projectGoal: sanitizeString(input.projectGoal, maxLengthByField.projectGoal),
    budgetRange: sanitizeString(input.budgetRange, maxLengthByField.budgetRange),
    desiredTimeline: sanitizeString(input.desiredTimeline, maxLengthByField.desiredTimeline),
    message: sanitizeString(input.message, maxLengthByField.message),
  };

  const missing = requiredFields.filter((field) => !cleaned[field]);
  if (missing.length > 0) {
    return {
      ok: false,
      error: `Missing required fields: ${missing.join(", ")}`,
    };
  }

  if (!isValidEmail(cleaned.email)) {
    return { ok: false, error: "Invalid email address." };
  }

  const website = normalizeWebsite(cleaned.website);
  if (cleaned.website && !website) {
    return { ok: false, error: "Invalid website URL." };
  }

  return {
    ok: true,
    data: {
      ...cleaned,
      website,
    },
  };
}
