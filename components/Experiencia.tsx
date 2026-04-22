"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

const fotos = [
  {
    id: "estrutura",
    label: "FOTO: Estrutura da Escola",
    descricao: "Fachada / recepção / sala de aula",
  },
  {
    id: "piscina",
    label: "FOTO: Piscina de 3m",
    descricao: "Foto da piscina exclusiva (diferencial principal)",
  },
  {
    id: "ilha-cabras",
    label: "FOTO: Ilha das Cabras",
    descricao: "Local de mergulho / vida marinha",
  },
  {
    id: "casa",
    label: "FOTO: Casa DiveLovers",
    descricao: "Hospedagem / quartos / área comum",
  },
];

export default function Experiencia() {
  return (
    <section id="experiencia" className="relative py-24 px-6 bg-gradient-to-b from-azul-meio to-azul-profundo scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="font-titulo text-4xl md:text-5xl font-bold text-off-white text-center mb-6 leading-tight"
        >
          Você não vai pra uma escola.{" "}
          <span className="text-tangerina">
            Você entra num estilo de vida.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-off-white/80 text-center max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          A Casa DiveLovers fica no mesmo lugar. Quartos, lofts, pet-friendly.
          Você dorme, acorda e mergulha — tudo a poucos passos.
        </motion.p>

        {/* Grid 2x2 de fotos com placeholders bem visíveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fotos.map((foto, i) => (
            <motion.div
              key={foto.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="image-placeholder aspect-[4/3] rounded-2xl flex flex-col items-center justify-center text-center p-6"
            >
              {/* 
                TROCAR: substituir esse placeholder pela imagem real
                Caminho sugerido: /public/images/{foto.id}.jpg
                Usar componente <Image> do next/image
              */}
              <ImageIcon className="text-tangerina mb-4" size={48} />
              <p className="font-titulo font-bold text-tangerina text-xl mb-2">
                [{foto.label}]
              </p>
              <p className="text-off-white/70 text-sm">{foto.descricao}</p>
              <p className="text-off-white/40 text-xs mt-4 italic">
                Substituir em /public/images/{foto.id}.jpg
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
