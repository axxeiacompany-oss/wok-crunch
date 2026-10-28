import React from 'react';
import { Flame, Clock, Bike, ArrowDown, Sparkles } from 'lucide-react';
import { RestaurantConfig } from '../types';

interface HeroProps {
  config: RestaurantConfig;
  onExploreMenu: () => void;
  onViewHowToOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  config,
  onExploreMenu,
  onViewHowToOrder,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#090d14] border-b border-white/10">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand & Copy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5">
            {/* Quiet status metadata without candy badge pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400/90 font-medium tracking-wide">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping opacity-75" />
                <span>Local Abierto</span>
              </span>
              <span className="text-slate-600">·</span>
              <span>{config.scheduleText}</span>
              <span className="text-slate-600">·</span>
              <span>Delivery & Retiro</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              WOK CRUNCH <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-500">ORIENTAL</span>
            </h1>

            <p className="text-lg sm:text-xl font-medium text-amber-100/90 italic">
              "{config.slogan}"
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Salteados al fuego vivo con auténtica técnica wok, crujiente pollo frito con glaseados caseros, fideos yakisoba y papas doradas. Haz tu pedido en 3 clics y recíbelo por WhatsApp sin demoras.
            </p>

            {/* Feature trust markers */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg pt-1">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <Flame className="w-5 h-5 text-amber-500 shrink-0" />
                <div className="text-xs">
                  <div className="text-white font-semibold">Wok Hei Real</div>
                  <div className="text-slate-400 text-[11px]">Sabor ahumado</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <Bike className="w-5 h-5 text-red-500 shrink-0" />
                <div className="text-xs">
                  <div className="text-white font-semibold">Delivery Veloz</div>
                  <div className="text-slate-400 text-[11px]">{config.deliveryTimeEstimate}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 col-span-2 sm:col-span-1">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <div className="text-white font-semibold">Retiro Local</div>
                  <div className="text-slate-400 text-[11px]">{config.pickupTimeEstimate}</div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreMenu}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-red-900/30 transition-all active:scale-95"
              >
                <span>Explorar Menú</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onViewHowToOrder}
                className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-medium text-sm rounded-xl border border-white/10 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>¿Cómo funciona?</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80 group">
              <img
                src="/src/assets/images/hero_wok_fire_stirfry_1793211199189.jpg"
                alt="Maestro de cocina wok en llamas preparando fideos salteados"
                className="w-full h-72 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                  <span>Especialidad del Chef</span>
                  <span>·</span>
                  <span>Al Fuego Vivo</span>
                </div>
                <p className="text-sm font-medium text-slate-200">
                  Ingredientes frescos de alta calidad salteados en woks de hierro a más de 300°C.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
