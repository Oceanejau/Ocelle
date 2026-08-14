import { AlphabetDefinition, LanguageModule } from '../types';
import { hangulEntries } from './hangul';

const alphabets: AlphabetDefinition[] = [
  { id: 'kr-hangul', labelKey: 'alphabets.krHangul', preview: '가나다', entries: hangulEntries, themeColor: '250, 141, 114' },
];

export const krModule: LanguageModule = { id: 'kr', alphabets };
