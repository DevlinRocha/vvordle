export function getDayOffset() {
  const offsetFromDate = new Date(2021, 5, 19);
  const msOffset = Date.now() - Number(offsetFromDate);
  return Math.floor(msOffset / 1000 / 60 / 60 / 24);
}
