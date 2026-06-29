// =============================================
// PRE-MADE TEMPLATES & GRAPHIC FRAMES
// =============================================

export interface Template {
  id: string;
  category: "Standard" | "Holidays" | "Events" | "Business" | "Social";
  name: string;
  qrType: string;
  fgColor: string;
  bgColor: string;
  graphicFrame: string | null;
  dotStyle?: string;
  eyeFrameStyle?: string;
  defaultValues: Record<string, string>;
}

const svgUri = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

// ── SVG Frames ──────────────────────────────────────────────

const floralSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
  <rect x="40" y="40" width="720" height="720" rx="36" fill="none" stroke="#D4BCE0" stroke-width="10"/>
  <rect x="55" y="55" width="690" height="690" rx="28" fill="none" stroke="#E8D5F0" stroke-width="3" stroke-dasharray="8,6"/>
  <g transform="translate(80,80)"><circle r="55" fill="#FDF9FF"/><path d="M0-38 C18-72,72-18,38 0 C72 18,18 72,0 38 C-18 72,-72 18,-38 0 C-72-18,-18-72,0-38Z" fill="#9C3AAF" opacity="0.85"/><circle r="13" fill="#E8D5F0"/></g>
  <g transform="translate(720,80)"><circle r="55" fill="#FDF9FF"/><path d="M0-38 C18-72,72-18,38 0 C72 18,18 72,0 38 C-18 72,-72 18,-38 0 C-72-18,-18-72,0-38Z" fill="#9C3AAF" opacity="0.85"/><circle r="13" fill="#E8D5F0"/></g>
  <g transform="translate(80,720)"><circle r="55" fill="#FDF9FF"/><path d="M0-38 C18-72,72-18,38 0 C72 18,18 72,0 38 C-18 72,-72 18,-38 0 C-72-18,-18-72,0-38Z" fill="#9C3AAF" opacity="0.85"/><circle r="13" fill="#E8D5F0"/></g>
  <g transform="translate(720,720)"><circle r="55" fill="#FDF9FF"/><path d="M0-38 C18-72,72-18,38 0 C72 18,18 72,0 38 C-18 72,-72 18,-38 0 C-72-18,-18-72,0-38Z" fill="#9C3AAF" opacity="0.85"/><circle r="13" fill="#E8D5F0"/></g>
  <g transform="translate(400,80)"><circle r="30" fill="#FDF9FF"/><path d="M0-22 C10-40,40-10,22 0 C40 10,10 40,0 22 C-10 40,-40 10,-22 0 C-40-10,-10-40,0-22Z" fill="#C56FD8" opacity="0.9"/><circle r="8" fill="#E8D5F0"/></g>
  <g transform="translate(400,720)"><circle r="30" fill="#FDF9FF"/><path d="M0-22 C10-40,40-10,22 0 C40 10,10 40,0 22 C-10 40,-40 10,-22 0 C-40-10,-10-40,0-22Z" fill="#C56FD8" opacity="0.9"/><circle r="8" fill="#E8D5F0"/></g>
  <text x="400" y="792" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="#9C3AAF" opacity="0.7">SCAN ME</text>
</svg>`;

const celebrationSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
  <rect x="50" y="50" width="700" height="700" rx="28" fill="none" stroke="#FF6B6B" stroke-width="8" stroke-dasharray="18,9"/>
  <circle cx="100" cy="100" r="45" fill="#FF6B6B" opacity="0.88"/>
  <circle cx="155" cy="75" r="35" fill="#FFE66D" opacity="0.88"/>
  <circle cx="120" cy="55" r="40" fill="#4ECDC4" opacity="0.88"/>
  <path d="M100 145 Q110 180 95 230 M155 110 Q165 180 145 230 M120 95 Q125 180 112 230" stroke="#aaa" stroke-width="2" fill="none"/>
  <circle cx="700" cy="100" r="45" fill="#4ECDC4" opacity="0.88"/>
  <circle cx="645" cy="75" r="35" fill="#FF6B6B" opacity="0.88"/>
  <circle cx="680" cy="55" r="40" fill="#FFE66D" opacity="0.88"/>
  <path d="M700 145 Q690 180 705 230 M645 110 Q635 180 655 230 M680 95 Q675 180 688 230" stroke="#aaa" stroke-width="2" fill="none"/>
  <circle cx="100" cy="700" r="40" fill="#FFE66D" opacity="0.88"/>
  <circle cx="700" cy="700" r="40" fill="#FF6B6B" opacity="0.88"/>
  <path d="M50 400 L30 380 L50 360 M750 400 L770 380 L750 360" stroke="#FF6B6B" stroke-width="6" fill="none" stroke-linecap="round"/>
  <text x="400" y="792" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" font-weight="bold" fill="#FF6B6B">🎉 CELEBRATE!</text>
</svg>`;

const lanternSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
  <rect x="70" y="70" width="660" height="660" rx="18" fill="none" stroke="#F5B041" stroke-width="14"/>
  <rect x="88" y="88" width="624" height="624" rx="10" fill="none" stroke="#E74C3C" stroke-width="4"/>
  <path d="M70 160 L70 70 L160 70" fill="none" stroke="#E74C3C" stroke-width="10" stroke-linecap="round"/>
  <path d="M730 160 L730 70 L640 70" fill="none" stroke="#E74C3C" stroke-width="10" stroke-linecap="round"/>
  <path d="M70 640 L70 730 L160 730" fill="none" stroke="#E74C3C" stroke-width="10" stroke-linecap="round"/>
  <path d="M730 640 L730 730 L640 730" fill="none" stroke="#E74C3C" stroke-width="10" stroke-linecap="round"/>
  <g transform="translate(70,200)"><line x1="0" y1="-45" x2="0" y2="0" stroke="#F5B041" stroke-width="4"/><rect x="-22" y="0" width="44" height="65" rx="12" fill="#E74C3C"/><line x1="-22" y1="12" x2="22" y2="12" stroke="#F5B041" stroke-width="2"/><line x1="-22" y1="52" x2="22" y2="52" stroke="#F5B041" stroke-width="2"/><path d="M-12 65 L-12 95 M0 65 L0 105 M12 65 L12 95" stroke="#E74C3C" stroke-width="2.5"/></g>
  <g transform="translate(730,200)"><line x1="0" y1="-45" x2="0" y2="0" stroke="#F5B041" stroke-width="4"/><rect x="-22" y="0" width="44" height="65" rx="12" fill="#E74C3C"/><line x1="-22" y1="12" x2="22" y2="12" stroke="#F5B041" stroke-width="2"/><line x1="-22" y1="52" x2="22" y2="52" stroke="#F5B041" stroke-width="2"/><path d="M-12 65 L-12 95 M0 65 L0 105 M12 65 L12 95" stroke="#E74C3C" stroke-width="2.5"/></g>
  <g transform="translate(70,540)"><line x1="0" y1="-45" x2="0" y2="0" stroke="#F5B041" stroke-width="4"/><rect x="-22" y="0" width="44" height="65" rx="12" fill="#E74C3C"/><line x1="-22" y1="12" x2="22" y2="12" stroke="#F5B041" stroke-width="2"/><line x1="-22" y1="52" x2="22" y2="52" stroke="#F5B041" stroke-width="2"/></g>
  <g transform="translate(730,540)"><line x1="0" y1="-45" x2="0" y2="0" stroke="#F5B041" stroke-width="4"/><rect x="-22" y="0" width="44" height="65" rx="12" fill="#E74C3C"/><line x1="-22" y1="12" x2="22" y2="12" stroke="#F5B041" stroke-width="2"/><line x1="-22" y1="52" x2="22" y2="52" stroke="#F5B041" stroke-width="2"/></g>
  <text x="400" y="792" text-anchor="middle" font-family="serif" font-size="24" fill="#E74C3C">✦ SCAN ME ✦</text>
