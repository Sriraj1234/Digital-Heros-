"use client";

import { motion } from "framer-motion";
import { TEMPLATES } from "@/lib/templates";
import { ArrowRight } from "lucide-react";

export default function Templates() {
  const handleSelect = (template: (typeof TEMPLATES)[0]) => {
    const fn = (window as any).__qrStudioLoad;
    if (fn) fn({ type: template.qrType, fgColor: template.fgColor, bgColor: template.bgColor, values: template.defaultValues });
  };

  const categories = ["business", "education", "beauty", "food", "personal"];
  const categoryLabels: Record<string, string> = {
    business: "Business & Agencies",
    education: "Education & Coaching",
    beauty: "Beauty & Wellness",
    food: "Food & Hospitality",
    personal: "Personal & Portfolios"
  };

  return (
    <section id="templates" className="py-20" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div>
            <span className="label-xs">03 · Smart Templates</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: "var(--fg)" }}>
              One click.<br />Mission ready.
            </h2>
          </div>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--fg-muted)" }}>
            Select a template and the studio auto-configures the perfect QR type, colors, and content for your specific industry.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((cat, catIdx) => {
            const templates = TEMPLATES.filter(t => t.category === cat);
            if (templates.length === 0) return null;
            return (
              <div key={cat}>
                <h3 className="label-xs mb-4" style={{ color: "var(--fg-muted)" }}>{categoryLabels[cat]}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map((t, i) => (
                    <motion.button
                      key={t.id}
                      onClick={() => handleSelect(t)}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.3, delay: (catIdx * 0.1) + (i * 0.05) }}
                      className="card card-hover text-left p-5 group w-full"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl">{t.icon}</span>
                        <ArrowRight
                          className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0"
                          style={{ color: "var(--accent)" }}
                        />
                      </div>
                      <div className="font-semibold text-sm mb-1" style={{ color: "var(--fg)" }}>{t.name}</div>
                      <div className="text-xs mb-3" style={{ color: "var(--fg-muted)" }}>{t.description}</div>
                      <div
                        className="inline-flex items-center gap-1 text-[0.6rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm"
                        style={{ backgroundColor: t.fgColor + "18", color: t.fgColor, border: `1px solid ${t.fgColor}30` }}
                      >
                        {t.label}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
