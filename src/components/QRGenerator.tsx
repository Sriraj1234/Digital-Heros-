"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import {
  Link, Type, Mail, Phone, MessageSquare,
  Wifi, Contact, Download, Copy, Box, ChevronDown
} from "lucide-react";

const QR_TYPES = [
  { id: "url",       icon: Link,           label: "URL" },
  { id: "text",      icon: Type,           label: "Text" },
  { id: "email",     icon: Mail,           label: "Email" },
  { id: "phone",     icon: Phone,          label: "Phone" },
  { id: "whatsapp",  icon: MessageSquare,  label: "WhatsApp" },
  { id: "wifi",      icon: Wifi,           label: "WiFi" },
  { id: "vcard",     icon: Contact,        label: "vCard" },
];

const ERROR_LEVELS = [
  { value: "L", label: "Low (7%)" },
  { value: "M", label: "Medium (15%)" },
  { value: "Q", label: "Quartile (25%)" },
  { value: "H", label: "High (30%)" },
];

function InputField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full bg-[#0a0a0a] border border-[#2a2a2a] focus:border-[#e63946] text-white text-sm px-3.5 py-2.5 rounded-sm outline-none transition-colors placeholder:text-[#3a3a3a]"
      />
    </div>
  );
}

function TextAreaField({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-1.5">{label}</label>
      <textarea
        {...props}
        className="w-full bg-[#0a0a0a] border border-[#2a2a2a] focus:border-[#e63946] text-white text-sm px-3.5 py-2.5 rounded-sm outline-none transition-colors placeholder:text-[#3a3a3a] resize-none h-28"
      />
    </div>
  );
}

function SelectField({ label, children, ...props }: { label: string } & React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-1.5">{label}</label>
      <div className="relative">
        <select
          {...props}
          className="w-full appearance-none bg-[#0a0a0a] border border-[#2a2a2a] focus:border-[#e63946] text-white text-sm px-3.5 py-2.5 rounded-sm outline-none transition-colors pr-8"
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6b7280] pointer-events-none" />
      </div>
    </div>
  );
}

