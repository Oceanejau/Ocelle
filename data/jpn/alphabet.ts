import { AlphabetDefinition, LanguageModule } from '../types';
import { hiraganaEntries } from './hiragana';
import { katakanaEntries } from './katakana';
import { kanjiEntries } from './kanji';

const alphabets: AlphabetDefinition[] = [
  { id: 'jpn-hiragana', labelKey: 'alphabets.jpnHiragana', preview: 'あいう', entries: hiraganaEntries, themeColor: '106, 189, 168' },
  { id: 'jpn-katakana', labelKey: 'alphabets.jpnKatakana', preview: 'アイウ', entries: katakanaEntries, themeColor: '181, 0, 0' },
  { id: 'jpn-kanji', labelKey: 'alphabets.jpnKanji', preview: '人水日', entries: kanjiEntries, themeColor: '255, 192, 46' },
];

export const jpnModule: LanguageModule = {
  id: 'jpn',
  labelKey: 'languages.jpn',
  preview: '日本語',
  themeColor: '106, 189, 168',
  alphabets,
};