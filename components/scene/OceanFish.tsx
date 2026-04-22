'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Geometrias das espécies ────────────────────────────────────────────────

// Espécie 1: peixe clássico com cauda bifurcada (original Fish3D)
function makeClassicShape(): THREE.Shape {
  const s = new THREE.Shape()
  s.moveTo(0.5, 0)
  s.bezierCurveTo(0.45, 0.22, 0.0, 0.22, -0.28, 0.14)
  s.lineTo(-0.52, 0.28)
  s.lineTo(-0.38, 0.02)
  s.lineTo(-0.52, -0.28)
  s.lineTo(-0.28, -0.14)
  s.bezierCurveTo(0.0, -0.22, 0.45, -0.22, 0.5, 0)
  s.closePath()
  return s
}

// Espécie 2: peixe tropical / peixe-anjo — corpo alto, nadadeiras dorsal e ventral pronunciadas
function makeTropicalShape(): THREE.Shape {
  const s = new THREE.Shape()
  s.moveTo(0.42, 0)                                        // bico
  s.bezierCurveTo(0.35, 0.18, 0.05, 0.28, -0.10, 0.32)   // curva topo do corpo
  s.lineTo(-0.18, 0.62)                                    // ponta nadadeira dorsal
  s.lineTo(-0.28, 0.32)                                    // base posterior nadadeira dorsal
  s.lineTo(-0.42, 0.20)                                    // ombro cauda (topo)
  s.lineTo(-0.30, 0.0)                                     // entalhe central da cauda
  s.lineTo(-0.42, -0.20)                                   // ombro cauda (base)
  s.lineTo(-0.28, -0.32)                                   // base nadadeira ventral
  s.lineTo(-0.18, -0.62)                                   // ponta nadadeira ventral
  s.lineTo(-0.10, -0.32)                                   // retorna ao corpo
  s.bezierCurveTo(0.05, -0.28, 0.35, -0.18, 0.42, 0)     // curva base do corpo
  s.closePath()
  return s
}

// Espécie 3: torpedo / cavala — corpo afilado e alongado, cauda em meia-lua
function makeTorpedoShape(): THREE.Shape {
  const s = new THREE.Shape()
  s.moveTo(0.65, 0)                                        // nariz afilado
  s.bezierCurveTo(0.55, 0.12, 0.1, 0.16, -0.22, 0.12)    // topo do corpo (slim)
  s.lineTo(-0.45, 0.32)                                    // ponta superior cauda
  s.bezierCurveTo(-0.55, 0.20, -0.55, -0.20, -0.45, -0.32) // concavidade cauda (meia-lua)
  s.lineTo(-0.22, -0.12)                                   // base do corpo (inferior)
  s.bezierCurveTo(0.1, -0.16, 0.55, -0.12, 0.65, 0)      // base do corpo
  s.closePath()
  return s
}

// Espécie 4: peixe redondo / baiacú — corpo compacto, quase circular, caudinha curta
function makeRoundShape(): THREE.Shape {
  const s = new THREE.Shape()
  s.moveTo(0.38, 0)                                        // bico
  s.bezierCurveTo(0.35, 0.35, -0.10, 0.40, -0.30, 0.28)  // topo (arredondado)
  s.lineTo(-0.48, 0.18)                                    // ponta superior cauda
  s.lineTo(-0.36, 0.0)                                     // entalhe central cauda
  s.lineTo(-0.48, -0.18)                                   // ponta inferior cauda
  s.lineTo(-0.30, -0.28)                                   // junção corpo-cauda
  s.bezierCurveTo(-0.10, -0.40, 0.35, -0.35, 0.38, 0)    // base (arredondada)
  s.closePath()
  return s
}

// ─── Tipos ──────────────────────────────────────────────────────────────────

type Species = 'classic' | 'tropical' | 'torpedo' | 'round'

const SPECIES_CONFIG: Record<Species, { color: string; scaleRange: [number, number]; zRange: [number, number] }> = {
  classic:  { color: '#90c8f0', scaleRange: [1.8, 2.8], zRange: [-2, -4] },
  tropical: { color: '#a8d8f8', scaleRange: [1.4, 2.2], zRange: [-1.5, -3.5] },
  torpedo:  { color: '#78b8e8', scaleRange: [2.0, 3.2], zRange: [-2.5, -4.5] },
  round:    { color: '#c0e8ff', scaleRange: [1.2, 1.8], zRange: [-1.0, -3.0] },
}

interface FishInstance {
  species: Species
  a: number
  b: number
  speed: number
  phase: number
  yCenter: number
  z: number
  scale: number
  opacity: number
}

// ─── Componente ─────────────────────────────────────────────────────────────

interface OceanFishProps {
  count: number
}

export default function OceanFish({ count }: OceanFishProps) {
  // Uma geometria por espécie, compartilhada entre todas as instâncias
  const geometries = useMemo<Record<Species, THREE.ShapeGeometry>>(() => ({
    classic:  new THREE.ShapeGeometry(makeClassicShape(),  8),
    tropical: new THREE.ShapeGeometry(makeTropicalShape(), 8),
    torpedo:  new THREE.ShapeGeometry(makeTorpedoShape(),  8),
    round:    new THREE.ShapeGeometry(makeRoundShape(),    8),
  }), [])

  const species: Species[] = ['classic', 'tropical', 'torpedo', 'round']

  const fishes = useMemo<FishInstance[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const sp = species[i % species.length]
      const cfg = SPECIES_CONFIG[sp]
      const z = cfg.zRange[0] - Math.random() * (cfg.zRange[1] - cfg.zRange[0])
      const baseScale = cfg.scaleRange[0] + Math.random() * (cfg.scaleRange[1] - cfg.scaleRange[0])
      return {
        species: sp,
        a: 9 + Math.random() * 4,                          // raio X: 9-13 (sai do viewport)
        b: 0.2 + Math.random() * 0.6,                      // ondulação vertical suave
        speed: (0.10 + Math.random() * 0.10) * (Math.random() > 0.5 ? 1 : -1),
        phase: (i / count) * Math.PI * 2,
        yCenter: -4 + Math.random() * 10,                  // espalhados por toda a altura
        z,
        scale: baseScale,
        opacity: 0.70 + Math.random() * 0.15,
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  const meshRefs = useRef<(THREE.Mesh | null)[]>(Array(count).fill(null))

  useFrame(({ clock }) => {
    if (document.hidden) return

    fishes.forEach((fish, i) => {
      const mesh = meshRefs.current[i]
      if (!mesh) return

      const theta = clock.elapsedTime * fish.speed + fish.phase
      const x = Math.cos(theta) * fish.a
      const y = fish.yCenter + Math.sin(theta) * fish.b

      mesh.position.set(x, y, fish.z)

      const movingRight = fish.speed * Math.sin(theta) < 0
      mesh.scale.set(
        movingRight ? fish.scale : -fish.scale,
        fish.scale,
        fish.scale,
      )

      const dxNorm = -fish.a * fish.speed * Math.sin(theta)
      const dyNorm = fish.b * fish.speed * Math.cos(theta)
      mesh.rotation.z = Math.atan2(dyNorm, Math.abs(dxNorm)) * 0.25
    })
  })

  return (
    <>
      {fishes.map((fish, i) => (
        <mesh
          key={i}
          ref={(m: THREE.Mesh | null) => { meshRefs.current[i] = m }}
          geometry={geometries[fish.species]}
        >
          <meshBasicMaterial
            color={SPECIES_CONFIG[fish.species].color}
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
