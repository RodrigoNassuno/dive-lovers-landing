"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/config";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function WhatsAppFloat() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      setVisivel(scrollPercent > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visivel && (
        <motion.a
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("float")}
          aria-label="Fale conosco no WhatsApp"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform"
        >
          <MessageCircle size={28} fill="white" strokeWidth={0} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
