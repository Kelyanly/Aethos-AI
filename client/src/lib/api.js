const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function parseJson(response) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload.error || "Request failed. Please try again.";
    throw new Error(message);
  }
  return payload;
}

export async function submitConsultation(formData) {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return parseJson(response);
}

export async function runLeadQualificationDemo(payload) {
  const response = await fetch(`${API_URL}/api/lab/lead-qualification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJson(response);
}

export async function runMiniRagDemo(payload) {
  const response = await fetch(`${API_URL}/api/lab/mini-rag`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJson(response);
}

export async function runAutomationPotentialDemo(payload) {
  const response = await fetch(`${API_URL}/api/lab/automation-potential`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJson(response);
}
