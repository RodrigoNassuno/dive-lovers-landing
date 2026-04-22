// Configuração central do projeto Dive Lovers
// Para alterar WhatsApp ou contatos, mude apenas aqui.

export const WHATSAPP = {
  numero: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5511982023600",
  display: "(11) 98202-3600",
  mensagemPadrao: "Oi! Quero saber mais sobre o curso Open Water Diver.",
};

export const whatsappLink = (msg: string = WHATSAPP.mensagemPadrao) =>
  `https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(msg)}`;

export const CONTATO = {
  endereco: "Alameda Santana, 135 — Pontal da Cruz, São Sebastião - SP",
  instagramEscola: "@dive.lovers",
  instagramEscolaUrl: "https://www.instagram.com/dive.lovers/",
  instagramHospedagem: "@casa_divelovers",
  instagramHospedagemUrl: "https://www.instagram.com/casa_divelovers/",
};

export const PRECOS = {
  precoOriginal: "R$ 3.200",
  precoVista: "R$ 2.600",
  precoParcelado: "3x R$ 933",
};
