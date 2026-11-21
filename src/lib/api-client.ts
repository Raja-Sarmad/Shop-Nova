const API = process.env.NEXT_PUBLIC_API_URL ?? "";

export function getApiBase() {
  return API.replace(/\/$/, "");
}

export function hasApi() {
  return Boolean(getApiBase());
}

export function getCustomerToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("velora-customer-token");
}

export function setCustomerToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem("velora-customer-token", token);
  else localStorage.removeItem("velora-customer-token");
}

export async function customerApi<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const base = getApiBase();
  if (!base) throw new Error("API URL not configured");

  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const token = getCustomerToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${base}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data as T;
}
