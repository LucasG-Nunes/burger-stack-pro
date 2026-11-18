import { SCHEDULE } from "../constants/brand.constants";

const WEEKDAY_NAMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const SHORT_WEEKDAYS: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export type StoreStatus =
  | { isOpen: true; /** ms até fechar */ remainingMs: number }
  | {
      isOpen: false;
      /** ms até abrir */ remainingMs: number;
      /** "hoje", "amanhã" ou o dia da semana ("quarta") */ opensDayLabel: string;
      /** "17h30" */ opensTimeLabel: string;
    };

/** Dia da semana e segundos desde a meia-noite NO FUSO DA LOJA, seja qual for o do visitante. */
function getStoreClock(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SCHEDULE.timeZone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";

  return {
    weekday: SHORT_WEEKDAYS[get("weekday")] ?? 0,
    secondsOfDay: Number(get("hour")) * 3600 + Number(get("minute")) * 60 + Number(get("second")),
  };
}

const toSeconds = ({ hour, minute }: { hour: number; minute: number }) => hour * 3600 + minute * 60;
const DAY = 24 * 3600;

export function formatTimeLabel({ hour, minute }: { hour: number; minute: number }): string {
  return minute ? `${hour}h${String(minute).padStart(2, "0")}` : `${hour}h`;
}

/**
 * Está aberto agora? Quanto falta para fechar, ou quando abre de novo.
 * Função pura (recebe `now`), fácil de testar com qualquer data.
 */
export function getStoreStatus(now: Date): StoreStatus {
  const { weekday, secondsOfDay } = getStoreClock(now);
  const openAt = toSeconds(SCHEDULE.open);
  const closeAt = toSeconds(SCHEDULE.close); // 24:00 = 86400 (meia-noite)

  if (SCHEDULE.openDays.includes(weekday) && secondsOfDay >= openAt && secondsOfDay < closeAt) {
    return { isOpen: true, remainingMs: (closeAt - secondsOfDay) * 1000 };
  }

  // Próxima abertura: hoje (se ainda não abriu) ou o próximo dia de funcionamento.
  for (let offset = 0; offset <= 7; offset++) {
    const day = (weekday + offset) % 7;
    if (!SCHEDULE.openDays.includes(day)) continue;
    if (offset === 0 && secondsOfDay >= openAt) continue;

    const remainingSeconds = offset * DAY + openAt - secondsOfDay;
    return {
      isOpen: false,
      remainingMs: remainingSeconds * 1000,
      opensDayLabel: offset === 0 ? "hoje" : offset === 1 ? "amanhã" : WEEKDAY_NAMES[day],
      opensTimeLabel: formatTimeLabel(SCHEDULE.open),
    };
  }

  // Inalcançável enquanto houver ao menos um dia em `openDays`.
  return { isOpen: false, remainingMs: 0, opensDayLabel: "", opensTimeLabel: "" };
}
