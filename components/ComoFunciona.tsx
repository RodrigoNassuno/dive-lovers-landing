"use client";

import { motion } from "framer-motion";
import { BookOpen, Fish, GraduationCap } from "lucide-react";

const dias = [
  {
    numero: "01",
    icon: BookOpen,
    titulo: "Teoria + Piscina",
    descricao:
      "Você aprende os fundamentos com nosso e-learning SSI e pratica em ambiente controlado. Aqui é onde você descobre que consegue.",
  },
  {
    numero: "02",
    icon: Fish,
    titulo: "Dois mergulhos no mar",
    descricao:
      "Ilha das Cabras. Área preservada, vida marinha rica e cordas subaquáticas pra te dar segurança total.",
  },
  {
    numero: "03",
    icon: GraduationCap,
    titulo: "Mais dois mergulhos + certificação",
    descricao:
      "Você completa a certificação e sai mergulhador SSI. Pronto pra explorar qualquer mar do planeta.",
  },
];

export default function ComoFunciona() {
  return (
    <section className="relative py-24 px-6 bg-azul-meio">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="font-titulo text-4xl md:text-5xl font-bold text-off-white text-center mb-4"
        >
          Como funciona
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-tangerina text-center text-xl mb-16"
        >
          Três dias. Uma transformação.
        </motion.p>

        <div className="relative">
          {/* Linha vertical da timeline */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-tangerina/30 -translate-x-1/2 md:-translate-x-1/2" />

          {dias.map((dia, i) => {
            const Icon = dia.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`relative mb-16 md:mb-24 flex items-start ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Bolinha da timeline */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-tangerina flex items-center justify-center shadow-lg z-10">
                  <Icon className="text-azul-profundo" size={28} />
                </div>

                {/* Conteúdo */}
                <div
                  className={`pl-24 md:pl-0 md:w-5/12 ${
                    i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}
                >
                  <span className="font-titulo text-6xl font-bold text-tangerina/30">
                    {dia.numero}
                  </span>
                  <h3 className="font-titulo text-2xl md:text-3xl font-bold text-off-white mb-3">
                    {dia.titulo}
                  </h3>
                  <p className="text-off-white/80 leading-relaxed">
                    {dia.descricao}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
