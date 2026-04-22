"use client";

import { motion } from "framer-motion";
import { Waves, UserCheck, Award } from "lucide-react";

const cards = [
  {
    icon: Waves,
    titulo: "Piscina exclusiva de 3m",
    texto:
      "Você aprende em ambiente controlado antes de ir pro mar. É o diferencial que tira o medo.",
  },
  {
    icon: UserCheck,
    titulo: "Acompanhamento direto do instrutor",
    texto:
      "Sempre ao seu lado, no seu ritmo. Sem pressão, sem turma gigante. Você é prioridade.",
  },
  {
    icon: Award,
    titulo: "Certificação SSI internacional",
    texto:
      "Válida pra mergulhar em qualquer lugar do mundo. Seu passaporte pra novas aventuras.",
  },
];

export default function QuebraObjecao() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-azul-profundo to-azul-meio">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="font-titulo text-4xl md:text-5xl font-bold text-off-white text-center mb-16 leading-tight"
        >
          Você não precisa ter coragem.{" "}
          <span className="text-tangerina">Precisa do lugar certo.</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-azul-profundo/40 backdrop-blur-sm border border-off-white/10 rounded-2xl p-8 hover:border-tangerina/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-tangerina/20 flex items-center justify-center mb-6">
                  <Icon className="text-tangerina" size={28} />
                </div>
                <h3 className="font-titulo text-2xl font-bold text-off-white mb-3">
                  {card.titulo}
                </h3>
                <p className="text-off-white/80 leading-relaxed">
                  {card.texto}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
