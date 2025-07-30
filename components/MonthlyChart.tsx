import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function MonthlyChart() {
  const monthlyData = [
    { month: 'Sep', earnings: 2100, expenses: 420 },
    { month: 'Oct', earnings: 2350, expenses: 465 },
    { month: 'Nov', earnings: 2280, expenses: 445 },
    { month: 'Dec', earnings: 2456, expenses: 487 },
  ];

  const maxValue = Math.max(...monthlyData.map(d => d.earnings));

  return (
    <View style={styles.container}>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendText}>Earnings</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
          <Text style={styles.legendText}>Expenses</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        {monthlyData.map((month, index) => {
          const earningsHeight = (month.earnings / maxValue) * 120;
          const expensesHeight = (month.expenses / maxValue) * 120;
          
          return (
            <View key={month.month} style={styles.monthContainer}>
              <View style={styles.barsContainer}>
                <View style={styles.barGroup}>
                  <View 
                    style={[
                      styles.bar, 
                      { height: earningsHeight, backgroundColor: '#10B981' }
                    ]} 
                  />
                  <View 
                    style={[
                      styles.bar, 
                      { height: expensesHeight, backgroundColor: '#EF4444' }
                    ]} 
                  />
                </View>
              </View>
              <Text style={styles.monthLabel}>{month.month}</Text>
              <Text style={styles.earningsLabel}>£{month.earnings}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Average Monthly Profit: £{(monthlyData.reduce((sum, m) => sum + (m.earnings - m.expenses), 0) / monthlyData.length).toFixed(0)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#6b7280',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    marginBottom: 16,
  },
  monthContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barsContainer: {
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  barGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bar: {
    width: 16,
    borderRadius: 2,
    marginHorizontal: 2,
    minHeight: 4,
  },
  monthLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  earningsLabel: {
    fontSize: 11,
    color: '#1f2937',
    fontWeight: '600',
  },
  summary: {
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  summaryText: {
    fontSize: 14,
    color: '#6b7280',
  },
});