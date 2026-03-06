import { API_BASE_URL } from "./api.js";

export async function requestDin0Response(payload) {
  const response = await fetch(`${API_BASE_URL}/api/din0/respond`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Din_0 response failed");
  }

  return response.json();
}
