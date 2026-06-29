"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, QrCode, Download, Copy, Share2, RotateCcw,
  Check, Smartphone, Maximize2, FileImage, FileType2, Settings,
  Upload, Image as ImageIcon
} from "lucide-react";
import { StyleTab, DEFAULT_STYLE, QRStyleConfig } from "@/components/StyleTab";
import { ContentTab, DEFAULT_FORM_DATA, buildQRValue } from "@/components/QRForms";
import { MyTemplates } from "@/components/MyTemplates";
import { ScanQuality } from "@/components/ScanQuality";
import { exportQRFromInstance, exportQRFromElement, copyQRToClipboard } from "@/lib/qrExport";
import { saveToHistory, loadSettings, saveSettings } from "@/lib/storage";

const TYPE_GLOW: Record<string, string> = {
  url: "#3B82F6", text: "#8B5CF6", email: "#F59E0B", phone: "#10B981",
  sms: "#10B981", wifi: "#06B6D4", vcard: "#6366F1", calendar: "#F43F5E",
  maps: "#EF4444", whatsapp: "#25D366", youtube: "#FF0000", instagram: "#E1306C",
  facebook: "#1877F2", telegram: "#29B6F6", linkedin: "#0A66C2",
};

type MainTab = "content" | "style";

export default function StudioPage() {
  const [mainTab, setMainTab] = useState<MainTab>("content");
  const [activeType, setActiveType] = useState("url");
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [styleConfig, setStyleConfig] = useState<QRStyleConfig>(DEFAULT_STYLE);
  const [qrValue, setQrValue] = useState("https://digitalheroesco.com");
  const [isUpdating, setIsUpdating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exportLoading, setExportLoading] = useState<string | null>(null);

  const qrRef = useRef<HTMLDivElement>(null);
  const exportWrapperRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<any>(null);

  const updateConfig = useCallback((updates: Partial<QRStyleConfig>) => {
    setStyleConfig(prev => ({ ...prev, ...updates }));
  }, []);

  if (typeof window !== 'undefined') {
    (window as any).__qrStudioLoad = (cfg: any) => {
      setActiveType(cfg.type);
      setStyleConfig(prev => ({
        ...prev,
        fgType: 'solid',
        fgColor: cfg.fgColor,
        bgColor: cfg.bgColor,
        graphicFrame: cfg.graphicFrame,
        ...(cfg.dotStyle ? { dotStyle: cfg.dotStyle as any } : {}),
        ...(cfg.eyeFrameStyle ? { eyeFrameStyle: cfg.eyeFrameStyle as any } : {}),
        ...(cfg.eyeDotStyle ? { eyeDotStyle: cfg.eyeDotStyle as any } : {}),
      }));
      if (cfg.values) setFormData(prev => ({ ...prev, ...cfg.values }));
    };
  }

  useEffect(() => {
    const s = loadSettings();
    if (s.activeType) setActiveType(s.activeType);
    if (s.styleConfig) setStyleConfig({ ...DEFAULT_STYLE, ...s.styleConfig });

    import("qr-code-styling").then((module) => {
      const QRCodeStyling = module.default;
      qrCodeInstance.current = new QRCodeStyling({
        width: 512, height: 512, type: "svg",
        data: "https://digitalheroesco.com", margin: 0,
      });
      if (qrRef.current) {
        qrRef.current.innerHTML = "";
        qrCodeInstance.current.append(qrRef.current);
      }
    });
  }, []);

  useEffect(() => {
    const newValue = buildQRValue(activeType, formData);
    setQrValue(newValue);
    setIsUpdating(true);
    const t = setTimeout(() => setIsUpdating(false), 600);

    if (qrCodeInstance.current) {
      qrCodeInstance.current.update({
        data: newValue || " ",
        width: 1024, height: 1024,
        margin: styleConfig.includeMargin ? 40 : 0,
        qrOptions: { errorCorrectionLevel: styleConfig.level },
        dotsOptions: {
          type: styleConfig.dotStyle as any,
          color: styleConfig.fgType === "solid" ? styleConfig.fgColor : undefined,
          gradient: styleConfig.fgType !== "solid" ? {
            type: styleConfig.fgType,
            rotation: (styleConfig.gradientAngle * Math.PI) / 180,
            colorStops: [{ offset: 0, color: styleConfig.fgColor }, { offset: 1, color: styleConfig.fgColor2 }]
          } : undefined,
        },
        backgroundOptions: { color: styleConfig.bgTransparent ? "transparent" : styleConfig.bgColor },
        cornersSquareOptions: { type: styleConfig.eyeFrameStyle || undefined, color: styleConfig.eyeColor || undefined },
        cornersDotOptions: { type: styleConfig.eyeDotStyle || undefined, color: styleConfig.eyeColor || undefined },
        image: styleConfig.blendLogo ? undefined : (styleConfig.logoDataUrl || undefined),
        imageOptions: {
          crossOrigin: "anonymous",
          margin: styleConfig.logoMargin * 4,
          imageSize: styleConfig.logoSize,
          hideBackgroundDots: styleConfig.logoBg,
        },
      });

      if (qrRef.current) {
        qrRef.current.innerHTML = "";
        qrCodeInstance.current.append(qrRef.current);
        const svg = qrRef.current.querySelector("svg");
        if (svg) { svg.style.width = "100%"; svg.style.height = "100%"; }
      }
    }
    return () => clearTimeout(t);
  }, [activeType, formData, styleConfig]);

  useEffect(() => {
    saveSettings({ activeType, styleConfig });
  }, [activeType, styleConfig]);

  const handleReset = useCallback(() => {
    setActiveType("url");
    setFormData(DEFAULT_FORM_DATA);
    setStyleConfig(DEFAULT_STYLE);
    setMainTab("style");
  }, []);

  const handleExport = async (format: "png" | "svg" | "jpeg" | "pdf" | "4k") => {
    setExportLoading(format);
    try {
      if (styleConfig.graphicFrame && exportWrapperRef.current) {
        await exportQRFromElement(exportWrapperRef.current, format, styleConfig.bgColor);
      } else {
        await exportQRFromInstance(qrCodeInstance.current, format, styleConfig.bgColor);
      }
      saveToHistory({
        type: activeType, value: qrValue, label: activeType.toUpperCase(),
        fgColor: styleConfig.fgColor, bgColor: styleConfig.bgColor,
        size: styleConfig.size, level: styleConfig.level,
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
      if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000); }
      else alert("Copy failed. Please use Download instead.");
    } catch (e) { console.error(e); }
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }, []);

  const loadTemplate = useCallback((cfg: QRStyleConfig, type: string) => {
    setStyleConfig(cfg); setActiveType(type);
  }, []);

  const glowColor = TYPE_GLOW[activeType] || "var(--accent)";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg)" }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 h-14 border-b"
        style={{ backgroundColor: "color-mix(in srgb, var(--bg) 95%, transparent)", backdropFilter: "blur(12px)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-3">
          <Link href="/#studio" className="flex items-center gap-1.5 text-sm font-medium transition-colors" style={{ color: "var(--fg-muted)" }}>
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <span style={{ color: "var(--border-strong)" }}>·</span>
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4" style={{ color: "var(--accent)" }} />
            <span className="text-sm font-bold" style={{ color: "var(--fg)" }}>Style Studio</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleReset} className="btn-outline py-1.5 px-3 text-xs gap-1.5" title="Reset to defaults">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            onClick={() => handleExport("png")}
            disabled={!!exportLoading}
            className="btn-primary py-1.5 px-4 text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            {exportLoading === "png" ? "Exporting…" : "Download PNG"}
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* LEFT PANEL — tabs */}
        <div className="lg:w-[420px] xl:w-[480px] shrink-0 flex flex-col border-r overflow-y-auto" style={{ borderColor: "var(--border)" }}>
          {/* Tab switcher */}
          <div className="flex gap-0 border-b sticky top-0 z-10" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
            {([
              { id: "content", label: "1. Enter Content" },
              { id: "style", label: "2. Customize Design" },
            ] as { id: MainTab; label: string }[]).map(t => (
              <button
                key={t.id}
                onClick={() => setMainTab(t.id)}
                className="flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors relative"
                style={{ color: mainTab === t.id ? "var(--accent)" : "var(--fg-muted)" }}
              >
                {t.label}
                {mainTab === t.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: "var(--accent)" }} />
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 p-4 md:p-6">
            <AnimatePresence mode="wait">
              {mainTab === "style" && (
                <motion.div key="style" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.15 }}>
                  <StyleTab config={styleConfig} updateConfig={updateConfig} />
                </motion.div>
              )}
              {mainTab === "content" && (
                <motion.div key="content" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.15 }}>
                  <ContentTab
                    activeType={activeType}
                    setActiveType={setActiveType}
                    formData={formData}
                    onChange={handleChange}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT PANEL — preview */}
        <div className="flex-1 flex flex-col items-center justify-start p-6 md:p-10 overflow-y-auto gap-6">
          {/* QR Preview card */}
          <div
            className="w-full max-w-sm rounded-2xl p-6 shadow-xl relative overflow-hidden"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 30%, ${glowColor}22 0%, transparent 65%)` }}
            />

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <span className="label-xs">Live Preview</span>
                <span className="relative inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-sm" style={{ backgroundColor: "var(--accent)", color: "white" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-dot-pulse" />
                  LIVE
                </span>
              </div>
            </div>

            {/* QR canvas area */}
            <div
              className={`relative flex items-center justify-center rounded-xl mb-4 p-6 ${styleConfig.bgTransparent ? 'checkerboard-bg' : 'dot-grid-bg'}`}
              style={{ minHeight: "300px" }}
            >
              {isUpdating && (
                <div className="shimmer-wrapper z-20"><div className="shimmer-bar" /></div>
              )}

              <div
                ref={exportWrapperRef}
                className="relative flex flex-col items-center justify-center"
                style={{
                  width: styleConfig.graphicFrame ? "280px" : "220px",
                  aspectRatio: styleConfig.graphicFrame ? "1/1" : "auto",
                  backgroundColor: styleConfig.graphicFrame ? "transparent" : (styleConfig.bgTransparent ? "transparent" : styleConfig.bgColor),
                  borderRadius: styleConfig.frameType === "badge" ? "24px" : "8px",
                  padding: styleConfig.graphicFrame ? "0" : (styleConfig.frameType === "none" ? "0" : "16px"),
                  border: styleConfig.frameType !== "none" && !styleConfig.graphicFrame ? `4px solid ${styleConfig.frameColor}` : "none",
                }}
              >
                {styleConfig.graphicFrame && (
                  <img src={styleConfig.graphicFrame} alt="Graphic Frame" className="absolute inset-0 w-full h-full pointer-events-none" />
                )}
                <div className="relative aspect-square flex items-center justify-center rounded z-10" style={{ width: styleConfig.graphicFrame ? "65%" : "100%", backgroundColor: styleConfig.graphicFrame ? styleConfig.bgColor : "transparent" }}>
                  <div ref={qrRef} className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full" />
                </div>
                {(styleConfig.frameType === "standard" || styleConfig.frameType === "badge") && styleConfig.customText && !styleConfig.graphicFrame && (
                  <div className="mt-3 w-full flex justify-center" style={{ backgroundColor: styleConfig.frameColor, padding: "8px", borderRadius: "4px" }}>
                    <span style={{ color: styleConfig.textColor, fontFamily: styleConfig.fontFamily, fontSize: "12px", fontWeight: "bold" }}>
                      {styleConfig.customText}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* QR value pill */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-sm text-[10px] font-mono truncate mb-4 relative z-10"
              style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--fg-muted)" }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: glowColor }} />
              <span className="truncate flex-1">{qrValue || "—"}</span>
            </div>

            {/* Download buttons */}
            <button
              onClick={() => handleExport("png")}
              disabled={!!exportLoading}
              className="btn-primary w-full justify-center mb-2 text-sm"
            >
              <Download className="w-4 h-4" />
              {exportLoading === "png" ? "Rendering…" : "Download PNG"}
            </button>

            <div className="grid grid-cols-2 gap-2 mb-2">
              {([
                { fmt: "svg" as const, label: "SVG", icon: FileType2 },
                { fmt: "jpeg" as const, label: "JPEG", icon: FileImage },
                { fmt: "pdf" as const, label: "PDF", icon: Settings },
                { fmt: "4k" as const, label: "4K PNG", icon: Download },
              ]).map(({ fmt, label, icon: Icon }) => (
                <button
                  key={fmt}
                  onClick={() => handleExport(fmt)}
                  disabled={!!exportLoading}
                  className="btn-outline justify-center py-2 text-[10px] gap-1.5 uppercase font-bold tracking-wide"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {exportLoading === fmt ? "Wait…" : label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button onClick={handleCopy} className="btn-outline justify-center py-2 text-xs gap-1.5">
                {copied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
              </button>
              <button
                onClick={() => navigator.share?.({ title: "QR Design", url: window.location.href })}
                className="btn-outline justify-center py-2 text-xs gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
              <button onClick={handleReset} className="btn-outline justify-center py-2 text-xs gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>
          </div>

          {/* Scan Quality + Saved Designs */}
          <div className="w-full max-w-sm">
            <ScanQuality config={styleConfig} />
            <MyTemplates currentConfig={styleConfig} currentType={activeType} onLoad={loadTemplate} />
          </div>
        </div>
      </div>
    </div>
  );
}
