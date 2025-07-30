import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NotificationSettings } from '@/components/NotificationSettings';

export default function NotificationSettingsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <NotificationSettings />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
});