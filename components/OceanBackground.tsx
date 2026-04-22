'use client'

// Canvas WebGL fixo cobrindo toda a viewport, atrás do conteúdo.
// mix-blend-mode: screen → fundo preto do canvas some; objetos claros
// (peixes, bolhas) se somam à luminância das seções abaixo.
// pointer-events: none → cliques passam direto para o conteúdo.

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

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

const OceanScene = dynamic(() => import('./OceanScene'), { ssr: false })

export default function OceanBackground() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReduced && detectWebGL()) {
      setActive(true)
    }
  }, [])

  if (!active) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 30,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    >
      <OceanScene />
    </div>
  )
}
