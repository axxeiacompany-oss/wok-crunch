import React, { useState } from 'react';
import { Plus, Minus, UtensilsCrossed, MessageCircle } from 'lucide-react';
import { MenuItem } from '../types';
import { formatGs } from '../utils/format';

interface MenuCardProps {
  item: MenuItem;
  cartQuantity: number;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (menuItemId: string) => void;
  onDirectOrder: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  cartQuantity,
  onAddToCart,
  onRemoveFromCart,
  onDirectOrder,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group flex flex-col justify-between bg-[#121824] hover:bg-[#151e2d] border border-white/5 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/60">
      {/* Visual media zone */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 cursor-pointer"
        onClick={() => onAddToCart(item)}
      >
        {!imageError ? (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-center">
            <UtensilsCrossed className="w-8 h-8 text-amber-500/60 mb-2" />
            <span className="text-xs font-semibold text-slate-400">{item.name}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Quiet single editorial text tag */}
        {item.popular && (
          <div className="absolute top-2.5 left-2.5 text-[10px] font-semibold text-amber-300 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-amber-500/30">
            Recomendado
          </div>
        )}

        {item.portion && (
          <div className="absolute bottom-2 left-2.5 text-[10px] text-slate-300 font-medium bg-black/80 px-2 py-0.5 rounded">
            {item.portion}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4 justify-between space-y-3">
        <div>
          <h3
            onClick={() => onAddToCart(item)}
            className="text-base font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer leading-snug"
          >
            {item.name}
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mt-1">
            {item.description}
          </p>
        </div>

        {/* Price & Action Module */}
        <div className="pt-2 border-t border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-base sm:text-lg font-bold text-amber-400 tabular-nums">
              {formatGs(item.price)}
            </span>

            {/* Stepper or Add button */}
            {cartQuantity > 0 ? (
              <div className="flex items-center gap-1.5 bg-[#0a0e16] p-1 rounded-xl border border-amber-500/40">
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Disminuir"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-xs font-bold text-white tabular-nums">
                  {cartQuantity}
                </span>
                <button
                  onClick={() => onAddToCart(item)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors"
                  aria-label="Aumentar"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAddToCart(item)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold shadow-md shadow-red-950/40 active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar</span>
              </button>
            )}
          </div>

          {/* Quick Direct WhatsApp Button for this specific dish */}
          <button
            onClick={() => onDirectOrder(item)}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-[11px] font-semibold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pedir al WhatsApp</span>
          </button>
        </div>
      </div>
    </article>
  );
};
