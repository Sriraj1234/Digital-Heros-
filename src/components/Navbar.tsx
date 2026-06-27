"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { QrCode, Sun, Moon, Menu, X, LogOut, LayoutDashboard, User } from "lucide-react";
import { useAuth } from "@/lib/authContext";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, loading, openAuthModal, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const NAV_LINKS = [
    { label: "Studio", href: "/#studio" },
    { label: "Style Studio", href: "/studio" },
    { label: "Templates", href: "/#templates" },
    { label: "Features", href: "/#features" },
    { label: "FAQ", href: "/#faq" },
  ];

  const avatarLetter = user?.displayName?.[0]?.toUpperCase()
    ?? user?.email?.[0]?.toUpperCase()
    ?? "U";

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
          <div className="w-7 h-7 rounded-sm flex items-center justify-center transition-colors duration-200" style={{ backgroundColor: "var(--accent)" }}>
            <QrCode className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight" style={{ color: "var(--fg)" }}>QR Launchpad</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "var(--fg-muted)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}
            >
              {item.label}
            </Link>
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

          {/* Auth — desktop */}
          {mounted && !loading && (
            user ? (
              <div className="hidden md:block relative" ref={dropRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white transition-transform hover:scale-105"
                  style={{ backgroundColor: "var(--accent)" }}
                  title={user.displayName ?? user.email ?? "Account"}
                >
                  {avatarLetter}
                </button>
                {dropdownOpen && (
                  <div
                    className="absolute right-0 top-10 w-48 rounded-xl py-1.5 z-50 shadow-xl"
                    style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
                  >
                    <div className="px-3.5 py-2 border-b mb-1" style={{ borderColor: "var(--border)" }}>
                      <p className="text-xs font-semibold truncate" style={{ color: "var(--fg)" }}>{user.displayName ?? "User"}</p>
                      <p className="text-[10px] truncate" style={{ color: "var(--fg-muted)" }}>{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors"
                      style={{ color: "var(--fg-muted)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                    </Link>
                    <button
                      onClick={() => { signOut(); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors"
                      style={{ color: "var(--fg-muted)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#EF4444")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal()}
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-sm transition-all"
                style={{ border: "1px solid var(--accent)", color: "var(--accent)" }}
              >
                <User className="w-3.5 h-3.5" /> Sign In
              </button>
            )
          )}

          <a href="/#studio" className="btn-primary hidden md:inline-flex text-xs">Generate QR</a>

          {/* Mobile menu button */}
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
            {NAV_LINKS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium"
                style={{ color: "var(--fg-muted)" }}
              >
                {item.label}
              </Link>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem" }} className="flex flex-col gap-3">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="btn-outline w-full justify-center text-xs">
                    <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                  </Link>
                  <button onClick={() => { signOut(); setMenuOpen(false); }} className="btn-outline w-full justify-center text-xs">
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </>
              ) : (
                <button onClick={() => { openAuthModal(); setMenuOpen(false); }} className="btn-outline w-full justify-center text-xs">
                  <User className="w-3.5 h-3.5" /> Sign In
                </button>
              )}
              <a href="/#studio" onClick={() => setMenuOpen(false)} className="btn-primary w-full justify-center">Generate QR</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
