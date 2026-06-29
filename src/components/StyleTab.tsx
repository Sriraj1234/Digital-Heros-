"use client";

import { useCallback, useState } from "react";
import { Upload, X, Trash2 } from "lucide-react";
import { DHInput, DHSelect } from "./QRForms";
import { DotVisualizer, ExtEyeVisualizer, IntEyeVisualizer, FrameVisualizer } from "./VisualSelectors";
import { TEMPLATES } from "@/lib/templates";

// SVG Data URIs for preset logos
const PRESET_LOGOS = [
  { id: "facebook", name: "Facebook", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231877F2'%3E%3Cpath d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/%3E%3C/svg%3E" },
  { id: "x", name: "X", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23000000'%3E%3Cpath d='M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z'/%3E%3C/svg%3E" },
  { id: "linkedin", name: "LinkedIn", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230A66C2'%3E%3Cpath d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/%3E%3C/svg%3E" },
  { id: "tiktok", name: "TikTok", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FE2C55'%3E%3Cpath d='M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z'/%3E%3C/svg%3E" },
  { id: "vimeo", name: "Vimeo", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231AB7EA'%3E%3Cpath d='M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 12.5C4.603 9.916 3.834 8.622 3.01 8.622c-.179 0-.806.378-1.881 1.132L0 8.128c1.185-1.044 2.351-2.084 3.501-3.128C5.08 3.604 6.282 2.876 7.206 2.79c2.216-.212 3.582 1.299 4.09 4.531.55 3.485.933 5.653 1.149 6.507.639 2.906 1.34 4.356 2.108 4.356.599 0 1.497-.949 2.697-2.847 1.196-1.901 1.843-3.354 1.938-4.352.128-1.683-.475-2.528-1.816-2.528-.687 0-1.39.157-2.108.472 1.403-4.599 4.08-6.835 8.031-6.712z'/%3E%3C/svg%3E" },
  { id: "twitch", name: "Twitch", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239146FF'%3E%3Cpath d='M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z'/%3E%3C/svg%3E" },
  { id: "youtube", name: "YouTube", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF0000'%3E%3Cpath d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'/%3E%3C/svg%3E" },
  { id: "instagram", name: "Instagram", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E1306C'%3E%3Cpath d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'/%3E%3C/svg%3E" },
  { id: "whatsapp", name: "WhatsApp", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2325D366'%3E%3Cpath d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 2.115.553 4.14 1.603 5.943L.044 24l6.236-1.636c1.745.955 3.702 1.458 5.733 1.458 6.621 0 11.988-5.367 11.988-11.987S18.638 0 12.017 0zm6.541 17.135c-.276.783-1.603 1.503-2.228 1.554-.537.045-1.229.13-3.924-.986-3.238-1.341-5.321-4.636-5.485-4.856-.164-.22-1.309-1.741-1.309-3.32 0-1.579.824-2.361 1.119-2.673.295-.312.641-.392.853-.392.213 0 .426.002.617.011.196.01.464-.078.725.552.277.665.947 2.316 1.033 2.485.086.169.143.37.034.588-.109.22-.164.354-.328.544-.164.191-.345.419-.496.574-.165.166-.341.348-.152.675.188.327.839 1.39 1.802 2.247 1.242 1.106 2.277 1.45 2.6 1.605.323.155.514.129.712-.095.197-.224.846-1.028 1.074-1.382.228-.354.456-.296.75-.184.295.111 1.865.88 2.185 1.039.32.158.533.237.61.37.078.134.078.775-.198 1.558z'/%3E%3C/svg%3E" },
  { id: "telegram", name: "Telegram", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2326A5E4'%3E%3Cpath d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z'/%3E%3C/svg%3E" }
];

export interface QRStyleConfig {
  // Colors
  fgType: "solid" | "linear" | "radial";
  fgColor: string;
  fgColor2: string;
  gradientAngle: number;
  bgColor: string;
  bgImage: string | null;
  bgTransparent: boolean;
  
  // Shapes
  dotStyle: "square" | "dots" | "rounded" | "extra-rounded" | "classy" | "classy-rounded";
  eyeFrameStyle: "square" | "dot" | "extra-rounded" | "";
  eyeDotStyle: "square" | "dot" | "";
  eyeColor: string;
  
  // Logo
  logoDataUrl: string | null;
  logoMargin: number;
  logoSize: number;
  logoBg: boolean;
  blendLogo: boolean;
  
  // Frame & Text
  frameType: "none" | "standard" | "business" | "badge" | "minimal";
  frameColor: string;
  customText: string;
  textColor: string;
  fontFamily: string;
  
  // Effects & Settings
  level: "L" | "M" | "Q" | "H";
  includeMargin: boolean;
  size: number;
  qrShadow: boolean;
  qrGlassmorphism: boolean;
  
  // Advanced Graphic Frames
  graphicFrame: string | null;
}

export const DEFAULT_STYLE: QRStyleConfig = {
  fgType: "solid", fgColor: "#000000", fgColor2: "#9C3AAF", gradientAngle: 45, bgColor: "#FFFFFF", bgImage: null, bgTransparent: false,
  dotStyle: "square", eyeFrameStyle: "", eyeDotStyle: "", eyeColor: "#000000",
  logoDataUrl: null, logoMargin: 4, logoSize: 0.4, logoBg: false, blendLogo: true,
  frameType: "none", frameColor: "#9C3AAF", customText: "", textColor: "#9C3AAF", fontFamily: "Inter, sans-serif",
  level: "H", includeMargin: true, size: 512, qrShadow: false, qrGlassmorphism: false,
  graphicFrame: null,
};

interface StyleTabProps {
  config: QRStyleConfig;
  updateConfig: (updates: Partial<QRStyleConfig>) => void;
}

function ColorRow({ label, value, onChange }: { label?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      {label && <label className="text-xs font-bold block mb-1.5" style={{ color: "var(--fg-muted)" }}>{label}</label>}
      <div className="flex gap-2">
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-10 h-10 rounded-sm cursor-pointer border p-0.5"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
        />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="flex-1 rounded-sm border uppercase font-mono text-sm px-2 focus:outline-none transition-colors"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)", color: "var(--fg)" }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
          maxLength={7}
        />
      </div>
    </div>
  );
}

export function StyleTab({ config, updateConfig }: StyleTabProps) {
  const [activeTab, setActiveTab] = useState<"frames" | "shapes" | "logo" | "level" | "colors">("frames");

  const handleLogoUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = e => updateConfig({ logoDataUrl: e.target?.result as string });
    reader.readAsDataURL(file);
  }, [updateConfig]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleLogoUpload(file);
  }, [handleLogoUpload]);

  const tabs = [
    { id: "frames", label: "Frames" },
    { id: "shapes", label: "Shapes" },
    { id: "logo", label: "Logo" },
    { id: "colors", label: "Colors" },
    { id: "level", label: "Level" }
  ];

  return (
    <div className="flex flex-col h-full rounded-lg p-1" style={{ backgroundColor: "var(--bg)" }}>
      {/* Top Tabs */}
      <div className="flex gap-6 border-b pb-2 mb-5 px-2" style={{ borderColor: "var(--border)" }}>
        {tabs.map(t => (
          <button
             key={t.id}
             onClick={() => setActiveTab(t.id as any)}
             className="pb-2 text-[11px] font-bold uppercase tracking-wider transition-colors relative"
             style={{ color: activeTab === t.id ? "var(--accent)" : "var(--fg-muted)" }}
          >
             {t.label}
             {activeTab === t.id && (
                <span className="absolute bottom-[-9px] left-0 right-0 h-[3px] rounded-t-sm" style={{ backgroundColor: "var(--accent)" }} />
             )}
          </button>
        ))}
      </div>

      <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-3 custom-scrollbar px-2 pb-10">
        
        {/* FRAMES TAB */}
        {activeTab === "frames" && (
           <>
              {/* Pre-Made Templates */}
              <div className="rounded-xl p-5 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                 <h3 className="text-sm font-bold mb-1" style={{ color: "var(--fg)" }}>Pre-Made Templates</h3>
                 <p className="text-[11px] mb-4" style={{ color: "var(--fg-muted)" }}>Click to apply full style preset</p>
                 {(["Standard","Business","Social","Events","Holidays"] as const).map(cat => {
                   const catTemplates = TEMPLATES.filter(t => t.category === cat);
                   if (!catTemplates.length) return null;
                   return (
                     <div key={cat} className="mb-5">
                       <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--fg-muted)" }}>{cat}</p>
                       <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                         {cat === "Standard" && (
                           <button onClick={() => updateConfig({ graphicFrame: null })}
                             className="flex flex-col items-center gap-1.5 border rounded-xl p-2 transition-all hover:scale-105"
                             style={{ borderColor: !config.graphicFrame ? "var(--accent)" : "var(--border)", boxShadow: !config.graphicFrame ? "0 0 0 1px var(--accent)" : "none", backgroundColor: "var(--bg)" }}>
                             <div className="w-full aspect-square flex items-center justify-center rounded-lg" style={{ backgroundColor: "var(--bg-card)" }}>
                               <X className="w-6 h-6 stroke-1" style={{ color: "var(--fg-muted)" }} />
                             </div>
                             <span className="text-[9px] font-semibold" style={{ color: "var(--fg-muted)" }}>None</span>
                           </button>
                         )}
                         {catTemplates.map(t => (
                           <button key={t.id}
                             onClick={() => { const fn = (window as any).__qrStudioLoad; if (fn) fn({ type: t.qrType, fgColor: t.fgColor, bgColor: t.bgColor, graphicFrame: t.graphicFrame, dotStyle: t.dotStyle, eyeFrameStyle: t.eyeFrameStyle, values: t.defaultValues }); }}
                             className="flex flex-col items-center gap-1.5 border rounded-xl p-2 transition-all hover:scale-105 overflow-hidden"
                             style={{ borderColor: config.graphicFrame === t.graphicFrame && config.graphicFrame !== null ? "var(--accent)" : "var(--border)", boxShadow: config.graphicFrame === t.graphicFrame && config.graphicFrame !== null ? "0 0 0 1px var(--accent)" : "none", backgroundColor: "var(--bg)" }}
                             title={t.name}>
                             <div className="w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center" style={{ backgroundColor: t.bgColor }}>
                               {t.graphicFrame
                                 ? <img src={t.graphicFrame} alt={t.name} className="w-full h-full object-cover" />
                                 : <div className="w-8 h-8 rounded" style={{ backgroundColor: t.fgColor, opacity: 0.8 }} />}
                             </div>
                             <span className="text-[9px] font-semibold text-center leading-tight" style={{ color: "var(--fg)" }}>{t.name}</span>
                           </button>
                         ))}
                       </div>
                     </div>
                   );
                 })}
              </div>

              {/* Standard Frames */}
              <div className="rounded-xl p-5 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Frames</h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {["none", "standard", "business", "badge", "minimal"].map(type => (
                      <button
                        key={type}
                        onClick={() => updateConfig({ frameType: type as any, graphicFrame: null })}
                        className="aspect-square flex flex-col items-center justify-center gap-1 border rounded-lg transition-all hover:scale-105"
                        style={{ 
                           borderColor: config.frameType === type && !config.graphicFrame ? "var(--accent)" : "var(--border)",
                           boxShadow: config.frameType === type && !config.graphicFrame ? "0 0 0 1px var(--accent)" : "none",
                           backgroundColor: "var(--bg)"
                        }}
                      >
                        {type === "none" ? <X className="w-8 h-8 stroke-1" style={{ color: "var(--fg-muted)" }} /> : <FrameVisualizer type={type} color="var(--accent)" />}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Frame Background */}
              <div className="rounded-xl p-5 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Frame Background</h3>
                 <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="w-full sm:w-48">
                       <ColorRow label="Background Color" value={config.frameColor} onChange={v => updateConfig({ frameColor: v })} />
                    </div>
                    <div className="flex items-center gap-2 mt-4 sm:mt-0 pt-2 sm:pt-6">
                      <input type="checkbox" id="bgTransparent" checked={!!config.bgTransparent} onChange={e => updateConfig({ bgTransparent: e.target.checked })} className="w-4 h-4 rounded cursor-pointer" style={{ accentColor: "var(--accent)" }} />
                      <label htmlFor="bgTransparent" className="text-sm font-medium cursor-pointer" style={{ color: "var(--fg)" }}>Transparent Background</label>
                    </div>
                 </div>
              </div>

              {/* Additional Text */}
              <div className="rounded-xl p-5 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Additional Text</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <DHInput label="Additional Text" value={config.customText} onChange={e => updateConfig({ customText: e.target.value })} placeholder="Scan Me" />
                    <DHSelect label="Font" value={config.fontFamily} onChange={e => updateConfig({ fontFamily: e.target.value })}>
                       <option value="Inter, sans-serif">Roboto</option>
                       <option value="system-ui, sans-serif">System UI</option>
                       <option value="monospace">Monospace</option>
                    </DHSelect>
                    <ColorRow label="Text Color" value={config.textColor} onChange={v => updateConfig({ textColor: v })} />
                 </div>
              </div>
           </>
        )}
        
        {/* SHAPES TAB */}
        {activeTab === "shapes" && (
           <div className="rounded-xl p-5 border space-y-8" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div>
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Body Shape</h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {["square", "rounded", "extra-rounded", "dots", "classy", "classy-rounded"].map(type => (
                       <button 
                         key={type} 
                         onClick={() => updateConfig({ dotStyle: type as any })} 
                         className="aspect-square flex items-center justify-center border rounded-lg transition-all hover:scale-105"
                         style={{ 
                            borderColor: config.dotStyle === type ? "var(--accent)" : "var(--border)",
                            boxShadow: config.dotStyle === type ? "0 0 0 1px var(--accent)" : "none",
                            backgroundColor: "var(--bg)"
                         }}
                       >
                          <DotVisualizer type={type} />
                       </button>
                    ))}
                 </div>
              </div>
              
              <div>
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Eye Frame</h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {["", "square", "dot", "extra-rounded"].map(type => (
                       <button 
                         key={type} 
                         onClick={() => updateConfig({ eyeFrameStyle: type as any })} 
                         className="aspect-square flex items-center justify-center border rounded-lg transition-all hover:scale-105"
                         style={{ 
                            borderColor: config.eyeFrameStyle === type ? "var(--accent)" : "var(--border)",
                            boxShadow: config.eyeFrameStyle === type ? "0 0 0 1px var(--accent)" : "none",
                            backgroundColor: "var(--bg)"
                         }}
                       >
                          <ExtEyeVisualizer type={type} />
                       </button>
                    ))}
                 </div>
              </div>

              <div>
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Eye Dot</h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {["", "square", "dot"].map(type => (
                       <button 
                         key={type} 
                         onClick={() => updateConfig({ eyeDotStyle: type as any })} 
                         className="aspect-square flex items-center justify-center border rounded-lg transition-all hover:scale-105"
                         style={{ 
                            borderColor: config.eyeDotStyle === type ? "var(--accent)" : "var(--border)",
                            boxShadow: config.eyeDotStyle === type ? "0 0 0 1px var(--accent)" : "none",
                            backgroundColor: "var(--bg)"
                         }}
                       >
                          <IntEyeVisualizer type={type} />
                       </button>
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* LOGO TAB */}
        {activeTab === "logo" && (
           <div className="rounded-xl p-5 border space-y-8" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
             <div>
                <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Preset Logos</h3>
                <div className="flex flex-wrap gap-3">
                   {PRESET_LOGOS.map(logo => (
                      <button
                        key={logo.id}
                        onClick={() => updateConfig({ logoDataUrl: logo.icon })}
                        className="w-12 h-12 rounded-lg flex items-center justify-center hover:scale-105 transition-transform border"
                        style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
                        title={logo.name}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={logo.icon} className="w-7 h-7 object-contain" />
                      </button>
                   ))}
                </div>
             </div>

             {config.logoDataUrl ? (
               <div className="flex items-center gap-4 p-4 rounded-lg border" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}>
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={config.logoDataUrl} alt="Logo" className="w-12 h-12 object-contain rounded" />
                 <span className="text-sm font-medium flex-1" style={{ color: "var(--fg)" }}>Logo embedded</span>
                 <button onClick={() => updateConfig({ logoDataUrl: null })} className="p-2 rounded transition-colors" style={{ color: "var(--fg-muted)" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--border)"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
                   <Trash2 className="w-5 h-5" style={{ color: "#EF4444" }} />
                 </button>
               </div>
             ) : (
               <div
                 onDrop={handleDrop}
                 onDragOver={e => e.preventDefault()}
                 className="flex flex-col items-center justify-center gap-3 py-10 rounded-xl border-2 border-dashed cursor-pointer transition-colors"
                 style={{ borderColor: "var(--border-strong)", backgroundColor: "color-mix(in srgb, var(--accent) 5%, transparent)" }}
               >
                 <Upload className="w-8 h-8" style={{ color: "var(--accent)" }} />
                 <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>Drag & drop logo</span>
                 <label className="cursor-pointer text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                   Browse computer
                   <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleLogoUpload(f); }} />
                 </label>
               </div>
             )}

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                <div>
                  <label className="text-xs font-bold block mb-3 uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>Logo Size: <span style={{ color: "var(--fg)" }}>{Math.round(config.logoSize * 100)}%</span></label>
                  <input type="range" min={0.1} max={0.6} step={0.05} value={config.logoSize} onChange={e => updateConfig({ logoSize: Number(e.target.value) })} className="w-full h-2 rounded-full appearance-none cursor-pointer" style={{ backgroundColor: "var(--border)", accentColor: "var(--accent)" }} />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-3 uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>Logo Margin: <span style={{ color: "var(--fg)" }}>{config.logoMargin}px</span></label>
                  <input type="range" min={0} max={20} step={1} value={config.logoMargin} onChange={e => updateConfig({ logoMargin: Number(e.target.value) })} className="w-full h-2 rounded-full appearance-none cursor-pointer" style={{ backgroundColor: "var(--border)", accentColor: "var(--accent)" }} />
                </div>
             </div>

             <div className="flex flex-col gap-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
               <div className="flex items-center gap-3">
                 <input type="checkbox" id="logoBg" checked={!!config.logoBg} onChange={e => updateConfig({ logoBg: e.target.checked })} disabled={!!config.blendLogo} className="w-4 h-4 rounded cursor-pointer disabled:opacity-50" style={{ accentColor: "var(--accent)" }} />
                 <label htmlFor="logoBg" className={`text-sm font-medium cursor-pointer`} style={{ color: config.blendLogo ? "var(--fg-muted)" : "var(--fg)" }}>Remove QR dots behind logo</label>
               </div>
               <div className="flex items-center gap-3">
                 <input type="checkbox" id="blendLogo" checked={!!config.blendLogo} onChange={e => updateConfig({ blendLogo: e.target.checked })} className="w-4 h-4 rounded cursor-pointer" style={{ accentColor: "var(--accent)" }} />
                 <label htmlFor="blendLogo" className="text-sm font-medium cursor-pointer" style={{ color: "var(--fg)" }}>Blend Logo into Dots (Better Scanning)</label>
               </div>
             </div>
           </div>
        )}

        {/* COLORS TAB */}
        {activeTab === "colors" && (
           <div className="rounded-xl p-5 border space-y-6" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
             <div className="flex border p-1 rounded-lg mb-4" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}>
                {[
                   { id: "solid", label: "Solid Color" },
                   { id: "linear", label: "Linear Gradient" },
                   { id: "radial", label: "Radial Gradient" }
                ].map(t => (
                   <button
                      key={t.id}
                      onClick={() => updateConfig({ fgType: t.id as any })}
                      className="flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors"
                      style={{ 
                         backgroundColor: config.fgType === t.id ? "var(--bg-card)" : "transparent",
                         color: config.fgType === t.id ? "var(--accent)" : "var(--fg-muted)",
                         boxShadow: config.fgType === t.id ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                      }}
                   >
                      {t.label}
                   </button>
                ))}
             </div>

             {/* Quick Color Swatches */}
             <div>
               <label className="text-xs font-bold block mb-2 uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>Quick Swatches</label>
               <div className="flex flex-wrap gap-2">
                 {["#000000","#FFFFFF","#9C3AAF","#1A237E","#E74C3C","#FF8F00","#1B5E20","#006064","#FE2C55","#FF0000"].map(c => (
                   <button key={c} onClick={() => updateConfig({ fgColor: c })} title={c}
                     className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                     style={{ backgroundColor: c, borderColor: config.fgColor === c ? "var(--accent)" : "var(--border)", boxShadow: config.fgColor === c ? "0 0 0 2px var(--accent)" : "none" }} />
                 ))}
               </div>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <ColorRow label={config.fgType === "solid" ? "QR Color" : "Gradient Start"} value={config.fgColor} onChange={v => updateConfig({ fgColor: v })} />
               {config.fgType !== "solid" && (
                 <ColorRow label="Gradient End" value={config.fgColor2} onChange={v => updateConfig({ fgColor2: v })} />
               )}
               <ColorRow label="QR Background" value={config.bgColor} onChange={v => updateConfig({ bgColor: v })} />
               <ColorRow label="Eye Color" value={config.eyeColor} onChange={v => updateConfig({ eyeColor: v })} />
             </div>
             {config.fgType !== "solid" && (
               <div>
                 <label className="text-xs font-bold block mb-2 uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>Gradient Angle: <span style={{ color: "var(--fg)" }}>{config.gradientAngle}°</span></label>
                 <input type="range" min={0} max={360} step={15} value={config.gradientAngle} onChange={e => updateConfig({ gradientAngle: Number(e.target.value) })} className="w-full h-2 rounded-full appearance-none cursor-pointer" style={{ backgroundColor: "var(--border)", accentColor: "var(--accent)" }} />
               </div>
             )}

             <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" id="bgTransparentColor" checked={!!config.bgTransparent} onChange={e => updateConfig({ bgTransparent: e.target.checked })} className="w-4 h-4 rounded cursor-pointer" style={{ accentColor: "var(--accent)" }} />
                <label htmlFor="bgTransparentColor" className="text-sm font-medium cursor-pointer" style={{ color: "var(--fg)" }}>Transparent Background</label>
             </div>
           </div>
        )}

        {/* LEVEL TAB */}
        {activeTab === "level" && (
           <div className="rounded-xl p-5 border space-y-6" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
             <div>
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Error Correction Level</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: "L", label: "Low (7%)", desc: "Cleanest look, best for minimal designs without logos" },
                      { id: "M", label: "Medium (15%)", desc: "Standard scannability for most use cases" },
                      { id: "Q", label: "Quartile (25%)", desc: "High reliability, good for small logos" },
                      { id: "H", label: "High (30%)", desc: "Recommended for large logos & complex backgrounds" },
                    ].map(lvl => (
                       <button
                          key={lvl.id}
                          onClick={() => updateConfig({ level: lvl.id as any })}
                          className="flex flex-col items-start text-left p-4 border rounded-xl transition-all hover:scale-[1.02]"
                          style={{ 
                             borderColor: config.level === lvl.id ? "var(--accent)" : "var(--border)",
                             backgroundColor: config.level === lvl.id ? "color-mix(in srgb, var(--accent) 5%, transparent)" : "var(--bg)",
                             boxShadow: config.level === lvl.id ? "0 0 0 1px var(--accent)" : "none"
                          }}
                       >
                          <span className="font-bold text-sm" style={{ color: config.level === lvl.id ? "var(--accent)" : "var(--fg)" }}>{lvl.label}</span>
                          <span className="text-xs mt-1" style={{ color: "var(--fg-muted)" }}>{lvl.desc}</span>
                       </button>
                    ))}
                 </div>
             </div>
           </div>
        )}

      </div>
    </div>
  );
}
