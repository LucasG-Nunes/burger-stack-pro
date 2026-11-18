import { cn } from "@/shared/helpers/cn";

export interface LocationMapProps {
  lat: number;
  lng: number;
  /** Rótulo acessível do mapa. */
  label: string;
  className?: string;
}

/** Meia-largura da área visível, em graus (~1,3 km x 0,8 km em Candeias). */
const SPAN = { lng: 0.006, lat: 0.0035 };

function buildEmbedUrl(lat: number, lng: number) {
  const bbox = [lng - SPAN.lng, lat - SPAN.lat, lng + SPAN.lng, lat + SPAN.lat].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;
}

/**
 * Mapa "simples": OpenStreetMap embutido, sem chave de API e sem JavaScript.
 *
 * - O filtro CSS inverte as cores para casar com o tema escuro.
 * - O pin é nosso (HTML/CSS), sempre no centro do bbox, porque o pin do OSM
 *   também seria invertido pelo filtro.
 * - O iframe não recebe cliques (`pointer-events-none`): o mapa não se move e o pin
 *   não sai do lugar. A navegação fica no botão "Como chegar".
 *
 * Para trocar pelo Mapbox 3D, mantenha estas props e substitua o conteúdo.
 */
export function LocationMap({ lat, lng, label, className }: LocationMapProps) {
  return (
    <div className={cn("relative overflow-hidden bg-coal-900", className)}>
      <iframe
        title={label}
        src={buildEmbedUrl(lat, lng)}
        loading="lazy"
        referrerPolicy="no-referrer"
        tabIndex={-1}
        className="pointer-events-none absolute inset-0 h-full w-full border-0 [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.5)_brightness(0.85)_contrast(1.1)]"
      />

      {/* Tinta de brasa por cima do mapa, para não destoar da paleta */}
      <div aria-hidden="true" className="absolute inset-0 bg-flame/10 mix-blend-color" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-radial from-transparent via-transparent via-55% to-coal-950/85"
      />

      {/* Pin */}
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
        <span className="absolute bottom-0 left-1/2 size-14 -translate-x-1/2 translate-y-1/2 animate-ping rounded-full bg-flame/40" />
        <svg viewBox="0 0 24 32" className="relative size-12 drop-shadow-[0_0_14px_rgba(255,69,0,0.8)]">
          <path
            d="M12 0C5.4 0 0 5.3 0 11.9 0 20.8 12 32 12 32s12-11.2 12-20.1C24 5.3 18.6 0 12 0Z"
            fill="#ff4500"
          />
          <circle cx="12" cy="11.5" r="4.5" fill="#0a0a0a" />
        </svg>
      </div>
    </div>
  );
}
