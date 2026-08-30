import { LetterEntry } from '../types';

// Le 0 existe dans la police mais n'est pas un vrai signe hittite (cf. doc d'origine).
export const hittiteNumberEntries: LetterEntry[] = Array.from({ length: 9 }, (_, i) => ({
  char: String(i + 1),
  romaji: String(i + 1),
}));