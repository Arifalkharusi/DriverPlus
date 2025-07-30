import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User, TrendingUp, Award } from 'lucide-react-native';

interface User {
  name: string;
  email: string;
  phone: string;
  city: string;
  memberSince: string;
  totalEarnings: number;
  tripsCompleted: number;
}

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <User color="#ffffff" size={32} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.phone}>{user.phone}</Text>
          <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <TrendingUp color="#10B981" size={20} />
          <Text style={styles.statValue}>£{user.totalEarnings.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Earnings</Text>
        </View>
        <View style={styles.stat}>
          <Award color="#F59E0B" size={20} />
          <Text style={styles.statValue}>{user.tripsCompleted}</Text>
          <Text style={styles.statLabel}>Trips Completed</Text>
        </View>
      </View>

      <View style={styles.location}>
        <Text style={styles.locationText}>📍 Operating in {user.city}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
    color: '#9ca3af',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  location: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#0369a1',
    fontWeight: '600',
  },
});