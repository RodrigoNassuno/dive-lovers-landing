"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { whatsappLink, PRECOS } from "@/lib/config";
import { trackWhatsAppClick } from "@/lib/analytics";

const inclui = [
  "3 dias de curso completo",
  "Certificação SSI internacional",
  "Equipamentos inclusos",
  "Aulas teóricas + e-learning",
  "Treinamento na piscina exclusiva de 3m",
  "4 mergulhos no mar (Ilha das Cabras)",
  "Acompanhamento direto do instrutor",
];

export default function Oferta() {
  return (
    <section
      id="oferta"
      className="relative py-24 px-6 bg-azul-fundo overflow-hidden scroll-mt-16"
    >
      {/* Bolhas decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bubble animate-bubble-up"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 8}px`,
              height: `${Math.random() * 20 + 8}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 6 + 8}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="font-titulo text-4xl md:text-6xl font-bold text-off-white text-center mb-4 leading-tight"
        >
          Sua certificação{" "}
          <span className="text-tangerina">te espera.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-off-white/70 text-center mb-12"
        >
          Garanta sua vaga agora e escolha a data depois.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-azul-profundo to-azul-meio rounded-3xl p-8 md:p-12 border border-tangerina/30 shadow-2xl"
        >
          <div className="text-center mb-8">
            <span className="inline-block bg-tangerina text-azul-profundo text-xs font-bold px-4 py-1 rounded-full mb-4">
              CURSO COMPLETO
            </span>
            <h3 className="font-titulo text-3xl md:text-4xl font-bold text-off-white mb-2">
              Open Water Diver
            </h3>
            <p className="text-off-white/70">3 dias · Certificação SSI</p>
          </div>

          {/* Preço */}
          <div className="text-center mb-10">
            <p className="text-off-white/50 line-through text-lg">
              De {PRECOS.precoOriginal}
            </p>
            <p className="font-titulo text-5xl md:text-7xl font-bold text-tangerina my-2">
              {PRECOS.precoVista}
            </p>
            <p className="text-off-white/80">à vista · ou {PRECOS.precoParcelado} no cartão</p>
          </div>

          {/* Lista de itens incluídos */}
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {inclui.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="text-tangerina flex-shrink-0 mt-0.5" size={20} />
                <span className="text-off-white/90 text-sm">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA principal */}
          <a
            href={whatsappLink(
              "Oi! Quero garantir minha vaga no curso Open Water Diver."
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("oferta")}
            className="flex items-center justify-center gap-3 w-full bg-tangerina hover:bg-tangerina/90 text-azul-profundo font-bold px-8 py-5 rounded-full text-xl transition-all hover:scale-[1.02] hover:animate-glow shadow-lg"
          >
            <MessageCircle size={24} />
            Falar no WhatsApp e garantir vaga
          </a>

          <p className="text-center text-off-white/60 text-sm mt-6">
            Resposta em até 2 horas · Sem compromisso
          </p>
        </motion.div>
      </div>
    </section>
  );
}
