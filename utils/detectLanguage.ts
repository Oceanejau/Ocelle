import * as Localization from 'expo-localization';
import { AppLanguage } from '../i18n';

const supported: AppLanguage[] = ['fra', 'eng', 'jpn'];

// L'appareil renvoie de l'ISO 639-1 (fr, en, ja...), l'app utilise de l'ISO 639-3.
const iso1ToIso3: Record<string, AppLanguage> = { fra: 'fra', eng: 'eng', ja: 'jpn' };

export function detectDeviceLanguage(): AppLanguage {
  const deviceCode = Localization.getLocales()[0]?.languageCode ?? 'en';
  return iso1ToIso3[deviceCode] ?? 'eng';
}