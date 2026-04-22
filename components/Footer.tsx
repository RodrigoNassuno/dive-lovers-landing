"use client";

import { MapPin, Instagram, MessageCircle } from "lucide-react";
import { CONTATO, WHATSAPP, whatsappLink } from "@/lib/config";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function Footer() {
  return (
    <footer className="bg-azul-fundo border-t border-off-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Coluna 1 — Marca */}
          <div>
            <h3 className="font-titulo text-2xl font-bold text-off-white mb-2">
              dive <span className="text-tangerina">lovers</span>
            </h3>
            <p className="text-off-white/60 text-sm leading-relaxed">
              Descubra. Explore. Transforme.
            </p>
          </div>

          {/* Coluna 2 — Contato */}
          <div>
            <h4 className="font-titulo font-bold text-off-white mb-4">Onde estamos</h4>
            <div className="flex items-start gap-3 text-off-white/70 text-sm">
              <MapPin size={18} className="text-tangerina flex-shrink-0 mt-0.5" />
              <p>{CONTATO.endereco}</p>
            </div>
          </div>

          {/* Coluna 3 — Links */}
          <div>
            <h4 className="font-titulo font-bold text-off-white mb-4">Fale com a gente</h4>
            <div className="space-y-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("footer")}
                className="flex items-center gap-2 text-off-white/70 hover:text-tangerina transition-colors text-sm"
              >
                <MessageCircle size={18} />
                WhatsApp {WHATSAPP.display}
              </a>
              <a
                href={CONTATO.instagramEscolaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-off-white/70 hover:text-tangerina transition-colors text-sm"
              >
                <Instagram size={18} />
                {CONTATO.instagramEscola}
              </a>
              <a
                href={CONTATO.instagramHospedagemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-off-white/70 hover:text-tangerina transition-colors text-sm"
              >
                <Instagram size={18} />
                {CONTATO.instagramHospedagem}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-off-white/10 text-center text-off-white/50 text-xs">
          © {new Date().getFullYear()} Dive Lovers. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
