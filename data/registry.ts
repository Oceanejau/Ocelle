import { AlphabetDefinition, LanguageModule } from './types';
import { jpnModule } from './jpn/alphabet';
import { korModule } from './kor/alphabet';
import { hitModule } from './hit/alphabet';

export const languageModules: LanguageModule[] = [jpnModule, korModule, hitModule];

export function getAllAlphabets(): AlphabetDefinition[] {
  return languageModules.flatMap((mod) => mod.alphabets);
}

export function getAlphabetById(id: string): AlphabetDefinition | undefined {
  return getAllAlphabets().find((alphabet) => alphabet.id === id);
}

export function getLanguageModuleById(id: string): LanguageModule | undefined {
  return languageModules.find((mod) => mod.id === id);
}