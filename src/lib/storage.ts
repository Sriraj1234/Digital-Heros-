// =============================================
// LOCAL STORAGE — QR History & Saved Designs
// Dual-writes to Firestore for cloud persistence
// =============================================

import {
  syncRecordToFirestore,
  updateRecordInFirestore,
  deleteRecordFromFirestore,
  clearNonFavoritesFromFirestore,
} from "./firestore";

export interface QRRecord {
  id: string;
  type: string;
  value: string;
  label: string;
  fgColor: string;
  bgColor: string;
  size: number;
  level: string;
  isFavorite?: boolean;
  createdAt: number;
}

const HISTORY_KEY = "qr_launchpad_history";
const SETTINGS_KEY = "qr_launchpad_settings";
const MAX_HISTORY = 40;

export function saveToHistory(record: Omit<QRRecord, "id" | "createdAt">) {
  if (typeof window === "undefined") return;
  const history = getHistory();

  let saved: QRRecord;

  // Update if exists with same value+type, otherwise insert new
  const existingIdx = history.findIndex(h => h.value === record.value && h.type === record.type);
  if (existingIdx >= 0) {
    history[existingIdx] = { ...history[existingIdx], ...record, createdAt: Date.now() };
    saved = history[existingIdx];
  } else {
    saved = {
      ...record,
      id: Math.random().toString(36).slice(2),
      isFavorite: false,
      createdAt: Date.now(),
    };
    history.unshift(saved);
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));

  // ── Cloud sync (fire-and-forget) ──────────────────────────────────────────
  syncRecordToFirestore(saved);
}

export function getHistory(): QRRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch { return []; }
}

export function toggleFavorite(id: string) {
  if (typeof window === "undefined") return;
  const history = getHistory();
  const idx = history.findIndex(h => h.id === id);
  if (idx >= 0) {
    history[idx].isFavorite = !history[idx].isFavorite;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

    // ── Cloud sync ────────────────────────────────────────────────────────
    updateRecordInFirestore(id, { isFavorite: history[idx].isFavorite });
  }
}

export function deleteFromHistory(id: string) {
  if (typeof window === "undefined") return;
  const history = getHistory().filter(h => h.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

  // ── Cloud sync ────────────────────────────────────────────────────────
  deleteRecordFromFirestore(id);
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  const history = getHistory();

  // ── Cloud sync (before we filter locally) ────────────────────────────────
  clearNonFavoritesFromFirestore(history);

  const kept = history.filter(h => h.isFavorite); // Keep favorites when clearing
  localStorage.setItem(HISTORY_KEY, JSON.stringify(kept));
}

export interface QRSettings {
  activeType?: string;
  styleConfig?: any;
}

export function saveSettings(settings: QRSettings) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadSettings(): QRSettings {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
  } catch { return {}; }
}
