import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TargetCardProps {
  title: string;
  target: number;
  current: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
  fullWidth?: boolean;
}

export function TargetCard({ title, target, current, unit, icon, color, fullWidth }: TargetCardProps) {
  const progress = (current / target) * 100;
  const remaining = target - current;

  return (
    <View style={[styles.card, fullWidth && styles.fullWidth]}>
      <View style={styles.header}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.progressSection}>
        <View style={styles.amounts}>
          <Text style={[styles.current, { color }]}>
            {unit}{current.toFixed(current % 1 === 0 ? 0 : 1)}
          </Text>
          <Text style={styles.target}>/ {unit}{target}</Text>
        </View>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${Math.min(progress, 100)}%`, backgroundColor: color }
            ]} 
          />
        </View>
        
        <View style={styles.stats}>
          <Text style={styles.percentage}>{progress.toFixed(0)}%</Text>
          <Text style={styles.remaining}>
            {unit}{remaining.toFixed(remaining % 1 === 0 ? 0 : 1)} remaining
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  fullWidth: {
    marginHorizontal: 0,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: 8,
  },
  progressSection: {
    flex: 1,
  },
  amounts: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  current: {
    fontSize: 20,
    fontWeight: '800',
  },
  target: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1f2937',
  },
  remaining: {
    fontSize: 11,
    color: '#6b7280',
  },
});