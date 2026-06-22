"use client";

import { motion } from "framer-motion";
import { Zap, ArrowDownToLine, ShieldCheck, Palette, Clock, Keyboard } from "lucide-react";

const features = [
  { n: "01", icon: Zap,            title: "Instant Generation",       desc: "Client-side engine. Zero latency. No servers, no API calls." },
  { n: "02", icon: ArrowDownToLine, title: "5 Export Formats",         desc: "PNG, SVG, JPEG, PDF, and 4K (2048px) export for any use case." },
  { n: "03", icon: Palette,        title: "Advanced Customization",    desc: "Custom colors, logo embed, multiple dot and eye style presets." },
  { n: "04", icon: ShieldCheck,    title: "100% Private",              desc: "Your data never leaves your browser. No accounts, no cloud." },
  { n: "05", icon: Clock,          title: "QR History",                desc: "Your last 20 QR codes saved locally. Re-open any with one click." },
  { n: "06", icon: Keyboard,       title: "Smart Templates",           desc: "9 pre-configured templates auto-fill content, colors, and type." },
];

export default function Features() {
  return (
    <section id="features" className="py-20" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <span className="label-xs">04 · Why QR Launchpad</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: "var(--fg)" }}>
              Twelve features.<br />One studio.
            </h2>
          </div>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--fg-muted)" }}>
            Engineered for professionals who demand tools that work flawlessly at every step.
          </p>
        </div>

        <div className="space-y-0">
          {features.map((f, i) => (
            <motion.div
              key={f.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group flex items-center gap-6 py-5 -mx-5 px-5 transition-colors duration-200 cursor-default hover:bg-[var(--bg-card)]"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <span className="label-xs w-6 shrink-0 group-hover:text-[var(--accent)] transition-colors">{f.n}</span>
              <div
                className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0 transition-all duration-200"
                style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-card)" }}
              >
                <f.icon className="w-4 h-4" style={{ color: "var(--fg-muted)" }} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--fg)" }}>{f.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>{f.desc}</div>
              </div>
              <span className="text-lg font-light transition-colors" style={{ color: "var(--border-strong)" }}>→</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
