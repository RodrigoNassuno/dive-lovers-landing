'use client'

// Cena R3F para o OceanBackground global.
// Renderiza bolhas + 4 espécies de peixes sobre toda a página.
// Este componente só é carregado no cliente (via dynamic + ssr:false no wrapper).

import React, { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import Bubbles3D from './scene/Bubbles3D'
import OceanFish from './scene/OceanFish'

class OceanErrorBoundary extends React.Component<
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
    if (this.state.hasError) return null
    return this.props.children
  }
}

export default function OceanScene() {
  const isMobile = useMemo(() => window.innerWidth < 768, [])

  return (
    <OceanErrorBoundary>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        gl={{
          alpha: true,
          antialias: false,          // desativado globalmente (tela fixa, perf > qualidade)
          powerPreference: 'default',
        }}
        dpr={[1, 1.5]}
        // Câmera ortográfica: 1 unidade = 1% da tela, sem perspectiva
        // frustum cobre -8..+8 vertical (16u) e ~-14..+14 horizontal (28u ≈ aspect 16:9)
        camera={{ position: [0, 0, 10], fov: 55, near: 0.1, far: 50 }}
        flat
      >
        <Bubbles3D count={isMobile ? 18 : 36} color="#b0d8f8" />
        <OceanFish  count={isMobile ?  8 : 16} />
      </Canvas>
    </OceanErrorBoundary>
  )
}
