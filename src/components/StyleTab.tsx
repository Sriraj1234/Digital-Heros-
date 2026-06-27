"use client";

import { useCallback, useState } from "react";
import { Upload, X, Trash2 } from "lucide-react";
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
      {label && <label className="text-xs font-bold text-gray-500 block mb-1.5">{label}</label>}
      <div className="flex gap-2">
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-10 h-10 rounded-sm cursor-pointer border p-0.5 bg-white"
          style={{ borderColor: "#D4BCE0" }}
        />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="flex-1 rounded-sm border border-[#D4BCE0] uppercase font-mono text-sm px-2 text-gray-700 focus:outline-none focus:border-[#9C3AAF]"
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
    <div className="flex flex-col h-full bg-[#FDF9FF] rounded-lg p-1">
      {/* Top Tabs */}
      <div className="flex gap-6 border-b border-[#E8D5F0] pb-2 mb-5 px-2">
        {tabs.map(t => (
          <button
             key={t.id}
             onClick={() => setActiveTab(t.id as any)}
             className={`pb-2 text-[11px] font-bold uppercase tracking-wider transition-colors relative ${activeTab === t.id ? 'text-[#9C3AAF]' : 'text-gray-400 hover:text-gray-600'}`}
          >
             {t.label}
             {activeTab === t.id && (
                <span className="absolute bottom-[-9px] left-0 right-0 h-[3px] bg-[#9C3AAF] rounded-t-sm" />
             )}
          </button>
        ))}
      </div>

      <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-3 custom-scrollbar px-2 pb-10">
        
        {/* FRAMES TAB */}
        {activeTab === "frames" && (
           <>
              {/* Pre-Made Templates */}
              <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(156,58,175,0.05)] border border-[#E8D5F0]">
                 <h3 className="text-sm font-bold text-gray-800 mb-4">Pre-Made Templates</h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {/* Clear Button */}
                    <button 
                       onClick={() => updateConfig({ graphicFrame: null })}
                       className={`aspect-square flex items-center justify-center border rounded-lg transition-all hover:scale-105 ${!config.graphicFrame ? 'border-[#9C3AAF] shadow-[0_0_0_1px_#9C3AAF]' : 'border-gray-200'}`}
                    >
                       <X className="w-8 h-8 text-gray-300 stroke-1" />
                    </button>
                    {TEMPLATES.map(t => (
                       <button
                         key={t.id}
                         onClick={() => {
                            const fn = (window as any).__qrStudioLoad;
                            if (fn) fn({ type: t.qrType, fgColor: t.fgColor, bgColor: t.bgColor, graphicFrame: t.graphicFrame, values: t.defaultValues });
                         }}
                         className={`aspect-square rounded-lg border transition-all hover:scale-105 overflow-hidden ${config.graphicFrame === t.graphicFrame && config.graphicFrame !== null ? 'border-[#9C3AAF] shadow-[0_0_0_1px_#9C3AAF]' : 'border-gray-200'}`}
                         title={t.name}
                       >
                          {t.graphicFrame ? (
                             <img src={t.graphicFrame} alt={t.name} className="w-full h-full object-cover p-1" />
                          ) : null}
                       </button>
                    ))}
                 </div>
              </div>

              {/* Standard Frames */}
              <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(156,58,175,0.05)] border border-[#E8D5F0]">
                 <h3 className="text-sm font-bold text-gray-800 mb-4">Frames</h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {["none", "standard", "business", "badge", "minimal"].map(type => (
                      <button
                        key={type}
                        onClick={() => updateConfig({ frameType: type as any, graphicFrame: null })}
                        className={`aspect-square flex flex-col items-center justify-center gap-1 border rounded-lg transition-all hover:scale-105 ${config.frameType === type && !config.graphicFrame ? 'border-[#9C3AAF] shadow-[0_0_0_1px_#9C3AAF]' : 'border-gray-200'}`}
                      >
                        {type === "none" ? <X className="w-8 h-8 text-gray-300 stroke-1" /> : <FrameVisualizer type={type} color="#9C3AAF" />}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Frame Background */}
              <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(156,58,175,0.05)] border border-[#E8D5F0]">
                 <h3 className="text-sm font-bold text-gray-800 mb-4">Frame Background</h3>
                 <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="w-full sm:w-48">
                       <ColorRow label="Background Color" value={config.frameColor} onChange={v => updateConfig({ frameColor: v })} />
                    </div>
                    <div className="flex items-center gap-2 mt-4 sm:mt-0 pt-2 sm:pt-6">
                      <input type="checkbox" id="bgTransparent" checked={!!config.bgTransparent} onChange={e => updateConfig({ bgTransparent: e.target.checked })} className="w-4 h-4 accent-[#9C3AAF] rounded cursor-pointer" />
                      <label htmlFor="bgTransparent" className="text-sm text-gray-600 font-medium cursor-pointer">Transparent Background</label>
                    </div>
                 </div>
              </div>

              {/* Additional Text */}
              <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(156,58,175,0.05)] border border-[#E8D5F0]">
                 <h3 className="text-sm font-bold text-gray-800 mb-4">Additional Text</h3>
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
           <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(156,58,175,0.05)] border border-[#E8D5F0] space-y-8">
              <div>
                 <h3 className="text-sm font-bold text-gray-800 mb-4">Body Shape</h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {["square", "rounded", "extra-rounded", "dots", "classy", "classy-rounded"].map(type => (
                       <button key={type} onClick={() => updateConfig({ dotStyle: type as any })} className={`aspect-square flex items-center justify-center border rounded-lg transition-all hover:scale-105 bg-gray-50 ${config.dotStyle === type ? 'border-[#9C3AAF] shadow-[0_0_0_1px_#9C3AAF]' : 'border-gray-200'}`}>
                          <DotVisualizer type={type} />
                       </button>
                    ))}
                 </div>
              </div>
              
              <div>
                 <h3 className="text-sm font-bold text-gray-800 mb-4">Eye Frame</h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {["", "square", "dot", "extra-rounded"].map(type => (
                       <button key={type} onClick={() => updateConfig({ eyeFrameStyle: type as any })} className={`aspect-square flex items-center justify-center border rounded-lg transition-all hover:scale-105 bg-gray-50 ${config.eyeFrameStyle === type ? 'border-[#9C3AAF] shadow-[0_0_0_1px_#9C3AAF]' : 'border-gray-200'}`}>
                          <ExtEyeVisualizer type={type} />
                       </button>
                    ))}
                 </div>
              </div>

              <div>
                 <h3 className="text-sm font-bold text-gray-800 mb-4">Eye Dot</h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {["", "square", "dot"].map(type => (
                       <button key={type} onClick={() => updateConfig({ eyeDotStyle: type as any })} className={`aspect-square flex items-center justify-center border rounded-lg transition-all hover:scale-105 bg-gray-50 ${config.eyeDotStyle === type ? 'border-[#9C3AAF] shadow-[0_0_0_1px_#9C3AAF]' : 'border-gray-200'}`}>
                          <IntEyeVisualizer type={type} />
                       </button>
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* LOGO TAB */}
        {activeTab === "logo" && (
           <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(156,58,175,0.05)] border border-[#E8D5F0] space-y-8">
             <div>
                <h3 className="text-sm font-bold text-gray-800 mb-4">Preset Logos</h3>
                <div className="flex flex-wrap gap-3">
                   {PRESET_LOGOS.map(logo => (
                      <button
                        key={logo.id}
                        onClick={() => updateConfig({ logoDataUrl: logo.icon })}
                        className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center hover:scale-105 transition-transform border border-gray-200"
                        title={logo.name}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={logo.icon} className="w-7 h-7 object-contain" />
                      </button>
                   ))}
                </div>
             </div>

             {config.logoDataUrl ? (
               <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={config.logoDataUrl} alt="Logo" className="w-12 h-12 object-contain rounded" />
                 <span className="text-sm font-medium flex-1 text-gray-700">Logo embedded</span>
                 <button onClick={() => updateConfig({ logoDataUrl: null })} className="p-2 rounded hover:bg-gray-200 text-gray-500 transition-colors">
                   <Trash2 className="w-5 h-5 text-red-500" />
                 </button>
               </div>
             ) : (
               <div
                 onDrop={handleDrop}
                 onDragOver={e => e.preventDefault()}
                 className="flex flex-col items-center justify-center gap-3 py-10 rounded-xl border-2 border-dashed border-[#D4BCE0] bg-[#FDF9FF] cursor-pointer hover:bg-[#F9F2FB] transition-colors"
               >
                 <Upload className="w-8 h-8 text-[#9C3AAF]" />
                 <span className="text-sm text-gray-600 font-medium">Drag & drop logo</span>
                 <label className="cursor-pointer text-xs font-bold text-[#9C3AAF] uppercase tracking-wider">
                   Browse computer
                   <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleLogoUpload(f); }} />
                 </label>
               </div>
             )}

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-3 uppercase tracking-wider">Logo Size: <span className="text-gray-800">{Math.round(config.logoSize * 100)}%</span></label>
                  <input type="range" min={0.1} max={0.6} step={0.05} value={config.logoSize} onChange={e => updateConfig({ logoSize: Number(e.target.value) })} className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#9C3AAF]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-3 uppercase tracking-wider">Logo Margin: <span className="text-gray-800">{config.logoMargin}px</span></label>
                  <input type="range" min={0} max={20} step={1} value={config.logoMargin} onChange={e => updateConfig({ logoMargin: Number(e.target.value) })} className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#9C3AAF]" />
                </div>
             </div>

             <div className="flex flex-col gap-4 pt-4 border-t border-gray-100">
               <div className="flex items-center gap-3">
                 <input type="checkbox" id="logoBg" checked={!!config.logoBg} onChange={e => updateConfig({ logoBg: e.target.checked })} disabled={!!config.blendLogo} className="w-4 h-4 accent-[#9C3AAF] rounded cursor-pointer disabled:opacity-50" />
                 <label htmlFor="logoBg" className={`text-sm font-medium ${config.blendLogo ? 'text-gray-400' : 'text-gray-700'} cursor-pointer`}>Remove QR dots behind logo</label>
               </div>
               <div className="flex items-center gap-3">
                 <input type="checkbox" id="blendLogo" checked={!!config.blendLogo} onChange={e => updateConfig({ blendLogo: e.target.checked })} className="w-4 h-4 accent-[#9C3AAF] rounded cursor-pointer" />
                 <label htmlFor="blendLogo" className="text-sm font-medium text-gray-700 cursor-pointer">Blend Logo into Dots (Better Scanning)</label>
               </div>
             </div>
           </div>
        )}

        {/* COLORS TAB */}
        {activeTab === "colors" && (
           <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(156,58,175,0.05)] border border-[#E8D5F0] space-y-6">
             <div className="flex bg-gray-50 border border-gray-200 p-1 rounded-lg mb-4">
                {[
                   { id: "solid", label: "Solid Color" },
                   { id: "linear", label: "Linear Gradient" },
                   { id: "radial", label: "Radial Gradient" }
                ].map(t => (
                   <button
                      key={t.id}
                      onClick={() => updateConfig({ fgType: t.id as any })}
                      className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${config.fgType === t.id ? 'bg-white shadow-sm text-[#9C3AAF]' : 'text-gray-500 hover:text-gray-700'}`}
                   >
                      {t.label}
                   </button>
                ))}
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <ColorRow label={config.fgType === "solid" ? "QR Color" : "Gradient Start"} value={config.fgColor} onChange={v => updateConfig({ fgColor: v })} />
               {config.fgType !== "solid" && (
                 <ColorRow label="Gradient End" value={config.fgColor2} onChange={v => updateConfig({ fgColor2: v })} />
               )}
               <ColorRow label="QR Background" value={config.bgColor} onChange={v => updateConfig({ bgColor: v })} />
             </div>

             <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" id="bgTransparentColor" checked={!!config.bgTransparent} onChange={e => updateConfig({ bgTransparent: e.target.checked })} className="w-4 h-4 accent-[#9C3AAF] rounded cursor-pointer" />
                <label htmlFor="bgTransparentColor" className="text-sm font-medium text-gray-700 cursor-pointer">Transparent Background</label>
             </div>
           </div>
        )}

        {/* LEVEL TAB */}
        {activeTab === "level" && (
           <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(156,58,175,0.05)] border border-[#E8D5F0] space-y-6">
             <div>
                 <h3 className="text-sm font-bold text-gray-800 mb-4">Error Correction Level</h3>
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
                          className={`flex flex-col items-start text-left p-4 border rounded-xl transition-all hover:scale-[1.02] ${config.level === lvl.id ? 'border-[#9C3AAF] bg-[#FDF9FF] shadow-[0_0_0_1px_#9C3AAF]' : 'border-gray-200 bg-white'}`}
                       >
                          <span className={`font-bold text-sm ${config.level === lvl.id ? 'text-[#9C3AAF]' : 'text-gray-800'}`}>{lvl.label}</span>
                          <span className="text-xs text-gray-500 mt-1">{lvl.desc}</span>
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
