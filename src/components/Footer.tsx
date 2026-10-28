import React from 'react';
import { MessageCircle, Phone, MapPin, Heart } from 'lucide-react';
import { RestaurantConfig } from '../types';

interface FooterProps {
  config: RestaurantConfig;
  onOpenSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenSettings }) => {
  return (
    <footer className="bg-[#070a10] border-t border-white/10 text-slate-400 text-xs py-10 pb-20 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5 text-center md:text-left">
          <div className="space-y-1">
            <div className="text-base font-extrabold text-white flex items-center justify-center md:justify-start gap-2">
              <span>🥢</span>
              <span>{config.name}</span>
            </div>
            <p className="text-amber-500/90 text-xs italic">
              "{config.slogan}"
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a
              href={`https://wa.me/${config.whatsappPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: {config.displayPhone}</span>
            </a>
            <span className="text-slate-600">·</span>
            <span>{config.scheduleText}</span>
          </div>

          <div>
            <button
              onClick={onOpenSettings}
              className="text-xs text-slate-400 hover:text-amber-400 underline transition-colors"
            >
              Ajustes de contacto
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} WOK CRUNCH ORIENTAL. Todos los derechos reservados. Precios en Guaraníes (Gs.).
          </p>
          <p className="flex items-center justify-center gap-1">
            <span>Sabor oriental auténtico hecho con pasión</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
