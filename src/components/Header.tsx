import React from 'react';
import { ShoppingBag, SlidersHorizontal, History, PhoneCall } from 'lucide-react';
import { RestaurantConfig } from '../types';
import { formatGs } from '../utils/format';

interface HeaderProps {
  config: RestaurantConfig;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenSettings: () => void;
  onOpenHistory: () => void;
  onNavigateSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenSettings,
  onOpenHistory,
  onNavigateSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0c1017]/95 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Wordmark (Single text element wordmark) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2.5 whitespace-nowrap shrink-0 text-decoration-none"
        >
          <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-red-600 flex items-center justify-center text-white shadow-md shadow-red-900/30 font-bold text-lg">
            🥢
          </span>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors">
              WOK CRUNCH ORIENTAL
            </span>
            <span className="text-[11px] text-amber-500/90 font-medium tracking-wide hidden sm:inline">
              Sabor oriental en cada bocado
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigateSection('menu-section')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Menú Wok
          </button>
          <button
            onClick={() => onNavigateSection('info-section')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Horario & Delivery
          </button>
          <button
            onClick={() => onNavigateSection('how-to-order')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            ¿Cómo Pedir?
          </button>
          <button
            onClick={onOpenHistory}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <History className="w-4 h-4 text-slate-400" />
            <span>Mis Pedidos</span>
          </button>
          <button
            onClick={onOpenSettings}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400"
            title="Ajustes de contacto y restaurante"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Ajustes</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action (Shopping Bag CTA) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenSettings}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Ajustes"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          <a
            href={`tel:${config.whatsappPhone}`}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors whitespace-nowrap shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>{config.displayPhone}</span>
          </a>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl shadow-lg shadow-red-950/40 transition-all active:scale-95 whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold text-xs sm:text-sm">
              {cartCount > 0 ? (
                <span className="tabular-nums">{formatGs(cartTotal)}</span>
              ) : (
                'Ver Pedido'
              )}
            </span>
            {cartCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 text-xs font-bold bg-white text-red-700 rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
