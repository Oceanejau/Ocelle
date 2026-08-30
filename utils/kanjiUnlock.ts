import { kanjiEntries } from '../data/jpn/kanji';

const KANJI_PER_TIER = 50;

export function getUnlockedKanjiCount(level: number): number {
  const unlocked = level * KANJI_PER_TIER;
  return Math.min(kanjiEntries.length, unlocked);
}

export function getUnlockedKanji(level: number) {
  return kanjiEntries.slice(0, getUnlockedKanjiCount(level));
}
