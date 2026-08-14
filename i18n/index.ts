import fr from './fr.json';
import en from './en.json';
import jp from './jp.json';

export type AppLanguage = 'fr' | 'en' | 'jp';

const dictionaries: Record<AppLanguage, any> = { fr, en, jp };

function resolveKey(dict: any, key: string): string | undefined {
  return key.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), dict);
}

export function translate(
  lang: AppLanguage,
  key: string,
  params?: Record<string, string>
): string {
  const raw = resolveKey(dictionaries[lang], key) ?? key;
  if (!params) return raw;
  return Object.entries(params).reduce(
    (text, [param, value]) => text.replace(`{{${param}}}`, value),
    raw
  );
}
