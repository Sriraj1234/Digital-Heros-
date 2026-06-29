"use client";

import { useCallback, useState } from "react";
import { Upload, X, Trash2 } from "lucide-react";
import { DHInput, DHSelect } from "./QRForms";
import { DotVisualizer, ExtEyeVisualizer, IntEyeVisualizer, FrameVisualizer } from "./VisualSelectors";
import { TEMPLATES } from "@/lib/templates";

// SVG Data URIs for preset logos
const PRESET_LOGOS = [
  { id: "youtube", name: "YouTube", icon: "https://cdn.simpleicons.org/youtube/FF0000" },
  { id: "facebook", name: "Facebook", icon: "https://cdn.simpleicons.org/facebook/1877F2" },
  { id: "whatsapp", name: "WhatsApp", icon: "https://cdn.simpleicons.org/whatsapp/25D366" },
  { id: "instagram", name: "Instagram", icon: "https://cdn.simpleicons.org/instagram/E1306C" },
  { id: "linkedin", name: "LinkedIn", icon: "https://cdn.simpleicons.org/linkedin/0A66C2" },
  { id: "telegram", name: "Telegram", icon: "https://cdn.simpleicons.org/telegram/26A5E4" },
  { id: "x", name: "X (Twitter)", icon: "https://cdn.simpleicons.org/x/000000" },
  { id: "messenger", name: "Messenger", icon: "https://cdn.simpleicons.org/messenger/00B2FF" },
  { id: "tiktok", name: "TikTok", icon: "https://cdn.simpleicons.org/tiktok/000000" },
  { id: "snapchat", name: "Snapchat", icon: "https://cdn.simpleicons.org/snapchat/FFFC00" },
  { id: "skype", name: "Skype", icon: "https://cdn.simpleicons.org/skype/00AFF0" },
  { id: "spotify", name: "Spotify", icon: "https://cdn.simpleicons.org/spotify/1DB954" },
  { id: "pinterest", name: "Pinterest", icon: "https://cdn.simpleicons.org/pinterest/E60023" },
  { id: "behance", name: "Behance", icon: "https://cdn.simpleicons.org/behance/1769FF" },
  { id: "google", name: "Google", icon: "https://cdn.simpleicons.org/google/4285F4" },
  { id: "twitch", name: "Twitch", icon: "https://cdn.simpleicons.org/twitch/9146FF" },
  { id: "slack", name: "Slack", icon: "https://cdn.simpleicons.org/slack/4A154B" },
  { id: "xbox", name: "Xbox", icon: "https://cdn.simpleicons.org/xbox/107C10" },
  { id: "dropbox", name: "Dropbox", icon: "https://cdn.simpleicons.org/dropbox/0061FF" },
  { id: "reddit", name: "Reddit", icon: "https://cdn.simpleicons.org/reddit/FF4500" },
  { id: "vimeo", name: "Vimeo", icon: "https://cdn.simpleicons.org/vimeo/1AB7EA" },
  { id: "github", name: "GitHub", icon: "https://cdn.simpleicons.org/github/181717" },
  { id: "apple", name: "Apple", icon: "https://cdn.simpleicons.org/apple/000000" },
  { id: "wechat", name: "WeChat", icon: "https://cdn.simpleicons.org/wechat/07C160" },
  { id: "meta", name: "Meta", icon: "https://cdn.simpleicons.org/meta/046A38" },
  { id: "threads", name: "Threads", icon: "https://cdn.simpleicons.org/threads/000000" },
  { id: "line", name: "LINE", icon: "https://cdn.simpleicons.org/line/00C300" },
  { id: "viber", name: "Viber", icon: "https://cdn.simpleicons.org/viber/7360F2" },
  { id: "android", name: "Android", icon: "https://cdn.simpleicons.org/android/3DDC84" },
  { id: "playstation", name: "PlayStation", icon: "https://cdn.simpleicons.org/playstation/003791" },
  { id: "discord", name: "Discord", icon: "https://cdn.simpleicons.org/discord/5865F2" },
  { id: "zoom", name: "Zoom", icon: "https://cdn.simpleicons.org/zoom/2D8CFF" },
  { id: "gmail", name: "Gmail", icon: "https://cdn.simpleicons.org/gmail/EA4335" },
  { id: "googleplay", name: "Google Play", icon: "https://cdn.simpleicons.org/googleplay/414141" },
  { id: "paypal", name: "PayPal", icon: "https://cdn.simpleicons.org/paypal/00457C" },
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
  const [activeTab, setActiveTab] = useState<"premade" | "frames" | "shapes" | "logo" | "level" | "colors">("premade");


  const [isAILoading, setIsAILoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const handleMagicAI = async (mode: string) => {
    if (!aiPrompt.trim()) return;
    setIsAILoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, prompt: aiPrompt })
      });
      const data = await res.json();
      if (data.result) {
        updateConfig(data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAILoading(false);
    }
  };

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
    { id: "premade", label: "Pre-made" },
    { id: "frames", label: "Frames" },
    { id: "shapes", label: "Shapes" },
    { id: "logo", label: "Logo" },
    { id: "colors", label: "Colors" }
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
        
        {/* PRE-MADE TAB */}
        {activeTab === "premade" && (
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
                             onClick={() => { const fn = (window as any).__qrStudioLoad; if (fn) fn({ type: t.qrType, fgColor: t.fgColor, bgColor: t.bgColor, graphicFrame: t.graphicFrame, dotStyle: t.dotStyle, eyeFrameStyle: t.eyeFrameStyle, eyeDotStyle: (t as any).eyeDotStyle, values: t.defaultValues }); }}
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

              </>
        )}

        {/* FRAMES TAB */}
        {activeTab === "frames" && (
           <div className="space-y-6">
              {/* Text Frames (Basic) */}
              <div className="rounded-xl p-5 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Text Frames</h3>
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

              {/* SVG Graphic Frames (Categorized) */}
              <div className="rounded-xl p-5 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                 <h3 className="text-sm font-bold mb-1" style={{ color: "var(--fg)" }}>Graphic Frames</h3>
                 <p className="text-[11px] mb-4" style={{ color: "var(--fg-muted)" }}>Applies decorative border without changing your colors.</p>
                 {(["Standard","Business","Social","Events","Holidays"] as const).map(cat => {
                   const catTemplates = TEMPLATES.filter(t => t.category === cat && t.graphicFrame);
                   if (!catTemplates.length) return null;
                   return (
                     <div key={cat} className="mb-5">
                       <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--fg-muted)" }}>{cat}</p>
                       <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                         {catTemplates.map(t => (
                           <button key={t.id}
                             onClick={() => updateConfig({ graphicFrame: t.graphicFrame, frameType: "none" })}
                             className="flex flex-col items-center gap-1.5 border rounded-xl p-2 transition-all hover:scale-105 overflow-hidden"
                             style={{ borderColor: config.graphicFrame === t.graphicFrame ? "var(--accent)" : "var(--border)", boxShadow: config.graphicFrame === t.graphicFrame ? "0 0 0 1px var(--accent)" : "none", backgroundColor: "var(--bg)" }}
                             title={t.name}>
                             <div className="w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 border">
                               <img src={t.graphicFrame!} alt={t.name} className="w-full h-full object-cover" />
                             </div>
                           </button>
                         ))}
                       </div>
                     </div>
                   );
                 })}
              </div>

              {/* Frame Background */}
              <div className="rounded-xl p-5 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Frame Options</h3>
                 <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="w-full sm:w-48">
                       <ColorRow label="Background Color" value={config.frameColor} onChange={v => updateConfig({ frameColor: v })} />
                    </div>
                 </div>
              </div>

              {/* Additional Text */}
              <div className="rounded-xl p-5 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Additional Text (Text Frames Only)</h3>
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
           </div>
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
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>External Eye</h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {["square", "dot", "extra-rounded"].map(type => (
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
                 <h3 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>Internal Eye</h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {["square", "dot"].map(type => (
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

             
             {/* AI Theme Generator */}
             <div className="rounded-xl p-4 border" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}>
               <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold" style={{ color: "var(--fg)" }}>✨ AI Theme Generator</h4>
                  <button 
                    onClick={() => handleMagicAI("generate-style")} 
                    disabled={isAILoading || !aiPrompt}
                    className="btn-primary py-1 px-3 text-[10px] whitespace-nowrap"
                  >
                    {isAILoading ? "Generating..." : "Generate Colors"}
                  </button>
               </div>
               <input 
                 type="text"
                 value={aiPrompt} 
                 onChange={e => setAiPrompt(e.target.value)} 
                 placeholder="E.g., Cyberpunk neon vibe, Cozy minimalist coffee shop..." 
                 className="dh-input w-full text-xs h-8" 
               />
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
