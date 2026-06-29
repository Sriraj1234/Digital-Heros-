"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { QR_TYPES } from "./QRForms";
import { useRouter } from "next/navigation";

export function TypeSelector() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSelect = (id: string) => {
    // Save selection so studio can load it
    if (typeof window !== "undefined") {
      const s = JSON.parse(localStorage.getItem("qr_launchpad_settings") || "{}");
      s.activeType = id;
      localStorage.setItem("qr_launchpad_settings", JSON.stringify(s));
    }
    // Navigate to studio
    router.push("/studio");
  };

  const filtered = QR_TYPES.filter(t => 
    t.label.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 animate-fade-in">
      <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="text-3xl font-extrabold mb-6" style={{ color: "var(--fg)" }}>All Types Of QR Codes</h2>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Insert Type"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border shadow-sm outline-none transition-shadow focus:shadow-md"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--fg)" }}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-white text-sm font-bold" style={{ backgroundColor: "var(--accent)" }}>
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((t) => (
          <button
            key={t.id}
            onClick={() => handleSelect(t.id)}
            className="flex items-center gap-3 p-4 rounded-2xl border shadow-sm transition-all hover:-translate-y-1 hover:shadow-md text-left bg-white group"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--bg)" }}>
              <t.icon className="w-5 h-5" style={{ color: "var(--accent)" }} />
            </div>
            <span className="font-bold text-sm text-gray-800 flex-1 truncate">{t.label}</span>
            <span className="text-gray-300 group-hover:text-purple-500 transition-colors font-bold text-lg leading-none">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
