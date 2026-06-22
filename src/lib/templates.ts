// =============================================
// SMART TEMPLATES — AI-style presets
// =============================================

export interface Template {
  id: string;
  category: "business" | "education" | "beauty" | "food" | "personal";
  icon: string;
  name: string;
  description: string;
  qrType: string;
  fgColor: string;
  bgColor: string;
  defaultValues: Record<string, string>;
  label: string;
}

export const TEMPLATES: Template[] = [
  // Business
  {
    id: "agency-contact", category: "business", icon: "🏢", name: "Agency Contact", description: "VCard for digital agencies",
    qrType: "vcard", fgColor: "#000000", bgColor: "#FFFFFF",
    defaultValues: { vName: "John Doe", vCompany: "Digital Heroes", vTitle: "Director", vPhone: "+1 234 567 8900", vEmail: "hello@agency.com", vWebsite: "https://digitalheroesco.com" },
    label: "vCard"
  },
  {
    id: "startup-pitch", category: "business", icon: "🚀", name: "Startup Pitch Deck", description: "Direct link to your PDF deck",
    qrType: "pdf", fgColor: "#4F46E5", bgColor: "#EEF2FF",
    defaultValues: { url: "https://pitch.com/deck" },
    label: "PDF Link"
  },
  {
    id: "consultant-booking", category: "business", icon: "🗓️", name: "Consultant Booking", description: "Calendly or meeting booking link",
    qrType: "appointment", fgColor: "#2563EB", bgColor: "#EFF6FF",
    defaultValues: { url: "https://calendly.com/consultant" },
    label: "Booking URL"
  },

  // Education
  {
    id: "school-portal", category: "education", icon: "🏫", name: "School Portal", description: "Quick access to student portal",
    qrType: "website", fgColor: "#1D4ED8", bgColor: "#EFF6FF",
    defaultValues: { url: "https://school.edu/portal" },
    label: "Website"
  },
  {
    id: "college-attendance", category: "education", icon: "📝", name: "College Attendance", description: "Google Form for class attendance",
    qrType: "attendance", fgColor: "#059669", bgColor: "#ECFDF5",
    defaultValues: { url: "https://forms.gle/attendance" },
    label: "G-Forms"
  },
  {
    id: "coaching-whatsapp", category: "education", icon: "💬", name: "Coaching Center", description: "Direct WhatsApp inquiry link",
    qrType: "whatsapp", fgColor: "#16A34A", bgColor: "#F0FDF4",
    defaultValues: { whatsapp: "1234567890", waMessage: "I want to inquire about upcoming batches." },
    label: "WhatsApp"
  },

  // Beauty
  {
    id: "salon-booking", category: "beauty", icon: "✂️", name: "Salon Booking", description: "Direct clients to booking page",
    qrType: "booking", fgColor: "#DB2777", bgColor: "#FDF2F8",
    defaultValues: { url: "https://salon.com/book" },
    label: "Booking URL"
  },
  {
    id: "spa-menu", category: "beauty", icon: "💆", name: "Spa Service Menu", description: "PDF link to your services list",
    qrType: "pdf", fgColor: "#9D174D", bgColor: "#FCE7F3",
    defaultValues: { url: "https://spa.com/services.pdf" },
    label: "PDF Link"
  },
  {
    id: "makeup-insta", category: "beauty", icon: "📸", name: "Makeup Artist Insta", description: "Link directly to your Instagram profile",
    qrType: "instagram", fgColor: "#E1306C", bgColor: "#FFFFFF",
    defaultValues: { url: "https://instagram.com/makeupartist" },
    label: "Instagram"
  },

  // Food
  {
    id: "restaurant-menu", category: "food", icon: "🍽️", name: "Restaurant Menu", description: "Digital menu QR for tables",
    qrType: "menu", fgColor: "#B91C1C", bgColor: "#FEF2F2",
    defaultValues: { url: "https://restaurant.com/menu" },
    label: "URL"
  },
  {
    id: "cafe-wifi", category: "food", icon: "☕", name: "Cafe WiFi", description: "Let guests connect instantly",
    qrType: "wifi", fgColor: "#D97706", bgColor: "#FFFBEB",
    defaultValues: { ssid: "CafeGuest", password: "", networkType: "WPA" },
    label: "WiFi"
  },
  {
    id: "bakery-review", category: "food", icon: "⭐", name: "Bakery Review", description: "Google Review link for your bakery",
    qrType: "g_review", fgColor: "#D97706", bgColor: "#FFFBEB",
    defaultValues: { url: "https://g.page/r/bakery/review" },
    label: "Review URL"
  },

  // Personal
  {
    id: "dev-portfolio", category: "personal", icon: "💻", name: "Developer Portfolio", description: "Link to your personal website",
    qrType: "portfolio", fgColor: "#0F172A", bgColor: "#F8FAFC",
    defaultValues: { url: "https://portfolio.dev" },
    label: "Website"
  },
  {
    id: "creative-resume", category: "personal", icon: "📄", name: "Creative Resume", description: "Link to your PDF resume",
    qrType: "resume", fgColor: "#4338CA", bgColor: "#EEF2FF",
    defaultValues: { url: "https://resume.com/file.pdf" },
    label: "PDF Link"
  },
  {
    id: "networking-card", category: "personal", icon: "🤝", name: "Networking Contact", description: "Simple personal contact card",
    qrType: "contact_card", fgColor: "#1E3D32", bgColor: "#ECE8DF",
    defaultValues: { vName: "Your Name", vPhone: "+1 234 567 8900", vEmail: "me@email.com", vCompany: "", vTitle: "", vWebsite: "", vAddress: "" },
    label: "vCard"
  },
];
