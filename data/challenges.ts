import { getAlphabetById } from './registry';
import { getEntryChar } from './types';
import { seededShuffle } from '../utils/seededRandom';
import { getUnlockedKanji } from '../utils/kanjiUnlock';

export type ChallengeTemplate = {
  id: string;
  alphabetId: string;
  labelKey: string;
  xpReward: number;
  targetCount: number; // nombre de caractères distincts à réussir pour valider
};

export const dailyChallengeTemplates: ChallengeTemplate[] = [
  { id: 'daily-hiragana', alphabetId: 'jpn-hiragana', labelKey: 'challenges.hiragana', xpReward: 50, targetCount: 46 },
  { id: 'daily-katakana', alphabetId: 'jpn-katakana', labelKey: 'challenges.katakana', xpReward: 50, targetCount: 46 },
  { id: 'daily-kanji-30', alphabetId: 'jpn-kanji', labelKey: 'challenges.kanji30', xpReward: 80, targetCount: 30 },
];

// Renvoie les caractères ciblés du jour pour un défi donné (stable sur 24h grâce à la seed).
export function getTodayTargetChars(template: ChallengeTemplate, dateSeed: string, level: number): string[] {
  const alphabet = getAlphabetById(template.alphabetId);
  if (!alphabet) return [];

  const pool = template.alphabetId === 'jpn-kanji' ? getUnlockedKanji(level) : alphabet.entries;
  const shuffled = seededShuffle(pool, `${dateSeed}-${template.id}`);
  return shuffled.slice(0, Math.min(template.targetCount, shuffled.length)).map(getEntryChar);
}
