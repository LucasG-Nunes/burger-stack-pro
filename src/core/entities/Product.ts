/**
 * Item do cardápio. Mantido como objeto plano (não classe) para poder ser
 * serializado de Server Components para Client Components sem conversão.
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  /** Preço em centavos — evita erros de ponto flutuante quando entrar o checkout. */
  priceInCents: number;
  /** Selo de destaque exibido no card (ex: "Mais pedido"). */
  badge?: string;
  /** Caminho em /public (ex: "/images/products/brasa-smash.png"). `null` = placeholder. */
  image: string | null;
}
