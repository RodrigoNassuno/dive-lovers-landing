# 🤿 Dive Lovers — Landing Page

Landing page de conversão para a Dive Lovers, escola de mergulho em
São Sebastião/SP. Objetivo: vender o curso Open Water Diver via WhatsApp.

## ⚡ Quick Start

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## 📚 Documentação

Antes de qualquer coisa, leia:

1. **`docs/MARCA.md`** — tudo sobre a marca (cores, tom, público, copy)
2. **`docs/BRIEFING.md`** — briefing técnico + o que já está feito + o que falta

## 🎯 Para o Claude Code (instruções)

Você vai trabalhar nessa landing. O projeto **já está rodando** com 9
seções implementadas e placeholders bem visíveis. Sua missão:

1. **Leia `docs/MARCA.md` e `docs/BRIEFING.md` primeiro.**
2. Confirme o entendimento do estado atual antes de codar.
3. Trabalhe nas pendências listadas no `BRIEFING.md` na ordem sugerida.
4. **Nunca** quebre as regras críticas (também listadas no briefing).

## 🗂️ Estrutura

```
app/                  # Next.js App Router
components/           # 10 componentes (Hero, Footer, etc)
lib/config.ts         # WhatsApp e contatos centralizados
docs/                 # Documentação para o Claude Code
public/images/        # Onde vão as fotos reais (vazio por enquanto)
```

## 🎨 Design System

Cores oficiais já configuradas em `tailwind.config.ts`:
- `azul-profundo` `#102e48`
- `tangerina` `#f28a33`
- `off-white` `#f3f2ee`
- `azul-pastel` `#8eccff`

Fontes: Quicksand (títulos) + Afacad (corpo) — via `next/font/google`.

## 📞 Contato Único

Tudo aponta para **WhatsApp 11 98202-3600**.
Sem checkout online. Configurado em `lib/config.ts`.

## 🚧 Áreas com Placeholder

São 2 lugares que esperam conteúdo real:

- **`components/Experiencia.tsx`** — 4 placeholders de foto
- **`components/Depoimentos.tsx`** — 3 placeholders de depoimento

Ambos com label visual bem marcado pra você saber onde trocar depois.
