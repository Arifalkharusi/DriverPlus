import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, Users, Clock } from 'lucide-react-native';

interface PlatformData {
  gross: number;
  fees: number;
  net: number;
  trips: number;
  hours: number;
}

interface PlatformCardProps {
  platform: string;
  data: PlatformData;
  color: string;
  logo: string;
}

export function PlatformCard({ platform, data, color, logo }: PlatformCardProps) {
  const feePercentage = (data.fees / data.gross) * 100;
  const avgPerTrip = data.net / data.trips;
  const hourlyRate = data.net / data.hours;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.platformInfo}>
          <Text style={styles.logo}>{logo}</Text>
          <View>
            <Text style={styles.platformName}>{platform}</Text>
            <Text style={styles.netEarnings}>£{data.net.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.grossEarnings}>
          <Text style={styles.grossLabel}>Gross</Text>
          <Text style={styles.grossAmount}>£{data.gross.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.breakdown}>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Platform Fees</Text>
          <Text style={styles.breakdownValue}>-£{data.fees.toFixed(2)}</Text>
          <Text style={styles.breakdownPercent}>({feePercentage.toFixed(1)}%)</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Users color="#6b7280" size={16} />
          <Text style={styles.statLabel}>Trips</Text>
          <Text style={styles.statValue}>{data.trips}</Text>
        </View>
        <View style={styles.stat}>
          <Clock color="#6b7280" size={16} />
          <Text style={styles.statLabel}>Hours</Text>
          <Text style={styles.statValue}>{data.hours.toFixed(1)}</Text>
        </View>
        <View style={styles.stat}>
          <TrendingUp color="#6b7280" size={16} />
          <Text style={styles.statLabel}>Per Trip</Text>
          <Text style={styles.statValue}>£{avgPerTrip.toFixed(2)}</Text>
        </View>
        <View style={styles.stat}>
          <TrendingUp color="#6b7280" size={16} />
          <Text style={styles.statLabel}>Per Hour</Text>
          <Text style={styles.statValue}>£{hourlyRate.toFixed(2)}</Text>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  platformInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    marginRight: 12,
  },
  platformName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 2,
  },
  netEarnings: {
    fontSize: 24,
    fontWeight: '800',
    color: '#10B981',
  },
  grossEarnings: {
    alignItems: 'flex-end',
  },
  grossLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  grossAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  breakdown: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
    marginRight: 8,
  },
  breakdownPercent: {
    fontSize: 12,
    color: '#9ca3af',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 4,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
  },
});