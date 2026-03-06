const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function submitConsultation(formData) {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload.error || "Request failed. Please try again.";
    throw new Error(message);
  }

  return payload;
}
