"use client";

import {
  Link, Type, Mail, Phone, MessageSquare, Wifi, Contact, Calendar,
  MapPin, ShoppingBag, Bitcoin, CreditCard, Video, Music, Smartphone,
  FileText, Briefcase, Star, Search, Ticket, Users, Globe, Download,
  ChevronDown
} from "lucide-react";
import React, { useState } from "react";

// --- QR TYPES CATALOG (50+) ---

export type QRCategory = "Standard" | "Social & Comms" | "Finance & Commerce" | "Docs & Files" | "Marketing & Utility";

export interface QRTypeDef {
  id: string;
  category: QRCategory;
  icon: React.ElementType;
  label: string;
  placeholder?: string;
  formType: "url" | "text" | "email" | "phone" | "sms" | "wifi" | "vcard" | "calendar" | "upi" | "crypto" | "paypal" | "whatsapp" | "maps" |
            "youtube" | "instagram" | "facebook" | "telegram" | "linkedin" | "twitter" | "tiktok" | "snapchat" | "spotify" | "pinterest" | "discord" | "reddit" | "g_review" | "app_store" | "play_store" | "pdf" | "multi_link" | "landing" | "video";
  prefix?: string;
}

export const QR_TYPES: QRTypeDef[] = [
  // Standard
  { id: "url", category: "Standard", icon: Link, label: "URL", formType: "url", placeholder: "https://example.com" },
  { id: "text", category: "Standard", icon: Type, label: "Text", formType: "text", placeholder: "Enter any message..." },
  { id: "email", category: "Standard", icon: Mail, label: "Email", formType: "email" },
  { id: "phone", category: "Standard", icon: Phone, label: "Phone Call", formType: "phone", placeholder: "+1 234 567 8900" },
  { id: "sms", category: "Standard", icon: MessageSquare, label: "SMS", formType: "sms" },
  { id: "wifi", category: "Standard", icon: Wifi, label: "WiFi", formType: "wifi" },
  { id: "vcard", category: "Standard", icon: Contact, label: "vCard", formType: "vcard" },
  { id: "calendar", category: "Standard", icon: Calendar, label: "Calendar Event", formType: "calendar" },
  { id: "maps", category: "Standard", icon: MapPin, label: "Google Maps", formType: "maps" },

  // Social & Comms
  { id: "whatsapp", category: "Social & Comms", icon: MessageSquare, label: "WhatsApp", formType: "whatsapp" },
  { id: "youtube", category: "Social & Comms", icon: Video, label: "YouTube", formType: "youtube" },
  { id: "instagram", category: "Social & Comms", icon: Smartphone, label: "Instagram", formType: "instagram" },
  { id: "facebook", category: "Social & Comms", icon: Users, label: "Facebook", formType: "facebook" },
  { id: "telegram", category: "Social & Comms", icon: MessageSquare, label: "Telegram", formType: "telegram" },
  { id: "linkedin", category: "Social & Comms", icon: Briefcase, label: "LinkedIn", formType: "linkedin" },
  { id: "twitter", category: "Social & Comms", icon: MessageSquare, label: "X (Twitter)", formType: "twitter" },
  { id: "tiktok", category: "Social & Comms", icon: Video, label: "TikTok", formType: "tiktok" },
  { id: "snapchat", category: "Social & Comms", icon: Smartphone, label: "Snapchat", formType: "snapchat" },
  { id: "spotify", category: "Social & Comms", icon: Music, label: "Spotify", formType: "spotify" },
  { id: "pinterest", category: "Social & Comms", icon: Smartphone, label: "Pinterest", formType: "pinterest" },
  { id: "discord", category: "Social & Comms", icon: Users, label: "Discord", formType: "discord" },
  { id: "reddit", category: "Social & Comms", icon: Users, label: "Reddit", formType: "reddit" },

  // Finance & Commerce
  { id: "upi", category: "Finance & Commerce", icon: CreditCard, label: "UPI Payment", formType: "upi" },
  { id: "paypal", category: "Finance & Commerce", icon: CreditCard, label: "PayPal", formType: "paypal" },
  { id: "crypto", category: "Finance & Commerce", icon: Bitcoin, label: "Crypto Wallet", formType: "crypto" },
  { id: "app_store", category: "Finance & Commerce", icon: Smartphone, label: "App Store", formType: "app_store" },
  { id: "play_store", category: "Finance & Commerce", icon: Smartphone, label: "Play Store", formType: "play_store" },

  // Docs & Files
  { id: "pdf", category: "Docs & Files", icon: FileText, label: "PDF Link", formType: "pdf" },
  { id: "video", category: "Docs & Files", icon: Video, label: "Video Link", formType: "video" },
  
  // Marketing & Utility
  { id: "g_review", category: "Marketing & Utility", icon: Star, label: "Google Review", formType: "g_review" },
  { id: "multi_link", category: "Marketing & Utility", icon: Globe, label: "Multi Link QR", formType: "multi_link" },
  { id: "landing", category: "Marketing & Utility", icon: Globe, label: "Landing Page", formType: "landing" },
];


