"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Download, Copy, Share2, Maximize2, FileImage,
  FileType2, Settings, Palette, Check, Smartphone, FileScan, RotateCcw, ExternalLink
} from "lucide-react";
import { ContentTab, DEFAULT_FORM_DATA, buildQRValue } from "./QRForms";
import { StyleTab, DEFAULT_STYLE, QRStyleConfig } from "./StyleTab";
import { ScanPreview } from "./ScanPreview";
import { ScanQuality } from "./ScanQuality";
import { MyTemplates } from "./MyTemplates";
import { exportQRFromInstance, exportQRFromElement, copyQRToClipboard } from "@/lib/qrExport";
import { saveToHistory, loadSettings, saveSettings } from "@/lib/storage";

type Tab = "content" | "style";

// Accent colors per QR category for ambient glow theming
const TYPE_GLOW: Record<string, string> = {
  url: "#3B82F6", text: "#8B5CF6", email: "#F59E0B", phone: "#10B981",
  sms: "#10B981", wifi: "#06B6D4", vcard: "#6366F1", calendar: "#F43F5E",
  maps: "#EF4444", whatsapp: "#25D366", youtube: "#FF0000", instagram: "#E1306C",
  facebook: "#1877F2", telegram: "#29B6F6", linkedin: "#0A66C2", twitter: "#000000",
  tiktok: "#69C9D0", snapchat: "#FFFC00", spotify: "#1DB954", pinterest: "#E60023",
  discord: "#5865F2", reddit: "#FF4500", upi: "#097969", paypal: "#003087",
  crypto: "#F7931A", app_store: "#0D96F6", play_store: "#34A853", pdf: "#DC2626",
  g_review: "#FBBC04", multi_link: "#8B5CF6", landing: "#EC4899",
};

