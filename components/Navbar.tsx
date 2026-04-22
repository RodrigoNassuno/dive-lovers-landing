'use client'

import { useState, useEffect } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/lib/config'
import { trackWhatsAppClick } from '@/lib/analytics'

const NAV_LINKS = [
  { label: 'O Curso',       href: '#como-funciona' },
  { label: 'Experiência',   href: '#experiencia'   },
  { label: 'Diferenciais',  href: '#diferenciais'  },
  { label: 'Depoimentos',   href: '#depoimentos'   },
  { label: 'Oferta',        href: '#oferta'        },
  { label: 'FAQ',           href: '#faq'           },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      // Funciona com Lenis e scroll nativo
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-azul-profundo/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => handleLink(e, 'body')}
          className="font-titulo font-bold text-off-white text-3xl tracking-wide"
        >
          Dive <span className="text-tangerina">Lovers</span>
        </a>

        {/* Links — desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleLink(e, link.href)}
                className="text-off-white/80 hover:text-off-white text-base font-semibold transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA — desktop */}
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('navbar')}
          className="hidden md:inline-flex items-center gap-2 bg-tangerina hover:bg-tangerina/90 text-azul-profundo font-bold px-6 py-2.5 rounded-full text-base transition-all hover:scale-105"
        >
          <MessageCircle size={18} />
          Garantir vaga
        </a>

        {/* Hambúrguer — mobile */}
        <button
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-off-white p-1"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-azul-profundo/95 backdrop-blur-md border-t border-off-white/10 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLink(e, link.href)}
              className="text-off-white/80 hover:text-off-white font-medium text-base transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { trackWhatsAppClick('navbar'); setMenuOpen(false) }}
            className="inline-flex items-center justify-center gap-2 bg-tangerina text-azul-profundo font-bold px-5 py-3 rounded-full text-base mt-2"
          >
            <MessageCircle size={18} />
            Garantir vaga
          </a>
        </div>
      )}
    </header>
  )
}
