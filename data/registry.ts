import { AlphabetDefinition, LanguageModule } from './types';
import { jpModule } from './jp/alphabet';
import { krModule } from './kr/alphabet';

// Pour ajouter une langue : créer data/<lang>/alphabet.ts qui exporte un LanguageModule,
// puis l'ajouter ci-dessous. Aucune autre partie de l'app ne bouge.
const languageModules: LanguageModule[] = [jpModule, krModule];

export function getAllAlphabets(): AlphabetDefinition[] {
  return languageModules.flatMap((mod) => mod.alphabets);
}

export function getAlphabetById(id: string): AlphabetDefinition | undefined {
  return getAllAlphabets().find((alphabet) => alphabet.id === id);
}