export default function QRGenerator() {
  const [activeType, setActiveType] = useState("url");
  const [qrValue, setQrValue] = useState("https://example.com");
  const [fgColor, setFgColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#0a0a0a");
  const [size] = useState(300);
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("H");
  const [includeMargin, setIncludeMargin] = useState(true);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState<Record<string, string | boolean>>({
    url: "https://example.com",
    text: "", email: "", subject: "", body: "",
    phone: "", whatsapp: "", waMessage: "",
    ssid: "", password: "", networkType: "WPA", hidden: false,
    vName: "", vPhone: "", vEmail: "", vCompany: "", vTitle: "",
  });

  const buildQrValue = useCallback(() => {
    switch (activeType) {
      case "url":     return (formData.url as string) || "https://example.com";
      case "text":    return (formData.text as string) || "Hello World";
      case "email":   return `mailto:${formData.email}?subject=${encodeURIComponent(formData.subject as string)}&body=${encodeURIComponent(formData.body as string)}`;
      case "phone":   return `tel:${formData.phone}`;
      case "whatsapp":return `https://wa.me/${(formData.whatsapp as string).replace(/\D/g, "")}?text=${encodeURIComponent(formData.waMessage as string)}`;
      case "wifi":    return `WIFI:S:${formData.ssid};T:${formData.networkType};P:${formData.password};H:${formData.hidden};;`;
      case "vcard":   return `BEGIN:VCARD\nVERSION:3.0\nFN:${formData.vName}\nORG:${formData.vCompany}\nTITLE:${formData.vTitle}\nTEL:${formData.vPhone}\nEMAIL:${formData.vEmail}\nEND:VCARD`;
      default:        return "https://example.com";
    }
  }, [activeType, formData]);

  useEffect(() => {
    setQrValue(buildQrValue());
  }, [buildQrValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const downloadPNG = () => {
    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-launchpad.png";
    a.click();
  };

  const downloadSVG = () => {
    const svg = document.getElementById("qr-svg");
    if (!svg) return;
    const data = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([data], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-launchpad.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyImage = async () => {
    try {
      const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
      if (!canvas) return;
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch { /* noop */ }
  };

  return (
    <section id="generator" className="py-24 border-t border-[#1f1f1f]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-12">
          <span className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest">Mission Control</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Configure your QR</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">

          {/* Controls */}
          <div className="bg-[#111] border border-[#1f1f1f] rounded-sm p-6 md:p-8">

            {/* Type Tabs */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {QR_TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveType(t.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-xs font-semibold transition-all duration-200 ${
                    activeType === t.id
                      ? "bg-white text-black"
                      : "border border-[#2a2a2a] text-[#6b7280] hover:text-white hover:border-[#3a3a3a]"
                  }`}
                >
                  <t.icon className="w-3.5 h-3.5" />
                  {t.label}
                </button>
              ))}
            </div>

            {/* Dynamic inputs */}
            <div className="space-y-4 mb-8">
              {activeType === "url" && <InputField label="Website URL" type="url" name="url" value={formData.url as string} onChange={handleChange} placeholder="https://example.com" />}
              {activeType === "text" && <TextAreaField label="Plain Text" name="text" value={formData.text as string} onChange={handleChange} placeholder="Enter any text..." />}
              {activeType === "email" && (
                <>
                  <InputField label="Email Address" type="email" name="email" value={formData.email as string} onChange={handleChange} placeholder="hello@example.com" />
                  <InputField label="Subject" type="text" name="subject" value={formData.subject as string} onChange={handleChange} placeholder="Inquiry" />
                  <TextAreaField label="Body" name="body" value={formData.body as string} onChange={handleChange} placeholder="Hello there..." />
                </>
              )}
              {activeType === "phone" && <InputField label="Phone Number" type="tel" name="phone" value={formData.phone as string} onChange={handleChange} placeholder="+1 234 567 8900" />}
              {activeType === "whatsapp" && (
                <>
                  <InputField label="WhatsApp Number (with country code)" type="tel" name="whatsapp" value={formData.whatsapp as string} onChange={handleChange} placeholder="1234567890" />
                  <TextAreaField label="Pre-filled Message" name="waMessage" value={formData.waMessage as string} onChange={handleChange} placeholder="I'm interested in your services." />
                </>
              )}
              {activeType === "wifi" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Network Name (SSID)" type="text" name="ssid" value={formData.ssid as string} onChange={handleChange} placeholder="MyNetwork" />
                  <InputField label="Password" type="password" name="password" value={formData.password as string} onChange={handleChange} placeholder="••••••••" />
                  <SelectField label="Security Type" name="networkType" value={formData.networkType as string} onChange={handleChange}>
                    <option value="WPA">WPA/WPA2/WPA3</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None</option>
                  </SelectField>
                  <div className="flex items-center gap-2 pt-6">
                    <input type="checkbox" id="hidden" name="hidden" checked={formData.hidden as boolean} onChange={handleChange} className="w-4 h-4 accent-[#e63946]" />
                    <label htmlFor="hidden" className="text-sm text-[#6b7280]">Hidden Network</label>
                  </div>
                </div>
              )}
              {activeType === "vcard" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Full Name" type="text" name="vName" value={formData.vName as string} onChange={handleChange} placeholder="John Doe" />
                  <InputField label="Phone" type="tel" name="vPhone" value={formData.vPhone as string} onChange={handleChange} placeholder="+1 234 567 8900" />
                  <InputField label="Email" type="email" name="vEmail" value={formData.vEmail as string} onChange={handleChange} placeholder="john@example.com" />
                  <InputField label="Company" type="text" name="vCompany" value={formData.vCompany as string} onChange={handleChange} placeholder="Acme Corp" />
                  <div className="md:col-span-2">
                    <InputField label="Job Title" type="text" name="vTitle" value={formData.vTitle as string} onChange={handleChange} placeholder="Software Engineer" />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-[#1f1f1f] pt-6">
              <span className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-4">Appearance</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* FG Color */}
                <div>
                  <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-1.5">QR Color</label>
                  <div className="flex gap-2">
                    <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-10 h-10 rounded-sm border border-[#2a2a2a] bg-transparent cursor-pointer p-0.5" />
                    <input type="text" value={fgColor} onChange={e => setFgColor(e.target.value)} className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] focus:border-[#e63946] text-white text-sm px-3.5 py-2.5 rounded-sm outline-none uppercase" />
                  </div>
                </div>
                {/* BG Color */}
                <div>
                  <label className="block text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-1.5">Background</label>
                  <div className="flex gap-2">
                    <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-10 rounded-sm border border-[#2a2a2a] bg-transparent cursor-pointer p-0.5" />
                    <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] focus:border-[#e63946] text-white text-sm px-3.5 py-2.5 rounded-sm outline-none uppercase" />
                  </div>
                </div>
                {/* Error level */}
                <SelectField label="Error Correction" name="level" value={level} onChange={e => setLevel(e.target.value as "L" | "M" | "Q" | "H")}>
                  {ERROR_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                </SelectField>
                {/* Margin */}
                <SelectField label="Margin" name="margin" value={includeMargin ? "yes" : "no"} onChange={e => setIncludeMargin(e.target.value === "yes")}>
                  <option value="yes">Include Margin</option>
                  <option value="no">No Margin</option>
                </SelectField>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="sticky top-24 flex flex-col gap-4">
            <div className="bg-[#111] border border-[#1f1f1f] rounded-sm p-6">
              <span className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-5">Live Preview</span>

              {/* Hidden canvas for download */}
              <div className="hidden">
                <QRCodeCanvas id="qr-canvas" value={qrValue || " "} size={size} fgColor={fgColor} bgColor={bgColor} level={level} includeMargin={includeMargin} />
              </div>

              {/* SVG preview */}
              <motion.div
                className="flex items-center justify-center p-4 rounded-sm mb-5"
                style={{ backgroundColor: bgColor, border: `1px solid #2a2a2a` }}
                key={qrValue + fgColor + bgColor + level}
                initial={{ opacity: 0.7, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <QRCodeSVG
                  id="qr-svg"
                  value={qrValue || " "}
                  size={240}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  level={level}
                  includeMargin={includeMargin}
                />
              </motion.div>

              {/* Download buttons */}
              <button
                onClick={downloadPNG}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-[#e63946] hover:text-white text-black font-semibold text-sm py-3 rounded-sm transition-all duration-200 mb-2"
              >
                <Download className="w-4 h-4" />
                Download PNG
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={downloadSVG}
                  className="flex items-center justify-center gap-1.5 border border-[#2a2a2a] hover:border-[#3a3a3a] text-[#a1a1aa] hover:text-white text-xs font-medium py-2.5 rounded-sm transition-all duration-200"
                >
                  <Box className="w-3.5 h-3.5" />
                  SVG
                </button>
                <button
                  onClick={copyImage}
                  className="flex items-center justify-center gap-1.5 border border-[#2a2a2a] hover:border-[#3a3a3a] text-[#a1a1aa] hover:text-white text-xs font-medium py-2.5 rounded-sm transition-all duration-200"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
