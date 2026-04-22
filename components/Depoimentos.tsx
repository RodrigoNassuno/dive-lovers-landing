"use client";

import { motion } from "framer-motion";
import { Quote, User } from "lucide-react";

// TROCAR: substituir por depoimentos reais (nome, foto, texto)
const depoimentos = [
  {
    id: 1,
    nome: "[NOME DO ALUNO 1]",
    contexto: "[Profissão / Cidade]",
    texto:
      "[DEPOIMENTO 1 — Insira aqui o depoimento real do aluno. Ideal: 3-4 linhas falando sobre a experiência, o medo inicial e o que sentiu ao se tornar mergulhador.]",
  },
  {
    id: 2,
    nome: "[NOME DO ALUNO 2]",
    contexto: "[Profissão / Cidade]",
    texto:
      "[DEPOIMENTO 2 — Insira aqui o depoimento real do aluno. Ideal: 3-4 linhas falando sobre a experiência, o medo inicial e o que sentiu ao se tornar mergulhador.]",
  },
  {
    id: 3,
    nome: "[NOME DO ALUNO 3]",
    contexto: "[Profissão / Cidade]",
    texto:
      "[DEPOIMENTO 3 — Insira aqui o depoimento real do aluno. Ideal: 3-4 linhas falando sobre a experiência, o medo inicial e o que sentiu ao se tornar mergulhador.]",
  },
];

export default function Depoimentos() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-azul-profundo to-azul-meio">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="font-titulo text-4xl md:text-5xl font-bold text-off-white text-center mb-4"
        >
          Histórias de quem{" "}
          <span className="text-tangerina">já mergulhou com a gente</span>
        </motion.h2>

        <p className="text-off-white/60 text-center text-sm italic mb-16">
          ⚠️ Área de placeholder — substitua pelos depoimentos reais dos seus alunos
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {depoimentos.map((dep, i) => (
            <motion.div
              key={dep.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="image-placeholder rounded-2xl p-8 flex flex-col"
            >
              <Quote className="text-tangerina mb-4" size={32} />
              <p className="text-off-white/90 leading-relaxed mb-6 flex-grow italic">
                {dep.texto}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-tangerina/30">
                <div className="w-12 h-12 rounded-full bg-tangerina/20 flex items-center justify-center">
                  <User className="text-tangerina" size={24} />
                </div>
                <div>
                  <p className="font-bold text-off-white">{dep.nome}</p>
                  <p className="text-off-white/60 text-sm">{dep.contexto}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
