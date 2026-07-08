import React from "react";
// True brand/app icons for QR type selector
export const QR_TYPE_ICONS: Record<string, React.ReactElement> = {

  url: <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" className="w-6 h-6"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
  text: <svg viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" className="w-6 h-6"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>,
  email: <svg viewBox="0 0 24 24" className="w-6 h-6"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" fill="#EA4335"/><path d="M20 4l-8 7-8-7" stroke="#fff" strokeWidth="1.5" fill="none"/></svg>,
  phone: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="12" fill="#10B981"/><path d="M17 16.92c-.06 1.06-1.01 1.93-2.07 1.84-1.68-.14-4.28-1-6.28-3s-2.86-4.6-3-6.28C5.56 8.42 6.44 7.47 7.5 7.41L9.14 7.3c.4-.03.77.22.9.59l.87 2.4c.1.28.03.6-.18.82l-.9.96a8.2 8.2 0 003.1 3.1l.96-.9c.22-.21.54-.28.82-.18l2.4.87c.37.13.62.5.59.9l-.1 1.54z" fill="#fff"/></svg>,
  sms: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="12" fill="#10B981"/><path d="M6 7h12c.55 0 1 .45 1 1v7c0 .55-.45 1-1 1H8l-3 3V8c0-.55.45-1 1-1z" fill="#fff"/></svg>,
  wifi: <svg viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" className="w-6 h-6"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="#06B6D4"/></svg>,
  vcard: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="4" fill="#6366F1"/><rect x="3" y="6" width="18" height="12" rx="2" fill="#fff" opacity=".9"/><circle cx="9" cy="12" r="2.5" fill="#6366F1"/><path d="M14 10h3M14 12h3M14 14h2" stroke="#6366F1" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  calendar: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="4" fill="#F43F5E"/><rect x="3" y="7" width="18" height="14" rx="2" fill="#fff"/><rect x="3" y="7" width="18" height="5" rx="2" fill="#F43F5E"/><circle cx="8" cy="4" r="1.5" fill="#F43F5E" stroke="#fff" strokeWidth="1.5"/><circle cx="16" cy="4" r="1.5" fill="#F43F5E" stroke="#fff" strokeWidth="1.5"/><rect x="7" y="14" width="3" height="3" rx=".5" fill="#F43F5E"/><rect x="11" y="14" width="3" height="3" rx=".5" fill="#F43F5E" opacity=".5"/></svg>,

  // Google Maps – official pin colors
  maps: <svg viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/><path d="M12 2C8.13 2 5 5.13 5 9c0 1.8.6 3.46 1.6 4.8L12 2z" fill="#D93025"/><circle cx="12" cy="9" r="2.5" fill="#fff"/></svg>,

  // WhatsApp
  whatsapp: <svg viewBox="0 0 24 24" className="w-6 h-6"><circle cx="12" cy="12" r="12" fill="#25D366"/><path d="M17.5 14.4c-.3-.1-1.7-.8-1.97-.9-.26-.1-.46-.1-.65.1-.2.2-.76.9-.93 1.08-.17.18-.34.2-.63.07-.3-.14-1.23-.45-2.35-1.44-.87-.77-1.45-1.72-1.62-2.01-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.5.15-.18.2-.3.3-.5.1-.2.05-.36-.02-.5-.07-.14-.65-1.56-.89-2.13-.23-.56-.47-.48-.65-.49H8.4c-.2 0-.5.07-.76.34-.26.27-1 1-1 2.43 0 1.43 1.03 2.81 1.17 3 .15.2 2.02 3.09 4.9 4.34.68.3 1.22.47 1.63.6.69.22 1.31.19 1.81.12.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.56-.33z" fill="#fff"/></svg>,

  // YouTube – red play button
  youtube: <svg viewBox="0 0 24 24" className="w-6 h-6"><path d="M23 7s-.27-1.88-1.1-2.71c-1.05-1.1-2.23-1.1-2.77-1.16C16.36 3 12 3 12 3s-4.36 0-7.13.13c-.54.06-1.72.06-2.77 1.16C1.27 5.12 1 7 1 7S.73 9.1.73 11.2v1.94C.73 15.24 1 17.34 1 17.34s.27 1.88 1.1 2.71c1.05 1.1 2.43 1.06 3.04 1.17C7.27 21.45 12 21.5 12 21.5s4.36-.01 7.13-.29c.54-.06 1.72-.06 2.77-1.17.83-.83 1.1-2.71 1.1-2.71S23.27 15.24 23.27 13.14V11.2C23.27 9.1 23 7 23 7z" fill="#FF0000"/><polygon points="9.75,15.5 15.5,12 9.75,8.5" fill="#fff"/></svg>,

  // Instagram – gradient
  instagram: <svg viewBox="0 0 24 24" className="w-6 h-6"><defs><radialGradient id="ig" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="5%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs><rect width="24" height="24" rx="6" fill="url(#ig)"/><rect x="6.5" y="6.5" width="11" height="11" rx="3" stroke="#fff" strokeWidth="1.5" fill="none"/><circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="1.5" fill="none"/><circle cx="17" cy="7" r="1" fill="#fff"/></svg>,

  // Facebook
  facebook: <svg viewBox="0 0 24 24" className="w-6 h-6"><circle cx="12" cy="12" r="12" fill="#1877F2"/><path d="M15.5 8H13.5c-.28 0-.5.22-.5.5V10h2.5l-.4 2H13v6h-2v-6h-1.5v-2H11V8.5A2.5 2.5 0 0113.5 6H15.5v2z" fill="#fff"/></svg>,

  // Telegram
  telegram: <svg viewBox="0 0 24 24" className="w-6 h-6"><circle cx="12" cy="12" r="12" fill="#26A5E4"/><path d="M5.5 11.8l12-4.6c.55-.2 1.03.13.85.95l-2.04 9.6c-.15.68-.55.85-1.12.53l-3-2.2-1.45 1.4c-.16.16-.3.3-.6.3l.21-3.06 5.52-4.99c.24-.21-.05-.33-.37-.12L7.78 13.4 4.82 12.5c-.65-.2-.66-.65.68-1.2z" fill="#fff"/></svg>,

  // LinkedIn
  linkedin: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="4" fill="#0A66C2"/><path d="M8.5 10h-2v7h2v-7zm-1-3a1.25 1.25 0 100 2.5A1.25 1.25 0 007.5 7zm10 3c-1.1 0-2 .7-2.3 1.6V10h-2v7h2v-3.5c0-1 .5-1.5 1.3-1.5s1.2.5 1.2 1.5V17h2v-4c0-1.9-1.1-3-2.2-3z" fill="#fff"/></svg>,

  // X / Twitter
  twitter: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="12" fill="#000"/><path d="M17.5 5.5h-2.3l-3.2 4-2.8-4H5.5l4.8 6.5L5.5 18.5h2.3l3.5-4.4 3.1 4.4h3.7l-5.1-7 4.5-6z" fill="#fff"/></svg>,

  // TikTok
  tiktok: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="6" fill="#000"/><path d="M17 6c0 1.7 1.3 3 3 3v2c-1.1 0-2.1-.35-2.95-.95V15a5 5 0 11-5-5v2a3 3 0 103 3V6h2z" fill="#fff"/><path d="M17 6c0 1.7 1.3 3 3 3v2c-1.1 0-2.1-.35-2.95-.95V15a5 5 0 11-5-5v2a3 3 0 103 3V6h2z" fill="#69C9D0" opacity=".5"/></svg>,

  // Snapchat
  snapchat: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="6" fill="#FFFC00"/><path d="M12 4.5C9.5 4.5 8 6.3 8 8.5v1l-.8.1c-.2.1-.3.2-.2.4.1.7.5 1.2.9 1.5-.3.7-1 1.6-2.3 2 .1.3.5.5 1.2.6l.4.5C8.3 15 10.2 15.5 12 15.5s3.7-.5 4.8-1.4l.4-.5c.7-.1 1.1-.3 1.2-.6-1.3-.4-2-1.3-2.3-2 .4-.3.8-.8.9-1.5.1-.2 0-.3-.2-.4L16 9.5V8.5C16 6.3 14.5 4.5 12 4.5z" fill="#000" opacity=".8"/></svg>,

  // Spotify
  spotify: <svg viewBox="0 0 24 24" className="w-6 h-6"><circle cx="12" cy="12" r="12" fill="#1DB954"/><path d="M7 15.5a9 9 0 0110-1.3.7.7 0 01-.8 1.2A7.5 7.5 0 007.7 16.4.7.7 0 017 15.5zm0-3a11 11 0 0112.4-1.6.85.85 0 01-1 1.4A9.3 9.3 0 007.9 13.4.85.85 0 017 12.5zm-.5-3.1a13.5 13.5 0 0114.8-1.8 1 1 0 11-.9 1.8A11.5 11.5 0 007.4 10.4a1 1 0 01-1-1z" fill="#fff"/></svg>,

  // Pinterest
  pinterest: <svg viewBox="0 0 24 24" className="w-6 h-6"><circle cx="12" cy="12" r="12" fill="#E60023"/><path d="M12 3C7 3 3 7 3 12c0 3.8 2.3 7 5.6 8.4-.1-.6-.1-1.6.1-2.3l1.1-4.6s-.3-.6-.3-1.4c0-1.3.8-2.3 1.7-2.3.8 0 1.2.6 1.2 1.4 0 .8-.5 2-.8 3.1-.2.9.4 1.7 1.3 1.7 1.6 0 2.7-2 2.7-4.4 0-1.8-1.2-3.1-3.4-3.1-2.4 0-3.9 1.8-3.9 3.8 0 .7.2 1.2.5 1.6.2.2.2.3.1.6l-.3 1.1c-.1.3-.3.4-.6.2-1.4-.6-2-2.2-2-3.9 0-2.9 2.4-6.3 7.2-6.3 3.8 0 6.3 2.8 6.3 5.7 0 3.8-2.1 6.7-5.2 6.7-1 0-2-.6-2.4-1.2l-.6 2.4c-.2.8-.8 1.9-1.2 2.5.9.3 1.9.4 2.8.4 5 0 9-4 9-9s-4-9-9-9z" fill="#fff"/></svg>,

  // Discord
  discord: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="6" fill="#5865F2"/><path d="M18.6 6.5A15.7 15.7 0 0015 5.6a.06.06 0 00-.06.03c-.16.28-.33.64-.45.92a14.4 14.4 0 00-4.98 0 9.6 9.6 0 00-.46-.92.06.06 0 00-.06-.03A15.7 15.7 0 005.4 6.5a.06.06 0 00-.03.02C3.8 9.28 3.37 11.97 3.58 14.63a.07.07 0 00.02.05 15.8 15.8 0 004.73 2.39c.03.01.05 0 .07-.02.36-.5.68-1.02.96-1.57a.06.06 0 00-.03-.08 10.4 10.4 0 01-1.49-.71.06.06 0 010-.1l.3-.23a.06.06 0 01.06-.01c3.12 1.43 6.5 1.43 9.58 0a.06.06 0 01.06.01l.3.23a.06.06 0 010 .1c-.48.28-.97.52-1.49.71a.06.06 0 00-.03.09c.28.55.6 1.07.96 1.57.02.02.04.03.07.02a15.75 15.75 0 004.74-2.4.07.07 0 00.02-.04c.25-3.07-.42-5.73-1.8-8.1a.05.05 0 00-.02-.03zM9.1 13c-1.07 0-1.96-.98-1.96-2.19S8.02 8.62 9.1 8.62c1.09 0 1.97.99 1.96 2.19S10.18 13 9.1 13zm7.8 0c-1.07 0-1.96-.98-1.96-2.19s.87-2.19 1.96-2.19c1.09 0 1.97.99 1.96 2.19S17.98 13 16.9 13z" fill="#fff"/></svg>,

  // Reddit
  reddit: <svg viewBox="0 0 24 24" className="w-6 h-6"><circle cx="12" cy="12" r="12" fill="#FF4500"/><path d="M20 12a2 2 0 00-2-2 2 2 0 00-1.3.5A9 9 0 0013 9.3l.6-2.8 1.9.4a1.5 1.5 0 101.5-1.4 1.5 1.5 0 00-1.4 1l-2.1-.5a.2.2 0 00-.24.15l-.7 3.1A9.1 9.1 0 007.3 10.5 2 2 0 106.1 13.7a3.7 3.7 0 000 .5c0 2.5 2.6 4.5 5.9 4.5s5.9-2 5.9-4.5a3.7 3.7 0 000-.5A2 2 0 0020 12zm-10 2a1 1 0 111 1 1 1 0 01-1-1zm5.5 2.6a3.6 3.6 0 01-3.5.4 3.6 3.6 0 01-1.5-.4.2.2 0 01.2-.34 3.2 3.2 0 001.3.35 3.2 3.2 0 001.2-.2.2.2 0 01.3.19zm-.5-1.6a1 1 0 111-1 1 1 0 01-1 1z" fill="#fff"/></svg>,

  // UPI
  upi: <svg viewBox="0 0 40 24" className="w-8 h-6"><rect width="40" height="24" rx="4" fill="#fff" stroke="#e5e7eb" strokeWidth=".5"/><text x="4" y="16" fontFamily="sans-serif" fontWeight="bold" fontSize="9" fill="#097939">UPI</text><path d="M22 6l4 6-4 6M26 12H18" stroke="#f7941d" strokeWidth="2" strokeLinecap="round"/></svg>,

  // PayPal
  paypal: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="4" fill="#fff" stroke="#e5e7eb" strokeWidth=".5"/><path d="M17 7.5c0 2.5-1.7 4-4.4 4H11l-.8 4.5H8l2-11h4.4C16 5 17 6 17 7.5z" fill="#003087"/><path d="M18.5 9c0 2.5-1.7 4.3-4.4 4.3h-1.6l-.7 4.2h-2l.6-3.5h1.7c2.7 0 4.4-1.8 4.4-4.3 0-.24-.02-.47-.07-.7.73.44 1.1 1.12 1.1 2z" fill="#009cde"/></svg>,

  // Bitcoin/Crypto
  crypto: <svg viewBox="0 0 24 24" className="w-6 h-6"><circle cx="12" cy="12" r="12" fill="#F7931A"/><path d="M16.4 10.1c.2-1.4-.85-2.2-2.3-2.7l.47-1.9-1.15-.29-.46 1.84a29 29 0 00-.92-.23l.46-1.85-1.14-.28L10.9 6.7c-.25-.06-.5-.12-.74-.18v-.01l-1.58-.4-.3 1.22s.84.19.82.2c.46.12.55.43.53.67L9.15 11c.03.01.07.02.12.04l-.12-.03-.74 2.97c-.06.14-.2.35-.52.27.01.02-.82-.2-.82-.2l-.56 1.3 1.49.37c.28.07.55.14.82.21l-.48 1.92 1.14.28.48-1.9c.31.08.6.16.9.24l-.47 1.89 1.15.29.48-1.92c1.97.37 3.45.22 4.07-1.56.5-1.43-.03-2.25-1.05-2.79.74-.17 1.3-.66 1.45-1.67zm-2.6 3.65c-.36 1.43-2.78.66-3.57.46l.64-2.55c.79.2 3.3.59 2.94 2.1zm.36-3.67c-.33 1.3-2.34.64-3 .48l.57-2.32c.66.17 2.8.47 2.43 1.84z" fill="#fff"/></svg>,

  // App Store (Apple)
  app_store: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="6" fill="#000"/><path d="M16.7 12.8a4.4 4.4 0 012.1-3.7 4.5 4.5 0 00-3.55-1.92c-1.49-.16-2.94.9-3.7.9s-1.95-.88-3.2-.85A4.72 4.72 0 004.4 9.8C2.74 12.62 3.96 16.8 5.56 19.1c.8 1.14 1.74 2.41 2.97 2.37 1.2-.05 1.65-.77 3.1-.77s1.86.77 3.13.74c1.29-.02 2.1-1.15 2.88-2.3a9.73 9.73 0 001.31-2.66 4.26 4.26 0 01-2.25-3.68zM14.32 5.8a4.33 4.33 0 001-.31A4.33 4.33 0 0013 2a4.26 4.26 0 00-1.07 3.07 3.77 3.77 0 002.39.73z" fill="#fff"/></svg>,

  // Google Play
  play_store: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="6" fill="#fff" stroke="#e5e7eb" strokeWidth=".5"/><path d="M5 4.7l9 7.3-9 7.3V4.7z" fill="#EA4335"/><path d="M5 4.7L14 12l2.5-2.5-8-6.3L5 4.7z" fill="#FBBC04"/><path d="M5 19.3l8.5-5.2-2-2.1L5 19.3z" fill="#34A853"/><path d="M19 12l-2.5-2.5-4 2.5 4 2.5L19 12z" fill="#4285F4"/></svg>,

  // PDF
  pdf: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="4" fill="#DC2626"/><path d="M7 4h7l4 4v12H7V4z" fill="#fff"/><path d="M14 4v4h4" fill="none" stroke="#DC2626" strokeWidth="1"/><text x="7.5" y="17" fontFamily="sans-serif" fontWeight="bold" fontSize="5.5" fill="#DC2626">PDF</text></svg>,

  // Video
  video: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="4" fill="#7C3AED"/><path d="M8 8.5v7l6-3.5-6-3.5z" fill="#fff"/><rect x="3" y="7" width="11" height="10" rx="1.5" stroke="#fff" strokeWidth="1.2" fill="none"/><path d="M15.5 9.5L20 7v10l-4.5-2.5V9.5z" fill="#fff"/></svg>,

  // Google Review
  g_review: <svg viewBox="0 0 24 24" className="w-6 h-6"><rect width="24" height="24" rx="4" fill="#fff" stroke="#e5e7eb" strokeWidth=".5"/><text x="4" y="9" fontFamily="sans-serif" fontWeight="bold" fontSize="5" fill="#4285F4">G</text><path d="M12 5l1.8 3.6 4 .6-2.9 2.8.7 3.9L12 14l-3.6 1.9.7-3.9-2.9-2.8 4-.6L12 5z" fill="#FBBC04" stroke="#FBBC04" strokeWidth=".5"/></svg>,
};
