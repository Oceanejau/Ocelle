import * as Localization from 'expo-localization';
import { AppLanguage } from '../i18n';

const supported: AppLanguage[] = ['fr', 'en', 'jp'];

export function detectDeviceLanguage(): AppLanguage {
  const deviceCode = Localization.getLocales()[0]?.languageCode ?? 'en';
  const mapped = deviceCode === 'ja' ? 'jp' : (deviceCode as AppLanguage);
  return supported.includes(mapped) ? mapped : 'en';
}
