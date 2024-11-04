export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function randomInt(max = 10) {
  return Math.round(Math.random() * max);
}
