import { BRAND, WHATSAPP } from "../constants/brand.constants";

/** Bloco de dados de entrega que vai em toda mensagem de pedido. */
const DELIVERY_FORM = [
  "Por favor, insira seus dados de recebimento 🏠",
  "",
  "Nome:",
  "Rua:",
  "Número / Casa:",
  "Bairro:",
  "Complemento / Ponto de referência:",
  "",
  "📍 Se possível, envie também sua localização fixa aqui no WhatsApp.",
  "",
  `Ou faça o pedido pelo nosso menu digital! ${BRAND.menuUrl}`,
].join("\n");

/** Mensagem completa: abertura + formulário de entrega. */
export function buildOrderMessage(intro = "Olá! Quero fazer um pedido 🍔🔥"): string {
  return `${intro}\n\n${DELIVERY_FORM}`;
}

export function buildProductOrderMessage(productName: string): string {
  return buildOrderMessage(`Olá! Quero pedir um ${productName} 🍔🔥`);
}

/** Monta o link wa.me com a mensagem já preenchida. */
export function buildWhatsAppUrl(message: string = buildOrderMessage()): string {
  return `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(message)}`;
}
