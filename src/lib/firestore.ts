// =============================================
// FIRESTORE — QR History (anonymous sessions)
// =============================================
// Uses a persistent anonymous session ID (stored in localStorage) so
// data is tied to a browser without requiring any login.
// Auth can be layered on top later by replacing the session ID with a real UID.

import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import type { QRRecord } from "./storage";

const SESSION_ID_KEY = "qr_launchpad_session_id";
const MAX_CLOUD_HISTORY = 40;

// ── Session ID helpers ────────────────────────────────────────────────────────

/** Returns a persistent anonymous session ID for this browser. */
export function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  let id = localStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id = `anon_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(SESSION_ID_KEY, id);
  }
  return id;
}

// ── Collection helpers ────────────────────────────────────────────────────────

function historyCol(sessionId: string) {
  return collection(db, "sessions", sessionId, "history");
}

// ── Write operations ──────────────────────────────────────────────────────────

/**
 * Saves a QR record to Firestore (upsert by `id`).
 * Call this after saving to localStorage so the local write is always primary.
 */
export async function syncRecordToFirestore(record: QRRecord): Promise<void> {
  try {
    const sid = getSessionId();
    const docRef = doc(historyCol(sid), record.id);
    await setDoc(docRef, {
      ...record,
      syncedAt: serverTimestamp(),
    }, { merge: true });
  } catch (err) {
    // Silently fail — localStorage is the source of truth for now
    console.warn("[Firestore] syncRecordToFirestore failed:", err);
  }
}

/**
 * Updates a single field on a Firestore record (e.g. isFavorite toggle).
 */
export async function updateRecordInFirestore(
  id: string,
  patch: Partial<QRRecord>
): Promise<void> {
  try {
    const sid = getSessionId();
    const docRef = doc(historyCol(sid), id);
    await updateDoc(docRef, { ...patch, syncedAt: serverTimestamp() });
  } catch (err) {
    console.warn("[Firestore] updateRecordInFirestore failed:", err);
  }
}

/**
 * Deletes a single QR record from Firestore.
 */
export async function deleteRecordFromFirestore(id: string): Promise<void> {
  try {
    const sid = getSessionId();
    await deleteDoc(doc(historyCol(sid), id));
  } catch (err) {
    console.warn("[Firestore] deleteRecordFromFirestore failed:", err);
  }
}

/**
 * Deletes all non-favorite records from Firestore (mirrors clearHistory).
 */
export async function clearNonFavoritesFromFirestore(
  records: QRRecord[]
): Promise<void> {
  try {
    const sid = getSessionId();
    const batch = writeBatch(db);
    for (const r of records) {
      if (!r.isFavorite) {
        batch.delete(doc(historyCol(sid), r.id));
      }
    }
    await batch.commit();
  } catch (err) {
    console.warn("[Firestore] clearNonFavoritesFromFirestore failed:", err);
  }
}

// ── Read operations ───────────────────────────────────────────────────────────

/**
 * Fetches the cloud history for the current session, sorted newest-first.
 * Used on mount to hydrate the local store if it's empty.
 */
export async function fetchCloudHistory(): Promise<QRRecord[]> {
  try {
    const sid = getSessionId();
    // Fetch all records and sort client-side to avoid needing a composite index
    const snap = await getDocs(historyCol(sid));
    const records = snap.docs.map(d => {
      const data = d.data();
      return {
        id:         d.id,
        type:       data.type ?? "url",
        value:      data.value ?? "",
        label:      data.label ?? "QR Code",
        fgColor:    data.fgColor ?? "#000000",
        bgColor:    data.bgColor ?? "#FFFFFF",
        size:       data.size ?? 512,
        level:      data.level ?? "H",
        isFavorite: data.isFavorite ?? false,
        // Handle both numeric timestamps and Firestore Timestamps
        createdAt:  typeof data.createdAt === "number"
          ? data.createdAt
          : (data.createdAt?.toMillis?.() ?? Date.now()),
      } as QRRecord;
    });
    // Sort newest-first and cap at MAX_CLOUD_HISTORY
    return records
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, MAX_CLOUD_HISTORY);
  } catch (err) {
    console.warn("[Firestore] fetchCloudHistory failed:", err);
    return [];
  }
}