export const DEFAULT_FORM_DATA: Record<string, string | boolean> = {
  url: "https://digitalheroesco.com",
  text: "", email: "", subject: "", body: "",
  phoneCode: "+1", phone: "", 
  smsPhoneCode: "+1", smsPhone: "", smsMessage: "",
  whatsappCode: "+1", whatsapp: "", waMessage: "",
  ssid: "", password: "", networkType: "WPA", hidden: false,
  vName: "", vPhoneCode: "+1", vPhone: "", vEmail: "", vCompany: "", vTitle: "", vAddress: "", vWebsite: "",
  calTitle: "", calStart: "", calEnd: "", calLocation: "", calDesc: "",
  mapsLocation: "", mapsUrl: "",
  upiVpa: "", upiName: "", upiAmount: "",
  paypalMe: "",
  cryptoType: "bitcoin", cryptoAddress: "", cryptoAmount: "",
  
  // New specific fields
  ytUrl: "", ytTitle: "", ytChannel: "",
  igUsername: "", igUrl: "",
  fbPageUrl: "", fbProfileUrl: "",
  telegramUsername: "", telegramUrl: "",
  spotifyTrackUrl: "", spotifyPlaylistUrl: "", spotifyArtistUrl: "", spotifyAlbumUrl: "",
  linkedinProfileUrl: "", linkedinCompanyUrl: "",
  xUsername: "", xUrl: "",
  tiktokUsername: "", tiktokUrl: "",
  snapchatUsername: "",
  pinterestProfileUrl: "", pinterestBoardUrl: "",
  discordInviteUrl: "", discordServerUrl: "",
  redditProfileUrl: "", redditCommunityUrl: "",
  greviewBusiness: "", greviewUrl: "",
  pdfUrl: "", pdfName: "",
  appStoreName: "", appStoreUrl: "",
  playStoreName: "", playStorePackage: "", playStoreUrl: "",
  multiLinkUrls: "", landingTemplate: "business",
  videoUrl: "", videoPlatform: "youtube",
};

