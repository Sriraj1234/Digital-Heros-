"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Copy, Check, Trash2, ExternalLink, Edit3, X, BarChart2, Plus } from "lucide-react";
import { useAuth } from "@/lib/authContext";
import {
  createDynamicQR, getUserDynamicQRs, updateDynamicQRDestination,
  deleteDynamicQR, toggleDynamicQRActive, DynamicQR,
} from "@/lib/dynamicQR";
import type { QRStyleConfig } from "./StyleTab";

interface DynamicQRPanelProps {
  currentType: string;
  currentValue: string;
  styleConfig: QRStyleConfig;
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? (typeof window !== "undefined" ? window.location.origin : "");

export default function DynamicQRPanel({ currentType, currentValue, styleConfig }: DynamicQRPanelProps) {
  const { user, openAuthModal } = useAuth();
  const [qrCodes, setQrCodes] = useState<DynamicQR[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDest, setNewDest] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState("");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getUserDynamicQRs(user.uid).then(setQrCodes).finally(() => setLoading(false));
  }, [user]);

  const handleCreate = async () => {
    if (!user) { openAuthModal("Sign in to create trackable QR codes"); return; }
    if (!newName.trim() || !newDest.trim()) return;
    setCreating(true);
    try {
      const dest = newDest.startsWith("http") ? newDest : `https://${newDest}`;
      const qr = await createDynamicQR(user.uid, newName.trim(), dest, currentType, styleConfig);
      setQrCodes(prev => [qr, ...prev]);
      setNewName(""); setNewDest(""); setShowCreate(false);
    } catch (e) { console.error(e); }
    finally { setCreating(false); }
  };

  const handleCopy = (shortCode: string, id: string) => {
    navigator.clipboard.writeText(`${APP_URL}/r/${shortCode}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this dynamic QR? This cannot be undone.")) return;
    await deleteDynamicQR(id);
    setQrCodes(prev => prev.filter(q => q.id !== id));
  };

  const handleUpdateUrl = async (id: string) => {
    if (!editUrl.trim()) return;
    const url = editUrl.startsWith("http") ? editUrl : `https://${editUrl}`;
    await updateDynamicQRDestination(id, url);
    setQrCodes(prev => prev.map(q => q.id === id ? { ...q, destinationUrl: url } : q));
    setEditingId(null);
  };

  const handleToggle = async (id: string, active: boolean) => {
    await toggleDynamicQRActive(id, !active);
    setQrCodes(prev => prev.map(q => q.id === id ? { ...q, active: !active } : q));
  };

  // Not signed in state
  if (!user) {
    return (
      <div className="card p-4 mt-4" style={{ borderStyle: "dashed" }}>
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4" style={{ color: "var(--accent)" }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--fg)" }}>Dynamic QR Codes</span>
        </div>
        <p className="text-xs mb-3" style={{ color: "var(--fg-muted)" }}>
          Create trackable QR codes you can edit anytime — change the URL without reprinting.
        </p>
        <button
          onClick={() => openAuthModal("Sign in to create trackable, editable QR codes with scan analytics")}
          className="btn-primary w-full justify-center text-xs"
        >
          <Zap className="w-3.5 h-3.5" /> Sign In to Make Dynamic
        </button>
      </div>
    );
  }

  return (
    <div className="card p-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4" style={{ color: "var(--accent)" }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--fg)" }}>Dynamic QR Codes</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="/dashboard" className="text-[10px] font-semibold flex items-center gap-1" style={{ color: "var(--accent)" }}>
            <BarChart2 className="w-3 h-3" /> Analytics
          </a>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-sm transition-colors"
            style={{ backgroundColor: "var(--accent)", color: "white" }}
          >
            <Plus className="w-3 h-3" /> New
          </button>
        </div>
      </div>

      {/* Create form */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 mb-3 p-3 rounded-lg" style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)" }}>
              <input
                type="text"
                placeholder="Name (e.g. Restaurant Menu)"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="dh-input text-xs py-2"
              />
              <input
                type="url"
                placeholder="Destination URL (can be changed later)"
                value={newDest}
                onChange={e => setNewDest(e.target.value)}
                className="dh-input text-xs py-2"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreate}
                  disabled={creating || !newName.trim() || !newDest.trim()}
                  className="btn-primary text-xs py-1.5 px-3 flex-1 justify-center"
                >
                  {creating ? "Creating…" : "Create Dynamic QR"}
                </button>
                <button onClick={() => setShowCreate(false)} className="btn-outline text-xs py-1.5 px-3">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR list */}
      {loading ? (
        <p className="text-xs text-center py-4" style={{ color: "var(--fg-muted)" }}>Loading…</p>
      ) : qrCodes.length === 0 ? (
        <p className="text-xs text-center py-4 italic" style={{ color: "var(--fg-muted)" }}>No dynamic QR codes yet. Create your first one!</p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {qrCodes.map(qr => (
            <div
              key={qr.id}
              className="rounded-lg p-2.5 text-xs"
              style={{ backgroundColor: "var(--bg)", border: `1px solid ${qr.active ? "var(--border)" : "var(--border-strong)"}`, opacity: qr.active ? 1 : 0.6 }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold truncate flex-1" style={{ color: "var(--fg)" }}>{qr.name}</span>
                <div className="flex items-center gap-1 ml-2 shrink-0">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: qr.active ? "rgba(16,185,129,0.1)" : "rgba(107,114,128,0.1)", color: qr.active ? "#10B981" : "#6B7280" }}>
                    {qr.active ? "LIVE" : "OFF"}
                  </span>
                  <button onClick={() => handleToggle(qr.id, qr.active)} title={qr.active ? "Deactivate" : "Activate"} className="p-1 rounded transition-colors" style={{ color: "var(--fg-muted)" }}>
                    <Zap className="w-3 h-3" />
                  </button>
                  <button onClick={() => { setEditingId(qr.id); setEditUrl(qr.destinationUrl); }} className="p-1 rounded" style={{ color: "var(--fg-muted)" }}>
                    <Edit3 className="w-3 h-3" />
                  </button>
                  <button onClick={() => handleDelete(qr.id)} className="p-1 rounded" style={{ color: "#EF4444" }}>
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Edit URL inline */}
              {editingId === qr.id ? (
                <div className="flex gap-1 mt-1">
                  <input
                    type="url"
                    value={editUrl}
                    onChange={e => setEditUrl(e.target.value)}
                    className="dh-input text-[10px] py-1 flex-1"
                    autoFocus
                  />
                  <button onClick={() => handleUpdateUrl(qr.id)} className="btn-primary text-[10px] py-1 px-2">Save</button>
                  <button onClick={() => setEditingId(null)} className="btn-outline text-[10px] py-1 px-2">Cancel</button>
                </div>
              ) : (
                <p className="text-[10px] truncate mb-1.5" style={{ color: "var(--fg-muted)" }}>{qr.destinationUrl}</p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px]" style={{ color: "var(--fg-muted)" }}>
                  <BarChart2 className="w-3 h-3" /> {qr.scansTotal} scans
                </div>
                <button
                  onClick={() => handleCopy(qr.shortCode, qr.id)}
                  className="flex items-center gap-1 text-[10px] font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  {copiedId === qr.id ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy link</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
