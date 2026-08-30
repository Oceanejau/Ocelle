import { AlphabetDefinition, LanguageModule } from '../types';
import { hittiteVowelEntries } from './vowels';
import { hittiteConsonantEntries } from './consonants';
import { hittiteNumberEntries } from './numbers';

const hittiteEntries = [...hittiteVowelEntries, ...hittiteConsonantEntries, ...hittiteNumberEntries];

const alphabets: AlphabetDefinition[] = [
  {
    id: 'hit', labelKey: 'alphabets.hit', preview: 'a K 1',
    entries: hittiteEntries, themeColor: '180, 140, 100',
    tutorialKey: 'tutorial.hittite', forcedFontFamily: 'Hittite',
  },
];

export const hitModule: LanguageModule = {
  id: 'hit',
  labelKey: 'languages.hit',
  preview: 'a K 1',
  themeColor: '180, 140, 100',
  alphabets,
};