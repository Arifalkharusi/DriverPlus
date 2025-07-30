import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EarningsBreakdownProps {
  data: {
    uber: { gross: number; fees: number; net: number; trips: number; hours: number };
    bolt: { gross: number; fees: number; net: number; trips: number; hours: number };
  };
}

export function EarningsBreakdown({ data }: EarningsBreakdownProps) {
  const totalGross = data.uber.gross + data.bolt.gross;
  const totalFees = data.uber.fees + data.bolt.fees;
  const totalNet = data.uber.net + data.bolt.net;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Gross Earnings</Text>
        <Text style={styles.value}>£{totalGross.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.feeLabel}>Platform Fees</Text>
        <Text style={styles.feeValue}>-£{totalFees.toFixed(2)}</Text>
      </View>
      <View style={[styles.row, styles.totalRow]}>
        <Text style={styles.totalLabel}>Net Earnings</Text>
        <Text style={styles.totalValue}>£{totalNet.toFixed(2)}</Text>
      </View>
      <View style={styles.percentageRow}>
        <Text style={styles.percentageText}>
          Platform fees: {((totalFees / totalGross) * 100).toFixed(1)}% of gross earnings
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#1f2937',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  feeLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  feeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginTop: 8,
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#10B981',
  },
  percentageRow: {
    marginTop: 8,
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 12,
    color: '#6b7280',
  },
});