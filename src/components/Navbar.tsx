"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { QrCode, Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backgroundColor: scrolled ? "color-mix(in srgb, var(--bg) 95%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-7 h-7 rounded-sm flex items-center justify-center transition-colors duration-200"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <QrCode className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight" style={{ color: "var(--fg)" }}>
            QR Launchpad
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {[
            { label: "Studio", href: "#studio" },
            { label: "Style Studio", href: "/studio" },
            { label: "Templates", href: "#templates" },
            { label: "Features", href: "#features" },
            { label: "FAQ", href: "#faq" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "var(--fg-muted)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-sm flex items-center justify-center transition-colors duration-200"
              style={{ border: "1px solid var(--border)", color: "var(--fg-muted)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-xs font-semibold px-3.5 py-2 rounded-sm transition-all duration-200"
            style={{ border: "1px solid var(--border-strong)", color: "var(--fg-muted)" }}
          >
            Digital Heroes →
          </a>
          <a
            href="#studio"
            className="btn-primary hidden md:inline-flex text-xs"
          >
            Generate QR
          </a>
          {/* Mobile menu */}
          <button
            className="md:hidden"
            style={{ color: "var(--fg-muted)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg)" }}>
          <div className="max-w-6xl mx-auto px-5 py-5 flex flex-col gap-4">
            {[
              { label: "Studio", href: "#studio" },
              { label: "Style Studio", href: "/studio" },
              { label: "Templates", href: "#templates" },
              { label: "Features", href: "#features" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium"
                style={{ color: "var(--fg-muted)" }}
              >
                {item.label}
              </a>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
              <a href="#studio" onClick={() => setMenuOpen(false)} className="btn-primary w-full justify-center">
                Generate QR
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
