import { useSettings } from './useSettings';
import { translate } from '../i18n';

export function useI18n() {
  const appLanguage = useSettings((state) => state.settings.appLanguage);

  function t(key: string, params?: Record<string, string>): string {
    return translate(appLanguage, key, params);
  }

  return { t, appLanguage };
}
