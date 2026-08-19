import { MONTH_NAMES } from "./types";

export function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function firstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function dateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function formatRange(start: string | null, end: string | null) {
  if (!start) return "";
  const fmt = (k: string) => {
    const parts = k.split("-");
    const m = parts[1];
    const d = parts[2];
    return `${MONTH_NAMES[parseInt(m!) - 1]!.slice(0, 3)} ${parseInt(d!)}`;
  };
  if (!end) return fmt(start);
  return `${fmt(start)} – ${fmt(end)}`;
}

export function formatBlackoutLabel(b: { start: string; end: string }) {
  const fmt = (k: string) => {
    const parts = k.split("-");
    const m = parts[1];
    const d = parts[2];
    return `${MONTH_NAMES[parseInt(m!) - 1]!.slice(0, 3)} ${parseInt(d!)}`;
  };
  return `${fmt(b.start)} – ${fmt(b.end)}`;
}
