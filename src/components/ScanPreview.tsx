"use client";

import { Smartphone, Link as LinkIcon, Mail, Phone, MapPin, Contact, Calendar, CreditCard, Wifi, Hash, Video, Music, Users, MessageSquare, Briefcase, FileText } from "lucide-react";
import { QR_TYPES } from "./QRForms";

interface ScanPreviewProps {
  typeId: string;
  formData: Record<string, string | boolean>;
}

export function ScanPreview({ typeId, formData }: ScanPreviewProps) {
  const def = QR_TYPES.find(t => t.id === typeId);
  if (!def) return null;

  const renderContent = () => {
    switch (def.formType) {
      case "youtube": {
        const ytUrl = formData.ytUrl as string;
        const ytMatch = ytUrl ? ytUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/) : null;
        const videoId = ytMatch ? ytMatch[1] : null;

        return (
          <div className="flex flex-col h-full bg-[#0f0f0f] text-white">
            <div className="bg-[#ff0000] p-2 flex items-center justify-center">
              <Video className="w-4 h-4 text-white mr-1" />
              <span className="text-[10px] font-bold tracking-wider">YOUTUBE</span>
            </div>
            <div className="p-2 flex-1 flex flex-col">
              {videoId ? (
                <iframe 
                  className="w-full aspect-video rounded mb-2 bg-black"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full aspect-video bg-gray-800 rounded mb-2 relative overflow-hidden flex items-center justify-center">
                   <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent ml-1" />
                   </div>
                </div>
              )}
              <h3 className="font-bold text-xs mb-1 truncate">{formData.ytTitle || "Video Title"}</h3>
              <p className="text-[10px] text-gray-400 truncate">{formData.ytChannel || "Channel Name"}</p>
            </div>
          </div>
        );
      }

      case "instagram":
        return (
          <div className="flex flex-col h-full bg-white text-black">
            <div className="h-10 bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] p-2 flex flex-col justify-end">
              <span className="text-white text-[10px] font-bold">Instagram</span>
            </div>
            <div className="p-3 flex flex-col items-center border-b border-gray-100">
               <div className="w-14 h-14 rounded-full border-2 border-pink-500 p-0.5 mb-2">
                 <div className="w-full h-full bg-gray-200 rounded-full" />
               </div>
               <h3 className="font-bold text-xs">@{formData.igUsername || "username"}</h3>
               <button className="mt-2 w-full bg-blue-500 text-white text-[10px] py-1 rounded font-semibold">Follow</button>
            </div>
          </div>
        );

      case "spotify":
        return (
          <div className="flex flex-col h-full bg-[#121212] text-white">
            <div className="p-4 flex flex-col items-center justify-center h-full">
               <div className="w-20 h-20 bg-gray-800 rounded shadow-2xl mb-4 flex items-center justify-center">
                 <Music className="w-8 h-8 text-[#1DB954]" />
               </div>
               <h3 className="font-bold text-sm text-center mb-1 line-clamp-1">Spotify Link</h3>
               <p className="text-[10px] text-gray-400 text-center mb-4 truncate w-full">Open in app</p>
               <button className="w-full bg-[#1DB954] text-black text-[10px] py-2 rounded-full font-bold tracking-wide uppercase">Play</button>
            </div>
          </div>
        );

      case "twitter":
        return (
          <div className="flex flex-col h-full bg-black text-white">
            <div className="p-3 flex justify-between items-center border-b border-gray-800">
              <span className="font-bold text-sm">X</span>
              <button className="bg-white text-black text-[10px] px-3 py-1 rounded-full font-bold">Follow</button>
            </div>
            <div className="p-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full mb-2" />
              <h3 className="font-bold text-xs">@{formData.xUsername || "username"}</h3>
            </div>
          </div>
        );
        
      case "linkedin":
        return (
          <div className="flex flex-col h-full bg-[#f3f2ef] text-black">
            <div className="h-12 bg-gray-300 relative">
               <div className="absolute -bottom-6 left-3 w-12 h-12 bg-white rounded-full border-2 border-white flex items-center justify-center">
                 <Briefcase className="w-5 h-5 text-[#0a66c2]" />
               </div>
            </div>
            <div className="pt-8 px-3">
              <h3 className="font-bold text-xs truncate">LinkedIn Profile</h3>
              <p className="text-[10px] text-gray-500">View full profile</p>
              <button className="mt-3 w-full bg-[#0a66c2] text-white text-[10px] py-1.5 rounded-full font-semibold">Connect</button>
            </div>
          </div>
        );

      case "whatsapp":
      case "sms":
        return (
          <div className="flex flex-col h-full bg-[#E5DDD5]">
            <div className="bg-[#075E54] text-white p-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                <Contact className="w-4 h-4 text-gray-500" />
              </div>
              <div className="text-xs font-semibold truncate">
                {(formData.whatsapp as string) ? `${formData.whatsappCode || ""} ${formData.whatsapp}` : (formData.smsPhone as string) ? `${formData.smsPhoneCode || ""} ${formData.smsPhone}` : "+1 234 567 8900"}
              </div>
            </div>
            <div className="flex-1 p-3 flex flex-col justify-end">
              {(formData.waMessage || formData.smsMessage) && (
                <div className="bg-[#DCF8C6] text-black text-[10px] p-2 rounded-lg rounded-br-none self-end max-w-[85%] shadow-sm mb-2">
                  {formData.waMessage || formData.smsMessage}
                </div>
              )}
            </div>
            <div className="bg-white p-2">
              <div className="bg-gray-100 rounded-full p-2 text-[10px] text-gray-400">Message...</div>
            </div>
          </div>
        );

      case "vcard":
        return (
          <div className="flex flex-col h-full bg-gray-50 text-black p-4">
            <div className="flex flex-col items-center mb-4 pt-2">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mb-2 text-xl font-bold text-gray-500">
                {(formData.vName as string)?.charAt(0) || "N"}
              </div>
              <h3 className="font-bold text-sm truncate w-full text-center">{formData.vName || "Name"}</h3>
              <p className="text-[10px] text-gray-500 truncate w-full text-center">{formData.vTitle || "Title"} @ {formData.vCompany || "Company"}</p>
            </div>
            <div className="space-y-2">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <p className="text-[8px] text-gray-400 font-bold uppercase mb-0.5">Mobile</p>
                <p className="text-xs text-blue-600 truncate">{formData.vPhone ? `${formData.vPhoneCode || ""} ${formData.vPhone}` : "+1 234..."}</p>
              </div>
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <p className="text-[8px] text-gray-400 font-bold uppercase mb-0.5">Email</p>
                <p className="text-xs text-blue-600 truncate">{formData.vEmail || "email@..."}</p>
              </div>
            </div>
          </div>
        );

      case "wifi":
        return (
          <div className="flex flex-col h-full bg-gray-100 text-black p-4 justify-center items-center">
             <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-3 shadow-sm">
                <Wifi className="w-6 h-6 text-white" />
             </div>
             <h3 className="font-bold text-sm mb-1 truncate w-full text-center">Join "{formData.ssid || "Network"}"</h3>
             <p className="text-[10px] text-gray-500 mb-4 text-center leading-tight">Do you want to join the Wi-Fi network?</p>
             <div className="w-full space-y-1.5">
                <button className="w-full bg-blue-600 text-white font-semibold py-1.5 rounded-md text-[10px]">Join Network</button>
             </div>
          </div>
        );

      case "pdf":
        return (
          <div className="flex flex-col h-full bg-gray-100 text-black p-4 justify-center items-center">
             <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-3 shadow-sm">
                <FileText className="w-6 h-6 text-white" />
             </div>
             <h3 className="font-bold text-sm mb-1 truncate w-full text-center">{formData.pdfName || "Document.pdf"}</h3>
             <button className="mt-2 w-full bg-white text-red-500 border border-red-500 font-semibold py-1.5 rounded-md text-[10px]">Open PDF</button>
          </div>
        );

      case "maps": {
        const mapQ = formData.mapsLocation as string;
        return (
          <div className="flex flex-col h-full bg-white text-black">
             <div className="bg-[#34A853] p-2 flex items-center justify-center text-white">
               <MapPin className="w-4 h-4 mr-1" />
               <span className="text-[10px] font-bold tracking-wider uppercase">Google Maps</span>
             </div>
             <div className="flex-1 bg-gray-200 relative">
                {mapQ ? (
                  <iframe
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${encodeURIComponent(mapQ)}&output=embed`}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                    <MapPin className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-[10px]">Enter location to see map preview</p>
                  </div>
                )}
             </div>
             <div className="p-2 bg-white z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-gray-100">
                <h3 className="font-bold text-xs truncate">{mapQ || "Location Name"}</h3>
                <p className="text-[9px] text-gray-500 truncate mt-0.5">View on Google Maps</p>
             </div>
          </div>
        );
      }

      case "url":
      case "paypal":
      default:
        return (
          <div className="flex flex-col h-full bg-white text-black">
            <div className="bg-gray-100 p-2 flex items-center gap-1.5 text-[10px] text-gray-500 border-b border-gray-200">
              <LinkIcon className="w-2.5 h-2.5" />
              <div className="bg-white rounded px-1.5 py-0.5 flex-1 truncate">
                {def.prefix ? `${def.prefix}${formData.url}` : ((formData.url as string) || def.placeholder)}
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                <GlobeIcon className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-xs font-semibold mb-1">Opening Link</p>
              <p className="text-[10px] text-gray-500 truncate max-w-full w-full">
                 Loading content...
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative mx-auto border-[5px] border-[#2A2A2A] rounded-[1.5rem] h-[280px] w-[140px] overflow-hidden shadow-2xl bg-black">
      {/* Top Notch */}
      <div className="absolute top-0 inset-x-0 h-3 bg-[#2A2A2A] rounded-b-lg w-1/2 mx-auto z-20"></div>
      
      {/* Dynamic Screen */}
      <div className="w-full h-full relative z-10 pt-3">
        {renderContent()}
      </div>
    </div>
  );
}

function GlobeIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
