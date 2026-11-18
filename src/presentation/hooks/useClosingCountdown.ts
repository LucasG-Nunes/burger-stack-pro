"use client";

import { useEffect, useState } from "react";

import { getStoreStatus, type StoreStatus } from "@/shared/helpers/schedule";

export type ClosingCountdown =
  | { ready: false }
  | (StoreStatus & { ready: true; hours: number; minutes: number; seconds: number });

/**
 * Status da loja atualizado a cada segundo: aberta com contagem até fechar, ou
 * fechada com contagem até abrir. Regras de dia/horário em `SCHEDULE`
 * (brand.constants) e cálculo em `getStoreStatus` (helpers/schedule).
 */
export function useClosingCountdown(): ClosingCountdown {
  // `null` até montar no cliente: o servidor não sabe a hora do visitante (evita mismatch).
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) return { ready: false };

  const status = getStoreStatus(now);
  const totalSeconds = Math.max(0, Math.floor(status.remainingMs / 1000));
  return {
    ...status,
    ready: true,
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
