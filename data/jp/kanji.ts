import { KanjiEntry } from '../types';

// Échantillon JLPT N5. Pour compléter, il suffit d'ajouter des entrées ici :
// aucune autre partie de l'app n'a besoin d'être modifiée.
export const kanjiEntries: KanjiEntry[] = [
  {
    kanji: '人',
    onyomi: ['jin', 'nin'],
    kunyomi: ['hito'],
    meanings: { en: ['person'], fr: ['personne'], jp: ['ひと'] },
    jlpt: 5,
    strokeCount: 2,
    radicals: ['人'],
    tags: ['n5', 'personnes'],
  },
  {
    kanji: '水',
    onyomi: ['sui'],
    kunyomi: ['mizu'],
    meanings: { en: ['water'], fr: ['eau'], jp: ['みず'] },
    jlpt: 5,
    strokeCount: 4,
    radicals: ['水'],
    tags: ['n5', 'nature'],
  },
  {
    kanji: '日',
    onyomi: ['nichi', 'jitsu'],
    kunyomi: ['hi', 'ka'],
    meanings: { en: ['day', 'sun'], fr: ['jour', 'soleil'], jp: ['ひ'] },
    jlpt: 5,
    strokeCount: 4,
    radicals: ['日'],
    tags: ['n5', 'temps'],
  },
  {
    kanji: '山',
    onyomi: ['san'],
    kunyomi: ['yama'],
    meanings: { en: ['mountain'], fr: ['montagne'], jp: ['やま'] },
    jlpt: 5,
    strokeCount: 3,
    radicals: ['山'],
    tags: ['n5', 'nature'],
  },
];

export function getKanjiByJlpt(level: number): KanjiEntry[] {
  return kanjiEntries.filter((entry) => entry.jlpt === level);
}
