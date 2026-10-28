import React from 'react';
import { Clock, Bike, Banknote, PhoneCall, ShieldCheck, MessageCircle } from 'lucide-react';
import { RestaurantConfig } from '../types';
import { formatGs } from '../utils/format';

interface InfoSectionProps {
  config: RestaurantConfig;
  onOpenSettings: () => void;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ config, onOpenSettings }) => {
  return (
    <section id="info-section" className="py-12 bg-[#090d14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Horario & Atención */}
          <div className="p-5 rounded-2xl bg-[#111723] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Horario de Atención</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {config.scheduleText}
            </p>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-white/5">
              Escríbenos tu pedido y te responderemos a la brevedad.
            </div>
          </div>

          {/* Card 2: Delivery & Retiro */}
          <div className="p-5 rounded-2xl bg-[#111723] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
              <Bike className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Delivery & Retiro</h3>
            <div className="space-y-1 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Costo estándar delivery:</span>
                <span className="font-semibold text-amber-400 tabular-nums">
                  {formatGs(config.deliveryCost)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tiempo delivery:</span>
                <span className="font-semibold text-white">{config.deliveryTimeEstimate}</span>
              </div>
              <div className="flex justify-between">
                <span>Retiro en local:</span>
                <span className="font-semibold text-emerald-400">Gratis ({config.pickupTimeEstimate})</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-white/5">
              Empaques térmicos para mantener la comida crujiente y caliente.
            </div>
          </div>

          {/* Card 3: Formas de Pago */}
          <div className="p-5 rounded-2xl bg-[#111723] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Banknote className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Formas de Pago</h3>
            <div className="space-y-1 text-xs text-slate-300">
              <div>
                <strong className="text-white">💵 Efectivo:</strong> Llevamos tu vuelto exacto si lo indicas.
              </div>
              <div>
                <strong className="text-white">📲 Transferencia:</strong> Alias: <span className="text-amber-400 font-mono">{config.bankDetails.alias}</span> ({config.bankDetails.bankName})
              </div>
            </div>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-white/5 flex items-center justify-between">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Pago 100% seguro</span>
              </span>
              <button
                onClick={onOpenSettings}
                className="text-amber-400 hover:text-amber-300 underline text-[11px]"
              >
                Editar datos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
