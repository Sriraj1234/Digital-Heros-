import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QRStudio from "@/components/QRStudio";
import Templates from "@/components/Templates";
import History from "@/components/History";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <Hero />
      <QRStudio />
      <Templates />
      <History />
      <Features />
      <FAQ />
      <Footer />
    </main>
  );
}