</svg>`;

const neonSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
  <rect x="20" y="20" width="760" height="760" rx="20" fill="#0d0d0d"/>
  <rect x="30" y="30" width="740" height="740" rx="16" fill="none" stroke="#00F5FF" stroke-width="3" filter="url(#glow)"/>
  <rect x="42" y="42" width="716" height="716" rx="12" fill="none" stroke="#7B2FFF" stroke-width="2"/>
  <defs><filter id="glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <rect x="30" y="30" width="80" height="8" fill="#00F5FF" rx="4"/>
  <rect x="30" y="30" width="8" height="80" fill="#00F5FF" rx="4"/>
  <rect x="690" y="30" width="80" height="8" fill="#00F5FF" rx="4"/>
  <rect x="762" y="30" width="8" height="80" fill="#00F5FF" rx="4"/>
  <rect x="30" y="762" width="80" height="8" fill="#00F5FF" rx="4"/>
  <rect x="30" y="690" width="8" height="80" fill="#00F5FF" rx="4"/>
  <rect x="690" y="762" width="80" height="8" fill="#00F5FF" rx="4"/>
  <rect x="762" y="690" width="8" height="80" fill="#00F5FF" rx="4"/>
  <text x="400" y="792" text-anchor="middle" font-family="monospace" font-size="22" font-weight="bold" fill="#00F5FF">◈ SCAN ◈</text>
</svg>`;

const weddingSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
  <rect x="45" y="45" width="710" height="710" rx="0" fill="none" stroke="#C9A96E" stroke-width="6"/>
  <rect x="58" y="58" width="684" height="684" rx="0" fill="none" stroke="#E8D5B0" stroke-width="2"/>
  <path d="M45 45 L45 120 M45 45 L120 45" stroke="#C9A96E" stroke-width="12" fill="none" stroke-linecap="square"/>
  <path d="M755 45 L755 120 M755 45 L680 45" stroke="#C9A96E" stroke-width="12" fill="none" stroke-linecap="square"/>
  <path d="M45 755 L45 680 M45 755 L120 755" stroke="#C9A96E" stroke-width="12" fill="none" stroke-linecap="square"/>
  <path d="M755 755 L755 680 M755 755 L680 755" stroke="#C9A96E" stroke-width="12" fill="none" stroke-linecap="square"/>
  <text x="400" y="40" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="#C9A96E">❦ ❦ ❦</text>
  <text x="400" y="796" text-anchor="middle" font-family="Georgia,serif" font-size="20" fill="#C9A96E">♥ Wedding Day ♥</text>
  <text x="26" y="408" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="#C9A96E" transform="rotate(-90,26,408)">❦ Love ❦</text>
  <text x="778" y="408" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="#C9A96E" transform="rotate(90,778,408)">❦ Love ❦</text>
</svg>`;

const christmasSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
  <rect x="48" y="48" width="704" height="704" rx="20" fill="none" stroke="#1B5E20" stroke-width="10"/>
  <rect x="62" y="62" width="676" height="676" rx="14" fill="none" stroke="#B71C1C" stroke-width="4" stroke-dasharray="14,8"/>
  <g transform="translate(100,100)"><polygon points="0,-45 10,-10 47,-10 17,12 28,47 0,26 -28,47 -17,12 -47,-10 -10,-10" fill="#FFD700"/></g>
  <g transform="translate(700,100)"><polygon points="0,-45 10,-10 47,-10 17,12 28,47 0,26 -28,47 -17,12 -47,-10 -10,-10" fill="#FFD700"/></g>
  <g transform="translate(100,700)"><polygon points="0,-30 7,-7 32,-7 12,8 19,32 0,18 -19,32 -12,8 -32,-7 -7,-7" fill="#FFD700"/></g>
  <g transform="translate(700,700)"><polygon points="0,-30 7,-7 32,-7 12,8 19,32 0,18 -19,32 -12,8 -32,-7 -7,-7" fill="#FFD700"/></g>
  <text x="400" y="52" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="#B71C1C">🎄 Merry Christmas 🎄</text>
  <text x="400" y="796" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="bold" fill="#1B5E20">⛄ Scan Me! ⛄</text>
</svg>`;

const corporateSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
  <rect x="0" y="0" width="800" height="800" fill="#F8F9FA"/>
  <rect x="0" y="0" width="800" height="55" fill="#1A237E"/>
  <rect x="0" y="745" width="800" height="55" fill="#1A237E"/>
  <rect x="0" y="55" width="6" height="690" fill="#3949AB"/>
  <rect x="794" y="55" width="6" height="690" fill="#3949AB"/>
  <text x="400" y="37" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" font-weight="bold" fill="white" letter-spacing="3">SCAN QR CODE</text>
  <text x="400" y="778" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="white" letter-spacing="2">digitalheroesco.com</text>