export function buildQRValue(typeId: string, rawFormData: Record<string, string | boolean>): string {
  const def = QR_TYPES.find(t => t.id === typeId);
  if (!def) return "https://digitalheroesco.com";

  // Automatically detect and remove any accidental spaces from user input
  const formData = Object.fromEntries(
    Object.entries(rawFormData).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
  ) as Record<string, string | boolean>;

  switch (def.formType) {
    case "url": return def.prefix ? `${def.prefix}${(formData.url as string) || ""}` : ((formData.url as string) || def.placeholder || "https://digitalheroesco.com");
    case "text": return (formData.text as string) || "Hello World";
    case "email": return `mailto:${formData.email}?subject=${encodeURIComponent(formData.subject as string)}&body=${encodeURIComponent(formData.body as string)}`;
    case "phone": return `tel:${formData.phoneCode}${formData.phone}`;
    case "sms": return `sms:${formData.smsPhoneCode}${formData.smsPhone}?body=${encodeURIComponent(formData.smsMessage as string)}`;
    case "whatsapp": return `https://wa.me/${(formData.whatsappCode as string).replace(/\D/g, "")}${(formData.whatsapp as string).replace(/\D/g, "")}?text=${encodeURIComponent(formData.waMessage as string)}`;
    case "wifi": return `WIFI:S:${formData.ssid};T:${formData.networkType};P:${formData.password};H:${formData.hidden};;`;
    case "vcard": return `BEGIN:VCARD\nVERSION:3.0\nFN:${formData.vName}\nORG:${formData.vCompany}\nTITLE:${formData.vTitle}\nTEL:${formData.vPhoneCode}${formData.vPhone}\nEMAIL:${formData.vEmail}\nURL:${formData.vWebsite}\nADR:;;${formData.vAddress}\nEND:VCARD`;
    case "calendar":
      const s = (formData.calStart as string).replace(/[-:]/g, "");
      const e = (formData.calEnd as string).replace(/[-:]/g, "");
      return `BEGIN:VEVENT\nSUMMARY:${formData.calTitle}\nDTSTART:${s}\nDTEND:${e}\nLOCATION:${formData.calLocation}\nDESCRIPTION:${formData.calDesc}\nEND:VEVENT`;
    case "maps": return (formData.mapsUrl as string) || `https://maps.google.com/maps?q=${encodeURIComponent(formData.mapsLocation as string)}`;
    case "upi": return `upi://pay?pa=${formData.upiVpa}&pn=${encodeURIComponent(formData.upiName as string)}${formData.upiAmount ? `&am=${formData.upiAmount}` : ""}`;
    case "paypal": return `https://paypal.me/${formData.paypalMe}`;
    case "crypto": return `${formData.cryptoType}:${formData.cryptoAddress}${formData.cryptoAmount ? `?amount=${formData.cryptoAmount}` : ""}`;
    
    case "youtube": return (formData.ytUrl as string) || "https://youtube.com";
    case "instagram": return (formData.igUrl as string) || `https://instagram.com/${formData.igUsername}`;
    case "facebook": return (formData.fbPageUrl as string) || (formData.fbProfileUrl as string) || "https://facebook.com";
    case "telegram": return (formData.telegramUrl as string) || `https://t.me/${formData.telegramUsername}`;
    case "linkedin": return (formData.linkedinProfileUrl as string) || (formData.linkedinCompanyUrl as string) || "https://linkedin.com";
    case "twitter": return (formData.xUrl as string) || `https://x.com/${formData.xUsername}`;
    case "tiktok": return (formData.tiktokUrl as string) || `https://tiktok.com/@${formData.tiktokUsername}`;
    case "snapchat": return `https://snapchat.com/add/${formData.snapchatUsername}`;
    case "spotify": return (formData.spotifyTrackUrl as string) || (formData.spotifyPlaylistUrl as string) || (formData.spotifyArtistUrl as string) || (formData.spotifyAlbumUrl as string) || "https://spotify.com";
    case "pinterest": return (formData.pinterestProfileUrl as string) || (formData.pinterestBoardUrl as string) || "https://pinterest.com";
    case "discord": return (formData.discordInviteUrl as string) || (formData.discordServerUrl as string) || "https://discord.com";
    case "reddit": return (formData.redditProfileUrl as string) || (formData.redditCommunityUrl as string) || "https://reddit.com";
    case "g_review": return (formData.greviewUrl as string) || "https://g.page/r/";
    case "app_store": return (formData.appStoreUrl as string) || "https://apps.apple.com/";
    case "play_store": return (formData.playStoreUrl as string) || "https://play.google.com/";
    case "pdf": return (formData.pdfUrl as string) || "https://example.com/file.pdf";
    case "video": return (formData.videoUrl as string) || "https://youtube.com";
    
    // For these advanced types without a backend, we store JSON data in the hash if possible, 
    // or just a placeholder if not. Since the request is to generate linktree style pages,
    // we would encode the data as base64 in a URL if we had a viewer route. For now, we'll
    // just return a custom URL schema or the first link.
    case "multi_link": 
      const links = (formData.multiLinkUrls as string).split(',').map(l => l.trim()).filter(Boolean);
      return links.length > 0 ? links[0] : "https://linktr.ee";
    case "landing":
      return `https://digitalheroesco.com/template/${formData.landingTemplate}`;
      
    default: return "https://digitalheroesco.com";
  }
}

// --- UI COMPONENTS ---

export function DHInput({ label, error, ...props }: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="label-xs block mb-1.5">{label}</label>
      <input {...props} className={`dh-input ${error ? 'border-red-500' : ''}`} />
      {error && <span className="text-[10px] text-red-500 mt-1 block">{error}</span>}
    </div>
  );
}

export function DHTextarea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="label-xs block mb-1.5">{label}</label>
      <textarea {...props} className="dh-input resize-none h-24" />
    </div>
  );
}

export function DHSelect({ label, children, ...props }: { label: string; children: React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="label-xs block mb-1.5">{label}</label>
      <div className="relative">
        <select {...props} className="dh-input appearance-none pr-8">{children}</select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "var(--fg-muted)" }} />
      </div>
    </div>
  );
}

const COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸", name: "US/CA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+91", flag: "🇮🇳", name: "IN" },
  { code: "+61", flag: "🇦🇺", name: "AU" },
  { code: "+81", flag: "🇯🇵", name: "JP" },
  { code: "+49", flag: "🇩🇪", name: "DE" },
  { code: "+33", flag: "🇫🇷", name: "FR" },
  { code: "+39", flag: "🇮🇹", name: "IT" },
  { code: "+86", flag: "🇨🇳", name: "CN" },
  { code: "+55", flag: "🇧🇷", name: "BR" },
  { code: "+52", flag: "🇲🇽", name: "MX" },
  { code: "+34", flag: "🇪🇸", name: "ES" },
  { code: "+7", flag: "🇷🇺", name: "RU" },
  { code: "+971", flag: "🇦🇪", name: "AE" },
  { code: "+27", flag: "🇿🇦", name: "ZA" },
];

