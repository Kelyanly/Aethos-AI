import { API_BASE_URL } from "./api.js";

export async function trackEvent(eventType, path, metadata = {}) {
  try {
    await fetch(`${API_BASE_URL}/api/analytics/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType, path, metadata }),
      keepalive: true,
    });
  } catch {
    // analytics must not block UX
  }
}
