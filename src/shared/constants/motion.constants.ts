/** Curva padrão de entrada: rápida no início, assenta devagar (sensação "premium"). */
export const EASE_EMBER: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Mola usada em parallax e botões magnéticos. */
export const SPRING_SOFT = { stiffness: 120, damping: 20, mass: 0.6 } as const;
export const SPRING_MAGNETIC = { stiffness: 180, damping: 14, mass: 0.25 } as const;
