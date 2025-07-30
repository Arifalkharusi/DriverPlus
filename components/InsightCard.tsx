import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InsightCardProps {
  insight: {
    type: string;
    title: string;
    description: string;
    value: string;
    change: string;
    icon: React.ReactNode;
    color: string;
  };
}

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${insight.color}15` }]}>
          {insight.icon}
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{insight.title}</Text>
          <Text style={styles.description}>{insight.description}</Text>
        </View>
      </View>
      
      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color: insight.color }]}>{insight.value}</Text>
        <Text style={styles.change}>{insight.change}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
  },
  change: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
});