'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Pausa quando aba está em background (economiza CPU)
    function handleVisibility() {
      if (document.hidden) {
        lenis.stop()
      } else {
        lenis.start()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    // Se o usuário ativar reduced-motion depois de carregar, destrói o Lenis
    function handleMotionChange(e: MediaQueryListEvent) {
      if (e.matches) {
        cancelAnimationFrame(rafId)
        lenis.destroy()
      }
    }
    mq.addEventListener('change', handleMotionChange)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      document.removeEventListener('visibilitychange', handleVisibility)
      mq.removeEventListener('change', handleMotionChange)
    }
  }, [])

  return null
}
