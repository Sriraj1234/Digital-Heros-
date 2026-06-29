import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { TypeSelector } from "@/components/TypeSelector";
import Templates from "@/components/Templates";
import History from "@/components/History";
import BulkGenerator from "@/components/BulkGenerator";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <Hero />
      <div id="studio" className="pt-20 pb-10" style={{ backgroundColor: "var(--bg)" }}>
        <TypeSelector />
      </div>
      <Templates />
      <History />
      <BulkGenerator />
      <Features />
      <FAQ />
      <Footer />
    </main>
  );
}

