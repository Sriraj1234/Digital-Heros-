"use client";

import { Activity, AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import { QRStyleConfig } from "./StyleTab";

interface ScanQualityProps {
  config: QRStyleConfig;
}

// Helper to calculate relative luminance
function getLuminance(hex: string) {
  let c = hex.substring(1);
  if (c.length === 3) c = c.split("").map((char) => char + char).join("");
  const rgb = parseInt(c, 16);
  let r = (rgb >> 16) & 0xff;
  let g = (rgb >> 8) & 0xff;
  let b = (rgb >> 0) & 0xff;

  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Helper to calculate contrast ratio
function getContrastRatio(l1: number, l2: number) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function ScanQuality({ config }: ScanQualityProps) {
  const l1 = getLuminance(config.bgColor || "#FFFFFF");
  const l2 = getLuminance(config.fgColor || "#000000");
  const contrast = getContrastRatio(l1, l2);

  let score = 100;
  let status: "Excellent" | "Good" | "Average" | "Poor" = "Excellent";
  let warnings: string[] = [];

  // 1. Contrast Check
  if (contrast < 3) {
    score -= 60;
    warnings.push("Contrast is too low. Scanners may fail to read it.");
  } else if (contrast < 4.5) {
    score -= 20;
    warnings.push("Contrast is moderate. Try darker QR / lighter background.");
  }

  // 2. Logo Size Check
  if (config.logoDataUrl) {
    if (config.logoSize > 0.4 && config.level !== "H") {
      score -= 30;
      warnings.push("Large logo requires 'High' Error Correction Level.");
    } else if (config.logoSize > 0.4) {
      score -= 10;
      warnings.push("Logo is very large. Test scan carefully.");
    }
  }

  // 3. Error Correction Level Check
  if (config.level === "L" && config.logoDataUrl) {
    score -= 40;
    warnings.push("Logo applied with 'Low' Error Correction. Data loss likely.");
  }

  // Status mapping
  if (score >= 90) status = "Excellent";
  else if (score >= 70) status = "Good";
  else if (score >= 50) status = "Average";
  else status = "Poor";

  return (
    <div className="card p-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5" style={{ color: "var(--fg-muted)" }}>
          <Activity className="w-3.5 h-3.5" /> Scan Quality Engine
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${
          status === "Excellent" ? "bg-green-500/20 text-green-500" :
          status === "Good" ? "bg-blue-500/20 text-blue-500" :
          status === "Average" ? "bg-yellow-500/20 text-yellow-500" :
          "bg-red-500/20 text-red-500"
        }`}>
          {status}
        </span>
      </div>

      <div className="space-y-2">
        {warnings.length === 0 ? (
          <div className="flex items-start gap-2 text-green-500">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="text-xs">QR code is highly readable. Perfect contrast and error correction.</p>
          </div>
        ) : (
          warnings.map((w, i) => (
             <div key={i} className={`flex items-start gap-2 ${status === "Poor" ? "text-red-500" : "text-yellow-500"}`}>
               {status === "Poor" ? <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />}
               <p className="text-xs">{w}</p>
             </div>
          ))
        )}
      </div>
    </div>
  );
}
