import React, { useState } from 'react';
import { X, Save, RotateCcw, Phone, Bike, Landmark, Sliders } from 'lucide-react';
import { RestaurantConfig } from '../types';
import { RESTAURANT_DEFAULT_CONFIG } from '../data/menu';

interface RestaurantSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: RestaurantConfig;
  onSaveConfig: (newConfig: RestaurantConfig) => void;
}

export const RestaurantSettingsModal: React.FC<RestaurantSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [formData, setFormData] = useState<RestaurantConfig>({ ...config });
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1000);
  };

  const handleReset = () => {
    if (confirm('¿Restablecer configuración a los valores por defecto?')) {
      setFormData({ ...RESTAURANT_DEFAULT_CONFIG });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#111723] border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-[#0a0e16]">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold text-white">Ajustes del Restaurante</h2>
              <p className="text-xs text-slate-400">Personaliza número de WhatsApp, precios de delivery y banco</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* WhatsApp Destination */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>Número de WhatsApp para recibir pedidos</span>
            </label>
            <input
              type="text"
              value={formData.whatsappPhone}
              onChange={(e) => setFormData({ ...formData, whatsappPhone: e.target.value.replace(/[^0-9]/g, '') })}
              placeholder="Ej: 595981234567 (código de país sin '+')"
              className="w-full px-3 py-2 bg-[#080c14] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
              required
            />
            <p className="text-[11px] text-slate-400">
              Formato internacional sin el símbolo + ni espacios (Ej: <span className="text-slate-300 font-mono">595981234567</span> para Paraguay).
            </p>
          </div>

          {/* Delivery & Time */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <label className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
              <Bike className="w-3.5 h-3.5" />
              <span>Costo de Delivery y Tiempos</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Costo Delivery (Gs.):</label>
                <input
                  type="number"
                  step={1000}
                  value={formData.deliveryCost}
                  onChange={(e) => setFormData({ ...formData, deliveryCost: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#080c14] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Tiempo Delivery estimado:</label>
                <input
                  type="text"
                  value={formData.deliveryTimeEstimate}
                  onChange={(e) => setFormData({ ...formData, deliveryTimeEstimate: e.target.value })}
                  placeholder="35 - 50 min"
                  className="w-full px-3 py-2 bg-[#080c14] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Bank Transfer Details */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <label className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5" />
              <span>Datos Bancarios para Transferencias</span>
            </label>
            <div className="space-y-2">
              <input
                type="text"
                value={formData.bankDetails.bankName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bankDetails: { ...formData.bankDetails, bankName: e.target.value },
                  })
                }
                placeholder="Nombre del Banco"
                className="w-full px-3 py-2 bg-[#080c14] border border-white/10 rounded-xl text-xs text-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formData.bankDetails.accountHolder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bankDetails: { ...formData.bankDetails, accountHolder: e.target.value },
                    })
                  }
                  placeholder="Titular de la cuenta"
                  className="w-full px-3 py-2 bg-[#080c14] border border-white/10 rounded-xl text-xs text-white"
                />
                <input
                  type="text"
                  value={formData.bankDetails.taxId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bankDetails: { ...formData.bankDetails, taxId: e.target.value },
                    })
                  }
                  placeholder="CI / RUC"
                  className="w-full px-3 py-2 bg-[#080c14] border border-white/10 rounded-xl text-xs text-white"
                />
              </div>
              <input
                type="text"
                value={formData.bankDetails.alias}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bankDetails: { ...formData.bankDetails, alias: e.target.value },
                  })
                }
                placeholder="Alias / CVU / CBU"
                className="w-full px-3 py-2 bg-[#080c14] border border-white/10 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block">
              Horario de atención
            </label>
            <input
              type="text"
              value={formData.scheduleText}
              onChange={(e) => setFormData({ ...formData, scheduleText: e.target.value })}
              className="w-full px-3 py-2 bg-[#080c14] border border-white/10 rounded-xl text-xs text-white"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer</span>
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{saveSuccess ? '¡Guardado!' : 'Guardar Cambios'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
