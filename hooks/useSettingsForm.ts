import { useState } from 'react';
import { useSettings, Settings } from '../store/useSettings';

export function useSettingsForm() {
  const { settings, applySettings } = useSettings();
  const [draft, setDraft] = useState<Settings>(settings);

  function updateDraft<K extends keyof Settings>(key: K, value: Settings[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function hasUnsavedChanges(): boolean {
    return JSON.stringify(draft) !== JSON.stringify(settings);
  }

  async function saveDraft() {
    await applySettings(draft);
  }

  function resetDraft() {
    setDraft(settings);
  }

  return { draft, updateDraft, hasUnsavedChanges, saveDraft, resetDraft };
}
