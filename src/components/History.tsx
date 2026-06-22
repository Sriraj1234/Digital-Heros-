"use client";

import { useState, useEffect } from "react";
import { getHistory, deleteFromHistory, clearHistory, toggleFavorite, QRRecord } from "@/lib/storage";
import { Clock, Trash2, ExternalLink, Star } from "lucide-react";

export default function History() {
  const [records, setRecords] = useState<QRRecord[]>([]);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"recent" | "favorites">("recent");

  useEffect(() => {
    setMounted(true);
    setRecords(getHistory());
  }, []);

  if (!mounted || records.length === 0) return null;

  const handleDelete = (id: string) => {
    deleteFromHistory(id);
    setRecords(getHistory());
  };

  const handleClearAll = () => {
    clearHistory();
    setRecords(getHistory());
  };
  
  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
    setRecords(getHistory());
  };

  const handleReopen = (r: QRRecord) => {
    const fn = (window as any).__qrStudioLoad;
    // Map history to default value structure
    const values: any = {};
    if (r.type === "url" || r.type === "maps" || r.type === "zoom" || r.type === "meet" || r.type === "youtube" || r.type === "instagram") values.url = r.value;
    else if (r.type === "text" || r.type === "custom_data") values.text = r.value;
    else values[r.type] = r.value;

    if (fn) fn({ type: r.type, fgColor: r.fgColor, bgColor: r.bgColor, values });
  };

  const displayedRecords = activeTab === "favorites" ? records.filter(r => r.isFavorite) : records;

  return (
    <section className="py-16" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: "var(--accent)" }} />
              <h2 className="text-xl font-bold" style={{ color: "var(--fg)" }}>Library</h2>
            </div>
            
            <div className="flex gap-1 p-1 rounded-sm" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
               <button
                  onClick={() => setActiveTab("recent")}
                  className="px-3 py-1 text-xs font-semibold rounded-sm transition-colors"
                  style={activeTab === "recent" ? { backgroundColor: "var(--accent)", color: "var(--accent-text)" } : { color: "var(--fg-muted)" }}
               >
                  Recent
               </button>
               <button
                  onClick={() => setActiveTab("favorites")}
                  className="px-3 py-1 text-xs font-semibold rounded-sm transition-colors"
                  style={activeTab === "favorites" ? { backgroundColor: "var(--accent)", color: "var(--accent-text)" } : { color: "var(--fg-muted)" }}
               >
                  Favorites
               </button>
            </div>
          </div>
          
          <button
            onClick={handleClearAll}
            className="text-xs font-medium flex items-center gap-1.5 transition-colors"
            style={{ color: "var(--fg-muted)" }}
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Unsaved
          </button>
        </div>

        {displayedRecords.length === 0 ? (
           <div className="text-sm py-10 text-center" style={{ color: "var(--fg-muted)", border: "1px dashed var(--border-strong)" }}>
             No {activeTab} QR codes found in your browser storage.
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {displayedRecords.slice(0, 16).map(r => (
              <div key={r.id} className="card p-4 flex flex-col gap-3 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                   <button onClick={() => handleToggleFavorite(r.id)} style={{ color: r.isFavorite ? "var(--accent)" : "var(--fg-muted)" }}>
                     <Star className="w-4 h-4 hover:scale-110 transition-transform" fill={r.isFavorite ? "currentColor" : "none"} />
                   </button>
                   <button onClick={() => handleDelete(r.id)} style={{ color: "var(--fg-muted)" }}>
                     <Trash2 className="w-4 h-4 hover:opacity-60 transition-opacity" />
                   </button>
                </div>
                
                <div className="flex items-start justify-between">
                  <span className="label-xs">{r.label}</span>
                </div>
                <div className="text-xs truncate font-mono" style={{ color: "var(--fg-muted)" }} title={r.value}>
                  {r.value}
                </div>
                
                <div className="mt-2 flex items-center gap-2">
                   <div className="w-4 h-4 rounded-full border border-[var(--border)] shadow-sm" style={{ backgroundColor: r.fgColor }} />
                   <div className="w-4 h-4 rounded-full border border-[var(--border)] shadow-sm -ml-3" style={{ backgroundColor: r.bgColor }} />
                </div>
                
                <button
                  onClick={() => handleReopen(r)}
                  className="text-xs font-semibold flex items-center gap-1 transition-colors mt-1"
                  style={{ color: "var(--accent)" }}
                >
                  <ExternalLink className="w-3 h-3" /> Open in Studio
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
