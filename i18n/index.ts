import fra from './fra.json';
import eng from './eng.json';
import jpn from './jpn.json';

export type AppLanguage = 'fra' | 'eng' | 'jpn';

const dictionaries: Record<AppLanguage, any> = { fra, eng, jpn };

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
