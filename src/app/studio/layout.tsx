import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Style Studio — QR Launchpad | Custom QR Design",
  description: "Design your perfect QR code. Customize colors, shapes, logos, frames and effects with the QR Launchpad Style Studio.",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
