import React from 'react';
import { Send, ShoppingBag } from 'lucide-react';
import { formatGs } from '../utils/format';

interface FloatingCartBarProps {
  itemCount: number;
  total: number;
  onOpenCart: () => void;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({
  itemCount,
  total,
  onOpenCart,
}) => {
  if (itemCount === 0) return null;

  return (
    <aside
      aria-label="Resumen de pedido"
      className="md:hidden fixed bottom-0 inset-x-0 z-30 p-2.5 bg-[#0a0e16]/95 backdrop-blur-lg border-t border-white/10 shadow-2xl"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <button
          onClick={onOpenCart}
          className="flex items-center gap-2 text-left"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-red-600 flex items-center justify-center text-white shrink-0">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-400 text-slate-950 rounded-full text-[10px] font-extrabold flex items-center justify-center tabular-nums">
              {itemCount}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block leading-tight">Total</span>
            <span className="text-sm font-bold text-white tabular-nums">
              {formatGs(total)}
            </span>
          </div>
        </button>

        <button
          onClick={onOpenCart}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-950/50 active:scale-95 transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Enviar al WhatsApp 📲</span>
        </button>
      </div>
    </aside>
  );
};
