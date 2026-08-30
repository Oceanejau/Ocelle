import { AlphabetDefinition, LanguageModule } from '../types';
import { hangulEntries } from './hangul';

// Le hanja (caractères chinois utilisés en coréen) suivra ici plus tard,
// avec la même structure que jpn-kanji — pas de données inventées pour l'instant.
const alphabets: AlphabetDefinition[] = [
  { id: 'kor-hangul', labelKey: 'alphabets.korHangul', preview: '가나다', entries: hangulEntries, themeColor: '250, 141, 114' },
];

export const korModule: LanguageModule = {
  id: 'kor',
  labelKey: 'languages.kor',
  preview: '한국어',
  themeColor: '250, 141, 114',
  alphabets,
};