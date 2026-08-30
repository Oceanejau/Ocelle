import { LetterEntry } from '../types';

// Règle du clavier de la police Hittite.ttf : Ca -> consonne en minuscule,
// Ci -> consonne en MAJUSCULE. 'v' et 'w' sont possiblement deux signes
// homophones pour la même valeur "wa" plutôt que deux phonèmes distincts —
// à vérifier avec une source hittitologique si besoin, gardé tel quel pour l'instant.
export const hittiteConsonantEntries: LetterEntry[] = [
  { char: 'b', romaji: 'ba' }, { char: 'd', romaji: 'da' }, { char: 'g', romaji: 'ga' },
  { char: 'h', romaji: 'ha' }, { char: 'j', romaji: 'ja' }, { char: 'k', romaji: 'ka' },
  { char: 'l', romaji: 'la' }, { char: 'n', romaji: 'na' }, { char: 'p', romaji: 'pa' },
  { char: 'r', romaji: 'ra' }, { char: 's', romaji: 'sa' }, { char: 't', romaji: 'ta' },
  { char: 'v', romaji: 'va' }, { char: 'w', romaji: 'wa' }, { char: 'z', romaji: 'za' },
  { char: 'B', romaji: 'bi' }, { char: 'D', romaji: 'di' }, { char: 'H', romaji: 'hi' },
  { char: 'J', romaji: 'ji' }, { char: 'K', romaji: 'ki' }, { char: 'L', romaji: 'li' },
  { char: 'M', romaji: 'mi' }, { char: 'R', romaji: 'ri' }, { char: 'S', romaji: 'si' },
  { char: 'T', romaji: 'ti' }, { char: 'Z', romaji: 'zi' },
];