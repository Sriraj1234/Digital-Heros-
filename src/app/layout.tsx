import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/authContext";
import AuthModal from "@/components/AuthModal";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QR Launchpad — Generate QR Codes at Mission Speed | Digital Heroes",
  description: "Free QR code generator with advanced customization. Create URL, WiFi, vCard, WhatsApp QR codes with custom colors, logos, and styles. Download PNG, SVG, PDF. No signup required.",
  keywords: ["QR Code Generator", "Free QR Generator", "Online QR Creator", "QR Code Maker", "Custom QR Code", "WiFi QR Code", "vCard QR", "Digital Heroes"],
  openGraph: {
    title: "QR Launchpad — Generate QR Codes at Mission Speed",
    description: "Free, advanced QR code generator with custom styles, logos, and instant export.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Launchpad — Generate QR Codes at Mission Speed",
    description: "Free, advanced QR code generator with custom styles, logos, and instant export.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            {children}
            <AuthModal />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

