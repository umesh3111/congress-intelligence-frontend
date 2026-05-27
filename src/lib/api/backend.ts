// Server-side only — never imported in client components
const API_BASE = process.env.API_BASE ?? "http://localhost:8000";

export async function backendFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${API_BASE}${path}`;
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Principal": "demo-user", // stub auth header
      ...(options.headers as Record<string, string>),
    },
    next: { revalidate: 60 }, // cache for 60s
  });
}

export async function backendGet<T>(path: string): Promise<T> {
  const res = await backendFetch(path);
  if (!res.ok) {
    throw new Error(`Backend error: ${res.status} ${path}`);
  }
  return res.json() as Promise<T>;
}
