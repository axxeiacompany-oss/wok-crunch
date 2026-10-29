/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES, RESTAURANT_DEFAULT_CONFIG } from './data/menu';
import { MenuItem, RestaurantConfig } from './types';
import { formatGs, buildWhatsAppLink, playSound } from './utils/format';
import { X, MapPin, Check, ZoomIn } from 'lucide-react';

const STORAGE_KEY_QTY = 'wok_crunch_qty_v2';
const STORAGE_KEY_CONFIG = 'wok_crunch_config_v4';

export default function App() {
  const [config, setConfig] = useState<RestaurantConfig>(() => {
    try {
      // Clear legacy storage if old number was cached
      const legacy = localStorage.getItem('wok_crunch_config_v3');
      if (legacy) {
        try {
          const old = JSON.parse(legacy);
          if (old.whatsappPhone === '595992607393') {
            localStorage.removeItem('wok_crunch_config_v3');
          }
        } catch {
          // ignore
        }
      }

      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.whatsappPhone && parsed.whatsappPhone !== '595992607393') return parsed;
      }
      return RESTAURANT_DEFAULT_CONFIG;
    } catch {
      return RESTAURANT_DEFAULT_CONFIG;
    }
  });

  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QTY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [zoomItem, setZoomItem] = useState<MenuItem | null>(null);

  // Sheet fields
  const [customerName, setCustomerName] = useState('');
  const [deliveryType, setDeliveryType] = useState<'Delivery' | 'Retiro'>('Delivery');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Efectivo' | 'Transferencia'>('Efectivo');
  const [observations, setObservations] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_QTY, JSON.stringify(quantities));
  }, [quantities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  }, [config]);

  // Calculations
  const cartItems = useMemo(() => {
    return MENU_ITEMS.map((item) => ({
      item,
      quantity: quantities[item.id] || 0,
      subtotal: (quantities[item.id] || 0) * item.price,
    })).filter((ci) => ci.quantity > 0);
  }, [quantities]);

  const totalCount = useMemo(() => {
    return cartItems.reduce((acc, ci) => acc + ci.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, ci) => acc + ci.subtotal, 0);
  }, [cartItems]);

  // Stepper handler
  const handleQuantityChange = (itemId: string, delta: number) => {
    const current = quantities[itemId] || 0;
    const next = Math.max(0, current + delta);
    if (next > current) playSound('add');
    if (next < current) playSound('remove');

    setQuantities((prev) => {
      const updated = { ...prev };
      if (next === 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = next;
      }
      return updated;
    });
  };

  const handleClearCart = () => {
    playSound('remove');
    setQuantities({});
    setIsSheetOpen(false);
  };

  const handleSendOrder = () => {
    if (totalCount === 0) {
      setErrorMsg('Agregá al menos un plato a tu pedido.');
      return;
    }

    setErrorMsg('');

    // Assemble message
    let message = `🥢 *NUEVO PEDIDO · WOK CRUNCH ORIENTAL*\n\n1️⃣ *Productos:*\n`;
    cartItems.forEach((ci) => {
      message += `• ${ci.quantity} × ${ci.item.name} — ${formatGs(ci.subtotal)}\n`;
    });
    message += `\n💰 *Total:* ${formatGs(totalPrice)}\n`;

    if (customerName.trim()) {
      message += `2️⃣ *Nombre:* ${customerName.trim()}\n`;
    }
    message += `3️⃣ *Entrega:* ${deliveryType}\n`;
    if (deliveryType === 'Delivery' && address.trim()) {
      message += `4️⃣ *Dirección:* ${address.trim()}\n`;
    }
    message += `5️⃣ *Pago:* ${paymentMethod}\n`;
    if (observations.trim()) {
      message += `📝 *Obs.:* ${observations.trim()}\n`;
    }

    playSound('success');

    // Build URL & Open WhatsApp
    const url = buildWhatsAppLink(config.whatsappPhone, message);
    try {
      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (!opened) {
        window.location.href = url;
      }
    } catch {
      window.location.href = url;
    }
  };

  return (
    <div className="min-h-screen text-[var(--ink)] bg-[var(--bg)] selection:bg-[var(--sesame)] pb-28">
      {/* Header */}
      <header className="pt-7 pb-4">
        <div className="max-w-[640px] mx-auto px-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight m-0 leading-none">
                Wok Crunch <span className="text-[var(--red)]">Oriental</span>
              </h1>
              <p className="text-[var(--muted)] text-sm sm:text-base mt-1.5 m-0 font-medium">
                Sabor oriental en cada bocado
              </p>
            </div>
          </div>

          <div className="mt-3.5 inline-block bg-[var(--sesame)] text-[#2A1E05] rounded-full px-3.5 py-1.5 font-bold text-xs sm:text-sm">
            🛵 Delivery y retiro · Armá tu pedido y envialo por WhatsApp
          </div>
        </div>
      </header>

      {/* Sticky Category Chips Nav */}
      <nav className="sticky top-0 z-20 bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--line)]">
        <div className="max-w-[640px] mx-auto px-4 flex gap-2 overflow-x-auto py-2.5 scrollbar-none">
          {MENU_CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="shrink-0 text-sm font-semibold px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--red)] transition-all whitespace-nowrap"
            >
              {cat.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Menu List with Product Images */}
      <main className="max-w-[640px] mx-auto px-4 pt-4 space-y-8">
        {MENU_CATEGORIES.map((cat) => {
          const categoryItems = MENU_ITEMS.filter((item) => {
            if (cat.id === 'arroz') return item.category === 'arroz';
            if (cat.id === 'yaki') return item.category === 'yakisoba';
            if (cat.id === 'pollo') return item.category === 'pollo';
            if (cat.id === 'papas') return item.category === 'papas';
            if (cat.id === 'burg') return item.category === 'hamburguesas';
            return false;
          });

          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-14">
              <h2 className="text-xl sm:text-2xl font-extrabold mb-3 text-[var(--ink)] tracking-tight">
                {cat.title}
              </h2>

              <div className="divide-y divide-dashed divide-[var(--line)] bg-[var(--surface)] rounded-2xl border border-[var(--line)] overflow-hidden shadow-sm">
                {categoryItems.map((item) => {
                  const qty = quantities[item.id] || 0;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3.5 p-3.5 sm:p-4 transition-all duration-200 ${
                        qty > 0
                          ? 'bg-[var(--red)]/[0.04]'
                          : 'hover:bg-black/[0.015]'
                      }`}
                    >
                      {/* Product Image Thumbnail with Added Indicator */}
                      <div
                        onClick={() => setZoomItem(item)}
                        className={`relative w-22 h-22 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-black/5 shrink-0 border cursor-pointer group shadow-sm transition-all duration-200 ${
                          qty > 0
                            ? 'ring-2 ring-[var(--red)] border-transparent shadow-md scale-[1.02]'
                            : 'border-[var(--line)]'
                        }`}
                        title="Toca para ver la foto en grande"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // Fallback to static public image if needed
                            const target = e.currentTarget;
                            if (!target.src.includes('/images/')) {
                              target.src = `/images/${item.category === 'arroz' ? 'arroz_frito' : item.category === 'yakisoba' ? 'yakisoba' : item.category === 'pollo' ? 'pollo_frito' : item.category === 'papas' ? 'papas_fritas' : 'hamburguesa'}.jpg`;
                            }
                          }}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                          <ZoomIn className="w-5 h-5 drop-shadow" />
                        </div>

                        {/* Floating Added Badge right on the Photo */}
                        {qty > 0 && (
                          <div className="absolute top-1.5 left-1.5 bg-[var(--red)] text-white text-[11px] font-black px-1.5 py-0.5 rounded-full shadow-md flex items-center gap-0.5 animate-in zoom-in-75 duration-200">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                            <span>{qty}</span>
                          </div>
                        )}
                      </div>

                      {/* Product Name, Details & Price */}
                      <div className="flex-1 min-w-0 pr-1">
                        <b
                          onClick={() => setZoomItem(item)}
                          className="block text-sm sm:text-base font-bold text-[var(--ink)] leading-snug cursor-pointer hover:text-[var(--red)] transition-colors truncate"
                        >
                          {item.name}
                        </b>

                        <p className="text-xs text-[var(--muted)] line-clamp-1 mt-0.5">
                          {item.description}
                        </p>

                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-sm font-bold text-[var(--soy)] tabular-nums">
                            {formatGs(item.price)}
                          </span>
                          {item.portion && (
                            <span className="text-[11px] text-[var(--muted)] font-normal">
                              · {item.portion}
                            </span>
                          )}
                        </div>

                        {qty > 0 && (
                          <div className="mt-1 text-[11px] font-bold text-[var(--red)] flex items-center gap-1">
                            <span>Adicionado ao pedido</span>
                            <span className="tabular-nums">({qty} un · {formatGs(qty * item.price)})</span>
                          </div>
                        )}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1 bg-[var(--surface)] border border-[var(--line)] rounded-full p-1 shadow-xs shrink-0">
                        {qty > 0 && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="w-8 h-8 rounded-full flex items-center justify-center text-base font-bold text-[var(--ink)] hover:bg-black/5 active:scale-90 transition-all"
                              aria-label="Quitar"
                            >
                              −
                            </button>
                            <span className="min-w-[22px] text-center font-bold text-sm tabular-nums text-[var(--ink)]">
                              {qty}
                            </span>
                          </>
                        )}
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-base font-bold transition-all active:scale-90 ${
                            qty > 0
                              ? 'bg-[var(--red)] text-[var(--red-ink)] shadow-sm'
                              : 'bg-[var(--red)] text-[var(--red-ink)] shadow-sm'
                          }`}
                          aria-label="Agregar"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>

      {/* Floating Bottom Bar with Added Products Thumbnails */}
      <div className="fixed left-0 right-0 bottom-0 z-30 p-3 bg-[var(--bg)]/95 backdrop-blur-md border-t border-[var(--line)]">
        <button
          disabled={totalCount === 0}
          onClick={() => setIsSheetOpen(true)}
          className={`flex w-full max-w-[640px] mx-auto justify-between items-center rounded-2xl font-bold text-base p-3 sm:p-4 transition-all shadow-lg ${
            totalCount > 0
              ? 'bg-[var(--red)] text-[var(--red-ink)] cursor-pointer active:scale-[0.99] hover:brightness-105'
              : 'bg-[var(--line)] text-[var(--muted)] cursor-default opacity-80'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {cartItems.length > 0 && (
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                {cartItems.slice(0, 3).map((ci) => (
                  <img
                    key={ci.item.id}
                    src={ci.item.image}
                    alt={ci.item.name}
                    className="inline-block w-8 h-8 rounded-full ring-2 ring-[var(--red)] object-cover shadow-sm bg-black/20"
                  />
                ))}
              </div>
            )}
            <span>
              {totalCount > 0
                ? `Ver pedido (${totalCount} ${totalCount === 1 ? 'ítem' : 'ítems'})`
                : 'Tu pedido está vacío'}
            </span>
          </div>

          <span className="tabular-nums font-black text-lg">
            {totalCount > 0 ? formatGs(totalPrice) : ''}
          </span>
        </button>
      </div>

      {/* Slide-Up Bottom Sheet for WhatsApp Order */}
      {isSheetOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 flex items-end justify-center animate-in fade-in duration-200"
          onClick={() => setIsSheetOpen(false)}
        >
          <div
            className="bg-[var(--bg)] text-[var(--ink)] w-full max-w-[640px] max-h-[92vh] overflow-y-auto rounded-t-3xl p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Title & Close */}
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <div>
                <h3 className="text-xl font-extrabold m-0">Tu pedido</h3>
                <span className="text-xs text-[var(--muted)] font-medium">
                  {totalCount} {totalCount === 1 ? 'producto seleccionado' : 'productos seleccionados'}
                </span>
              </div>
              <button
                onClick={() => setIsSheetOpen(false)}
                className="w-9 h-9 rounded-full bg-[var(--surface)] text-[var(--ink)] flex items-center justify-center font-bold text-base border border-[var(--line)] hover:bg-black/5"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            {/* Itemized Lines with Photos */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((ci) => (
                <div
                  key={ci.item.id}
                  className="p-2.5 bg-[var(--surface)] border border-[var(--line)] rounded-2xl flex items-center justify-between gap-3 shadow-xs"
                >
                  {/* Photo of Added Product */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img
                      src={ci.item.image}
                      alt={ci.item.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[var(--line)] shadow-xs"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-sm text-[var(--ink)] block truncate">
                        {ci.item.name}
                      </span>
                      <span className="text-xs text-[var(--muted)]">
                        {ci.quantity} × {formatGs(ci.item.price)}
                      </span>
                    </div>
                  </div>

                  {/* Price and Stepper */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <b className="tabular-nums font-bold text-sm text-[var(--soy)]">
                      {formatGs(ci.subtotal)}
                    </b>
                    <div className="flex items-center gap-1 bg-[var(--bg)] border border-[var(--line)] rounded-full p-0.5">
                      <button
                        onClick={() => handleQuantityChange(ci.item.id, -1)}
                        className="w-6 h-6 rounded-full bg-[var(--surface)] text-[var(--ink)] text-xs font-bold flex items-center justify-center hover:bg-black/5 active:scale-90"
                      >
                        −
                      </button>
                      <span className="w-4 text-center font-bold text-xs tabular-nums">
                        {ci.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(ci.item.id, 1)}
                        className="w-6 h-6 rounded-full bg-[var(--red)] text-white text-xs font-bold flex items-center justify-center active:scale-90"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Line */}
            <div className="flex justify-between items-center text-lg font-black border-t-2 border-[var(--ink)] pt-3">
              <span>Total</span>
              <span className="tabular-nums text-[var(--red)]">{formatGs(totalPrice)}</span>
            </div>

            {/* Name */}
            <div>
              <label className="block font-bold text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-xl p-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--red)]"
              />
            </div>

            {/* Delivery Type Segmented */}
            <div>
              <label className="block font-bold text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
                Tipo de entrega
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryType('Delivery')}
                  className={`p-3 rounded-xl border text-center font-bold text-sm transition-all ${
                    deliveryType === 'Delivery'
                      ? 'border-[var(--red)] bg-[var(--surface)] text-[var(--red)] shadow-xs'
                      : 'border-[var(--line)] bg-[var(--surface)] text-[var(--muted)]'
                  }`}
                >
                  🛵 Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType('Retiro')}
                  className={`p-3 rounded-xl border text-center font-bold text-sm transition-all ${
                    deliveryType === 'Retiro'
                      ? 'border-[var(--red)] bg-[var(--surface)] text-[var(--red)] shadow-xs'
                      : 'border-[var(--line)] bg-[var(--surface)] text-[var(--muted)]'
                  }`}
                >
                  🏪 Retiro
                </button>
              </div>
            </div>

            {/* Address (if Delivery) */}
            {deliveryType === 'Delivery' && (
              <div className="space-y-1">
                <label className="block font-bold text-xs uppercase tracking-wider text-[var(--muted)]">
                  Dirección / ubicación
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Calle, número, barrio o referencia..."
                  className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-xl p-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--red)]"
                />
              </div>
            )}

            {/* Payment Method */}
            <div>
              <label className="block font-bold text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
                Forma de pago
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as 'Efectivo' | 'Transferencia')}
                className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-xl p-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--red)]"
              >
                <option value="Efectivo">Efectivo 💵</option>
                <option value="Transferencia">Transferencia Bancaria 📲</option>
              </select>
            </div>

            {/* Observations */}
            <div>
              <label className="block font-bold text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
                Observaciones (opcional)
              </label>
              <input
                type="text"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Ej: sin cebolla, salsa extra..."
                className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-xl p-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--red)]"
              />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <p className="text-xs font-bold text-[var(--red)] m-0">{errorMsg}</p>
            )}

            {/* Big Green WhatsApp Send Button */}
            <button
              onClick={handleSendOrder}
              className="w-full py-4 rounded-2xl bg-[#1FA855] hover:bg-[#1b934a] text-white font-extrabold text-base shadow-lg shadow-green-900/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Enviar pedido por WhatsApp 📲</span>
            </button>
          </div>
        </div>
      )}

      {/* Image Zoom Lightbox Modal */}
      {zoomItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setZoomItem(null)}
        >
          <div
            className="bg-[var(--surface)] rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl border border-[var(--line)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] bg-black">
              <img
                src={zoomItem.image}
                alt={zoomItem.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setZoomItem(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center font-bold text-sm transition-colors"
                aria-label="Cerrar vista"
              >
                ✕
              </button>

              {/* Added to order badge on photo */}
              {(quantities[zoomItem.id] || 0) > 0 && (
                <div className="absolute bottom-3 left-3 bg-[var(--red)] text-white text-xs font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-sm animate-in zoom-in-75">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{quantities[zoomItem.id]} no seu pedido</span>
                </div>
              )}
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h4 className="text-lg font-bold text-[var(--ink)] leading-snug">{zoomItem.name}</h4>
                <p className="text-xs text-[var(--muted)] leading-relaxed mt-1">{zoomItem.description}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]">
                <span className="text-lg font-black text-[var(--soy)] tabular-nums">
                  {formatGs(zoomItem.price)}
                </span>

                {(quantities[zoomItem.id] || 0) > 0 ? (
                  <div className="flex items-center gap-2 bg-[var(--bg)] border border-[var(--line)] rounded-full p-1">
                    <button
                      onClick={() => handleQuantityChange(zoomItem.id, -1)}
                      className="w-8 h-8 rounded-full bg-[var(--surface)] text-[var(--ink)] font-bold text-sm flex items-center justify-center hover:bg-black/5 active:scale-90"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-bold text-sm tabular-nums text-[var(--ink)]">
                      {quantities[zoomItem.id]}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(zoomItem.id, 1)}
                      className="w-8 h-8 rounded-full bg-[var(--red)] text-white font-bold text-sm flex items-center justify-center active:scale-90"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleQuantityChange(zoomItem.id, 1)}
                    className="px-4 py-2 bg-[var(--red)] hover:brightness-105 text-white font-bold text-xs rounded-full shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>+ Agregar al pedido</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
