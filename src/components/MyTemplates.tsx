"use client";

import { useState, useEffect } from "react";
import { FolderHeart, Trash2, DownloadCloud, Plus } from "lucide-react";
import { QRStyleConfig } from "./StyleTab";

export interface SavedTemplate {
  id: string;
  name: string;
  date: string;
  config: QRStyleConfig;
  type: string;
}

interface MyTemplatesProps {
  currentConfig: QRStyleConfig;
  currentType: string;
  onLoad: (config: QRStyleConfig, type: string) => void;
}

export function MyTemplates({ currentConfig, currentType, onLoad }: MyTemplatesProps) {
  const [templates, setTemplates] = useState<SavedTemplate[]>([]);
  const [newTemplateName, setNewTemplateName] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dh_qr_templates");
      if (saved) {
        setTemplates(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Could not load templates", e);
    }
  }, []);

  const saveTemplate = () => {
    if (!newTemplateName.trim()) return;
    
    // Check if we have too many large logos
    const newTemplate: SavedTemplate = {
      id: Date.now().toString(),
      name: newTemplateName.trim(),
      date: new Date().toLocaleDateString(),
      config: currentConfig,
      type: currentType
    };

    try {
      const updated = [newTemplate, ...templates];
      localStorage.setItem("dh_qr_templates", JSON.stringify(updated));
      setTemplates(updated);
      setNewTemplateName("");
    } catch (e) {
      alert("Storage limit reached! Please delete some old templates, especially those with large logos.");
    }
  };

  const deleteTemplate = (id: string) => {
    const updated = templates.filter(t => t.id !== id);
    localStorage.setItem("dh_qr_templates", JSON.stringify(updated));
    setTemplates(updated);
  };

  return (
    <div className="card p-4 mt-4">
      <div className="flex items-center gap-1.5 mb-3" style={{ color: "var(--fg-muted)" }}>
        <FolderHeart className="w-3.5 h-3.5" />
        <span className="text-[10px] font-bold uppercase tracking-widest">My Saved Designs</span>
      </div>

      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={newTemplateName}
          onChange={(e) => setNewTemplateName(e.target.value)}
          placeholder="Name this design..." 
          className="dh-input flex-1 py-1.5 text-xs" 
          maxLength={30}
        />
        <button 
          onClick={saveTemplate}
          disabled={!newTemplateName.trim()}
          className="bg-[var(--accent)] text-white px-3 rounded-sm text-[10px] font-bold uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save
        </button>
      </div>

      {templates.length === 0 ? (
        <p className="text-xs text-center py-4 italic" style={{ color: "var(--fg-muted)" }}>No saved designs yet.</p>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
          {templates.map(t => (
            <div key={t.id} className="flex items-center justify-between p-2 rounded-sm border" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-semibold truncate" style={{ color: "var(--fg)" }}>{t.name}</span>
                <span className="text-[10px]" style={{ color: "var(--fg-muted)" }}>{t.date} • {t.type.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <button onClick={() => onLoad(t.config, t.type)} className="p-1.5 rounded transition-colors" style={{ color: "var(--accent)" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--border)"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"} title="Load Design">
                  <DownloadCloud className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => deleteTemplate(t.id)} className="p-1.5 rounded transition-colors" style={{ color: "#EF4444" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--border)"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"} title="Delete Design">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
