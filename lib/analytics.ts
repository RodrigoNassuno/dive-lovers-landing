// Camada de analytics type-safe para Meta Pixel + GA4.
// Falha silenciosamente se as libs não estiverem carregadas ou as ENVs não estiverem setadas.

declare global {
  interface Window {
    fbq?: (
      command: 'init' | 'track' | 'trackCustom',
      eventOrId: string,
      params?: Record<string, string | number | boolean>,
    ) => void
    gtag?: (
      command: 'event' | 'config' | 'js',
      target: string | Date,
      params?: Record<string, string | number | boolean>,
    ) => void
  }
}

export type ScrollDepthPercent = 25 | 50 | 75 | 100

type Params = Record<string, string | number | boolean>

function safeGtag(event: string, params?: Params): void {
  try {
    window.gtag?.('event', event, params)
  } catch {
    // noop — gtag não carregado ou env não configurada
  }
}

function safeFbq(event: string, params?: Params): void {
  try {
    window.fbq?.('trackCustom', event, params)
  } catch {
    // noop — fbq não carregado ou env não configurada
  }
}

/** Dispara um evento customizado para GA4 + Meta Pixel simultaneamente. */
export function trackEvent(eventName: string, params?: Params): void {
  safeGtag(eventName, params)
  safeFbq(eventName, params)
}

/** Registra clique em CTA do WhatsApp. Passar a seção de origem (ex: "hero"). */
export function trackWhatsAppClick(secao: string): void {
  safeGtag('whatsapp_click', { secao })
  safeFbq('WhatsAppClick', { secao })
}

/** Registra abertura de pergunta no FAQ. */
export function trackFAQOpen(pergunta: string): void {
  safeGtag('faq_open', { pergunta })
  safeFbq('FAQOpen', { pergunta })
}

/** Registra profundidade de scroll em marcos de 25/50/75/100%. */
export function trackScrollDepth(percent: ScrollDepthPercent): void {
  safeGtag('scroll_depth', { percent })
  safeFbq('ScrollDepth', { percent: String(percent) })
}
