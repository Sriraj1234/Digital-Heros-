"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  ArrowLeft, Zap, BarChart2, Copy, Check, Trash2, Edit3,
  X, Plus, Globe, Smartphone, RefreshCw, QrCode, LogIn
} from "lucide-react";
import { useAuth } from "@/lib/authContext";
import {
  getUserDynamicQRs, updateDynamicQRDestination, deleteDynamicQR,
  toggleDynamicQRActive, getScansForCode, DynamicQR, ScanRecord,
} from "@/lib/dynamicQR";

const DEVICE_COLORS: Record<string, string> = { ios: "#007AFF", android: "#3DDC84", desktop: "#9C3AAF" };
const COUNTRY_COLORS = ["#E63946", "#457B9D", "#A8DADC", "#F4A261", "#2A9D8F"];

function groupByDay(scans: ScanRecord[]) {
  const map: Record<string, number> = {};
  scans.forEach(s => {
    const d = new Date(s.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    map[d] = (map[d] ?? 0) + 1;
  });
  return Object.entries(map).map(([date, scans]) => ({ date, scans })).slice(-14);
}
function groupByDevice(scans: ScanRecord[]) {
  const map: Record<string, number> = {};
  scans.forEach(s => { map[s.device] = (map[s.device] ?? 0) + 1; });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}
function groupByCountry(scans: ScanRecord[]) {
  const map: Record<string, number> = {};
  scans.forEach(s => { map[s.country] = (map[s.country] ?? 0) + 1; });
  return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([country, scans]) => ({ country, scans }));
}

