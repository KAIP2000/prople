import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json({ error: "Expected JSON" }, { status: 415 });
  }

  // Bound the body while reading, including requests without Content-Length.
  const reader = request.body?.getReader();
  if (!reader)
    return NextResponse.json({ error: "Missing body" }, { status: 400 });
  let body = "";
  let bytes = 0;
  const decoder = new TextDecoder();
  let data: unknown;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 1024) {
        await reader.cancel();
        return NextResponse.json({ error: "Body too large" }, { status: 413 });
      }
      body += decoder.decode(value, { stream: true });
    }
    data = JSON.parse(body + decoder.decode());
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Invalid location" }, { status: 400 });
  }
  const { consent, latitude, longitude, accuracy } = data as Record<
    string,
    unknown
  >;
  if (
    consent !== true ||
    typeof latitude !== "number" ||
    !Number.isFinite(latitude) ||
    Math.abs(latitude) > 90 ||
    typeof longitude !== "number" ||
    !Number.isFinite(longitude) ||
    Math.abs(longitude) > 180 ||
    typeof accuracy !== "number" ||
    !Number.isFinite(accuracy) ||
    accuracy < 0
  ) {
    return NextResponse.json(
      { error: "Consent and valid coordinates required" },
      { status: 400 },
    );
  }

  if (process.env.VERCEL === "1") {
    const coordinates = encodeURIComponent(`${latitude},${longitude}`);
    const ip =
      request.headers.get("x-vercel-forwarded-for") ??
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip");
    console.info(
      JSON.stringify({
        event: "location_shared",
        source: "browser_geolocation",
        consent: true,
        timestamp: new Date().toISOString(),
        ip: ip?.split(",")[0]?.trim() || null,
        latitude,
        longitude,
        accuracyMeters: accuracy,
        mapUrl: `https://www.google.com/maps/search/?api=1&query=${coordinates}`,
        streetViewUrl: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${coordinates}`,
      }),
    );
  }
  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}
