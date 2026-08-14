// Types génériques utilisés par TOUS les alphabets, quel que soit le système d'écriture.
// Ajouter une langue ne nécessite jamais de modifier ce fichier.

export type LetterEntry = {
  char: string;
  romaji: string;
};

export type KanjiEntry = {
  kanji: string;
  onyomi: string[];
  kunyomi: string[];
  meanings: {
    en: string[];
    fr: string[];
    jp: string[];
  };
  jlpt: number;
  strokeCount: number;
  radicals: string[];
  tags: string[];
};

// Union : une "entrée" de quiz peut être une simple lettre OU un kanji complet.
export type QuizEntry = LetterEntry | KanjiEntry;

export type AlphabetId = string;

export type AlphabetDefinition = {
  id: AlphabetId;
  labelKey: string; // clé i18n, jamais de texte en dur
  preview: string; // ex: "あいう"
  entries: QuizEntry[];
  themeColor: string; // "r, g, b" — utilisée pour le glow/reflet au survol
};

export type LanguageModule = {
  id: string; // "jp", "kr", "cn"...
  alphabets: AlphabetDefinition[];
};

export type AnswerRecord = {
  alphabetId: AlphabetId;
  char: string;
  correct: boolean;
  attempts: number;
  responseTimeMs: number;
  timestamp: number;
};

export function isKanjiEntry(entry: QuizEntry): entry is KanjiEntry {
  return (entry as KanjiEntry).kanji !== undefined;
}

export function getEntryChar(entry: QuizEntry): string {
  return isKanjiEntry(entry) ? entry.kanji : entry.char;
}

export function getEntryAnswer(entry: QuizEntry): string {
  return isKanjiEntry(entry) ? entry.kunyomi[0] ?? entry.onyomi[0] ?? '' : entry.romaji;
}
