export function formatNumber(num: string | number, decimals = 0) {
  const number = typeof num === "string" ? parseFloat(num) : num;
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(number);
}

export function formatCurrency(amount: string | number, decimals = 0) {
  const number = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
}
