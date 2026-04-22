import Hero from "@/components/Hero";
import QuebraObjecao from "@/components/QuebraObjecao";
import ComoFunciona from "@/components/ComoFunciona";
import Experiencia from "@/components/Experiencia";
import Diferenciais from "@/components/Diferenciais";
import Depoimentos from "@/components/Depoimentos";
import Oferta from "@/components/Oferta";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <main className="ocean-bg">
      <Hero />
      <QuebraObjecao />
      <ComoFunciona />
      <Experiencia />
      <Diferenciais />
      <Depoimentos />
      <Oferta />
      <FAQ />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
