import { NextRequest, NextResponse } from "next/server";

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

/** Parse a Firestore REST value object into a plain JS value */
function parseValue(v: any): any {
  if (!v) return null;
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("booleanValue" in v) return v.booleanValue;
  if ("timestampValue" in v) return v.timestampValue;
  if ("nullValue" in v) return null;
  return null;
}

function parseDoc(fields: Record<string, any>) {
  return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, parseValue(v)]));
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? req.nextUrl.origin;

  try {
    // Fetch dynamic QR doc by shortCode using a Firestore query
    const queryRes = await fetch(
      `${FIRESTORE_BASE}:runQuery?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: "dynamicQRs" }],
            where: {
              fieldFilter: {
                field: { fieldPath: "shortCode" },
                op: "EQUAL",
                value: { stringValue: code },
              },
            },
            limit: 1,
          },
        }),
      }
    );

    const results: any[] = await queryRes.json();
    const hit = results.find((r: any) => r.document);

    if (!hit) {
      return NextResponse.redirect(new URL(`/?qr_not_found=1`, appUrl));
    }

    const docName: string = hit.document.name; // full resource path
    const data = parseDoc(hit.document.fields ?? {});

    if (!data.active || !data.destinationUrl) {
      return NextResponse.redirect(new URL(`/?qr_inactive=1`, appUrl));
    }

    // ── Log the scan (fire-and-forget via Firestore REST) ─────────────────────
    const ua = req.headers.get("user-agent") ?? "";
    const country =
      req.headers.get("cf-ipcountry") ??
      req.headers.get("x-vercel-ip-country") ??
      "Unknown";

    let device = "desktop";
    if (/iPhone|iPad|iPod/i.test(ua)) device = "ios";
    else if (/Android/i.test(ua)) device = "android";

    // Extract doc ID from full path
    const docId = docName.split("/").pop()!;

    // Write scan document (best-effort)
    fetch(`${FIRESTORE_BASE}/scans?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          codeId:    { stringValue: docId },
          device:    { stringValue: device },
          country:   { stringValue: country },
          timestamp: { timestampValue: new Date().toISOString() },
        },
      }),
    }).catch(() => {});

    // Increment scansTotal (best-effort)
    fetch(`${FIRESTORE_BASE}/${docId}?key=${API_KEY}&updateMask.fieldPaths=scansTotal&updateMask.fieldPaths=lastScanned`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          scansTotal:  { integerValue: (Number(data.scansTotal ?? 0) + 1).toString() },
          lastScanned: { timestampValue: new Date().toISOString() },
        },
      }),
    }).catch(() => {});

    // ── Redirect ─────────────────────────────────────────────────────────────
    let dest = data.destinationUrl as string;
    if (!/^https?:\/\//i.test(dest)) dest = `https://${dest}`;

    return NextResponse.redirect(dest, { status: 302 });
  } catch (err) {
    console.error("[Redirect] Error:", err);
    return NextResponse.redirect(new URL("/", appUrl));
  }
}
