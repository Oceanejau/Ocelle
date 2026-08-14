const XP_PER_LEVEL = 100;

export function computeLevel(totalXp: number): number {
  return Math.floor(totalXp / XP_PER_LEVEL) + 1;
}

export function xpIntoCurrentLevel(totalXp: number): number {
  return totalXp % XP_PER_LEVEL;
}

export function xpNeededForNextLevel(): number {
  return XP_PER_LEVEL;
}
