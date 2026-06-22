"use client";

import { QrCode, ArrowRight } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      {/* CTA block */}
      <div className="py-20" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <span className="label-xs">Ready for liftoff?</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 leading-[1.05]" style={{ color: "var(--fg)" }}>
              LET&apos;S build something<br />worth launching.
            </h2>
            <p className="text-sm mt-4 max-w-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              A plan, a QR, a download — within seconds. No decks. No discovery calls. Just signal.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#studio" className="btn-primary">
              Start Generating <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Built for Digital Heroes
            </a>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-6xl mx-auto px-5 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-sm flex items-center justify-center" style={{ backgroundColor: "var(--accent)" }}>
              <QrCode className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold" style={{ color: "var(--fg)" }}>QR Launchpad</span>
          </div>
          <p className="text-xs leading-relaxed max-w-xs" style={{ color: "var(--fg-muted)" }}>
            Generate, customize, and deploy QR codes at mission speed. 8 types, 5 export formats, 100% free.
          </p>
        </div>

        <div>
          <span className="label-xs block mb-4">QR Types</span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {["URL", "Text", "Email", "Phone", "SMS", "WhatsApp", "WiFi", "vCard"].map(item => (
              <a key={item} href="#studio" className="text-xs transition-opacity opacity-60 hover:opacity-100" style={{ color: "var(--fg-muted)" }}>
                {item}
              </a>
            ))}
          </div>
        </div>

        <div>
          <span className="label-xs block mb-4">Developer</span>
          <div className="space-y-3">
            <div>
              <span className="label-xs block" style={{ opacity: 0.5 }}>Full Name</span>
              <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>Raj</span>
            </div>
            <div>
              <span className="label-xs block" style={{ opacity: 0.5 }}>Email</span>
              <a href="mailto:jayant.kgp81@gmail.com" className="text-sm transition-opacity opacity-70 hover:opacity-100" style={{ color: "var(--fg-muted)" }}>
                jayant.kgp81@gmail.com
              </a>
            </div>
            <div>
              <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer"
                className="text-xs font-semibold transition-colors"
                style={{ color: "var(--accent)" }}
              >
                digitalheroesco.com →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-6xl mx-auto px-5 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="text-xs" style={{ color: "var(--fg-muted)", opacity: 0.5 }}>
          &copy; {year} QR Launchpad · Built for Digital Heroes
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Cookies"].map(item => (
            <span key={item} className="text-xs cursor-not-allowed" style={{ color: "var(--fg-muted)", opacity: 0.4 }}>{item}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
