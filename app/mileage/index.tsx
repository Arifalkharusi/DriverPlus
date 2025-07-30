import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { MileageTracker } from '@/components/MileageTracker';

export default function MileageScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <MileageTracker />
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