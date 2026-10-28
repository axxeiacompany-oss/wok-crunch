import React from 'react';
import { X, Clock, Repeat, Trash2, CheckCircle2, MapPin, Banknote } from 'lucide-react';
import { SavedOrder, CartItem } from '../types';
import { formatGs } from '../utils/format';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: SavedOrder[];
  onReorder: (items: CartItem[]) => void;
  onClearHistory: () => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onReorder,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#111723] border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-[#0a0e16]">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold text-white">Historial de Pedidos</h2>
              <p className="text-xs text-slate-400">Pedidos recientes enviados desde este dispositivo</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {orders.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('¿Deseas borrar todo el historial de pedidos?')) {
                    onClearHistory();
                  }
                }}
                className="text-xs text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                title="Borrar historial"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {orders.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center text-xl text-slate-400">
                📜
              </div>
              <h3 className="text-sm font-semibold text-white">No tienes pedidos guardados</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Tus pedidos confirmados aparecerán aquí para que puedas repetirlos fácilmente en 1 clic.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-4 bg-[#141b29] border border-white/5 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Pedido Enviado</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{order.date}</span>
                </div>

                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex justify-between">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span className="tabular-nums text-slate-400">
                        {formatGs(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-400">Total: </span>
                    <span className="text-amber-400 font-bold tabular-nums">
                      {formatGs(order.total)}
                    </span>
                    <span className="text-slate-500 text-[11px] ml-1">
                      ({order.customerData.deliveryType === 'delivery' ? 'Delivery' : 'Retiro'})
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onReorder(order.items);
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 rounded-lg text-xs font-semibold border border-amber-500/30 transition-colors"
                  >
                    <Repeat className="w-3 h-3" />
                    <span>Repetir Pedido</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