export default function QRStudio() {
  const [tab, setTab] = useState<Tab>("content");
  const [activeType, setActiveType] = useState("url");
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [styleConfig, setStyleConfig] = useState<QRStyleConfig>(DEFAULT_STYLE);
  const [qrValue, setQrValue] = useState("https://digitalheroesco.com");
  const [isUpdating, setIsUpdating] = useState(false); // shimmer trigger
  
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [exportLoading, setExportLoading] = useState<string | null>(null);
  const [showSimulator, setShowSimulator] = useState(false);

  const updateConfig = useCallback((updates: Partial<QRStyleConfig>) => {
    setStyleConfig(prev => ({ ...prev, ...updates }));
  }, []);

  // qr-code-styling instance and refs
  const qrRef = useRef<HTMLDivElement>(null);
  const exportWrapperRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<any>(null);

  // Load saved settings on mount
  useEffect(() => {
    const s = loadSettings();
    if (s.activeType) setActiveType(s.activeType);
    if (s.styleConfig) setStyleConfig({ ...DEFAULT_STYLE, ...s.styleConfig });
    
    // Initialize QR Code Styling
    import("qr-code-styling").then((module) => {
      const QRCodeStyling = module.default;
      qrCodeInstance.current = new QRCodeStyling({
        width: 256,
        height: 256,
        type: "svg",
        data: "https://digitalheroesco.com",
        margin: 0,
      });
      if (qrRef.current) {
        qrRef.current.innerHTML = "";
        qrCodeInstance.current.append(qrRef.current);
      }
    });
  }, []);

  // Update QR instance when data or style changes
  useEffect(() => {
    const newValue = buildQRValue(activeType, formData);
    setQrValue(newValue);

    // Trigger shimmer update flash
    setIsUpdating(true);
    const shimmerTimer = setTimeout(() => setIsUpdating(false), 600);

    if (qrCodeInstance.current) {
      // Map shapes based on what the UI sends to what the library supports natively
      let dotType = styleConfig.dotStyle;
      let eyeType = styleConfig.eyeFrameStyle;
      
      qrCodeInstance.current.update({
        data: newValue || " ",
        width: 1024,
        height: 1024,
        margin: styleConfig.includeMargin ? 40 : 0,
        qrOptions: {
          errorCorrectionLevel: styleConfig.level,
        },
        dotsOptions: {
          type: dotType as any,
          color: styleConfig.fgType === "solid" ? styleConfig.fgColor : undefined,
          gradient: styleConfig.fgType !== "solid" ? {
            type: styleConfig.fgType,
            rotation: (styleConfig.gradientAngle * Math.PI) / 180,
            colorStops: [{ offset: 0, color: styleConfig.fgColor }, { offset: 1, color: styleConfig.fgColor2 }]
          } : undefined
        },
        backgroundOptions: {
          color: "transparent", 
        },
        cornersSquareOptions: {
          type: eyeType || undefined,
          color: styleConfig.eyeColor || undefined,
        },
        cornersDotOptions: {
          type: styleConfig.eyeDotStyle || undefined,
          color: styleConfig.eyeColor || undefined,
        },
        image: styleConfig.blendLogo ? undefined : (styleConfig.logoDataUrl || undefined),
        imageOptions: {
          crossOrigin: "anonymous",
          margin: styleConfig.logoMargin * 4,
          imageSize: styleConfig.logoSize,
          hideBackgroundDots: styleConfig.logoBg,
        }
      });
      
      if (qrRef.current) {
         qrRef.current.innerHTML = "";
         qrCodeInstance.current.append(qrRef.current);
         const svg = qrRef.current.querySelector("svg");
         if (svg) {
           svg.style.width = "100%";
           svg.style.height = "100%";
         }
      }
    }
    return () => clearTimeout(shimmerTimer);
  }, [activeType, formData, styleConfig, showSimulator]);

  // Persist settings
  useEffect(() => {
    saveSettings({ activeType, styleConfig });
  }, [activeType, styleConfig]);

  // Reset QR to defaults
  const handleReset = useCallback(() => {
    setActiveType("url");
    setFormData(DEFAULT_FORM_DATA);
    setStyleConfig(DEFAULT_STYLE);
    setTab("content");
  }, []);

  const handleExport = async (format: "png" | "svg" | "jpeg" | "pdf" | "4k") => {
    if (showSimulator) {
      setShowSimulator(false);
      setTimeout(() => handleExport(format), 150);
      return;
    }
    setExportLoading(format);
    try {
      // If a graphic frame is active, capture the whole composite element
      if (styleConfig.graphicFrame && exportWrapperRef.current) {
        await exportQRFromElement(exportWrapperRef.current, format, styleConfig.bgColor);
      } else {
        // Use qr-code-styling's native download — no CORS issues
        await exportQRFromInstance(qrCodeInstance.current, format, styleConfig.bgColor);
      }
      saveToHistory({
        type: activeType,
        value: qrValue,
        label: activeType.toUpperCase(),
        fgColor: styleConfig.fgColor,
        bgColor: styleConfig.bgColor,
        size: styleConfig.size,
        level: styleConfig.level,
      });
    } catch (e) {
      console.error("Export failed", e);
      alert("Export failed. Please try again.");
    }
    setExportLoading(null);
  };

  const handleCopy = async () => {
    try {
      const ok = await copyQRToClipboard(qrCodeInstance.current);
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        alert("Copy failed. Please use the Download button instead.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: "QR Design Studio", text: "Check out my QR design!", url: window.location.href });
    }
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }, []);

  const loadTemplate = useCallback((cfg: QRStyleConfig, type: string) => {
    setStyleConfig(cfg);
    setActiveType(type);
  }, []);

  if (typeof window !== "undefined") {
    (window as any).__qrStudioLoad = (cfg: { type: string; fgColor: string; bgColor: string; graphicFrame: string | null; values: Record<string, string> }) => {
      setActiveType(cfg.type);
      setStyleConfig(prev => ({ ...prev, fgType: "solid", fgColor: cfg.fgColor, bgColor: cfg.bgColor, graphicFrame: cfg.graphicFrame }));
      setFormData(prev => ({ ...prev, ...cfg.values }));
      document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" });
    };
  }

  const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "content", label: "Content", icon: FileScan },
    { id: "style", label: "Style & Logo", icon: Palette },
  ];

  return (
    <section id="studio" className="py-20" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-5">
        <div className="mb-10">
          <span className="label-xs">02 · Design Studio</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: "var(--fg)" }}>
            Professional QR Engine
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* Controls panel */}
          <div className="card p-6 md:p-8 flex flex-col h-full">
            <div className="flex gap-1 p-1 rounded-sm mb-6 w-fit" style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)" }}>
              {TABS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="flex items-center gap-1.5 px-6 py-2 text-xs font-semibold rounded-sm transition-all duration-200"
                  style={tab === t.id
                    ? { backgroundColor: "var(--accent)", color: "var(--accent-text)" }
                    : { color: "var(--fg-muted)" }
                  }
                >
                  <t.icon className="w-3.5 h-3.5" />
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-hidden">
              {tab === "content" && (
                <ContentTab
                  activeType={activeType}
                  setActiveType={setActiveType}
                  formData={formData}
                  onChange={handleChange}
                />
              )}
              {tab === "style" && (
                <StyleTab
                  config={styleConfig}
                  updateConfig={updateConfig}
                />
              )}
            </div>
          </div>

          {/* Preview panel — sticky */}
          <div className="sticky top-24 flex flex-col gap-4">
            <div className="card p-6" style={{ position: "relative", overflow: "hidden" }}>
              {/* Ambient glow — color-keyed to active QR type */}
              <div
                className="absolute inset-0 pointer-events-none gpu-layer"
                style={{
                  background: `radial-gradient(ellipse at 50% 40%, ${TYPE_GLOW[activeType] || "var(--accent)"}22 0%, transparent 70%)`,
                  transition: "background 0.5s ease",
                }}
              />

              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="label-xs">Live Preview</span>
                  {/* Animated LIVE badge */}
                  <span
                    className="live-badge relative inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-sm"
                    style={{ backgroundColor: "var(--accent)", color: "var(--accent-text)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-dot-pulse gpu-layer" />
                    LIVE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                   <button
                     onClick={() => setShowSimulator(!showSimulator)}
                     className="p-1.5 rounded-sm transition-colors text-xs font-semibold flex items-center gap-1 gpu-hover"
                     style={{ color: showSimulator ? "var(--accent)" : "var(--fg-muted)", border: "1px solid var(--border)" }}
                     title="Scan Simulator"
                   >
                     <Smartphone className="w-3.5 h-3.5" />
                     {showSimulator ? "Hide" : "Simulate"}
                   </button>
                   <button
                     onClick={handleReset}
                     className="p-1.5 rounded-sm transition-colors gpu-hover"
                     style={{ color: "var(--fg-muted)", border: "1px solid var(--border)" }}
                     title="Reset QR to defaults"
                   >
                     <RotateCcw className="w-3.5 h-3.5" />
                   </button>
                   <button
                     onClick={() => setFullscreen(true)}
                     className="p-1.5 rounded-sm transition-colors gpu-hover"
                     style={{ color: "var(--fg-muted)", border: "1px solid var(--border)" }}
                     title="Fullscreen"
                   >
                     <Maximize2 className="w-3.5 h-3.5" />
                   </button>
                </div>
              </div>

              {showSimulator ? (
                <motion.div
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  className="mb-5 flex justify-center py-2 relative z-10"
                >
                  <ScanPreview typeId={activeType} formData={formData} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="relative flex items-center justify-center rounded-sm mb-4 p-4 overflow-hidden dot-grid-bg"
                  style={{ minHeight: "280px" }}
                >
                  {/* Shimmer overlay — fires on QR data change */}
                  {isUpdating && (
                    <div className="shimmer-wrapper z-20">
                      <div className="shimmer-bar" />
                    </div>
                  )}

                  {/* Glow ring around preview area */}
                  <div
                    className="absolute inset-2 rounded-sm pointer-events-none gpu-layer"
                    style={{
                      boxShadow: `inset 0 0 30px 4px ${TYPE_GLOW[activeType] || "var(--accent)"}18`,
                      transition: "box-shadow 0.5s ease",
                    }}
                  />

                   <div 
                     ref={exportWrapperRef}
                     className="relative flex flex-col items-center justify-center transition-all duration-300"
                     style={{ 
                       width: styleConfig.graphicFrame ? "360px" : "256px", // larger width to accommodate graphic borders
                       aspectRatio: styleConfig.graphicFrame ? "1/1" : "auto",
                       backgroundColor: styleConfig.graphicFrame ? "transparent" : (styleConfig.qrGlassmorphism || styleConfig.bgTransparent ? "transparent" : styleConfig.bgColor),
                       backgroundImage: styleConfig.bgImage ? `url(${styleConfig.bgImage})` : (styleConfig.qrGlassmorphism ? `linear-gradient(135deg, ${styleConfig.bgColor}aa, ${styleConfig.bgColor}44)` : "none"),
                       backgroundSize: "cover",
                       backgroundPosition: "center",
                       backdropFilter: styleConfig.qrGlassmorphism ? "blur(20px)" : "none",
                       boxShadow: styleConfig.qrShadow ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "none",
                       borderRadius: styleConfig.frameType === "badge" ? "24px" : "8px",
                       padding: styleConfig.graphicFrame ? "0" : (styleConfig.frameType === "none" ? "0" : styleConfig.frameType === "badge" ? "20px" : "16px"),
                       border: styleConfig.frameType !== "none" && !styleConfig.graphicFrame ? `4px solid ${styleConfig.frameColor}` : "none",
                       borderTopWidth: styleConfig.frameType === "minimal" && !styleConfig.graphicFrame ? "24px" : (styleConfig.frameType !== "none" && !styleConfig.graphicFrame ? "4px" : "0"),
                     }}
                   >
                      {/* GRAPHIC FRAME LAYER */}
                      {styleConfig.graphicFrame && (
                        <img 
                          src={styleConfig.graphicFrame} 
                          alt="Graphic Frame" 
                          className="absolute inset-0 w-full h-full pointer-events-none"
                        />
                      )}
                      
                      {styleConfig.frameType === "minimal" && styleConfig.customText && !styleConfig.graphicFrame && (
                        <div className="absolute top-[-24px] left-0 w-full flex justify-center items-center h-[24px]">
                           <span style={{ color: styleConfig.textColor, fontFamily: styleConfig.fontFamily, fontSize: "10px", fontWeight: "bold", letterSpacing: "1px" }}>
                             {styleConfig.customText}
                           </span>
                        </div>
                      )}
                      
                      <div className="relative aspect-square flex items-center justify-center rounded z-10" style={{ width: styleConfig.graphicFrame ? "65%" : "100%", backgroundColor: styleConfig.graphicFrame ? styleConfig.bgColor : "transparent" }}>
                         <div ref={qrRef} className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full" />
                         {styleConfig.blendLogo && styleConfig.logoDataUrl && (
                           <img 
                             src={styleConfig.logoDataUrl}
                             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                             style={{
                               width: `${styleConfig.logoSize * 100}%`,
                               height: `${styleConfig.logoSize * 100}%`,
                               mixBlendMode: "lighten",
                               objectFit: "contain"
                             }}
                             alt="QR Logo"
                           />
                         )}
                      </div>

                      {(styleConfig.frameType === "standard" || styleConfig.frameType === "badge") && styleConfig.customText && (
                        <div className="mt-3 w-full flex justify-center items-center" style={{ backgroundColor: styleConfig.frameColor, padding: "8px", borderRadius: "4px" }}>
                           <span style={{ color: styleConfig.textColor, fontFamily: styleConfig.fontFamily, fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase" }}>
                             {styleConfig.customText}
                           </span>
                        </div>
                      )}
                   </div>
                </motion.div>
              )}

              {/* Decoded value pill */}
              {!showSimulator && (
                <div
                  className="flex items-center gap-2 mb-4 px-3 py-2 rounded-sm text-[10px] font-mono truncate relative z-10 animate-fade-in"
                  style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--fg-muted)" }}
                  title={qrValue}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: TYPE_GLOW[activeType] || "var(--accent)" }}
                  />
                  <span className="truncate flex-1">{qrValue || "—"}</span>
                </div>
              )}

              <button
                onClick={() => handleExport("png")}
                disabled={!!exportLoading}
                className="btn-primary w-full justify-center mb-2 text-sm"
              >
                {exportLoading === "png" ? "Rendering High-Res PNG…" : <><Download className="w-4 h-4" /> Download Complete Design</>}
              </button>

              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { fmt: "svg" as const, label: "SVG", icon: FileType2 },
                  { fmt: "jpeg" as const, label: "JPEG", icon: FileImage },
                  { fmt: "pdf" as const, label: "PDF", icon: Settings },
                  { fmt: "4k" as const, label: "4K Render", icon: Download },
                ].map(({ fmt, label, icon: Icon }) => (
                  <button
                    key={fmt}
                    onClick={() => handleExport(fmt)}
                    disabled={!!exportLoading}
                    className="btn-outline justify-center py-2 text-[10px] gap-1.5 uppercase font-bold tracking-wide gpu-hover"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {exportLoading === fmt ? "Wait…" : label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button onClick={handleCopy} className="btn-outline justify-center py-2 text-xs gap-1.5 gpu-hover">
                  {copied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
                <button onClick={handleShare} className="btn-outline justify-center py-2 text-xs gap-1.5 gpu-hover">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
                <button onClick={handleReset} className="btn-outline justify-center py-2 text-xs gap-1.5 gpu-hover" title="Reset QR to defaults" style={{ color: "var(--fg-muted)" }}>
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>

              {/* Advanced Modules */}
              <ScanQuality config={styleConfig} />
              <MyTemplates currentConfig={styleConfig} currentType={activeType} onLoad={loadTemplate} />

              {/* Open full Style Studio */}
              <Link
                href="/studio"
                className="btn-outline w-full justify-center mt-3 text-xs gap-1.5"
                style={{ borderStyle: "dashed" }}
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Full Style Studio
              </Link>
              
            </div>
          </div>
        </div>
      </div>

      {fullscreen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-8"
          style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
          onClick={() => setFullscreen(false)}
        >
          {/* Re-render the export wrapper identically but larger for fullscreen view */}
          <div 
             className="relative flex flex-col items-center justify-center"
             onClick={(e) => e.stopPropagation()}
             style={{ 
               width: "100%", maxWidth: "600px", aspectRatio: "1/1",
               backgroundColor: styleConfig.qrGlassmorphism ? "transparent" : styleConfig.bgColor,
               backdropFilter: styleConfig.qrGlassmorphism ? "blur(20px)" : "none",
               background: styleConfig.qrGlassmorphism ? `linear-gradient(135deg, ${styleConfig.bgColor}aa, ${styleConfig.bgColor}44)` : styleConfig.bgColor,
               boxShadow: styleConfig.qrShadow ? "0 50px 100px -20px rgba(0, 0, 0, 0.8)" : "none",
               borderRadius: styleConfig.frameType === "badge" ? "48px" : "16px",
               padding: styleConfig.frameType === "none" ? "0" : styleConfig.frameType === "badge" ? "40px" : "32px",
               border: styleConfig.frameType !== "none" ? `8px solid ${styleConfig.frameColor}` : "none",
               borderTopWidth: styleConfig.frameType === "minimal" ? "48px" : styleConfig.frameType !== "none" ? "8px" : "0",
             }}
           >
              {/* Note: In a real app we'd duplicate the QR canvas instance here, but for simplicity we rely on the user exiting fullscreen to edit. */}
              <div className="w-full h-full flex flex-col items-center justify-center text-center">
                 <h2 className="text-2xl font-bold mb-4" style={{ color: styleConfig.textColor }}>
                    {styleConfig.customText || "PREVIEW MODE"}
                 </h2>
                 <p className="text-gray-400">Exit fullscreen to edit design.</p>
              </div>
           </div>
        </div>
      )}
    </section>
  );
}
