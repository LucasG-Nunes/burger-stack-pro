import Image from "next/image";

import { cn } from "@/shared/helpers/cn";

type Tone = "ember" | "brasa" | "neutral";

interface ImagePlaceholderProps {
  /** Caminho do PNG final. Enquanto `null`, renderiza um bloco colorido com rótulo. */
  src?: string | null;
  alt: string;
  /** Texto exibido dentro do placeholder (ajuda a saber qual PNG vai onde). */
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tone?: Tone;
  /** `contain` para PNG recortado (com sombra); `cover` para foto que preenche a caixa. */
  fit?: "contain" | "cover";
  /** Classes extras do <img>, ex: object-position. */
  imageClassName?: string;
}

const TONES: Record<Tone, string> = {
  ember: "bg-radial from-ember-400/70 via-ember-600/40 to-brasa-700/30 border-ember-400/40",
  brasa: "bg-radial from-brasa-400/60 via-brasa-600/40 to-coal-800 border-brasa-400/40",
  neutral: "bg-radial from-coal-700 to-coal-900 border-white/10",
};

export function ImagePlaceholder({
  src,
  alt,
  label,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  tone = "ember",
  fit = "contain",
  imageClassName,
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div className={cn("relative", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            fit === "cover"
              ? "object-cover"
              : "object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.7)]",
            imageClassName,
          )}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative grid place-items-center overflow-hidden border border-dashed",
        TONES[tone],
        className,
      )}
    >
      <span className="px-4 text-center font-display text-sm tracking-[0.2em] text-cream-100/70 uppercase">
        {label ?? alt}
      </span>
    </div>
  );
}
