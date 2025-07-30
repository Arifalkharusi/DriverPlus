import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WeeklyProgressProps {
  targets: {
    earnings: { target: number; current: number };
    hours: { target: number; current: number };
    trips: { target: number; current: number };
  };
}

export function WeeklyProgress({ targets }: WeeklyProgressProps) {
  const overallProgress = Object.values(targets).reduce((sum, target) => {
    return sum + (target.current / target.target);
  }, 0) / Object.keys(targets).length;

  const progressPercentage = Math.min(overallProgress * 100, 100);

  return (
    <View style={styles.container}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>Overall Progress</Text>
        <Text style={styles.progressPercentage}>{progressPercentage.toFixed(0)}%</Text>
      </View>
      
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${progressPercentage}%` }
          ]} 
        />
      </View>

      <View style={styles.quickStats}>
        <View style={styles.quickStat}>
          <Text style={styles.quickStatValue}>
            £{targets.earnings.current.toFixed(0)}
          </Text>
          <Text style={styles.quickStatLabel}>Earned</Text>
        </View>
        <View style={styles.quickStat}>
          <Text style={styles.quickStatValue}>
            {targets.hours.current.toFixed(1)}h
          </Text>
          <Text style={styles.quickStatLabel}>Worked</Text>
        </View>
        <View style={styles.quickStat}>
          <Text style={styles.quickStatValue}>
            {targets.trips.current}
          </Text>
          <Text style={styles.quickStatLabel}>Trips</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2563EB',
  },
  progressBar: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 6,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickStat: {
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2,
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
});