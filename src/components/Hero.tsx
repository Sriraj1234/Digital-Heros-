"use client";

import { ArrowRight, Zap } from "lucide-react";

const MARQUEE_ITEMS = [
  "URL QR", "WiFi QR", "vCard", "WhatsApp", "Email QR", "SMS QR",
  "PNG Export", "SVG Export", "PDF Export", "4K Export",
  "Custom Colors", "Logo Upload", "Rounded Dots", "Eye Styles",
  "30+ QR Types", "GPU Rendered", "Instant Preview",
];

const FORMAT_CHIPS = ["PNG", "SVG", "PDF", "4K", "JPEG"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20">
      {/* Background ambient orb — GPU composited */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none animate-glow-breathe gpu-layer"
        style={{
          background: "radial-gradient(circle, var(--glow-color-soft) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* DH-style vertical sidebar text */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 z-10">
        <div className="w-px h-16" style={{ backgroundColor: "var(--border-strong)" }} />
        <span
          className="text-[0.55rem] font-bold tracking-[0.3em] uppercase"
          style={{ color: "var(--fg-muted)", writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          QR LAUNCHPAD · EST 2026
        </span>
        <div className="w-px h-16" style={{ backgroundColor: "var(--border-strong)" }} />
      </div>

      {/* Hero content */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 relative z-10">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-8 animate-fade-up">
          <span
            className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm"
            style={{ border: "1px solid var(--border-strong)", color: "var(--fg-muted)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-dot-pulse gpu-layer" style={{ backgroundColor: "var(--accent)" }} />
            Ready for launch · Mission: QR Generation
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Headline */}
            <h1
              className="font-bold leading-[0.95] tracking-tight mb-8 animate-fade-up delay-100 gpu-layer"
              style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", color: "var(--fg)" }}
            >
              WE BUILD<br />
              <span style={{ color: "var(--accent)" }}>QR.</span>
            </h1>

            <p
              className="text-base md:text-lg leading-relaxed mb-10 max-w-lg animate-fade-up delay-200"
              style={{ color: "var(--fg-muted)" }}
            >
              We craft <em>tailored</em> QR experiences — custom branding, advanced styles,
              high-res export — that drive real engagement.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-up delay-300">
              <a href="#studio" className="btn-primary gpu-hover">
                <Zap className="w-4 h-4" />
                Start Generating
              </a>
              <a href="#templates" className="btn-outline gpu-hover">
                Explore Templates
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Stats */}
            <div
              className="mt-12 pt-8 grid grid-cols-3 gap-6 animate-fade-up delay-400"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {[
                { v: "30+", l: "QR Types" },
                { v: "5", l: "Export Formats" },
                { v: "100%", l: "Free Forever" },
              ].map((s, i) => (
                <div key={s.l} className={`animate-fade-up`} style={{ animationDelay: `${0.45 + i * 0.08}s` }}>
                  <div className="text-2xl font-bold gpu-layer" style={{ color: "var(--fg)" }}>{s.v}</div>
                  <div className="label-xs mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — animated QR preview card */}
          <div className="relative hidden lg:flex items-center justify-center animate-slide-right delay-200 gpu-layer">
            {/* Background orb */}
            <div
              className="absolute w-72 h-72 rounded-full opacity-20 animate-glow-breathe gpu-layer"
              style={{ backgroundColor: "var(--accent)", filter: "blur(50px)" }}
            />

            {/* Floating format chips */}
            {FORMAT_CHIPS.map((fmt, i) => (
              <div
                key={fmt}
                className="absolute text-[10px] font-bold px-2 py-1 rounded-sm animate-float gpu-layer"
                style={{
                  border: "1px solid var(--border-strong)",
                  backgroundColor: "var(--bg-card)",
                  color: "var(--fg-muted)",
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${2.5 + i * 0.4}s`,
                  top: `${8 + i * 18}%`,
                  left: i % 2 === 0 ? "-14%" : "auto",
                  right: i % 2 === 1 ? "-14%" : "auto",
                }}
              >
                .{fmt}
              </div>
            ))}

            {/* Main card */}
            <div
              className="relative card p-8 shadow-2xl gpu-layer"
              style={{ width: 280 }}
            >
              {/* Glow ring */}
              <div className="glow-ring" />

              <div className="label-xs mb-3">Live Preview</div>

              {/* QR visual container */}
              <div
                className="relative w-full aspect-square rounded-sm flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)" }}
              >
                {/* Scan beam */}
                <div className="scan-beam-container">
                  <div className="scan-beam" />
                </div>

                {/* QR SVG */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full p-4"
                  style={{ color: "var(--accent)" }}
                >
                  {/* Finder patterns */}
                  <rect x="5" y="5" width="28" height="28" rx="2" fill="currentColor" />
                  <rect x="9" y="9" width="20" height="20" rx="1" fill="var(--bg)" />
                  <rect x="13" y="13" width="12" height="12" rx="1" fill="currentColor" />
                  <rect x="67" y="5" width="28" height="28" rx="2" fill="currentColor" />
                  <rect x="71" y="9" width="20" height="20" rx="1" fill="var(--bg)" />
                  <rect x="75" y="13" width="12" height="12" rx="1" fill="currentColor" />
                  <rect x="5" y="67" width="28" height="28" rx="2" fill="currentColor" />
                  <rect x="9" y="71" width="20" height="20" rx="1" fill="var(--bg)" />
                  <rect x="13" y="75" width="12" height="12" rx="1" fill="currentColor" />
                  {/* Data dots */}
                  {[40, 47, 54, 40, 47, 54, 40, 47, 54].map((x, i) => (
                    <rect key={i} x={x} y={5 + (Math.floor(i / 3) * 7)} width="5" height="5" rx="1" fill="currentColor" opacity={0.8} />
                  ))}
                  {[5, 12, 19, 26, 33].map((y, i) => (
                    <rect key={i} x={40} y={y + 30} width="5" height="5" rx="1" fill="currentColor" opacity={0.6 + (i * 0.08)} />
                  ))}
                  {[40, 47, 54, 61, 68, 75, 82].map((x, i) => (
                    <rect key={i} x={x} y={40} width="5" height="5" rx="1" fill="currentColor" opacity={0.7} />
                  ))}
                  {[47, 54, 61].map((x, i) => (
                    <rect key={i} x={x} y={54} width="5" height="5" rx="1" fill="currentColor" opacity={0.6} />
                  ))}
                  {[61, 68, 75, 82].map((x, i) => (
                    <rect key={i} x={x} y={61} width="5" height="5" rx="1" fill="currentColor" opacity={0.75} />
                  ))}
                </svg>
              </div>

              {/* LIVE badge */}
              <div
                className="live-badge absolute -top-3 -right-3 text-xs font-bold px-2.5 py-1 rounded-sm flex items-center gap-1.5"
                style={{ backgroundColor: "var(--accent)", color: "var(--accent-text)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-dot-pulse gpu-layer" />
                LIVE
              </div>

              {/* URL pill at bottom */}
              <div
                className="mt-3 px-3 py-2 rounded-sm text-[10px] font-mono truncate animate-fade-in delay-500"
                style={{ backgroundColor: "var(--bg)", color: "var(--fg-muted)", border: "1px solid var(--border)" }}
              >
                ↗ digitalheroesco.com
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div
        className="overflow-hidden py-3 border-y"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
      >
        <div className="flex animate-marquee whitespace-nowrap gpu-layer">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 mx-6 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--fg-muted)" }}>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
