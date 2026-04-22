'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface BubbleState {
  baseX: number
  y: number
  z: number
  scale: number
  speed: number
  xAmp: number
  xFreq: number
  xPhase: number
}

// Bolhas 3D subindo — InstancedMesh = 1 draw call para todas as bolhas.
// Geometria: SphereGeometry(1, 8, 8) = 64 triângulos por instância.
export default function Bubbles3D({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useRef(new THREE.Object3D())

  const bubbles = useMemo<BubbleState[]>(() => {
    return Array.from({ length: count }, () => ({
      baseX: (Math.random() - 0.5) * 16,  // x: -8 a +8 (além do viewport)
      y: (Math.random() - 0.5) * 18,      // y inicial espalhado por todo o range
      z: -0.5 - Math.random() * 2.5,      // z: -0.5 a -3 (atrás do conteúdo)
      scale: 0.06 + Math.random() * 0.22, // tamanhos variados
      speed: 0.35 + Math.random() * 0.85, // unidades/segundo
      xAmp: 0.1 + Math.random() * 0.35,  // amplitude da oscilação horizontal
      xFreq: 0.3 + Math.random() * 0.5,  // frequência da oscilação
      xPhase: Math.random() * Math.PI * 2,
    }))
  }, [count])

  useFrame((_, delta) => {
    if (document.hidden) return

    // Clamp delta: evita teleporte quando aba volta de inativa
    const dt = Math.min(delta, 0.1)

    bubbles.forEach((b, i) => {
      b.y += b.speed * dt

      // Reseta abaixo do viewport quando sair pelo topo
      if (b.y > 9) {
        b.y = -9 - Math.random() * 3
        b.baseX = (Math.random() - 0.5) * 16
      }

      const x = b.baseX + Math.sin(b.y * b.xFreq + b.xPhase) * b.xAmp

      dummy.current.position.set(x, b.y, b.z)
      dummy.current.scale.setScalar(b.scale)
      dummy.current.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.current.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color="#c8e8ff"
        transparent
        opacity={0.18}
        depthWrite={false}
      />
    </instancedMesh>
  )
}