</svg>`;

const diwaliSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
  <rect x="40" y="40" width="720" height="720" rx="24" fill="none" stroke="#FF8F00" stroke-width="10"/>
  <rect x="56" y="56" width="688" height="688" rx="16" fill="none" stroke="#FF6F00" stroke-width="3" stroke-dasharray="10,6"/>
  <g transform="translate(100,100)"><ellipse rx="18" ry="35" fill="#FF8F00"/><ellipse ry="12" rx="8" fill="#FFEE58" transform="translate(0,-28)"/><line x1="0" y1="-60" x2="0" y2="-48" stroke="#FF8F00" stroke-width="3"/></g>
  <g transform="translate(700,100)"><ellipse rx="18" ry="35" fill="#FF8F00"/><ellipse ry="12" rx="8" fill="#FFEE58" transform="translate(0,-28)"/><line x1="0" y1="-60" x2="0" y2="-48" stroke="#FF8F00" stroke-width="3"/></g>
  <g transform="translate(100,700)"><ellipse rx="18" ry="35" fill="#FF8F00"/><ellipse ry="12" rx="8" fill="#FFEE58" transform="translate(0,-28)"/></g>
  <g transform="translate(700,700)"><ellipse rx="18" ry="35" fill="#FF8F00"/><ellipse ry="12" rx="8" fill="#FFEE58" transform="translate(0,-28)"/></g>
  <text x="400" y="44" text-anchor="middle" font-family="serif" font-size="22" fill="#FF8F00">✦ दीपावली ✦</text>
  <text x="400" y="796" text-anchor="middle" font-family="serif" font-size="22" fill="#FF8F00">🪔 Happy Diwali 🪔</text>
</svg>`;

const youtubeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
  <rect x="0" y="0" width="800" height="800" fill="#0f0f0f"/>
  <rect x="30" y="30" width="740" height="740" rx="16" fill="none" stroke="#FF0000" stroke-width="6"/>
  <rect x="44" y="44" width="712" height="712" rx="12" fill="none" stroke="#FF000055" stroke-width="2"/>
  <rect x="0" y="0" width="800" height="72" fill="#FF0000"/>
  <rect x="0" y="728" width="800" height="72" fill="#FF0000"/>
  <text x="400" y="50" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" font-weight="bold" fill="white">▶ YouTube</text>
  <text x="400" y="773" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="white">Scan to Watch</text>
</svg>`;

const tiktokSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
  <rect x="0" y="0" width="800" height="800" fill="#010101"/>
  <rect x="28" y="28" width="744" height="744" rx="20" fill="none" stroke="#FE2C55" stroke-width="5"/>
  <rect x="36" y="36" width="728" height="728" rx="16" fill="none" stroke="#25F4EE" stroke-width="2"/>
  <text x="400" y="52" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" font-weight="900" fill="white">TikTok</text>
  <text x="397" y="52" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" font-weight="900" fill="#FE2C55" opacity="0.5">TikTok</text>
  <text x="403" y="52" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" font-weight="900" fill="#25F4EE" opacity="0.5">TikTok</text>
  <text x="400" y="790" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#FE2C55">♪ Scan to Watch ♪</text>
</svg>`;

const roundedGlowSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
  <defs>
    <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#9C3AAF" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#9C3AAF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="800" height="800" fill="url(#glowGrad)" rx="40"/>
  <rect x="25" y="25" width="750" height="750" rx="36" fill="none" stroke="#9C3AAF" stroke-width="6" opacity="0.9"/>
  <rect x="38" y="38" width="724" height="724" rx="28" fill="none" stroke="#C56FD8" stroke-width="2" opacity="0.5"/>
  <circle cx="400" cy="400" r="380" fill="none" stroke="#9C3AAF" stroke-width="1" stroke-dasharray="4,12" opacity="0.3"/>
  <text x="400" y="796" text-anchor="middle" font-family="Inter,sans-serif" font-size="22" fill="#9C3AAF" font-weight="600">SCAN ME</text>
