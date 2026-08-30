export type LetterEntry = {
  char: string;
  romaji: string;
};

export type KanjiEntry = {
  kanji: string;
  onyomi: string[];
  kunyomi: string[];
  meanings: { eng: string[]; fra: string[]; jpn: string[] };
  jlpt: number;
  strokeCount: number;
  radicals: string[];
  tags: string[];
};

export type QuizEntry = LetterEntry | KanjiEntry;
export type AlphabetId = string;

export type AlphabetDefinition = {
  id: AlphabetId;
  labelKey: string;
  preview: string;
  entries: QuizEntry[];
  themeColor: string;
  tutorialKey?: string;
  forcedFontFamily?: string; // force une police précise (ex: "Hittite"), ignore le choix utilisateur
};

export type LanguageModule = {
  id: string;
  labelKey: string;
  preview: string;
  themeColor: string;
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