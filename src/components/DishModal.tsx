import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { MenuItem } from '../types';
import { formatGs } from '../utils/format';

interface DishModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onConfirmAdd: (item: MenuItem, quantity: number, notes?: string) => void;
}

export const DishModal: React.FC<DishModalProps> = ({
  item,
  onClose,
  onConfirmAdd,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [imageError, setImageError] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    onConfirmAdd(item, quantity, notes.trim() || undefined);
    onClose();
  };

  const quickNotesSuggestions = [
    'Sin cebollita de verdeo',
    'Bien dorado / crocante',
    'Salsa picante aparte',
    'Poco picante',
    'Con cubiertos descartables',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#121824] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 text-slate-300 hover:text-white bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-md transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dish Media */}
        <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
          {!imageError ? (
            <img
              src={item.image}
              alt={item.name}
              onError={() => setImageError(true)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-800">
              <UtensilsCrossed className="w-12 h-12 text-amber-500/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-black/30 to-transparent" />
        </div>

        {/* Scrollable details */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center justify-between gap-3 mb-1">
              <h2 className="text-xl font-bold text-white">{item.name}</h2>
              <span className="text-lg font-extrabold text-amber-400 tabular-nums">
                {formatGs(item.price)}
              </span>
            </div>
            {item.portion && (
              <span className="text-xs text-amber-500/90 font-medium">
                {item.portion}
              </span>
            )}
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              {item.description}
            </p>
          </div>

          {item.ingredients && (
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-1.5">
                Ingredientes principales
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs text-slate-300 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div>
            <label className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-1.5">
              Instrucciones o preferencias de preparación
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Sin cebollita, salsa aparte, extra servilletas..."
              className="w-full p-3 bg-[#0a0e16] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/80 transition-colors"
            />
            {/* Quick Chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {quickNotesSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (!notes.includes(suggestion)) {
                      setNotes((prev) => (prev ? `${prev}, ${suggestion}` : suggestion));
                    }
                  }}
                  className="text-[11px] text-slate-400 hover:text-amber-300 bg-white/[0.03] hover:bg-white/[0.08] px-2 py-1 rounded border border-white/5 transition-colors"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with quantity & add CTA */}
        <div className="p-4 bg-[#0d121c] border-t border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 bg-[#070a10] px-3 py-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/15 text-white disabled:opacity-30 transition-colors"
              aria-label="Restar 1"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center text-base font-bold text-white tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
              aria-label="Sumar 1"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-red-950/40 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              Agregar · <span className="tabular-nums">{formatGs(item.price * quantity)}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
