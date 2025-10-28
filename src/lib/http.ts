// Central HTTP helpers for building backend URLs safely
const RAW_BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "";

// Normalize to no trailing slash to avoid double slashes when concatenating paths
export const BACKEND_URL = String(RAW_BACKEND_URL).replace(/\/+$/, "");

type QueryValue = string | number | boolean | undefined | null;

export function buildUrl(
  path: string,
  query?: Record<string, QueryValue>
): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const base = `${BACKEND_URL}${normalizedPath}`;

  if (!query) return base;

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") continue;
    params.set(key, String(value));
  }

  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}
