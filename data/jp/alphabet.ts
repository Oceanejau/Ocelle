import { AlphabetDefinition, LanguageModule } from '../types';
import { hiraganaEntries } from './hiragana';
import { katakanaEntries } from './katakana';
import { kanjiEntries } from './kanji';

// C'est CE fichier que la registry globale importe pour connaître
// tous les alphabets disponibles pour une langue donnée.
const alphabets: AlphabetDefinition[] = [
  { id: 'jp-hiragana', labelKey: 'alphabets.jpHiragana', preview: 'あいう', entries: hiraganaEntries, themeColor: '106, 189, 168' },
  { id: 'jp-katakana', labelKey: 'alphabets.jpKatakana', preview: 'アイウ', entries: katakanaEntries, themeColor: '181, 0, 0' },
  { id: 'jp-kanji', labelKey: 'alphabets.jpKanji', preview: '人水日', entries: kanjiEntries, themeColor: '255, 192, 46' },
];

export const jpModule: LanguageModule = { id: 'jp', alphabets };