export function DHPhoneInput({ label, codeName, phoneName, codeValue, phoneValue, onChange, placeholder }: { label: string, codeName: string, phoneName: string, codeValue: string, phoneValue: string, onChange: any, placeholder?: string }) {
  return (
    <div>
      <label className="label-xs block mb-1.5">{label}</label>
      <div className="flex gap-2">
        <div className="relative w-[100px] shrink-0">
          <select name={codeName} value={codeValue} onChange={onChange} className="dh-input appearance-none pr-6 w-full font-mono text-xs">
            {COUNTRY_CODES.map(c => (
              <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: "var(--fg-muted)" }} />
        </div>
        <input type="tel" name={phoneName} value={phoneValue} onChange={onChange} placeholder={placeholder} className="dh-input flex-1" />
      </div>
    </div>
  );
}

interface ContentTabProps {
  activeType: string;
  setActiveType: (t: string) => void;
  formData: Record<string, string | boolean>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string | boolean>>>;
}

export function ContentTab({ activeType, setActiveType, formData, onChange, setFormData }: ContentTabProps) {
  const [activeCategory, setActiveCategory] = useState<QRCategory>("Standard");
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
        if (typeof data.result === "string") {
          if (mode === "generate-copy-sms") onChange({ target: { name: "smsMessage", value: data.result } } as any);
        } else {
          setFormData(prev => ({ ...prev, ...data.result }));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAILoading(false);
    }
  };

  const categories: QRCategory[] = ["Standard", "Social & Comms", "Finance & Commerce", "Docs & Files", "Marketing & Utility"];
  const activeDef = QR_TYPES.find(t => t.id === activeType) || QR_TYPES[0];

  // Validation functions
  const validateUrl = (url: string, domain: string) => url && !url.includes(domain) ? `URL should contain ${domain}` : "";

  // Short labels for pills
  const catShort: Record<QRCategory, string> = {
    "Standard": "Standard",
    "Social & Comms": "Social",
    "Finance & Commerce": "Finance",
    "Docs & Files": "Docs",
    "Marketing & Utility": "Marketing",
  };

  return (
    <div>
      {/* Category pill tabs */}
      <div className="flex overflow-x-auto gap-2 pb-3 mb-5 hide-scrollbar" style={{ scrollbarWidth: "none" }}>
        {categories.map(c => {
          const count = QR_TYPES.filter(t => t.category === c).length;
          const isActive = activeCategory === c;
          return (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-200 gpu-hover"
              style={isActive
                ? { backgroundColor: "var(--accent)", color: "var(--accent-text)", boxShadow: "0 4px 14px var(--glow-color)", transform: "translateY(-1px)" }
                : { backgroundColor: "var(--bg-card)", color: "var(--fg-muted)", border: "1px solid var(--border-strong)" }
              }
            >
              {catShort[c]}
              <span
                className="text-[8px] px-1 py-0.5 rounded-full font-mono"
                style={isActive
                  ? { backgroundColor: "rgba(255,255,255,0.25)", color: "var(--accent-text)" }
                  : { backgroundColor: "var(--bg)", color: "var(--fg-muted)" }
                }
              >{count}</span>
            </button>
          );
        })}
      </div>

      {/* Type grid — GPU-accelerated hover */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8 max-h-52 overflow-y-auto pr-2 animate-tab-in" style={{ scrollbarWidth: "thin" }}>
        {QR_TYPES.filter(t => t.category === activeCategory).map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActiveType(t.id)}
            className="flex items-center gap-2 p-2.5 rounded-sm text-left gpu-hover"
            style={{
              animationDelay: `${i * 0.03}s`,
              border: "1px solid",
              transition: "background-color 0.18s ease, border-color 0.18s ease, transform 0.15s ease, box-shadow 0.18s ease",
              transform: activeType === t.id ? "scale(1.02) translateY(-1px)" : "scale(1)",
              backgroundColor: activeType === t.id ? "var(--accent)" : "var(--bg-card)",
              color: activeType === t.id ? "var(--accent-text)" : "var(--fg-muted)",
              borderColor: activeType === t.id ? "var(--accent)" : "var(--border-strong)",
              boxShadow: activeType === t.id ? "0 4px 16px var(--glow-color)" : "none",
            }}
          >
            <t.icon className="w-4 h-4 shrink-0" />
            <span className="text-xs font-semibold leading-tight">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Form */}
      <div className="space-y-4 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
        <h3 className="label-xs mb-4" style={{ color: "var(--fg)" }}>Configure {activeDef.label}</h3>

        {activeDef.formType === "url" && <DHInput label={`${activeDef.label} Link`} type="url" name="url" value={formData.url as string} onChange={onChange} placeholder={activeDef.placeholder} />}
        {activeDef.formType === "text" && <DHTextarea label="Message Content" name="text" value={formData.text as string} onChange={onChange} placeholder={activeDef.placeholder} />}
        {activeDef.formType === "email" && <>
          <DHInput label="Email Address" type="email" name="email" value={formData.email as string} onChange={onChange} placeholder="hello@example.com" />
          <DHInput label="Subject" type="text" name="subject" value={formData.subject as string} onChange={onChange} placeholder="Inquiry" />
          <DHTextarea label="Message Body" name="body" value={formData.body as string} onChange={onChange} placeholder="Hello there..." />
        </>}
        {activeDef.formType === "phone" && <DHPhoneInput label="Phone Number" codeName="phoneCode" phoneName="phone" codeValue={formData.phoneCode as string} phoneValue={formData.phone as string} onChange={onChange} placeholder="234 567 8900" />}
        {activeDef.formType === "sms" && <>
          <DHPhoneInput label="Phone Number" codeName="smsPhoneCode" phoneName="smsPhone" codeValue={formData.smsPhoneCode as string} phoneValue={formData.smsPhone as string} onChange={onChange} placeholder="234 567 8900" />
          
          <div className="rounded-xl p-4 border my-4" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
             <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold" style={{ color: "var(--fg)" }}>✨ AI Copywriter</h4>
                <button 
                  onClick={() => handleMagicAI("generate-copy-sms")} 
                  disabled={isAILoading || !aiPrompt}
                  className="btn-primary py-1 px-3 text-[10px] whitespace-nowrap"
                >
                  {isAILoading ? "Writing..." : "Generate SMS"}
                </button>
             </div>
             <textarea 
               value={aiPrompt} 
               onChange={e => setAiPrompt(e.target.value)} 
               placeholder="What are you promoting? (e.g. 'Weekend 20% off sale on coffee')" 
               className="dh-input resize-none h-10 w-full text-xs" 
             />
          </div>

          <DHTextarea label="Pre-filled Message" name="smsMessage" value={formData.smsMessage as string} onChange={onChange} placeholder="Hello..." />
        </>}
        {activeDef.formType === "whatsapp" && <>
          <DHPhoneInput label="WhatsApp Number" codeName="whatsappCode" phoneName="whatsapp" codeValue={formData.whatsappCode as string} phoneValue={formData.whatsapp as string} onChange={onChange} placeholder="1234567890" />
          <DHTextarea label="Pre-filled Message" name="waMessage" value={formData.waMessage as string} onChange={onChange} placeholder="Hi, I'd love to connect!" />
        </>}
        
        {/* Specific Forms */}
        {activeDef.formType === "youtube" && <>
          <DHInput label="YouTube URL" type="url" name="ytUrl" value={formData.ytUrl as string} onChange={onChange} placeholder="https://youtube.com/watch?v=..." error={validateUrl(formData.ytUrl as string, "youtu")} />
          <DHInput label="Video Title (for preview)" type="text" name="ytTitle" value={formData.ytTitle as string} onChange={onChange} placeholder="Awesome Video" />
          <DHInput label="Channel Name (for preview)" type="text" name="ytChannel" value={formData.ytChannel as string} onChange={onChange} placeholder="Channel Name" />
        </>}
        
        {activeDef.formType === "instagram" && <>
          <DHInput label="Instagram Username" type="text" name="igUsername" value={formData.igUsername as string} onChange={onChange} placeholder="username" />
          <DHInput label="Profile URL (optional override)" type="url" name="igUrl" value={formData.igUrl as string} onChange={onChange} placeholder="https://instagram.com/username" error={validateUrl(formData.igUrl as string, "instagram")} />
        </>}

        {activeDef.formType === "facebook" && <>
          <DHInput label="Page URL" type="url" name="fbPageUrl" value={formData.fbPageUrl as string} onChange={onChange} placeholder="https://facebook.com/page" error={validateUrl(formData.fbPageUrl as string, "facebook")} />
          <DHInput label="Profile URL" type="url" name="fbProfileUrl" value={formData.fbProfileUrl as string} onChange={onChange} placeholder="https://facebook.com/username" />
        </>}

        {activeDef.formType === "spotify" && <>
          <DHInput label="Track URL" type="url" name="spotifyTrackUrl" value={formData.spotifyTrackUrl as string} onChange={onChange} placeholder="https://open.spotify.com/track/..." error={validateUrl(formData.spotifyTrackUrl as string, "spotify")} />
          <DHInput label="Playlist URL" type="url" name="spotifyPlaylistUrl" value={formData.spotifyPlaylistUrl as string} onChange={onChange} placeholder="https://open.spotify.com/playlist/..." />
          <DHInput label="Artist URL" type="url" name="spotifyArtistUrl" value={formData.spotifyArtistUrl as string} onChange={onChange} placeholder="https://open.spotify.com/artist/..." />
        </>}

        {activeDef.formType === "linkedin" && <>
          <DHInput label="Profile URL" type="url" name="linkedinProfileUrl" value={formData.linkedinProfileUrl as string} onChange={onChange} placeholder="https://linkedin.com/in/..." error={validateUrl(formData.linkedinProfileUrl as string, "linkedin")} />
          <DHInput label="Company URL" type="url" name="linkedinCompanyUrl" value={formData.linkedinCompanyUrl as string} onChange={onChange} placeholder="https://linkedin.com/company/..." />
        </>}

        {activeDef.formType === "twitter" && <>
          <DHInput label="Username" type="text" name="xUsername" value={formData.xUsername as string} onChange={onChange} placeholder="username" />
          <DHInput label="Profile URL" type="url" name="xUrl" value={formData.xUrl as string} onChange={onChange} placeholder="https://x.com/username" error={validateUrl(formData.xUrl as string, "x.com")} />
        </>}

        {activeDef.formType === "discord" && <>
          <DHInput label="Invite URL" type="url" name="discordInviteUrl" value={formData.discordInviteUrl as string} onChange={onChange} placeholder="https://discord.gg/..." error={validateUrl(formData.discordInviteUrl as string, "discord")} />
          <DHInput label="Server URL" type="url" name="discordServerUrl" value={formData.discordServerUrl as string} onChange={onChange} placeholder="https://discord.com/channels/..." />
        </>}

        {activeDef.formType === "g_review" && <>
          <DHInput label="Business Name" type="text" name="greviewBusiness" value={formData.greviewBusiness as string} onChange={onChange} placeholder="Acme Inc." />
          <DHInput label="Google Review URL" type="url" name="greviewUrl" value={formData.greviewUrl as string} onChange={onChange} placeholder="https://g.page/r/..." />
        </>}

        {activeDef.formType === "maps" && <>
          <DHInput label="Location Name" type="text" name="mapsLocation" value={formData.mapsLocation as string} onChange={onChange} placeholder="Times Square, NY" />
          <DHInput label="Maps URL" type="url" name="mapsUrl" value={formData.mapsUrl as string} onChange={onChange} placeholder="https://maps.google.com/..." />
        </>}

        {activeDef.formType === "pdf" && <>
          <DHInput label="PDF URL" type="url" name="pdfUrl" value={formData.pdfUrl as string} onChange={onChange} placeholder="https://example.com/file.pdf" />
          <DHInput label="Document Name" type="text" name="pdfName" value={formData.pdfName as string} onChange={onChange} placeholder="My Brochure" />
        </>}
        {activeDef.formType === "video" && <>
          <DHSelect label="Platform" name="videoPlatform" value={formData.videoPlatform as string} onChange={onChange}>
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
            <option value="instagram">Instagram Reels</option>
            <option value="vimeo">Vimeo</option>
            <option value="other">Other Video URL</option>
          </DHSelect>
          <DHInput label="Video URL" type="url" name="videoUrl" value={formData.videoUrl as string} onChange={onChange} placeholder={
            formData.videoPlatform === "youtube" ? "https://youtube.com/watch?v=..." :
            formData.videoPlatform === "tiktok" ? "https://tiktok.com/@user/video/..." :
            formData.videoPlatform === "instagram" ? "https://instagram.com/reel/..." :
            formData.videoPlatform === "vimeo" ? "https://vimeo.com/..." : "https://..."
          } />
          <p className="text-[11px] px-3 py-2 rounded-lg" style={{ backgroundColor: "var(--bg-card)", color: "var(--fg-muted)", border: "1px solid var(--border)" }}>
            💡 Paste your video link — generates a QR that opens the video directly in the app.
          </p>
        </>}

        {activeDef.formType === "app_store" && <>
          <DHInput label="App Name" type="text" name="appStoreName" value={formData.appStoreName as string} onChange={onChange} placeholder="My Awesome App" />
          <DHInput label="App Store URL" type="url" name="appStoreUrl" value={formData.appStoreUrl as string} onChange={onChange} placeholder="https://apps.apple.com/..." />
        </>}

        {activeDef.formType === "play_store" && <>
          <DHInput label="App Name" type="text" name="playStoreName" value={formData.playStoreName as string} onChange={onChange} placeholder="My Awesome App" />
          <DHInput label="Package Name" type="text" name="playStorePackage" value={formData.playStorePackage as string} onChange={onChange} placeholder="com.example.app" />
          <DHInput label="Play Store URL" type="url" name="playStoreUrl" value={formData.playStoreUrl as string} onChange={onChange} placeholder="https://play.google.com/..." />
        </>}

        {activeDef.formType === "telegram" && <>
          <DHInput label="Username" type="text" name="telegramUsername" value={formData.telegramUsername as string} onChange={onChange} placeholder="username" />
          <DHInput label="Channel URL" type="url" name="telegramUrl" value={formData.telegramUrl as string} onChange={onChange} placeholder="https://t.me/..." error={validateUrl(formData.telegramUrl as string, "t.me")} />
        </>}
        
        {activeDef.formType === "tiktok" && <>
          <DHInput label="Username" type="text" name="tiktokUsername" value={formData.tiktokUsername as string} onChange={onChange} placeholder="username" />
          <DHInput label="Profile URL" type="url" name="tiktokUrl" value={formData.tiktokUrl as string} onChange={onChange} placeholder="https://tiktok.com/@..." error={validateUrl(formData.tiktokUrl as string, "tiktok")} />
        </>}

        {activeDef.formType === "snapchat" && <>
          <DHInput label="Username" type="text" name="snapchatUsername" value={formData.snapchatUsername as string} onChange={onChange} placeholder="username" />
        </>}

        {activeDef.formType === "pinterest" && <>
          <DHInput label="Profile URL" type="url" name="pinterestProfileUrl" value={formData.pinterestProfileUrl as string} onChange={onChange} placeholder="https://pinterest.com/..." error={validateUrl(formData.pinterestProfileUrl as string, "pinterest")} />
          <DHInput label="Board URL" type="url" name="pinterestBoardUrl" value={formData.pinterestBoardUrl as string} onChange={onChange} placeholder="https://pinterest.com/username/board" />
        </>}

        {activeDef.formType === "reddit" && <>
          <DHInput label="Profile URL" type="url" name="redditProfileUrl" value={formData.redditProfileUrl as string} onChange={onChange} placeholder="https://reddit.com/user/..." error={validateUrl(formData.redditProfileUrl as string, "reddit")} />
          <DHInput label="Community URL" type="url" name="redditCommunityUrl" value={formData.redditCommunityUrl as string} onChange={onChange} placeholder="https://reddit.com/r/..." />
        </>}

        {/* Existing forms... */}
        {activeDef.formType === "wifi" && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DHInput label="Network Name (SSID)" type="text" name="ssid" value={formData.ssid as string} onChange={onChange} placeholder="MyNetwork" />
          <DHInput label="Password" type="password" name="password" value={formData.password as string} onChange={onChange} placeholder="••••••••" />
          <DHSelect label="Security Type" name="networkType" value={formData.networkType as string} onChange={onChange}>
            <option value="WPA">WPA / WPA2 / WPA3</option>
            <option value="WEP">WEP</option>
            <option value="nopass">No Password</option>
          </DHSelect>
          <div className="flex items-center gap-2 pt-5">
            <input type="checkbox" id="hidden" name="hidden" checked={formData.hidden as boolean} onChange={onChange} className="w-4 h-4" style={{ accentColor: "var(--accent)" }} />
            <label htmlFor="hidden" className="text-sm" style={{ color: "var(--fg-muted)" }}>Hidden Network</label>
          </div>
        </div>}
        {activeDef.formType === "vcard" && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 rounded-xl p-4 border mb-2" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
             <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold" style={{ color: "var(--fg)" }}>✨ Magic Fill with AI</h4>
                <button 
                  onClick={() => handleMagicAI("magic-fill-vcard")} 
                  disabled={isAILoading || !aiPrompt}
                  className="btn-primary py-1 px-3 text-[10px] whitespace-nowrap"
                >
                  {isAILoading ? "Parsing..." : "Auto-Fill Forms"}
                </button>
             </div>
             <textarea 
               value={aiPrompt} 
               onChange={e => setAiPrompt(e.target.value)} 
               placeholder="Paste messy contact info here (e.g. 'John Doe from Acme Corp, 555-1234, john@example.com')" 
               className="dh-input resize-none h-16 w-full text-xs" 
             />
          </div>
          <DHInput label="Full Name" type="text" name="vName" value={formData.vName as string} onChange={onChange} placeholder="John Doe" /> type="text" name="vName" value={formData.vName as string} onChange={onChange} placeholder="John Doe" />
          <DHInput label="Job Title" type="text" name="vTitle" value={formData.vTitle as string} onChange={onChange} placeholder="Software Engineer" />
          <DHInput label="Company" type="text" name="vCompany" value={formData.vCompany as string} onChange={onChange} placeholder="Acme Corp" />
          <DHPhoneInput label="Phone" codeName="vPhoneCode" phoneName="vPhone" codeValue={formData.vPhoneCode as string} phoneValue={formData.vPhone as string} onChange={onChange} placeholder="234 567 8900" />
          <DHInput label="Email" type="email" name="vEmail" value={formData.vEmail as string} onChange={onChange} placeholder="john@example.com" />
          <DHInput label="Website" type="url" name="vWebsite" value={formData.vWebsite as string} onChange={onChange} placeholder="https://..." />
          <div className="sm:col-span-2"><DHTextarea label="Address" name="vAddress" value={formData.vAddress as string} onChange={onChange} placeholder="123 Main St..." /></div>
        </div>}
        {activeDef.formType === "calendar" && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 rounded-xl p-4 border mb-2" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
             <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold" style={{ color: "var(--fg)" }}>✨ Magic Fill with AI</h4>
                <button 
                  onClick={() => handleMagicAI("magic-fill-event")} 
                  disabled={isAILoading || !aiPrompt}
                  className="btn-primary py-1 px-3 text-[10px] whitespace-nowrap"
                >
                  {isAILoading ? "Parsing..." : "Auto-Fill Forms"}
                </button>
             </div>
             <textarea 
               value={aiPrompt} 
               onChange={e => setAiPrompt(e.target.value)} 
               placeholder="Paste messy event details here (e.g. 'Party next Friday at 8 PM at Joe\'s, bring snacks')" 
               className="dh-input resize-none h-16 w-full text-xs" 
             />
          </div>
          <div className="sm:col-span-2"><DHInput label="Event Title"/ type="text" name="calTitle" value={formData.calTitle as string} onChange={onChange} placeholder="Team Meeting" /></div>
          <DHInput label="Start Date/Time" type="datetime-local" name="calStart" value={formData.calStart as string} onChange={onChange} />
          <DHInput label="End Date/Time" type="datetime-local" name="calEnd" value={formData.calEnd as string} onChange={onChange} />
          <div className="sm:col-span-2"><DHInput label="Location" type="text" name="calLocation" value={formData.calLocation as string} onChange={onChange} placeholder="Zoom or Address" /></div>
          <div className="sm:col-span-2"><DHTextarea label="Description" name="calDesc" value={formData.calDesc as string} onChange={onChange} placeholder="Agenda details..." /></div>
        </div>}
        {activeDef.formType === "upi" && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><DHInput label="UPI ID (VPA)" type="text" name="upiVpa" value={formData.upiVpa as string} onChange={onChange} placeholder="user@upi" /></div>
          <DHInput label="Payee Name" type="text" name="upiName" value={formData.upiName as string} onChange={onChange} placeholder="John Doe" />
          <DHInput label="Amount (Optional)" type="number" name="upiAmount" value={formData.upiAmount as string} onChange={onChange} placeholder="100" />
        </div>}
        {activeDef.formType === "paypal" && <DHInput label="PayPal.me Username" type="text" name="paypalMe" value={formData.paypalMe as string} onChange={onChange} placeholder="username" />}
        {activeDef.formType === "crypto" && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DHSelect label="Currency" name="cryptoType" value={formData.cryptoType as string} onChange={onChange}>
            <option value="bitcoin">Bitcoin (BTC)</option>
            <option value="ethereum">Ethereum (ETH)</option>
            <option value="litecoin">Litecoin (LTC)</option>
          </DHSelect>
          <DHInput label="Amount (Optional)" type="number" step="0.000001" name="cryptoAmount" value={formData.cryptoAmount as string} onChange={onChange} placeholder="0.5" />
          <div className="sm:col-span-2"><DHInput label="Wallet Address" type="text" name="cryptoAddress" value={formData.cryptoAddress as string} onChange={onChange} placeholder="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" /></div>
        </div>}
        {activeDef.formType === "multi_link" && <DHTextarea label="Links (comma separated)" name="multiLinkUrls" value={formData.multiLinkUrls as string} onChange={onChange} placeholder="https://link1.com, https://link2.com" />}
        {activeDef.formType === "landing" && <DHSelect label="Template" name="landingTemplate" value={formData.landingTemplate as string} onChange={onChange}>
            <option value="business">Business</option>
            <option value="restaurant">Restaurant</option>
            <option value="portfolio">Portfolio</option>
            <option value="school">School</option>
        </DHSelect>}
      </div>
    </div>
  );
}
