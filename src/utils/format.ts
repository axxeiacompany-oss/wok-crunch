import { CartItem, CustomerOrderData, RestaurantConfig } from '../types';

/**
 * Formats a number into Paraguayan Guaraní format: Gs. 25.000
 */
export function formatGs(value: number): string {
  if (isNaN(value)) return 'Gs. 0';
  return `Gs. ${value.toLocaleString('es-PY')}`;
}

/**
 * Parses numeric value from user cash input string (e.g. "50000" or "50.000")
 */
export function parseCashInput(value: string | undefined): number {
  if (!value) return 0;
  const clean = value.replace(/[^0-9]/g, '');
  return parseInt(clean, 10) || 0;
}

/**
 * Generates the WhatsApp order message containing ONLY the products, quantities, prices and total.
 */
export function generateWhatsAppMessage(
  cartItems: CartItem[],
  customer: CustomerOrderData,
  config: RestaurantConfig,
  deliveryCost = 0
): string {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Format order items list
  const itemsText = cartItems
    .map((item) => {
      let line = `• ${item.quantity}x ${item.name} ── ${formatGs(item.price * item.quantity)}`;
      if (item.portion) {
        line += ` (${item.portion})`;
      }
      if (item.notes && item.notes.trim()) {
        line += `\n  ↳ Nota: ${item.notes.trim()}`;
      }
      return line;
    })
    .join('\n');

  // assemble message with strictly products and total
  return `¡Hola *${config.name}*! 🥢🔥
Quisiera realizar este pedido:

${itemsText}

━━━━━━━━━━━━━━━━━━━━
💰 *TOTAL: ${formatGs(total)}*
━━━━━━━━━━━━━━━━━━━━
¡Muchas gracias!`;
}

/**
 * Creates clean wa.me link with URL encoded message
 */
export function buildWhatsAppLink(phoneNumber: string, messageText: string): string {
  // Strip any non-digit character from phone number
  let cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('09') && cleanPhone.length === 10) {
    cleanPhone = '595' + cleanPhone.slice(1);
  } else if (cleanPhone.startsWith('9') && cleanPhone.length === 9) {
    cleanPhone = '595' + cleanPhone;
  }
  const encodedText = encodeURIComponent(messageText);
  return cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodedText}` : `https://wa.me/?text=${encodedText}`;
}

/**
 * Web Audio pleasant haptic sound feedback
 */
export function playSound(type: 'add' | 'remove' | 'success') {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === 'add') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'success') {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.18);
      });
    } else if (type === 'remove') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(261.63, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    }
  } catch {
    // Ignore audio permission or context restrictions
  }
}
