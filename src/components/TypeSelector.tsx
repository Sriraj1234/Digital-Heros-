"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { QR_TYPES } from "./QRForms";
import { QR_TYPE_ICONS } from "@/lib/qrTypeIcons";
import { useRouter } from "next/navigation";

// Brand-accurate background tints per type
const TYPE_BG: Record<string, string> = {
  url: "#EFF6FF", text: "#F5F3FF", email: "#FEF2F2", phone: "#F0FDF4",
  sms: "#F0FDF4", wifi: "#ECFEFF", vcard: "#EEF2FF", calendar: "#FFF1F2",
  maps: "#FFF7ED",
  whatsapp: "#F0FDF4", youtube: "#FFF1F1", instagram: "#FDF2F8",
  facebook: "#EFF6FF", telegram: "#EFF6FF", linkedin: "#EFF6FF",
  twitter: "#F9FAFB", tiktok: "#F9FAFB", snapchat: "#FEFCE8",
  spotify: "#F0FDF4", pinterest: "#FFF1F2", discord: "#EEF2FF",
  reddit: "#FFF7ED",
  upi: "#F0FDF9", paypal: "#EFF6FF", crypto: "#FFF7ED",
  app_store: "#F9FAFB", play_store: "#F0FDF4",
  pdf: "#FEF2F2", video: "#F5F3FF", g_review: "#FFFBEB",
};

const CATEGORY_LABELS: Record<string, string> = {
  "Standard": "📋 Standard",
  "Social & Comms": "💬 Social & Messaging",
  "Finance & Commerce": "💳 Finance & Commerce",
  "Docs & Files": "📁 Docs & Files",
  "Marketing & Utility": "⭐ Marketing",
};

export function TypeSelector() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const router = useRouter();

  const handleSelect = (id: string) => {
    if (typeof window !== "undefined") {
      const s = JSON.parse(localStorage.getItem("qr_launchpad_settings") || "{}");
      s.activeType = id;
      localStorage.setItem("qr_launchpad_settings", JSON.stringify(s));
    }
    router.push("/studio");
  };

  const categories = ["all", "Standard", "Social & Comms", "Finance & Commerce", "Docs & Files", "Marketing & Utility"];

  const filtered = QR_TYPES.filter(t => {
    const matchSearch = t.label.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center">
        <h2 className="text-3xl font-extrabold mb-2" style={{ color: "var(--fg)" }}>All Types Of QR Codes</h2>
        <p className="text-sm mb-6" style={{ color: "var(--fg-muted)" }}>Select the type of QR code you want to generate</p>

        {/* Search bar */}
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-28 py-3 rounded-full border shadow-sm outline-none transition-all focus:shadow-md text-sm"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--fg)" }}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-1.5 rounded-full text-white text-xs font-bold"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all"
            style={{
              backgroundColor: activeCategory === cat ? "var(--accent)" : "var(--bg-card)",
              color: activeCategory === cat ? "#fff" : "var(--fg-muted)",
              borderColor: activeCategory === cat ? "var(--accent)" : "var(--border)",
              boxShadow: activeCategory === cat ? "0 2px 8px var(--glow-color)" : "none",
            }}
          >
            {cat === "all" ? "🔢 All Types" : (CATEGORY_LABELS[cat] || cat)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((t) => {
          const brandIcon = QR_TYPE_ICONS[t.id];
          const bgTint = TYPE_BG[t.id] || "#F5F3FF";
          return (
            <button
              key={t.id}
              onClick={() => handleSelect(t.id)}
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg text-center"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-card)",
              }}
            >
              {/* Icon container with brand tint */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-200"
                style={{ backgroundColor: bgTint }}
              >
                {brandIcon ?? <t.icon className="w-6 h-6" style={{ color: "var(--accent)" }} />}
              </div>
              <span className="font-semibold text-xs leading-tight" style={{ color: "var(--fg)" }}>
                {t.label}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16" style={{ color: "var(--fg-muted)" }}>
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium">No QR types found for "{search}"</p>
        </div>
      )}
    </div>
  );
}
