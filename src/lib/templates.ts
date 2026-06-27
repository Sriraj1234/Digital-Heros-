// =============================================
// PRE-MADE TEMPLATES & GRAPHIC FRAMES
// =============================================

export interface Template {
  id: string;
  category: "Standard" | "Holidays" | "Events" | "Themes";
  name: string;
  qrType: string;
  fgColor: string;
  bgColor: string;
  graphicFrame: string | null;
  defaultValues: Record<string, string>;
}

// Helper to generate data URI for SVG
const svgUri = (svg: string) => \`data:image/svg+xml;utf8,\${encodeURIComponent(svg)}\`;

// 1. Floral Frame
const floralSVG = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <rect x="50" y="50" width="700" height="700" rx="40" fill="none" stroke="#D4BCE0" stroke-width="12"/>
  <!-- Top Left Flower -->
  <g transform="translate(50, 50)">
    <circle cx="0" cy="0" r="60" fill="#FDF9FF" />
    <path d="M0 -40 C 20 -80, 80 -20, 40 0 C 80 20, 20 80, 0 40 C -20 80, -80 20, -40 0 C -80 -20, -20 -80, 0 -40 Z" fill="#9C3AAF" opacity="0.8"/>
    <circle cx="0" cy="0" r="15" fill="#E8D5F0" />
  </g>
  <!-- Bottom Right Flower -->
  <g transform="translate(750, 750)">
    <circle cx="0" cy="0" r="60" fill="#FDF9FF" />
    <path d="M0 -40 C 20 -80, 80 -20, 40 0 C 80 20, 20 80, 0 40 C -20 80, -80 20, -40 0 C -80 -20, -20 -80, 0 -40 Z" fill="#9C3AAF" opacity="0.8"/>
    <circle cx="0" cy="0" r="15" fill="#E8D5F0" />
  </g>
</svg>\`;

// 2. Celebration/Balloons Frame
const celebrationSVG = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <rect x="60" y="60" width="680" height="680" rx="30" fill="none" stroke="#FF6B6B" stroke-width="8" stroke-dasharray="20 10"/>
  <!-- Top Right Balloons -->
  <g transform="translate(740, 60)">
    <circle cx="-30" cy="30" r="40" fill="#4ECDC4" opacity="0.9"/>
    <circle cx="20" cy="10" r="35" fill="#FFE66D" opacity="0.9"/>
    <circle cx="0" cy="-20" r="45" fill="#FF6B6B" opacity="0.9"/>
    <path d="M-30 70 Q -40 100 -20 150 M20 45 Q 30 100 10 150 M0 25 Q 10 100 -5 150" stroke="#999" stroke-width="2" fill="none"/>
  </g>
  <!-- Bottom Left Balloons -->
  <g transform="translate(60, 740)">
    <circle cx="30" cy="-30" r="40" fill="#4ECDC4" opacity="0.9"/>
    <circle cx="-20" cy="-10" r="35" fill="#FFE66D" opacity="0.9"/>
    <circle cx="0" cy="20" r="45" fill="#FF6B6B" opacity="0.9"/>
  </g>
</svg>\`;

// 3. Elegant Gold/Red Frame (Like screenshot)
const elegantSVG = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <rect x="80" y="80" width="640" height="640" rx="20" fill="none" stroke="#F5B041" stroke-width="16"/>
  <rect x="100" y="100" width="600" height="600" rx="10" fill="none" stroke="#E74C3C" stroke-width="4"/>
  <!-- Corners -->
  <path d="M 80 160 L 80 80 L 160 80" fill="none" stroke="#E74C3C" stroke-width="8"/>
  <path d="M 720 160 L 720 80 L 640 80" fill="none" stroke="#E74C3C" stroke-width="8"/>
  <path d="M 80 640 L 80 720 L 160 720" fill="none" stroke="#E74C3C" stroke-width="8"/>
  <path d="M 720 640 L 720 720 L 640 720" fill="none" stroke="#E74C3C" stroke-width="8"/>
  <!-- Lanterns -->
  <g transform="translate(80, 200)">
    <rect x="-20" y="0" width="40" height="60" rx="10" fill="#E74C3C"/>
    <line x1="0" y1="-40" x2="0" y2="0" stroke="#F5B041" stroke-width="4"/>
    <line x1="-20" y1="10" x2="20" y2="10" stroke="#F5B041" stroke-width="2"/>
    <line x1="-20" y1="50" x2="20" y2="50" stroke="#F5B041" stroke-width="2"/>
    <path d="M-10 60 L-10 90 M0 60 L0 100 M10 60 L10 90" stroke="#E74C3C" stroke-width="2"/>
  </g>
  <g transform="translate(720, 200)">
    <rect x="-20" y="0" width="40" height="60" rx="10" fill="#E74C3C"/>
    <line x1="0" y1="-40" x2="0" y2="0" stroke="#F5B041" stroke-width="4"/>
    <line x1="-20" y1="10" x2="20" y2="10" stroke="#F5B041" stroke-width="2"/>
    <line x1="-20" y1="50" x2="20" y2="50" stroke="#F5B041" stroke-width="2"/>
    <path d="M-10 60 L-10 90 M0 60 L0 100 M10 60 L10 90" stroke="#E74C3C" stroke-width="2"/>
  </g>
</svg>\`;

export const TEMPLATES: Template[] = [
  {
    id: "purple-floral", category: "Themes", name: "Purple Floral",
    qrType: "url", fgColor: "#9C3AAF", bgColor: "#FFFFFF",
    graphicFrame: svgUri(floralSVG),
    defaultValues: { url: "https://example.com" }
  },
  {
    id: "celebration", category: "Events", name: "Party Time",
    qrType: "url", fgColor: "#FF6B6B", bgColor: "#FFFFFF",
    graphicFrame: svgUri(celebrationSVG),
    defaultValues: { url: "https://example.com/party" }
  },
  {
    id: "lunar-new-year", category: "Holidays", name: "Lunar New Year",
    qrType: "url", fgColor: "#E74C3C", bgColor: "#FFFFFF",
    graphicFrame: svgUri(elegantSVG),
    defaultValues: { url: "https://example.com/festival" }
  },
  {
    id: "clean-minimal", category: "Standard", name: "Clean Minimal",
    qrType: "url", fgColor: "#333333", bgColor: "#FFFFFF",
    graphicFrame: null,
    defaultValues: { url: "https://digitalheroesco.com" }
  }
];
