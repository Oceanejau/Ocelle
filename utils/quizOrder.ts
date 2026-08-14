export function pickNextIndex(currentIndex: number, total: number, random: boolean): number {
  if (!random) return (currentIndex + 1) % total;
  if (total <= 1) return 0;

  let next = currentIndex;
  while (next === currentIndex) {
    next = Math.floor(Math.random() * total);
  }
  return next;
}
