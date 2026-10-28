import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Send,
  Copy,
  Check,
  Edit2,
  ShoppingBag,
} from 'lucide-react';
import { CartItem, CustomerOrderData, RestaurantConfig } from '../types';
import {
  formatGs,
  generateWhatsAppMessage,
  buildWhatsAppLink,
} from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  config: RestaurantConfig;
  onSaveConfig?: (newConfig: RestaurantConfig) => void;
  onOrderSuccess: (orderData: CustomerOrderData, formattedMessage: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  config,
  onSaveConfig,
  onOrderSuccess,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [tempPhone, setTempPhone] = useState(config.whatsappPhone);

  if (!isOpen) return null;

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const customerData: CustomerOrderData = {
    name: 'Cliente',
    phone: '',
    deliveryType: 'delivery',
    address: '',
    paymentMethod: 'efectivo',
  };

  const finalMessage = generateWhatsAppMessage(items, customerData, config, 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(finalMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToWhatsApp = () => {
    if (items.length === 0) return;

    onOrderSuccess(customerData, finalMessage);
    const link = buildWhatsAppLink(config.whatsappPhone, finalMessage);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleSavePhone = () => {
    const clean = tempPhone.replace(/[^0-9]/g, '');
    if (clean && onSaveConfig) {
      onSaveConfig({
        ...config,
        whatsappPhone: clean,
        displayPhone: clean,
      });
      setIsEditingPhone(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-3 sm:pl-10">
        <div className="w-screen max-w-md bg-[#0d121c] border-l border-white/10 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-[#080c14]">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🥢</span>
              <div>
                <h2 className="text-base font-bold text-white">Produtos Selecionados</h2>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span>WhatsApp:</span>
                  {!isEditingPhone ? (
                    <button
                      onClick={() => setIsEditingPhone(true)}
                      className="text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                      title="Clique para alterar o WhatsApp"
                    >
                      <span>+{config.whatsappPhone}</span>
                      <Edit2 className="w-2.5 h-2.5" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={tempPhone}
                        onChange={(e) => setTempPhone(e.target.value)}
                        className="w-28 px-1.5 py-0.5 bg-black border border-amber-500 rounded text-xs text-white"
                        placeholder="Ex: 595981234567"
                      />
                      <button
                        onClick={handleSavePhone}
                        className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold"
                      >
                        OK
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/5"
                  title="Limpar lista"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center text-3xl">
                  🍚
                </div>
                <h3 className="text-base font-bold text-white">Nenhum produto escolhido</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Toque em <strong>"+ Agregar"</strong> ou <strong>"Pedir al WhatsApp"</strong> em qualquer prato do menu.
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 px-5 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-xl text-xs font-bold"
                >
                  Ver Cardápio
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2.5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-[#131b28] border border-white/5 rounded-2xl flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">
                          {item.name}
                        </h4>
                        <div className="text-xs font-bold text-amber-400 tabular-nums mt-0.5">
                          {formatGs(item.price * item.quantity)}
                          {item.quantity > 1 && (
                            <span className="text-slate-400 font-normal ml-1.5 text-[11px]">
                              ({formatGs(item.price)} cada)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stepper (+ / -) */}
                      <div className="flex items-center gap-1.5 bg-[#0a0e16] p-1 rounded-xl border border-white/10 shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/15 text-white active:scale-90 transition-all"
                          aria-label="Diminuir"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold active:scale-90 transition-all"
                          aria-label="Aumentar"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Message Preview */}
                <div className="p-3.5 bg-[#080c14] rounded-2xl border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">Mensagem para o WhatsApp:</span>
                    <button
                      onClick={handleCopy}
                      className="text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                  <pre className="p-2.5 bg-black/40 rounded-xl text-slate-300 font-mono text-[11px] whitespace-pre-wrap leading-relaxed border border-white/5">
                    {finalMessage}
                  </pre>
                </div>
              </>
            )}
          </div>

          {/* Big WhatsApp CTA Button */}
          {items.length > 0 && (
            <div className="p-4 bg-[#080c14] border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-sm sm:text-base font-extrabold text-white">
                <span>Total dos Produtos:</span>
                <span className="text-amber-400 text-xl font-black tabular-nums">
                  {formatGs(total)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="w-full py-4 px-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white rounded-2xl text-base font-black shadow-xl shadow-emerald-950/60 active:scale-98 transition-all flex items-center justify-center gap-2.5"
              >
                <Send className="w-5 h-5" />
                <span>ENVIAR PARA O WHATSAPP 📲</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
