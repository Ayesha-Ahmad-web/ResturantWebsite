export function formatPKR(amount) {
  const n = Number.isFinite(amount) ? Math.round(amount) : 0;
  return `Rs. ${n.toLocaleString('en-US')}`;
}