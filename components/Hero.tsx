"use client";

import { motion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/config";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 
        PLACEHOLDER PARA CENA 3D DO HERO
        ================================
        TODO (Claude Code): Substituir este div pela cena React Three Fiber.
        - Gradiente azul claro → médio
        - God rays (raios de luz volumétrica vindo de cima)
        - ~30 bolhas subindo (partículas)
        - 4-5 silhuetas de peixes low-poly em loop
        - Silhueta do mergulhador do logo flutuando
        - Performance: pixelRatio cap 1.5, fallback se WebGL falhar,
          reduzir partículas em 50% no mobile, pause em aba inativa
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-azul-pastel via-azul-meio to-azul-profundo">
        {/* Bolhas decorativas CSS (placeholder até o 3D entrar) */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="bubble animate-bubble-up"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 6 + 6}s`,
            }}
          />
        ))}
      </div>

      {/* Conteúdo Hero */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-titulo text-5xl md:text-7xl font-bold text-off-white mb-6 leading-tight"
        >
          Em 3 dias, você é{" "}
          <span className="text-tangerina">mergulhador certificado</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-off-white/90 mb-10 leading-relaxed max-w-2xl mx-auto"
        >
          Mesmo que você nunca tenha entrado na água. A gente te conduz, no seu
          tempo, com segurança total — em São Sebastião, à beira de Ilhabela.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("hero")}
            className="inline-flex items-center gap-2 bg-tangerina hover:bg-tangerina/90 text-azul-profundo font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 hover:animate-glow shadow-lg"
          >
            Quero garantir minha vaga →
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("hero")}
            className="inline-flex items-center gap-2 border-2 border-off-white text-off-white hover:bg-off-white hover:text-azul-profundo font-semibold px-8 py-4 rounded-full text-lg transition-all"
          >
            <MessageCircle size={20} />
            Falar no WhatsApp
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm text-off-white/70"
        >
          Certificação SSI internacional · Vagas limitadas · R$ 2.200
        </motion.p>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-off-white/70"
      >
        <span className="text-xs mb-2">desça pra mergulhar</span>
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
}
