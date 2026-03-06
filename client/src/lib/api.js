export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function parseJson(response) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload.error || "Request failed. Please try again.";
    throw new Error(message);
  }
  return payload;
}

export async function submitConsultation(formData) {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return parseJson(response);
}

export async function runLeadQualificationDemo(payload) {
  const response = await fetch(`${API_BASE_URL}/api/lab/lead-qualification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJson(response);
}

export async function runKnowledgeAssistantDemo(payload) {
  const response = await fetch(`${API_BASE_URL}/api/lab/knowledge-assistant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJson(response);
}

export async function runAutomationPotentialDemo(payload) {
  const response = await fetch(`${API_BASE_URL}/api/lab/automation-potential`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJson(response);
}

export async function runRoiCalculator(payload) {
  const response = await fetch(`${API_BASE_URL}/api/lab/roi-calculator`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJson(response);
}

export async function generateUseCasesApi(payload) {
  const response = await fetch(`${API_BASE_URL}/api/generate-use-cases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJson(response);
}

export async function runAutomationScore(payload) {
  const response = await fetch(`${API_BASE_URL}/api/automation-score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJson(response);
}
