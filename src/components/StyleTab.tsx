"use client";

import { useCallback, useState } from "react";
import { Upload, X, Type, LayoutTemplate, Palette, Image as ImageIcon, Box, Sparkles, Trash2 } from "lucide-react";
import { DHInput, DHSelect } from "./QRForms";
import { DotVisualizer, ExtEyeVisualizer, IntEyeVisualizer, FrameVisualizer } from "./VisualSelectors";
import { TEMPLATES } from "@/lib/templates";

// SVG Data URIs for preset logos
const PRESET_LOGOS = [
  { id: "whatsapp", name: "WhatsApp", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2325D366'%3E%3Cpath d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.299-.018-.461.13-.611.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'/%3E%3C/svg%3E" },
  { id: "youtube", name: "YouTube", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF0000'%3E%3Cpath d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'/%3E%3C/svg%3E" },
  { id: "instagram", name: "Instagram", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='url(%23ig)'%3E%3Cdefs%3E%3ClinearGradient id='ig' x1='0%25' y1='100%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23FFDC80'/%3E%3Cstop offset='50%25' stop-color='%23F56040'/%3E%3Cstop offset='100%25' stop-color='%23833AB4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'/%3E%3C/svg%3E" },
  { id: "facebook", name: "Facebook", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231877F2'%3E%3Cpath d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/%3E%3C/svg%3E" },
  { id: "x", name: "X", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000000'%3E%3Cpath d='M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z'/%3E%3C/svg%3E" },
  { id: "linkedin", name: "LinkedIn", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230A66C2'%3E%3Cpath d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/%3E%3C/svg%3E" },
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
}

export const DEFAULT_STYLE: QRStyleConfig = {
  fgType: "solid", fgColor: "#000000", fgColor2: "#E63946", gradientAngle: 45, bgColor: "#FFFFFF", bgImage: null, bgTransparent: false,
  dotStyle: "square", eyeFrameStyle: "", eyeDotStyle: "", eyeColor: "#000000",
  logoDataUrl: null, logoMargin: 4, logoSize: 0.4, logoBg: false, blendLogo: true,
  frameType: "none", frameColor: "#000000", customText: "", textColor: "#FFFFFF", fontFamily: "Inter, sans-serif",
  level: "H", includeMargin: true, size: 512, qrShadow: false, qrGlassmorphism: false,
};

interface StyleTabProps {
  config: QRStyleConfig;
  updateConfig: (updates: Partial<QRStyleConfig>) => void;
}

function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="label-xs block mb-1.5">{label}</label>
      <div className="flex gap-2">
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-10 h-10 rounded-sm cursor-pointer border p-0.5"
          style={{ borderColor: "var(--border-strong)", backgroundColor: "var(--input-bg)" }}
        />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="dh-input flex-1 uppercase font-mono text-sm"
          maxLength={7}
        />
      </div>
    </div>
  );
}

export function StyleTab({ config, updateConfig }: StyleTabProps) {
  const [activeSection, setActiveSection] = useState<"templates" | "colors" | "shapes" | "logo" | "frames" | "effects" | "export">("templates");
  const [activeShapeTab, setActiveShapeTab] = useState<"body" | "eye-ext" | "eye-int">("body");

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

  const setBrandPreset = (color1: string, color2: string, gradient: boolean = false) => {
    if (gradient) {
       updateConfig({ fgType: "linear", fgColor: color1, fgColor2: color2, gradientAngle: 45 });
    } else {
       updateConfig({ fgType: "solid", fgColor: color1, fgColor2: color2 });
    }
  };

  const sections = [
    { id: "templates", label: "Templates", icon: Sparkles },
    { id: "colors", label: "Colors", icon: Palette },
    { id: "shapes", label: "Shapes", icon: Box },
    { id: "logo", label: "Logo", icon: ImageIcon },
    { id: "frames", label: "Frames", icon: LayoutTemplate },
    { id: "effects", label: "Effects", icon: Type },
    { id: "export", label: "Settings", icon: Box },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Sub-navigation */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-4 border-b hide-scrollbar" style={{ borderColor: "var(--border)" }}>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id as any)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap transition-colors"
            style={activeSection === s.id 
              ? { backgroundColor: "var(--fg)", color: "var(--bg)" }
              : { backgroundColor: "var(--bg-card)", color: "var(--fg-muted)", border: "1px solid var(--border)" }}
          >
            <s.icon className="w-3 h-3" />
            {s.label}
          </button>
        ))}
      </div>

      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        
        {/* TEMPLATES */}
        {activeSection === "templates" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-2 gap-3">
               {TEMPLATES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                       const fn = (window as any).__qrStudioLoad;
                       if (fn) fn({ type: t.qrType, fgColor: t.fgColor, bgColor: t.bgColor, values: t.defaultValues });
                    }}
                    className="card card-hover flex flex-col items-center justify-center p-4 text-center gap-2 border"
                    style={{ borderColor: "var(--border)" }}
                  >
                     <span className="text-2xl">{t.icon}</span>
                     <span className="text-xs font-semibold" style={{ color: "var(--fg)" }}>{t.name}</span>
                  </button>
               ))}
            </div>
          </div>
        )}

        {/* COLORS */}
        {activeSection === "colors" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex bg-[var(--bg-card)] border p-1 rounded mb-4" style={{ borderColor: "var(--border)" }}>
               {[
                  { id: "solid", label: "Solid" },
                  { id: "linear", label: "Linear" },
                  { id: "radial", label: "Radial" }
               ].map(t => (
                  <button
                     key={t.id}
                     onClick={() => updateConfig({ fgType: t.id as any })}
                     className={`flex-1 py-1.5 text-[11px] font-semibold rounded transition-colors ${config.fgType === t.id ? 'bg-[var(--bg)] shadow-sm text-[var(--fg)]' : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'}`}
                  >
                     {t.label}
                  </button>
               ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ColorRow label={config.fgType === "solid" ? "QR Color" : "Gradient Start"} value={config.fgColor} onChange={v => updateConfig({ fgColor: v })} />
              {config.fgType !== "solid" && (
                <ColorRow label="Gradient End" value={config.fgColor2} onChange={v => updateConfig({ fgColor2: v })} />
              )}
              <ColorRow label="Background Color" value={config.bgColor} onChange={v => updateConfig({ bgColor: v })} />
            </div>

            <div className="flex items-center gap-2 -mt-2">
               <input type="checkbox" id="bgTransparent" checked={!!config.bgTransparent} onChange={e => updateConfig({ bgTransparent: e.target.checked })} className="w-4 h-4" style={{ accentColor: "var(--accent)" }} />
               <label htmlFor="bgTransparent" className="text-sm font-semibold" style={{ color: "var(--fg)" }}>Transparent Background</label>
            </div>

            {config.fgType === "linear" && (
              <div>
                <label className="label-xs block mb-1.5">Gradient Angle: <span style={{ color: "var(--fg)" }}>{config.gradientAngle}°</span></label>
                <input type="range" min={0} max={360} value={config.gradientAngle} onChange={e => updateConfig({ gradientAngle: Number(e.target.value) })} className="w-full h-1.5 rounded-full appearance-none cursor-pointer" style={{ accentColor: "var(--accent)", backgroundColor: "var(--border-strong)" }} />
              </div>
            )}

            <div>
               <label className="label-xs block mb-1.5 mt-4">Background Image</label>
               {config.bgImage ? (
                  <div className="flex items-center gap-3 p-3 rounded-sm border" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={config.bgImage} className="w-10 h-10 object-cover rounded" />
                    <span className="text-sm flex-1" style={{ color: "var(--fg-muted)" }}>Image applied</span>
                    <button onClick={() => updateConfig({ bgImage: null })} className="p-1 rounded hover:opacity-70 text-red-500">
                       <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
               ) : (
                  <label className="flex flex-col items-center gap-2 p-4 rounded-sm border-2 border-dashed cursor-pointer hover:bg-[var(--bg-card)] transition-colors" style={{ borderColor: "var(--border-strong)" }}>
                     <ImageIcon className="w-5 h-5 text-gray-400" />
                     <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>Upload Background Image</span>
                     <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload=ev=>updateConfig({bgImage: ev.target?.result as string}); r.readAsDataURL(f); } }} />
                  </label>
               )}
            </div>

            <div>
              <label className="label-xs block mb-2 mt-4">Brand Presets</label>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setBrandPreset("#FF0000", "#FF0000")} className="w-8 h-8 rounded-full bg-[#FF0000] border-2 border-transparent hover:scale-110 transition-transform" title="YouTube" />
                <button onClick={() => setBrandPreset("#1DB954", "#1DB954")} className="w-8 h-8 rounded-full bg-[#1DB954] border-2 border-transparent hover:scale-110 transition-transform" title="Spotify" />
                <button onClick={() => setBrandPreset("#0A66C2", "#0A66C2")} className="w-8 h-8 rounded-full bg-[#0A66C2] border-2 border-transparent hover:scale-110 transition-transform" title="LinkedIn" />
                <button onClick={() => setBrandPreset("#25D366", "#25D366")} className="w-8 h-8 rounded-full bg-[#25D366] border-2 border-transparent hover:scale-110 transition-transform" title="WhatsApp" />
                <button onClick={() => setBrandPreset("#833AB4", "#FD1D1D", true)} className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F56040] border-2 border-transparent hover:scale-110 transition-transform" title="Instagram" />
                <button onClick={() => setBrandPreset("#000000", "#000000")} className="w-8 h-8 rounded-full bg-black border border-gray-600 hover:scale-110 transition-transform" title="Dark" />
              </div>
            </div>
          </div>
        )}

        {/* SHAPES */}
        {activeSection === "shapes" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
             {/* Sub-tabs for Shapes */}
             <div className="flex gap-2 border-b hide-scrollbar overflow-x-auto pb-2" style={{ borderColor: "var(--border)" }}>
               {[
                 { id: "body", label: "Body" },
                 { id: "eye-ext", label: "External Eye" },
                 { id: "eye-int", label: "Internal Eye" },
                 { id: "level", label: "Scannability Level" }
               ].map(tab => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveShapeTab(tab.id as any)}
                   className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors`}
                   style={activeShapeTab === tab.id ? { backgroundColor: "var(--accent)", color: "white" } : { backgroundColor: "var(--bg-card)", color: "var(--fg-muted)" }}
                 >
                   {tab.label}
                 </button>
               ))}
             </div>

             {/* Grids */}
             {activeShapeTab === "body" && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                   {["square", "rounded", "extra-rounded", "dots", "classy", "classy-rounded"].map(type => (
                      <button
                         key={type}
                         onClick={() => updateConfig({ dotStyle: type as any })}
                         className={`aspect-square flex items-center justify-center border rounded transition-all hover:scale-105 ${config.dotStyle === type ? 'ring-2 ring-[var(--accent)] border-transparent' : ''}`}
                         style={{ borderColor: config.dotStyle === type ? "transparent" : "var(--border)", backgroundColor: "var(--bg-card)" }}
                         title={type}
                      >
                         <DotVisualizer type={type} />
                      </button>
                   ))}
                </div>
             )}

             {activeShapeTab === "eye-ext" && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                   {["", "square", "dot", "extra-rounded"].map(type => (
                      <button
                         key={type}
                         onClick={() => updateConfig({ eyeFrameStyle: type as any })}
                         className={`aspect-square flex flex-col items-center justify-center gap-1 border rounded transition-all hover:scale-105 ${config.eyeFrameStyle === type ? 'ring-2 ring-[var(--accent)] border-transparent' : ''}`}
                         style={{ borderColor: config.eyeFrameStyle === type ? "transparent" : "var(--border)", backgroundColor: "var(--bg-card)" }}
                         title={type || "Default"}
                      >
                         <ExtEyeVisualizer type={type} />
                      </button>
                   ))}
                </div>
             )}

             {activeShapeTab === "eye-int" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                     {["", "square", "dot"].map(type => (
                        <button
                           key={type}
                           onClick={() => updateConfig({ eyeDotStyle: type as any })}
                           className={`aspect-square flex flex-col items-center justify-center gap-1 border rounded transition-all hover:scale-105 ${config.eyeDotStyle === type ? 'ring-2 ring-[var(--accent)] border-transparent' : ''}`}
                           style={{ borderColor: config.eyeDotStyle === type ? "transparent" : "var(--border)", backgroundColor: "var(--bg-card)" }}
                           title={type || "Default"}
                        >
                           <IntEyeVisualizer type={type} />
                        </button>
                     ))}
                  </div>
                  <ColorRow label="Custom Eye Color (Optional)" value={config.eyeColor} onChange={v => updateConfig({ eyeColor: v })} />
                </div>
             )}

             {activeShapeTab === "level" && (
                <div className="grid grid-cols-2 gap-3">
                   {[
                     { id: "L", label: "Low (7%)", desc: "Best for simple minimal designs without logos" },
                     { id: "M", label: "Medium (15%)", desc: "Standard scannability" },
                     { id: "Q", label: "Quartile (25%)", desc: "High reliability" },
                     { id: "H", label: "High (30%)", desc: "Recommended for large logos & background images" },
                   ].map(lvl => (
                      <button
                         key={lvl.id}
                         onClick={() => updateConfig({ level: lvl.id as any })}
                         className={`flex flex-col items-start text-left p-3 border rounded transition-all hover:scale-105 ${config.level === lvl.id ? 'ring-2 ring-[var(--accent)] border-transparent' : ''}`}
                         style={{ borderColor: config.level === lvl.id ? "transparent" : "var(--border)", backgroundColor: "var(--bg-card)" }}
                      >
                         <span className="font-bold text-sm" style={{ color: "var(--fg)" }}>{lvl.label}</span>
                         <span className="text-[10px] mt-1" style={{ color: "var(--fg-muted)" }}>{lvl.desc}</span>
                      </button>
                   ))}
                </div>
             )}
          </div>
        )}

        {/* LOGO */}
        {activeSection === "logo" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
               <label className="label-xs block mb-1.5">Preset Logos</label>
               <div className="flex flex-wrap gap-2 mb-2">
                  {PRESET_LOGOS.map(logo => (
                     <button
                       key={logo.id}
                       onClick={() => updateConfig({ logoDataUrl: logo.icon })}
                       className="w-10 h-10 rounded bg-white flex items-center justify-center hover:scale-105 transition-transform shadow-sm border border-gray-200"
                       title={logo.name}
                     >
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={logo.icon} className="w-6 h-6 object-contain" />
                     </button>
                  ))}
               </div>
            </div>

            {config.logoDataUrl ? (
              <div className="flex items-center gap-3 p-3 rounded-sm" style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-card)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={config.logoDataUrl} alt="Logo" className="w-10 h-10 object-contain rounded" />
                <span className="text-sm flex-1" style={{ color: "var(--fg-muted)" }}>Logo embedded</span>
                <button onClick={() => updateConfig({ logoDataUrl: null })} className="p-1 rounded hover:opacity-70" style={{ color: "var(--fg-muted)" }}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                className="flex flex-col items-center gap-2 p-6 rounded-sm border-2 border-dashed cursor-pointer hover:bg-[var(--bg-card)] transition-colors"
                style={{ borderColor: "var(--border-strong)" }}
              >
                <Upload className="w-6 h-6" style={{ color: "var(--fg-muted)" }} />
                <span className="text-sm" style={{ color: "var(--fg-muted)" }}>Drag & drop logo</span>
                <label className="cursor-pointer text-xs font-semibold" style={{ color: "var(--accent)" }}>
                  Browse computer
                  <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleLogoUpload(f); }} />
                </label>
              </div>
            )}

            <div>
              <label className="label-xs block mb-1.5">Logo Size: <span style={{ color: "var(--fg)" }}>{Math.round(config.logoSize * 100)}%</span></label>
              <input type="range" min={0.1} max={0.6} step={0.05} value={config.logoSize} onChange={e => updateConfig({ logoSize: Number(e.target.value) })} className="w-full h-1.5 rounded-full appearance-none cursor-pointer" style={{ accentColor: "var(--accent)", backgroundColor: "var(--border-strong)" }} />
            </div>
            
            <div>
              <label className="label-xs block mb-1.5">Logo Margin: <span style={{ color: "var(--fg)" }}>{config.logoMargin}px</span></label>
              <input type="range" min={0} max={20} step={1} value={config.logoMargin} onChange={e => updateConfig({ logoMargin: Number(e.target.value) })} className="w-full h-1.5 rounded-full appearance-none cursor-pointer" style={{ accentColor: "var(--accent)", backgroundColor: "var(--border-strong)" }} />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="logoBg" checked={!!config.logoBg} onChange={e => updateConfig({ logoBg: e.target.checked })} disabled={!!config.blendLogo} className="w-4 h-4 disabled:opacity-50" style={{ accentColor: "var(--accent)" }} />
                <label htmlFor="logoBg" className={`text-sm ${config.blendLogo ? 'opacity-50' : ''}`} style={{ color: "var(--fg-muted)" }}>Remove QR dots behind logo</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="blendLogo" checked={!!config.blendLogo} onChange={e => updateConfig({ blendLogo: e.target.checked })} className="w-4 h-4" style={{ accentColor: "var(--accent)" }} />
                <label htmlFor="blendLogo" className="text-sm font-semibold" style={{ color: "var(--fg)" }}>Blend Logo into Dots (Better Scanning)</label>
              </div>
            </div>
          </div>
        )}

        {/* FRAMES */}
        {activeSection === "frames" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <label className="label-xs block mb-1.5">Frame Style</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
               {["none", "standard", "business", "badge", "minimal"].map(type => (
                 <button
                   key={type}
                   onClick={() => updateConfig({ frameType: type as any })}
                   className={`flex flex-col items-center gap-2 p-3 border rounded transition-all hover:scale-105 ${config.frameType === type ? 'ring-2 ring-[var(--accent)] border-transparent' : ''}`}
                   style={{ borderColor: config.frameType === type ? "transparent" : "var(--border)", backgroundColor: "var(--bg-card)" }}
                 >
                   <FrameVisualizer type={type} color="var(--accent)" />
                   <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--fg)" }}>{type || "None"}</span>
                 </button>
               ))}
            </div>

            {config.frameType !== "none" && (
              <div className="space-y-4 pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                <DHInput label="Call to Action Text" value={config.customText} onChange={e => updateConfig({ customText: e.target.value })} placeholder="e.g. SCAN ME" />
                <div className="grid grid-cols-2 gap-4">
                  <ColorRow label="Frame Color" value={config.frameColor} onChange={v => updateConfig({ frameColor: v })} />
                  <ColorRow label="Text Color" value={config.textColor} onChange={v => updateConfig({ textColor: v })} />
                </div>
                <div>
                   <label className="label-xs block mb-1.5">Font Family</label>
                   <div className="grid grid-cols-2 gap-2">
                     {[
                       { id: "Inter, sans-serif", label: "Inter", desc: "Modern" },
                       { id: "system-ui, sans-serif", label: "System", desc: "Default" },
                       { id: "monospace", label: "Mono", desc: "Tech" },
                       { id: "serif", label: "Serif", desc: "Elegant" }
                     ].map(font => (
                       <button
                         key={font.id}
                         onClick={() => updateConfig({ fontFamily: font.id })}
                         className={`p-2 border rounded text-left transition-all hover:scale-105 ${config.fontFamily === font.id ? 'ring-2 ring-[var(--accent)] border-transparent' : ''}`}
                         style={{ borderColor: config.fontFamily === font.id ? "transparent" : "var(--border)", backgroundColor: "var(--bg-card)" }}
                       >
                         <span className="block text-sm" style={{ fontFamily: font.id, color: "var(--fg)" }}>{font.label}</span>
                         <span className="text-[10px]" style={{ color: "var(--fg-muted)" }}>{font.desc}</span>
                       </button>
                     ))}
                   </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* EFFECTS */}
        {activeSection === "effects" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="qrShadow" checked={config.qrShadow} onChange={e => updateConfig({ qrShadow: e.target.checked })} className="w-4 h-4" style={{ accentColor: "var(--accent)" }} />
              <label htmlFor="qrShadow" className="text-sm" style={{ color: "var(--fg)" }}>Drop Shadow</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="qrGlass" checked={config.qrGlassmorphism} onChange={e => updateConfig({ qrGlassmorphism: e.target.checked })} className="w-4 h-4" style={{ accentColor: "var(--accent)" }} />
              <label htmlFor="qrGlass" className="text-sm" style={{ color: "var(--fg)" }}>Glassmorphism Background</label>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeSection === "export" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <label className="label-xs block mb-1.5">Export Resolution: <span style={{ color: "var(--fg)" }}>{config.size}px</span></label>
              <input type="range" min={256} max={2048} step={256} value={config.size} onChange={e => updateConfig({ size: Number(e.target.value) })} className="w-full h-1.5 rounded-full appearance-none cursor-pointer" style={{ accentColor: "var(--accent)", backgroundColor: "var(--border-strong)" }} />
              <div className="flex justify-between mt-1"><span className="text-[10px] text-gray-500">256px</span><span className="text-[10px] text-gray-500">4K (2048px)</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DHSelect label="Error Correction Level" value={config.level} onChange={e => updateConfig({ level: e.target.value as any })}>
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%) — Best for logos</option>
              </DHSelect>
              <DHSelect label="QR Padding" value={config.includeMargin ? "yes" : "no"} onChange={e => updateConfig({ includeMargin: e.target.value === "yes" })}>
                <option value="yes">Include padding</option>
                <option value="no">No padding</option>
              </DHSelect>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
