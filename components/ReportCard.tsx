import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ReportCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  subtitle: string;
}

export function ReportCard({ title, value, icon, color, subtitle }: ReportCardProps) {
  return (
    <View style={[styles.card, { flex: 1, marginHorizontal: 8 }]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
          {icon}
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  title: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    color: '#9ca3af',
  },
});