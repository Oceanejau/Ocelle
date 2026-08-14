import React, { useState } from 'react';
import { Modal, View, Text, Pressable, Switch, ScrollView, StyleSheet } from 'react-native';
import { useSettingsForm } from '../hooks/useSettingsForm';
import { useI18n } from '../store/useI18n';
import FontSelector from './FontSelector';
import LanguageSelector from './LanguageSelector';
import UnsavedChangesDialog from './UnsavedChangesDialog';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SettingsModal({ visible, onClose }: Props) {
  const { t } = useI18n();
  const { draft, updateDraft, hasUnsavedChanges, saveDraft, resetDraft } = useSettingsForm();
  const [confirmClose, setConfirmClose] = useState(false);

  function handleRequestClose() {
    if (hasUnsavedChanges()) setConfirmClose(true);
    else onClose();
  }

  async function handleSaveAndClose() {
    await saveDraft();
    setConfirmClose(false);
    onClose();
  }

  function handleDiscardAndClose() {
    resetDraft();
    setConfirmClose(false);
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleRequestClose}>
      <Pressable style={styles.overlay} onPress={handleRequestClose}>
        <Pressable style={styles.panel} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>{t('settings.title')}</Text>

          <ScrollView style={styles.scroll}>
            <View style={styles.row}>
              <Text>{t('settings.autoCheck')}</Text>
              <Switch
                value={draft.autoCheck}
                onValueChange={(v) => updateDraft('autoCheck', v)}
              />
            </View>

            <View style={styles.row}>
              <Text>{t('settings.randomMode')}</Text>
              <Switch
                value={draft.randomMode}
                onValueChange={(v) => updateDraft('randomMode', v)}
              />
            </View>

            <FontSelector
              label={t('settings.fontKana')}
              sampleText="あいう"
              value={draft.fontId}
              onChange={(id) => updateDraft('fontId', id)}
            />

            <FontSelector
              label={t('settings.fontLatin')}
              sampleText="AaBb"
              value={draft.fontIdLatin}
              onChange={(id) => updateDraft('fontIdLatin', id)}
            />

            <LanguageSelector
              label={t('settings.appLanguage')}
              value={draft.appLanguage}
              onChange={(lang) => updateDraft('appLanguage', lang)}
            />
          </ScrollView>
        </Pressable>
      </Pressable>

      {confirmClose && (
        <UnsavedChangesDialog
          title={t('settings.unsavedTitle')}
          cancelLabel={t('settings.cancel')}
          discardLabel={t('settings.closeWithoutSaving')}
          saveLabel={t('settings.save')}
          onCancel={() => setConfirmClose(false)}
          onDiscard={handleDiscardAndClose}
          onSave={handleSaveAndClose}
        />
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: { width: 320, maxHeight: '80%', borderRadius: 24, backgroundColor: '#fff', padding: 24 },
  scroll: { maxHeight: 460 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
});
