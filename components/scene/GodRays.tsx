'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface RayConfig {
  x: number
  tilt: number
  baseOpacity: number
  speed: number
  phase: number
}

// Raios de luz volumétrica: planos transparentes com AdditiveBlending.
// Opacidade muito baixa (0.025-0.05) com oscilação suave — efeito sutil.
// 2 triângulos por raio. Zero influência na performance.
export default function GodRays({ count }: { count: number }) {
  const configs = useMemo<RayConfig[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: -5 + (i / Math.max(count - 1, 1)) * 10, // espaçados de -5 a +5
      tilt: (Math.random() - 0.5) * 0.4,          // ±0.2 rad (≈11°)
      baseOpacity: 0.025 + Math.random() * 0.025,  // 0.025 a 0.05
      speed: 0.12 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
    }))
  }, [count])

  const matRefs = useRef<(THREE.MeshBasicMaterial | null)[]>(Array(count).fill(null))

  useFrame(({ clock }) => {
    if (document.hidden) return
    matRefs.current.forEach((mat, i) => {
      if (!mat) return
      mat.opacity =
        configs[i].baseOpacity +
        Math.sin(clock.elapsedTime * configs[i].speed + configs[i].phase) * 0.012
    })
  })

  return (
    <group>
      {configs.map((cfg, i) => (
        <mesh key={i} position={[cfg.x, 0, -2.5]} rotation={[0, 0, cfg.tilt]}>
          <planeGeometry args={[1.8, 22]} />
          <meshBasicMaterial
            ref={(mat: THREE.MeshBasicMaterial | null) => {
              matRefs.current[i] = mat
            }}
            color="#aad4f5"
            transparent
            opacity={cfg.baseOpacity}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}
