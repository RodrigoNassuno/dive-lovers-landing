'use client'

import { useEffect, useRef } from 'react'
import { trackScrollDepth, type ScrollDepthPercent } from '@/lib/analytics'

const THRESHOLDS: ScrollDepthPercent[] = [25, 50, 75, 100]

// Detecta quando o usuário atinge 25/50/75/100% da página e dispara eventos.
// Cada marco é disparado no máximo uma vez por sessão de página.
// Compatível com Lenis (que dispara scroll events nativos via window.scrollTo).
export default function ScrollTracker() {
  const fired = useRef(new Set<ScrollDepthPercent>())

  useEffect(() => {
    function check() {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      if (total === 0) return

      const pct = (scrolled / total) * 100

      for (const threshold of THRESHOLDS) {
        if (pct >= threshold && !fired.current.has(threshold)) {
          fired.current.add(threshold)
          trackScrollDepth(threshold)
        }
      }
    }

    window.addEventListener('scroll', check, { passive: true })
    check() // verifica posição inicial (ex: página recarregada com âncora)

    return () => window.removeEventListener('scroll', check)
  }, [])

  return null
}
