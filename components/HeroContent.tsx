'use client'

// Conteúdo do Hero (headline, CTAs, scroll indicator).
// Usado em Hero3D. HeroFallback mantém sua própria cópia inline para
// ser completamente independente do 3D em caso de fallback.

import { motion } from 'framer-motion'
import { ArrowDown, MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/lib/config'
import { trackWhatsAppClick } from '@/lib/analytics'

export default function HeroContent() {
  return (
    <>
      {/* Conteúdo principal */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-titulo text-5xl md:text-7xl font-bold text-off-white mb-6 leading-tight"
        >
          Em 3 dias, você é{' '}
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
            onClick={() => trackWhatsAppClick('hero')}
            className="inline-flex items-center gap-2 bg-tangerina hover:bg-tangerina/90 text-azul-profundo font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 hover:animate-glow shadow-lg"
          >
            Quero garantir minha vaga →
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('hero')}
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
    </>
  )
}
