// =============================================
// DYNAMIC QR — Firestore CRUD
// =============================================

import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, query, where, orderBy, serverTimestamp, increment,
} from "firebase/firestore";
import { db } from "./firebase";
import type { QRStyleConfig } from "@/components/StyleTab";

export interface DynamicQR {
  id: string;
  uid: string;
  shortCode: string;
  name: string;
  destinationUrl: string;
  type: string;
  styleConfig?: Partial<QRStyleConfig>;
  createdAt: number;
  scansTotal: number;
  lastScanned?: number;
  active: boolean;
}

/** Generate a random 6-char alphanumeric short code */
function generateShortCode(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 7 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

/** Create a new dynamic QR code for a signed-in user */
export async function createDynamicQR(
  uid: string,
  name: string,
  destinationUrl: string,
  type: string,
  styleConfig?: Partial<QRStyleConfig>
): Promise<DynamicQR> {
  const shortCode = generateShortCode();
  const ref = await addDoc(collection(db, "dynamicQRs"), {
    uid,
    shortCode,
    name,
    destinationUrl,
    type,
    styleConfig: styleConfig ?? {},
    createdAt: serverTimestamp(),
    scansTotal: 0,
    active: true,
  });
  return {
    id: ref.id,
    uid, shortCode, name, destinationUrl, type,
    styleConfig: styleConfig ?? {},
    createdAt: Date.now(),
    scansTotal: 0,
    active: true,
  };
}

/** Get all dynamic QRs for a user, newest first */
export async function getUserDynamicQRs(uid: string): Promise<DynamicQR[]> {
  try {
    const q = query(
      collection(db, "dynamicQRs"),
      where("uid", "==", uid),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => {
      const data = d.data();
      return {
        id: d.id,
        uid: data.uid,
        shortCode: data.shortCode,
        name: data.name,
        destinationUrl: data.destinationUrl,
        type: data.type,
        styleConfig: data.styleConfig,
        createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
        scansTotal: data.scansTotal ?? 0,
        lastScanned: data.lastScanned?.toMillis?.() ?? undefined,
        active: data.active ?? true,
      };
    });
  } catch (err) {
    console.warn("[DynamicQR] getUserDynamicQRs failed:", err);
    return [];
  }
}

/** Update the destination URL of a dynamic QR */
export async function updateDynamicQRDestination(id: string, destinationUrl: string): Promise<void> {
  await updateDoc(doc(db, "dynamicQRs", id), { destinationUrl });
}

/** Toggle active state */
export async function toggleDynamicQRActive(id: string, active: boolean): Promise<void> {
  await updateDoc(doc(db, "dynamicQRs", id), { active });
}

/** Delete a dynamic QR */
export async function deleteDynamicQR(id: string): Promise<void> {
  await deleteDoc(doc(db, "dynamicQRs", id));
}

/** Get scan history for a specific dynamic QR code */
export interface ScanRecord {
  id: string;
  codeId: string;
  timestamp: number;
  device: string;
  country: string;
}

export async function getScansForCode(codeId: string): Promise<ScanRecord[]> {
  try {
    const q = query(
      collection(db, "scans"),
      where("codeId", "==", codeId),
      orderBy("timestamp", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => {
      const data = d.data();
      return {
        id: d.id,
        codeId: data.codeId,
        timestamp: data.timestamp?.toMillis?.() ?? Date.now(),
        device: data.device ?? "desktop",
        country: data.country ?? "Unknown",
      };
    });
  } catch {
    return [];
  }
}