export default function DashboardPage() {
  const { user, loading, openAuthModal } = useAuth();
  const [qrCodes, setQrCodes] = useState<DynamicQR[]>([]);
  const [selected, setSelected] = useState<DynamicQR | null>(null);
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [fetching, setFetching] = useState(false);
  const [fetchingScans, setFetchingScans] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState("");
  const APP_URL = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    if (loading || !user) return;
    setFetching(true);
    getUserDynamicQRs(user.uid).then(data => {
      setQrCodes(data);
      if (data.length > 0) setSelected(data[0]);
    }).finally(() => setFetching(false));
  }, [user, loading]);

  useEffect(() => {
    if (!selected) return;
    setFetchingScans(true);
    getScansForCode(selected.id).then(setScans).finally(() => setFetchingScans(false));
  }, [selected]);

  const copyLink = (shortCode: string, id: string) => {
    navigator.clipboard.writeText(`${APP_URL}/r/${shortCode}`);
    setCopiedId(id); setTimeout(() => setCopiedId(null), 2000);
  };

  const removeQR = async (id: string) => {
    if (!confirm("Delete this dynamic QR?")) return;
    await deleteDynamicQR(id);
    const next = qrCodes.filter(q => q.id !== id);
    setQrCodes(next);
    if (selected?.id === id) setSelected(next[0] ?? null);
  };

  const toggleActive = async (id: string, active: boolean) => {
    await toggleDynamicQRActive(id, !active);
    setQrCodes(prev => prev.map(q => q.id === id ? { ...q, active: !active } : q));
    if (selected?.id === id) setSelected(p => p ? { ...p, active: !active } : null);
  };

  const saveUrl = async (id: string) => {
    if (!editUrl.trim()) return;
    const url = editUrl.startsWith("http") ? editUrl : `https://${editUrl}`;
    await updateDynamicQRDestination(id, url);
    setQrCodes(prev => prev.map(q => q.id === id ? { ...q, destinationUrl: url } : q));
    if (selected?.id === id) setSelected(p => p ? { ...p, destinationUrl: url } : null);
    setEditingId(null);
  };

  if (!loading && !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8" style={{ backgroundColor: "var(--bg)" }}>
        <QrCode className="w-12 h-12" style={{ color: "var(--accent)" }} />
        <h1 className="text-2xl font-bold" style={{ color: "var(--fg)" }}>Analytics Dashboard</h1>
        <p className="text-sm text-center max-w-sm" style={{ color: "var(--fg-muted)" }}>Sign in to view your dynamic QR codes, scan analytics, and manage destinations.</p>
        <button onClick={() => openAuthModal("Sign in to access your dashboard")} className="btn-primary gap-2">
          <LogIn className="w-4 h-4" /> Sign In
        </button>
        <Link href="/" className="text-sm" style={{ color: "var(--fg-muted)" }}>← Back to Studio</Link>
      </div>
    );
  }

  const totalScans = qrCodes.reduce((a, q) => a + (q.scansTotal ?? 0), 0);
  const dayData = groupByDay(scans);
  const deviceData = groupByDevice(scans);
  const countryData = groupByCountry(scans);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: "color-mix(in srgb, var(--bg) 96%, transparent)", backdropFilter: "blur(12px)", borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1.5 text-sm" style={{ color: "var(--fg-muted)" }}>
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <span style={{ color: "var(--border-strong)" }}>·</span>
            <span className="text-sm font-bold" style={{ color: "var(--fg)" }}>Analytics Dashboard</span>
          </div>
          <Link href="/#studio" className="btn-primary text-xs py-1.5 px-3 gap-1.5"><Plus className="w-3.5 h-3.5" /> Create QR</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Dynamic QRs", value: qrCodes.length, icon: Zap },
            { label: "Total Scans", value: totalScans, icon: BarChart2 },
            { label: "Active QRs", value: qrCodes.filter(q => q.active).length, icon: Globe },
            { label: "Device Types", value: deviceData.length, icon: Smartphone },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4" style={{ color: "var(--accent)" }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--fg-muted)" }}>{label}</span>
              </div>
              <p className="text-3xl font-bold" style={{ color: "var(--fg)" }}>{value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* QR list */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold mb-3" style={{ color: "var(--fg)" }}>My Dynamic QR Codes</h2>
            {fetching ? <div className="card p-6 flex justify-center"><RefreshCw className="w-5 h-5 animate-spin" style={{ color: "var(--fg-muted)" }} /></div>
              : qrCodes.length === 0 ? (
                <div className="card p-6 text-center">
                  <p className="text-sm mb-3" style={{ color: "var(--fg-muted)" }}>No dynamic QR codes yet.</p>
                  <Link href="/#studio" className="btn-primary text-xs justify-center">Create QR</Link>
                </div>
              ) : qrCodes.map(qr => (
                <div key={qr.id} onClick={() => setSelected(qr)} className="card p-3 cursor-pointer transition-all"
                  style={{ borderColor: selected?.id === qr.id ? "var(--accent)" : "var(--border)", opacity: qr.active ? 1 : 0.55 }}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate" style={{ color: "var(--fg)" }}>{qr.name}</p>
                      <p className="text-[10px] truncate" style={{ color: "var(--fg-muted)" }}>{qr.destinationUrl}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: qr.active ? "rgba(16,185,129,0.12)" : "rgba(107,114,128,0.12)", color: qr.active ? "#10B981" : "#6B7280" }}>
                          {qr.active ? "LIVE" : "OFF"}
                        </span>
                        <span className="text-[10px]" style={{ color: "var(--fg-muted)" }}>{qr.scansTotal} scans</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button onClick={e => { e.stopPropagation(); copyLink(qr.shortCode, qr.id); }} className="p-1 rounded" style={{ color: "var(--accent)" }}>
                        {copiedId === qr.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                      <button onClick={e => { e.stopPropagation(); removeQR(qr.id); }} className="p-1 rounded" style={{ color: "#EF4444" }}>
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  {editingId === qr.id ? (
                    <div className="flex gap-1 mt-2" onClick={e => e.stopPropagation()}>
                      <input type="url" value={editUrl} onChange={e => setEditUrl(e.target.value)} className="dh-input text-[10px] py-1 flex-1" autoFocus />
                      <button onClick={() => saveUrl(qr.id)} className="btn-primary text-[9px] px-2 py-1">Save</button>
                      <button onClick={() => setEditingId(null)} className="btn-outline text-[9px] px-2 py-1"><X className="w-3 h-3" /></button>
                    </div>
                  ) : (
                    <button onClick={e => { e.stopPropagation(); setEditingId(qr.id); setEditUrl(qr.destinationUrl); }}
                      className="flex items-center gap-1 mt-2 text-[10px]" style={{ color: "var(--fg-muted)" }}>
                      <Edit3 className="w-3 h-3" /> Change URL
                    </button>
                  )}
                </div>
              ))}
          </div>

          {/* Analytics */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-sm font-bold" style={{ color: "var(--fg)" }}>
              {selected ? `Analytics — ${selected.name}` : "Select a QR to view analytics"}
            </h2>
            {selected && (
              <>
                <div className="card p-5">
                  <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "var(--fg-muted)" }}>Scans — Last 14 Days</p>
                  {fetchingScans ? <div className="flex justify-center h-40 items-center"><RefreshCw className="w-5 h-5 animate-spin" style={{ color: "var(--fg-muted)" }} /></div>
                    : dayData.length === 0 ? <p className="text-xs text-center py-10" style={{ color: "var(--fg-muted)" }}>No scan data yet</p>
                    : (
                      <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={dayData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "var(--fg-muted)" }} />
                          <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "var(--fg-muted)" }} />
                          <Tooltip contentStyle={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "11px" }} />
                          <Line type="monotone" dataKey="scans" stroke="var(--accent)" strokeWidth={2} dot={{ fill: "var(--accent)", r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="card p-5">
                    <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "var(--fg-muted)" }}>Device Breakdown</p>
                    {deviceData.length === 0 ? <p className="text-xs text-center py-6" style={{ color: "var(--fg-muted)" }}>No data yet</p>
                      : (
                        <ResponsiveContainer width="100%" height={160}>
                          <PieChart>
                            <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                              {deviceData.map((e, i) => <Cell key={i} fill={DEVICE_COLORS[e.name] ?? "#9C3AAF"} />)}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "11px" }} />
                          </PieChart>
                        </ResponsiveContainer>
                      )}
                  </div>
                  <div className="card p-5">
                    <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "var(--fg-muted)" }}>Top Countries</p>
                    {countryData.length === 0 ? <p className="text-xs text-center py-6" style={{ color: "var(--fg-muted)" }}>No data yet</p>
                      : (
                        <ResponsiveContainer width="100%" height={160}>
                          <BarChart data={countryData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                            <XAxis type="number" tick={{ fontSize: 10, fill: "var(--fg-muted)" }} allowDecimals={false} />
                            <YAxis type="category" dataKey="country" tick={{ fontSize: 10, fill: "var(--fg-muted)" }} width={50} />
                            <Tooltip contentStyle={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "11px" }} />
                            <Bar dataKey="scans" radius={[0, 4, 4, 0]}>
                              {countryData.map((_, i) => <Cell key={i} fill={COUNTRY_COLORS[i % COUNTRY_COLORS.length]} />)}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      )}
                  </div>
                </div>
                <div className="card p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--fg-muted)" }}>Short Link</p>
                    <p className="text-sm font-mono" style={{ color: "var(--fg)" }}>{APP_URL}/r/{selected.shortCode}</p>
                  </div>
                  <button onClick={() => copyLink(selected.shortCode, selected.id)} className="btn-outline text-xs gap-1.5 shrink-0">
                    {copiedId === selected.id ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
