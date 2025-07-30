import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, TrendingUp, Clock } from 'lucide-react-native';

export function WeeklyPlanCard() {
  const weekPlan = [
    { day: 'Monday', hours: '8-16', focus: 'Airport runs', earnings: '£140-160' },
    { day: 'Tuesday', hours: '12-20', focus: 'City center', earnings: '£160-180' },
    { day: 'Wednesday', hours: '7-15', focus: 'Business district', earnings: '£120-140' },
    { day: 'Thursday', hours: '14-22', focus: 'Mixed routes', earnings: '£170-190' },
    { day: 'Friday', hours: '16-24', focus: 'Evening rush', earnings: '£180-200' },
    { day: 'Saturday', hours: 'REST', focus: 'Recovery day', earnings: '£0' },
    { day: 'Sunday', hours: '10-18', focus: 'Leisure routes', earnings: '£100-120' },
  ];

  const totalEarnings = '£770-890';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Calendar color="#2563EB" size={24} />
        <Text style={styles.title}>Optimized Weekly Plan</Text>
      </View>
      
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <TrendingUp color="#10B981" size={20} />
          <Text style={styles.summaryText}>{totalEarnings} projected</Text>
        </View>
        <View style={styles.summaryItem}>
          <Clock color="#F59E0B" size={20} />
          <Text style={styles.summaryText}>48 hours optimal</Text>
        </View>
      </View>

      <View style={styles.planContainer}>
        {weekPlan.map((day, index) => (
          <View key={index} style={styles.dayPlan}>
            <View style={styles.dayInfo}>
              <Text style={styles.dayName}>{day.day}</Text>
              <Text style={styles.dayHours}>{day.hours}</Text>
            </View>
            <View style={styles.dayDetails}>
              <Text style={styles.dayFocus}>{day.focus}</Text>
              <Text style={styles.dayEarnings}>{day.earnings}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.note}>
        <Text style={styles.noteText}>
          💡 Plan based on your historical performance and market patterns
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginLeft: 8,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 6,
  },
  planContainer: {
    marginBottom: 16,
  },
  dayPlan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dayInfo: {
    flex: 1,
  },
  dayName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  dayHours: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  dayDetails: {
    flex: 2,
    alignItems: 'flex-end',
  },
  dayFocus: {
    fontSize: 12,
    color: '#6b7280',
  },
  dayEarnings: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
    marginTop: 2,
  },
  note: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 12,
  },
  noteText: {
    fontSize: 12,
    color: '#0369a1',
    textAlign: 'center',
  },
});