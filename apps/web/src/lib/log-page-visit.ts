import type { NextRequest } from "next/server";

function decodeCity(value: string | null): string | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function logPageVisit(req: NextRequest): void {
  const { headers, nextUrl } = req;
  // Vercel supplies the IP/location headers. Local requests have no geo data.
  if (process.env.VERCEL !== "1" || req.method !== "GET") return;
  if (/^\/(api|trpc|_next)(\/|$)/.test(nextUrl.pathname)) return;
  if (
    headers.has("next-router-prefetch") ||
    headers.has("next-router-segment-prefetch") ||
    /prefetch/i.test(headers.get("purpose") ?? "") ||
    /prefetch/i.test(headers.get("sec-purpose") ?? "")
  ) return;
  if (
    !headers.get("accept")?.includes("text/html") &&
    headers.get("rsc") !== "1"
  ) return;

  const ip =
    headers.get("x-vercel-forwarded-for") ??
    headers.get("x-forwarded-for") ??
    headers.get("x-real-ip");

  // Omit query strings, which can contain auth tokens or other private data.
  console.info(JSON.stringify({
    event: "page_visit",
    path: nextUrl.pathname,
    ip: ip?.split(",")[0]?.trim() || null,
    country: headers.get("x-vercel-ip-country"),
    region: headers.get("x-vercel-ip-country-region"),
    city: decodeCity(headers.get("x-vercel-ip-city")),
  }));
}
