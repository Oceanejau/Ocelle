import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useCloudSync } from '../store/useCloudSync';
import { useI18n } from '../store/useI18n';

export default function CloudSyncSection() {
  const { t } = useI18n();
  const { connected, email, lastSyncedAt, status, connect, disconnect, syncNow } = useCloudSync();

  return (
    <View style={styles.block}>
      <Text style={styles.label}>{t('settings.cloudSync')}</Text>

      {connected ? (
        <View style={styles.card}>
          <Text style={styles.line}>Email : {email}</Text>
          <Text style={styles.line}>
            {t('settings.syncStatus')} : {status === 'syncing' ? t('settings.syncing') : t('settings.synced')}
          </Text>
          {lastSyncedAt && (
            <Text style={styles.line}>
              {t('settings.lastSync')} : {new Date(lastSyncedAt).toLocaleString()}
            </Text>
          )}
          <View style={styles.row}>
            <Pressable style={styles.buttonSecondary} onPress={syncNow}>
              <Text style={styles.buttonSecondaryText}>{t('settings.syncNow')}</Text>
            </Pressable>
            <Pressable style={styles.buttonSecondary} onPress={disconnect}>
              <Text style={styles.buttonSecondaryText}>{t('settings.disconnect')}</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Pressable style={styles.button} onPress={connect}>
          <Text style={styles.buttonText}>{t('settings.connectDrive')}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: { marginBottom: 20 },
  label: { fontSize: 13, color: '#777', marginBottom: 6 },
  card: { borderRadius: 16, backgroundColor: '#f4f4f6', padding: 14 },
  line: { fontSize: 12, color: '#555', marginBottom: 4 },
  row: { flexDirection: 'row', gap: 8, marginTop: 8 },
  button: { borderRadius: 14, backgroundColor: '#111', paddingVertical: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  buttonSecondary: { borderRadius: 12, backgroundColor: '#eee', paddingVertical: 8, paddingHorizontal: 12 },
  buttonSecondaryText: { fontSize: 12, color: '#333' },
});