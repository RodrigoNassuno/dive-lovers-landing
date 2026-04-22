'use strict'

// Gera os assets estáticos de /public usando @resvg/resvg-js (SVG → PNG).
// Roda uma vez como build-step: node scripts/generate-assets.js
// Não depende de Edge Runtime, @vercel/og ou font loading automático.

const { Resvg } = require('@resvg/resvg-js')
const fs = require('fs')
const path = require('path')

const PUBLIC = path.join(__dirname, '..', 'public')

// ── Helpers ───────────────────────────────────────────────────────────────────

function render(svgStr) {
  const resvg = new Resvg(svgStr, {
    font: {
      loadSystemFonts: true,
      // Garante que sans-serif resolve para uma fonte disponível no Windows
      sansSerifFamily: 'Arial',
      defaultFontFamily: 'Arial',
    },
  })
  return resvg.render().asPng()
}

function save(filename, buf) {
  fs.writeFileSync(path.join(PUBLIC, filename), buf)
  const kb = (buf.length / 1024).toFixed(1)
  console.log(`  ✓  ${filename.padEnd(22)} ${kb} KB`)
}

// ── SVG: ícone escalável (favicon / apple-icon / PWA icons) ──────────────────
//
// Design: fundo tangerina com 3 bolhas brancas subindo (metáfora de mergulho).
// Funciona de 32px a 512px sem perda de legibilidade.
//
function makeIconSvg(size) {
  const rx    = Math.round(size * 0.22)          // border-radius do quadrado

  // Bolha principal (base)
  const bigR  = Math.round(size * 0.265)
  const bigCx = Math.round(size * 0.50)
  const bigCy = Math.round(size * 0.68)

  // Bolha média (meio)
  const medR  = Math.round(size * 0.135)
  const medCx = Math.round(size * 0.36)
  const medCy = Math.round(size * 0.36)

  // Bolha pequena (topo)
  const smlR  = Math.round(size * 0.082)
  const smlCx = Math.round(size * 0.63)
  const smlCy = Math.round(size * 0.21)

  return `<svg xmlns="http://www.w3.org/2000/svg" \
width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${rx}" fill="#f28a33"/>
  <circle cx="${bigCx}" cy="${bigCy}" r="${bigR}" fill="white"/>
  <circle cx="${medCx}" cy="${medCy}" r="${medR}" fill="white" fill-opacity="0.82"/>
  <circle cx="${smlCx}" cy="${smlCy}" r="${smlR}" fill="white" fill-opacity="0.60"/>
</svg>`
}

// ── SVG: OG Image 1200×630 ───────────────────────────────────────────────────
//
// Design:
//   - Fundo: gradiente azul-profundo #102e48 → #091f32
//   - Coluna tangerina (200px) à direita com bolhas brancas subindo
//   - Área de conteúdo (1000px) com headline + tagline + localização
//
// Caracteres especiais em entidades XML para evitar problemas de encoding:
//   ê = &#xEA;   é = &#xE9;   ã = &#xE3;   ç = &#xE7;   · = &#xB7;
//
function makeOgSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#102e48"/>
      <stop offset="100%" stop-color="#091f32"/>
    </linearGradient>
  </defs>

  <!-- Fundo -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Coluna tangerina direita -->
  <rect x="1000" y="0" width="200" height="630" fill="#f28a33"/>

  <!-- Bolhas subindo na coluna tangerina -->
  <circle cx="1100" cy="108" r="40" fill="white" fill-opacity="0.92"/>
  <circle cx="1100" cy="232" r="24" fill="white" fill-opacity="0.72"/>
  <circle cx="1100" cy="326" r="15" fill="white" fill-opacity="0.52"/>
  <circle cx="1100" cy="400" r="9"  fill="white" fill-opacity="0.36"/>
  <circle cx="1100" cy="454" r="5"  fill="white" fill-opacity="0.22"/>

  <!-- Barra decorativa tangerina (acento de marca) -->
  <rect x="72" y="76" width="68" height="5" rx="2.5" fill="#f28a33"/>

  <!-- Nome da marca -->
  <text
    x="72" y="62"
    font-family="Arial, Helvetica, sans-serif"
    font-size="24" font-weight="700"
    fill="#f28a33" letter-spacing="4">DIVE LOVERS</text>

  <!-- Headline principal (2 linhas) -->
  <text font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" fill="#f3f2ee">
    <tspan x="72" y="196">Em 3 dias, voc&#xEA; &#xE9;</tspan>
    <tspan x="72" dy="88">mergulhador certificado.</tspan>
  </text>

  <!-- Tagline -->
  <text
    x="72" y="372"
    font-family="Arial, Helvetica, sans-serif"
    font-size="28" fill="#8eccff">Descubra. Explore. Transforme.</text>

  <!-- Separador sutil -->
  <rect x="72" y="418" width="880" height="1" fill="#f3f2ee" fill-opacity="0.12"/>

  <!-- Localização / credenciais -->
  <text
    x="72" y="458"
    font-family="Arial, Helvetica, sans-serif"
    font-size="21" fill="#f3f2ee" fill-opacity="0.52">
    S&#xE3;o Sebasti&#xE3;o &#xB7; SP &#xB7; Certifica&#xE7;&#xE3;o SSI Internacional
  </text>
</svg>`
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log('\nGerando assets estáticos em /public...\n')

// Ícones (mesmo design, tamanhos diferentes)
const icons = [
  { name: 'favicon.ico',    size: 32  },   // navegadores legado
  { name: 'favicon-32.png', size: 32  },   // navegadores modernos
  { name: 'apple-icon.png', size: 180 },   // iOS/macOS
  { name: 'icon-192.png',   size: 192 },   // PWA Android
  { name: 'icon-512.png',   size: 512 },   // PWA splash
]

for (const { name, size } of icons) {
  save(name, render(makeIconSvg(size)))
}

// OG image
save('og-image.png', render(makeOgSvg()))

console.log('\n✓ Concluído. Verifique os arquivos em /public.\n')
