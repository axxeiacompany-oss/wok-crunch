import React from 'react';
import { ShoppingCart, Send, CheckCircle2, ArrowRight } from 'lucide-react';

interface HowToOrderSectionProps {
  onStartOrder: () => void;
}

export const HowToOrderSection: React.FC<HowToOrderSectionProps> = ({ onStartOrder }) => {
  const steps = [
    {
      num: '1️⃣',
      icon: ShoppingCart,
      title: 'Escolha os Produtos',
      desc: 'Selecione os pratos que deseja e ajuste a quantidade com + e -.',
    },
    {
      num: '2️⃣',
      icon: Send,
      title: 'Envie para o WhatsApp',
      desc: 'Toque no botão verde "Enviar para o WhatsApp" com a lista já montada.',
    },
    {
      num: '3️⃣',
      icon: CheckCircle2,
      title: 'Pronto!',
      desc: 'O restaurante recebe os produtos na hora e confirma seu pedido.',
    },
  ];

  return (
    <section id="how-to-order" className="py-10 bg-[#0c111c] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-2 mb-8">
          <div className="text-xs uppercase tracking-widest text-amber-500 font-bold">
            Simples e Rápido
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Como Fazer Seu Pedido
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Sem cadastro ou formulários longos. Apenas escolha os produtos e envie direto para o WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#121825] border border-white/5 flex flex-col justify-between hover:border-amber-500/30 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">{step.num}</span>
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 max-w-4xl mx-auto p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-amber-950/30 to-slate-900 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-white">
              Pediu, enviou no WhatsApp, pronto! 🥢🔥
            </h4>
            <p className="text-xs text-slate-400">
              Apenas os produtos e o valor total vão na mensagem.
            </p>
          </div>

          <button
            onClick={onStartOrder}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/40 whitespace-nowrap"
          >
            <span>Ver Cardápio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
