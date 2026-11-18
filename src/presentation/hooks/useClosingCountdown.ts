"use client";

import { useEffect, useState } from "react";

interface ClosingCountdown {
  /** `false` até o primeiro tick no cliente (evita mismatch de hidratação). */
  ready: boolean;
  isOpen: boolean;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Contagem regressiva até o horário de fechamento da chapa (horário local do visitante). */
export function useClosingCountdown(openingHour: number, closingHour: number): ClosingCountdown {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) return { ready: false, isOpen: false, hours: 0, minutes: 0, seconds: 0 };

  const closing = new Date(now);
  closing.setHours(closingHour, 0, 0, 0);
  const remainingMs = closing.getTime() - now.getTime();
  const isOpen = now.getHours() >= openingHour && remainingMs > 0;

  if (!isOpen) return { ready: true, isOpen: false, hours: 0, minutes: 0, seconds: 0 };

  const totalSeconds = Math.floor(remainingMs / 1000);
  return {
    ready: true,
    isOpen: true,
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
