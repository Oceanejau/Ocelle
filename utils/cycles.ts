export const CYCLE_SIZE = 5;

export function getCycleSlice<T>(entries: T[], cycleStart: number): T[] {
  return entries.slice(cycleStart, cycleStart + CYCLE_SIZE);
}