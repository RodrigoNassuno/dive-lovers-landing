'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Forma do peixe: silhueta com cauda bifurcada, ~20 triângulos.
// Definida 1x e reutilizada como geometria compartilhada.
function makeFishShape(): THREE.Shape {
  const s = new THREE.Shape()
  s.moveTo(0.5, 0)                                        // ponta do nariz (direita)
  s.bezierCurveTo(0.45, 0.22, 0.0, 0.22, -0.28, 0.14)   // curva topo do corpo
  s.lineTo(-0.52, 0.28)                                   // ponta superior da cauda
  s.lineTo(-0.38, 0.02)                                   // entalhe central da cauda
  s.lineTo(-0.52, -0.28)                                  // ponta inferior da cauda
  s.lineTo(-0.28, -0.14)                                  // junção cauda-corpo inferior
  s.bezierCurveTo(0.0, -0.22, 0.45, -0.22, 0.5, 0)      // curva base do corpo
  s.closePath()
  return s
}

interface FishState {
  a: number        // raio X da elipse (amplitude horizontal)
  b: number        // raio Y da elipse (ondulação vertical)
  speed: number    // rad/s (negativo = sentido anti-horário)
  phase: number    // fase inicial
  yCenter: number  // centro vertical da trajetória
  z: number        // profundidade
  scale: number
  opacity: number
}

// Peixes z: -3 a -5 (atrás das bolhas), escala 2.6-3.6.
// Na câmera fov=60 pos=[0,0,8]: viewport width≈16.4u; peixe ≈ 22% da largura.
export default function Fish3D({ count }: { count: number }) {
  const geometry = useMemo(() => new THREE.ShapeGeometry(makeFishShape(), 8), [])

  const meshRefs = useRef<(THREE.Mesh | null)[]>(Array(count).fill(null))

  const fishes = useMemo<FishState[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const z = -3 - Math.random() * 2
      return {
        a: 8 + Math.random() * 3,                      // raio X: 8-11 (sai do viewport)
        b: 0.3 + Math.random() * 0.5,                  // raio Y: 0.3-0.8 (trajetória suave)
        speed: (0.12 + Math.random() * 0.08) * (Math.random() > 0.5 ? 1 : -1),
        phase: (i / count) * Math.PI * 2,              // espaçados na elipse
        yCenter: -1 + Math.random() * 3.5,
        z,
        scale: 2.6 + Math.random() * 1.0,
        opacity: 0.55 + Math.abs(z) * 0.06,            // mais fundo = menos visível
      }
    })
  }, [count])

  useFrame(({ clock }) => {
    if (document.hidden) return

    fishes.forEach((fish, i) => {
      const mesh = meshRefs.current[i]
      if (!mesh) return

      const theta = clock.elapsedTime * fish.speed + fish.phase
      const x = Math.cos(theta) * fish.a
      const y = fish.yCenter + Math.sin(theta) * fish.b

      mesh.position.set(x, y, fish.z)

      // dx/dt = -a * speed * sin(theta)
      // positivo → movendo pra direita → peixe aponta pra direita (scale.x > 0)
      const movingRight = fish.speed * Math.sin(theta) < 0
      mesh.scale.set(
        movingRight ? fish.scale : -fish.scale,
        fish.scale,
        fish.scale,
      )

      // Leve inclinação acompanhando o arco da trajetória
      const dxNorm = -fish.a * fish.speed * Math.sin(theta)
      const dyNorm = fish.b * fish.speed * Math.cos(theta)
      mesh.rotation.z = Math.atan2(dyNorm, Math.abs(dxNorm)) * 0.3
    })
  })

  return (
    <>
      {fishes.map((fish, i) => (
        <mesh
          key={i}
          ref={(m: THREE.Mesh | null) => {
            meshRefs.current[i] = m
          }}
          geometry={geometry}
        >
          <meshBasicMaterial
            color="#051a2e"
            transparent
            opacity={fish.opacity}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  )
}
