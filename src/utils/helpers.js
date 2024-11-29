import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns";

export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function randomInt(max = 10) {
  return Math.round(Math.random() * max);
}

export function formatDistanceFromNow(dateStr) {
  return formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about", "")
    .replace("in", "In");
}

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));
