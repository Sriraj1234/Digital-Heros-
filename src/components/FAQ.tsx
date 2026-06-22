"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Is QR Launchpad completely free?", a: "Yes — 100% free, no account required, no generation limits, no watermarks. Every feature is available to everyone." },
  { q: "Do the QR codes expire?", a: "Never. Static QR codes live forever. As long as the destination content remains active, your QR code will work perfectly." },
  { q: "Is my data private?", a: "Completely. All QR generation runs in your browser. No data is ever sent to servers. Even the QR history is stored locally in your browser." },
  { q: "What is the best export format for print?", a: "Always use SVG for print — it scales infinitely without losing quality. For very large banners, also consider the 4K PNG export at 2048px." },
  { q: "Can I embed a logo inside the QR code?", a: "Yes. Upload any PNG/SVG/JPG logo in the Style & Logo tab. We recommend setting error correction to High (H) so the QR still scans reliably with a logo." },
  { q: "Can I use these for commercial purposes?", a: "Absolutely. Use generated QR codes on business cards, print, packaging, signage, websites, and any commercial material — no attribution required." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row md:gap-20">
          <div className="md:w-56 shrink-0 mb-10 md:mb-0">
            <span className="label-xs">05 · FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: "var(--fg)" }}>
              Direct<br />answers.
            </h2>
            <p className="text-sm mt-4 leading-relaxed" style={{ color: "var(--fg-muted)" }}>No qualifiers. No fluff.</p>
          </div>
          <div className="flex-1">
            {faqs.map((f, i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left focus:outline-none group"
                >
                  <span
                    className="text-sm font-medium transition-colors"
                    style={{ color: open === i ? "var(--fg)" : "var(--fg-muted)" }}
                  >
                    {f.q}
                  </span>
                  <div style={{ color: open === i ? "var(--accent)" : "var(--fg-muted)" }} className="shrink-0">
                    {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="c"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm leading-relaxed pb-5" style={{ color: "var(--fg-muted)" }}>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