</svg>`;

const minimalDarkSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
  <rect x="0" y="0" width="800" height="800" fill="#111"/>
  <rect x="20" y="20" width="760" height="760" rx="12" fill="#181818"/>
  <path d="M20 90 L20 20 L90 20" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M780 90 L780 20 L710 20" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M20 710 L20 780 L90 780" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M780 710 L780 780 L710 780" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
  <text x="400" y="796" text-anchor="middle" font-family="monospace" font-size="20" fill="#ffffff" letter-spacing="6">SCAN ME</text>
</svg>`;

export const TEMPLATES: Template[] = [
  // Standard
  {
    id: "clean-minimal", category: "Standard", name: "Clean Minimal",
    qrType: "url", fgColor: "#111111", bgColor: "#FFFFFF",
    graphicFrame: null, dotStyle: "square",
    defaultValues: { url: "https://digitalheroesco.com" }
  },
  {
    id: "rounded-glow", category: "Standard", name: "Rounded Glow",
    qrType: "url", fgColor: "#9C3AAF", bgColor: "#FFFFFF",
    graphicFrame: svgUri(roundedGlowSVG), dotStyle: "extra-rounded",
    defaultValues: { url: "https://digitalheroesco.com" }
  },
  {
    id: "minimal-dark", category: "Standard", name: "Dark Studio",
    qrType: "url", fgColor: "#FFFFFF", bgColor: "#111111",
    graphicFrame: svgUri(minimalDarkSVG), dotStyle: "square",
    defaultValues: { url: "https://digitalheroesco.com" }
  },

  // Business
  {
    id: "corporate-blue", category: "Business", name: "Corporate",
    qrType: "url", fgColor: "#1A237E", bgColor: "#F8F9FA",
    graphicFrame: svgUri(corporateSVG), dotStyle: "square",
    defaultValues: { url: "https://digitalheroesco.com" }
  },

  // Social
  {
    id: "youtube-frame", category: "Social", name: "YouTube",
    qrType: "youtube", fgColor: "#FF0000", bgColor: "#0f0f0f",
    graphicFrame: svgUri(youtubeSVG), dotStyle: "dots",
    defaultValues: { ytUrl: "https://youtube.com" }
  },
  {
    id: "tiktok-frame", category: "Social", name: "TikTok",
    qrType: "tiktok", fgColor: "#FE2C55", bgColor: "#010101",
    graphicFrame: svgUri(tiktokSVG), dotStyle: "dots",
    defaultValues: { tiktokUrl: "https://tiktok.com" }
  },

  // Events
  {
    id: "celebration", category: "Events", name: "Party Time",
    qrType: "url", fgColor: "#FF6B6B", bgColor: "#FFFFFF",
    graphicFrame: svgUri(celebrationSVG), dotStyle: "extra-rounded",
    defaultValues: { url: "https://example.com/party" }
  },
  {
    id: "wedding", category: "Events", name: "Wedding",
    qrType: "url", fgColor: "#C9A96E", bgColor: "#FFFDF8",
    graphicFrame: svgUri(weddingSVG), dotStyle: "classy-rounded",
    defaultValues: { url: "https://example.com/wedding" }
  },

  // Holidays
  {
    id: "lunar-new-year", category: "Holidays", name: "Lunar New Year",
    qrType: "url", fgColor: "#E74C3C", bgColor: "#FFFFF0",
    graphicFrame: svgUri(lanternSVG), dotStyle: "square",
    defaultValues: { url: "https://example.com/festival" }
  },
  {
    id: "purple-floral", category: "Holidays", name: "Floral",
    qrType: "url", fgColor: "#9C3AAF", bgColor: "#FFFFFF",
    graphicFrame: svgUri(floralSVG), dotStyle: "classy-rounded",
    defaultValues: { url: "https://example.com" }
  },
  {
    id: "christmas", category: "Holidays", name: "Christmas",
    qrType: "url", fgColor: "#1B5E20", bgColor: "#FFFFFF",
    graphicFrame: svgUri(christmasSVG), dotStyle: "dots",
    defaultValues: { url: "https://example.com/christmas" }
  },
  {
    id: "diwali", category: "Holidays", name: "Diwali",
    qrType: "url", fgColor: "#FF8F00", bgColor: "#FFF8E1",
    graphicFrame: svgUri(diwaliSVG), dotStyle: "extra-rounded",
    defaultValues: { url: "https://example.com/diwali" }
  },
];
