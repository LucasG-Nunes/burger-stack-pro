import type { Product } from "@/core/entities/Product";
import { cn } from "@/shared/helpers/cn";
import { formatPrice } from "@/shared/helpers/currency";
import { buildProductOrderMessage, buildWhatsAppUrl } from "@/shared/helpers/whatsapp";

import { ImagePlaceholder } from "../../atoms/ImagePlaceholder/ImagePlaceholder";

interface ProductCardProps {
  product: Product;
  className?: string;
}

/**
 * Evolução do antigo `DragonItem`: card puro (sem animação própria), para ser
 * reaproveitado no cardápio completo / carrinho quando o sistema de pedidos chegar.
 */
export function ProductCard({ product, className }: ProductCardProps) {
  const { name, description, priceInCents, badge, image } = product;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl",
        "border border-white/8 bg-coal-900/80 shadow-card backdrop-blur",
        "transition duration-500 hover:-translate-y-2 hover:border-ember-500/50 hover:shadow-ember",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-radial from-coal-700 to-coal-900">
        <div className="absolute inset-0 bg-radial from-ember-500/0 to-transparent transition duration-500 group-hover:from-ember-500/25" />
        <ImagePlaceholder
          src={image}
          alt={name}
          label={`PNG · ${name}`}
          tone="neutral"
          sizes="(min-width: 768px) 33vw, 100vw"
          className="absolute inset-6 rounded-2xl transition duration-500 group-hover:scale-105 group-hover:-rotate-2"
        />
        {badge && (
          <span className="absolute top-4 left-4 rounded-full bg-brasa-500 px-3 py-1 text-xs font-bold tracking-wide text-cream-100 uppercase">
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-3xl tracking-wide">{name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-ash-400">{description}</p>

        <div className="mt-2 flex items-center justify-between gap-4">
          <span className="font-display text-3xl text-fire">{formatPrice(priceInCents)}</span>
          <a
            href={buildWhatsAppUrl(buildProductOrderMessage(name))}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ember-500/50 px-5 py-2 text-sm font-semibold text-ember-300 transition hover:bg-ember-500 hover:text-coal-950"
          >
            Pedir este
          </a>
        </div>
      </div>
    </article>
  );
}
