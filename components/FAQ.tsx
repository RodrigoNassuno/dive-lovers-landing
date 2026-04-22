"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { trackFAQOpen } from "@/lib/analytics";

const perguntas = [
  {
    pergunta: "Preciso saber nadar?",
    resposta:
      "Não precisa nadar como um atleta, mas é importante ter mínima desenvoltura na água. No primeiro dia, na piscina de 3m, você descobre rapidinho que dá conta. E o instrutor está ao seu lado o tempo todo.",
  },
  {
    pergunta: "E se eu sentir medo na hora?",
    resposta:
      "É super comum. Por isso fazemos toda a base na piscina antes do mar. Você só vai pra Ilha das Cabras quando estiver confiante. Nosso ritmo é o seu ritmo, sem pressão.",
  },
  {
    pergunta: "Quanto tempo dura a certificação?",
    resposta:
      "A certificação SSI Open Water Diver é vitalícia. Você ganha um cartão internacional que permite mergulhar em qualquer lugar do mundo, pra sempre.",
  },
  {
    pergunta: "Posso parcelar?",
    resposta:
      "Sim. O curso sai por R$ 2.600 à vista ou em 3x R$ 933 (total R$ 2.800) no cartão. Falando no WhatsApp a gente alinha a forma de pagamento que melhor te atende.",
  },
  {
    pergunta: "Tenho que comprar equipamento?",
    resposta:
      "Não. Todo o equipamento (cilindro, regulador, BC, máscara, nadadeira, roupa de neoprene) está incluso no curso. Quando virar mergulhador frequente, aí sim faz sentido investir no seu próprio kit.",
  },
  {
    pergunta: "A certificação vale fora do Brasil?",
    resposta:
      "Vale em qualquer lugar do mundo. SSI é uma das maiores certificadoras internacionais. Se você quiser mergulhar em Cancún, Bali, Maldivas, Caribe — sua certificação será reconhecida.",
  },
  {
    pergunta: "E se eu não puder ir nas datas?",
    resposta:
      "Sem problema. Você compra agora e escolhe a data depois, junto com a gente. Temos turmas frequentes e flexibilidade pra encaixar no seu calendário.",
  },
  {
    pergunta: "Tem hospedagem inclusa?",
    resposta:
      "A hospedagem é opcional e separada. Mas a Casa DiveLovers fica no mesmo terreno da escola — quartos e lofts confortáveis, pet friendly. A gente fecha um pacote pra você se quiser.",
  },
];

export default function FAQ() {
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 px-6 bg-azul-fundo scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="font-titulo text-4xl md:text-5xl font-bold text-off-white text-center mb-4"
        >
          Perguntas <span className="text-tangerina">frequentes</span>
        </motion.h2>
        <p className="text-off-white/70 text-center mb-12">
          Aquilo que todo iniciante quer saber antes de mergulhar.
        </p>

        <div className="space-y-3">
          {perguntas.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-azul-profundo/60 backdrop-blur-sm border border-off-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => {
                  const abrindo = aberto !== i
                  setAberto(aberto === i ? null : i)
                  if (abrindo) trackFAQOpen(p.pergunta)
                }}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-off-white/5 transition-colors"
              >
                <span className="font-titulo font-semibold text-off-white text-lg">
                  {p.pergunta}
                </span>
                {aberto === i ? (
                  <Minus className="text-tangerina flex-shrink-0" size={20} />
                ) : (
                  <Plus className="text-tangerina flex-shrink-0" size={20} />
                )}
              </button>
              <AnimatePresence>
                {aberto === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-off-white/80 leading-relaxed">
                      {p.resposta}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
