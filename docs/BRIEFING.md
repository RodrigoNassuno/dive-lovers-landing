# Briefing Técnico — Landing Page Dive Lovers

> Leia este documento JUNTO com `docs/MARCA.md` antes de qualquer
> alteração. Aqui estão as decisões técnicas e o estado atual do projeto.

## Objetivo

Landing page de **alta conversão** para vender o curso Open Water Diver
da Dive Lovers. **Conversão acontece 100% via WhatsApp** — não há
checkout online. Todos os CTAs apontam para o WhatsApp.

WhatsApp configurado em `lib/config.ts`:
```
5511982023600
```

## Estado Atual do Projeto

✅ **JÁ CRIADO (funciona out-of-the-box):**
- Estrutura Next.js 14 + TypeScript + Tailwind
- Design system completo (cores e fontes da marca)
- 9 seções da landing implementadas com placeholders visíveis:
  1. Hero (com bolhas CSS — 3D ainda pendente)
  2. Quebra de Objeção (3 cards de medo)
  3. Como Funciona (timeline dos 3 dias)
  4. Experiência (grid 2x2 com placeholders de fotos)
  5. Diferenciais (5 cards com ícones)
  6. Depoimentos (3 cards com placeholders)
  7. Oferta (card central com preço e CTA)
  8. FAQ (8 perguntas com accordion)
  9. Footer
- Botão flutuante de WhatsApp
- Animações Framer Motion básicas
- Smooth scroll via CSS

⚠️ **PENDENTE (você vai construir):**

### 1. CENA 3D DO HERO (prioridade alta)
Substituir o div com bolhas CSS dentro de `components/Hero.tsx` por
uma cena React Three Fiber com:
- Fundo: gradiente azul claro (superfície) → azul médio
- Raios de luz volumétrica vindo de cima (god rays)
- Bolhas subindo (~30 partículas, oscilação horizontal leve)
- 4-5 silhuetas de peixes low-poly nadando em loop (curvas Bezier)
- Silhueta do mergulhador (pode ser sprite 2D em plano 3D)

**Performance crítica:**
- pixelRatio cap em 1.5 (não usar `window.devicePixelRatio`)
- Suspense com fallback pra imagem estática
- Detectar mobile e reduzir qtd de partículas/peixes em 50%
- Pause quando aba não estiver visível (Page Visibility API)
- Fallback para imagem estática se WebGL não disponível ou
  `prefers-reduced-motion: reduce` ativo

### 2. INTEGRAÇÃO COM LENIS (smooth scroll)
Adicionar Lenis no layout pra smooth scroll mais natural.
Lembrar de desativar se `prefers-reduced-motion`.

### 3. SEO COMPLETO
- Schema.org Course + LocalBusiness
- OG image gerada
- Sitemap

### 4. ANALYTICS (placeholder)
- Meta Pixel
- Google Analytics 4
- Tracking de eventos (clique em CTAs, scroll depth, FAQ aberto)

### 5. OTIMIZAÇÕES
- next/image em todas as imagens (quando entrarem)
- Preload de fontes
- Métricas alvo: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Lighthouse 90+ mobile

## Regras Críticas (NÃO VIOLAR)

1. **Nunca** adicionar checkout, formulário de pagamento ou link
   externo de checkout. Todos os CTAs vão pro WhatsApp.

2. **Áreas de imagem** já têm placeholders visíveis com label tipo
   `[FOTO: Piscina 3m]`. Não substituir por Unsplash. Quando o
   usuário fornecer as fotos reais, substituir os placeholders por
   `<Image>` do next/image apontando pra `/public/images/`.

3. **Áreas de depoimento** também têm placeholders. Substituir só
   quando o usuário fornecer depoimentos reais.

4. **WhatsApp:** sempre via `whatsappLink()` em `lib/config.ts`.
   Nunca hardcoded.

5. **Mobile-first:** maioria do tráfego vem do Instagram mobile.

6. **Tom de voz:** acolhedor, inspirador, comercial sem ser forçado.
   Evitar formalidade fria.

## Estrutura de Pastas

```
dive-lovers-landing/
├── app/
│   ├── globals.css       # CSS global + variáveis de cor
│   ├── layout.tsx        # Layout raiz com fontes
│   └── page.tsx          # Página única que junta tudo
├── components/
│   ├── Hero.tsx                  # ⚠️ adicionar 3D aqui
│   ├── QuebraObjecao.tsx
│   ├── ComoFunciona.tsx
│   ├── Experiencia.tsx           # ⚠️ placeholders de fotos
│   ├── Diferenciais.tsx
│   ├── Depoimentos.tsx           # ⚠️ placeholders de depoimentos
│   ├── Oferta.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   └── WhatsAppFloat.tsx
├── lib/
│   └── config.ts         # WhatsApp, contatos, preços
├── public/
│   └── images/           # ← colocar fotos reais aqui
├── docs/
│   ├── MARCA.md          # contexto da marca
│   └── BRIEFING.md       # este arquivo
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Comandos

```bash
npm install      # instala dependências
npm run dev      # roda em http://localhost:3000
npm run build    # build de produção
npm run start    # roda build de produção
```

## Próximos Passos Recomendados

1. Rodar `npm install` e `npm run dev` pra ver o estado atual
2. Implementar a cena 3D do Hero (item mais complexo, mais visível)
3. Adicionar Lenis no layout
4. Fazer SEO completo
5. Otimizar performance e medir Lighthouse
6. Quando o usuário enviar fotos reais, substituir placeholders
