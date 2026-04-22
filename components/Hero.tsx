'use client'

// Wrapper do Hero — decide em runtime se ativa a cena 3D ou o fallback CSS.
//
// Árvore de decisão:
//   1. prefers-reduced-motion: reduce → HeroFallback (imediato)
//   2. WebGL indisponível           → HeroFallback (imediato)
//   3. Tudo OK                      → Hero3D (carregado dinamicamente)
//      └─ Suspense durante load     → HeroFallback
//      └─ ErrorBoundary (runtime)   → HeroFallback
//
// Hero3D nunca é incluído no bundle server-side (ssr: false).
// Usuários sem WebGL nunca baixam three.js / @react-three/fiber.

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import HeroFallback from './HeroFallback'

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => <HeroFallback />, // mostrado durante o download do chunk 3D
})

export default function Hero() {
  // Começa com fallback — o cliente promove para 3D se as condições forem satisfeitas.
  // Evita qualquer flash ou mismatch de hidratação.
  const [mode, setMode] = useState<'fallback' | '3d'>('fallback')

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReduced && detectWebGL()) {
      setMode('3d')
    }
  }, [])

  if (mode === 'fallback') return <HeroFallback />
  return <Hero3D />
}
