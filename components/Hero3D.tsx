'use client'

import React, { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroFallback from './HeroFallback'
import HeroContent from './HeroContent'
import Bubbles3D from './scene/Bubbles3D'
import GodRays from './scene/GodRays'
import Fish3D from './scene/Fish3D'

// ErrorBoundary captura qualquer erro React do Canvas (crash de shader,
// falha de extensão WebGL, erros de geometria, etc.)
class Hero3DErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return <HeroFallback />
    return this.props.children
  }
}

export default function Hero3D() {
  // window está disponível: este componente só roda no cliente (ssr: false no wrapper)
  const isMobile = useMemo(() => window.innerWidth < 768, [])

  return (
    <Hero3DErrorBoundary>
      {/*
        Gradiente CSS fica no <section>. O Canvas tem alpha: true,
        então a cena 3D é transparente onde não há objetos — o CSS
        mostra por baixo. Nenhum objeto ocupa 100% do background.
      */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-azul-pastel via-azul-meio to-azul-profundo">

        {/* Canvas 3D — ocupa todo o espaço da section como fundo */}
        <div className="absolute inset-0">
          <Canvas
            style={{ width: '100%', height: '100%' }}
            gl={{
              alpha: true,               // transparente → CSS gradient aparece
              antialias: !isMobile,      // desativa no mobile (ganho de perf)
              powerPreference: 'default',
            }}
            dpr={[1, 1.5]}              // pixelRatio cap em 1.5
            camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 50 }}
            flat                         // desativa tonemapping — cores exatas da marca
          >
            {/*
              Ordem de renderização (back → front):
              GodRays (z=-2.5) → Bubbles (z=-0.5 a -3) → Fish (z=-3 a -5)

              Sem luzes: todos os materiais são meshBasicMaterial (ignoram iluminação).
              Mais rápido e visual consistente independente de ambiente.
            */}
            <GodRays count={isMobile ? 4 : 6} />
            <Bubbles3D count={isMobile ? 12 : 24} />
            <Fish3D count={isMobile ? 2 : 4} />
          </Canvas>
        </div>

        {/* Conteúdo (headline, CTAs, scroll) — sobreposto ao canvas */}
        <HeroContent />
      </section>
    </Hero3DErrorBoundary>
  )
}
