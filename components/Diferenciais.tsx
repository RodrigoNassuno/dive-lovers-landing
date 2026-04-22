"use client";

import { motion } from "framer-motion";
import { Wind, Wrench, MapPin, Heart, GraduationCap } from "lucide-react";

const diferenciais = [
  {
    icon: Wind,
    titulo: "Compressor próprio",
    texto: "Cilindros sempre prontos com qualidade de ar garantida.",
  },
  {
    icon: Wrench,
    titulo: "Equipamentos de primeira linha",
    texto: "Reguladores, BCs e computadores de mergulho sempre revisados.",
  },
  {
    icon: MapPin,
    titulo: "Localização privilegiada",
    texto: "Operação direto na Ilhabela, com acesso fácil aos melhores pontos.",
  },
  {
    icon: Heart,
    titulo: "Operada pelos próprios donos",
    texto: "Atendimento pessoal, sem terceirização. Você é tratado por quem entende.",
  },
  {
    icon: GraduationCap,
    titulo: "Metodologia SSI moderna",
    texto: "E-learning antes, prática depois. Aprendizado mais rápido e eficiente.",
  },
];

export default function Diferenciais() {
  return (
    <section id="diferenciais" className="relative py-24 px-6 bg-azul-profundo scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="font-titulo text-4xl md:text-5xl font-bold text-off-white text-center mb-4"
        >
          Por que a <span className="text-tangerina">Dive Lovers</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-off-white/70 text-center mb-16 max-w-2xl mx-auto"
        >
          Detalhes que fazem a diferença entre um curso bom e uma experiência inesquecível.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {diferenciais.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-tangerina/20 flex items-center justify-center">
                  <Icon className="text-tangerina" size={24} />
                </div>
                <div>
                  <h3 className="font-titulo font-bold text-off-white text-lg mb-1">
                    {item.titulo}
                  </h3>
                  <p className="text-off-white/70 text-sm leading-relaxed">
                    {item.texto}
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
