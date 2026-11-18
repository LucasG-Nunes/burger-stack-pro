import { WHATSAPP } from "../constants/brand.constants";

/** Monta o link wa.me com a mensagem já preenchida. */
export function buildWhatsAppUrl(message: string = WHATSAPP.defaultMessage): string {
  return `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(message)}`;
}

export function buildProductOrderMessage(productName: string): string {
  return `Olá! Quero pedir um ${productName} 🍔🔥`;
}
