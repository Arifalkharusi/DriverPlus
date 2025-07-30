import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Bell, TrendingUp, Target, Plane, Brain, Clock } from 'lucide-react-native';

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    earnings: true,
    targets: true,
    transport: false,
    insights: true,
    dailyReminder: false,
    weeklyReport: true,
  });

  const updateNotification = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const notificationTypes = [
    {
      key: 'earnings',
      title: 'Earnings Updates',
      description: 'Get notified when new earnings are synced',
      icon: <TrendingUp color="#10B981" size={20} />,
    },
    {
      key: 'targets',
      title: 'Target Progress',
      description: 'Alerts when you reach target milestones',
      icon: <Target color="#2563EB" size={20} />,
    },
    {
      key: 'transport',
      title: 'Transport Alerts',
      description: 'High-volume arrival notifications',
      icon: <Plane color="#F59E0B" size={20} />,
    },
    {
      key: 'insights',
      title: 'AI Recommendations',
      description: 'Daily driving recommendations and tips',
      icon: <Brain color="#8B5CF6" size={20} />,
    },
    {
      key: 'dailyReminder',
      title: 'Daily Check-in',
      description: 'Reminder to log expenses and mileage',
      icon: <Clock color="#6b7280" size={20} />,
    },
    {
      key: 'weeklyReport',
      title: 'Weekly Summary',
      description: 'Weekly performance and earnings report',
      icon: <Bell color="#EF4444" size={20} />,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Bell color="#2563EB" size={24} />
        <Text style={styles.title}>Notification Preferences</Text>
      </View>

      <Text style={styles.subtitle}>
        Choose which notifications you'd like to receive to stay informed about your driving business
      </Text>

      <View style={styles.notificationsList}>
        {notificationTypes.map((notification) => (
          <View key={notification.key} style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <View style={styles.notificationIcon}>
                {notification.icon}
              </View>
              <View style={styles.notificationText}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationDescription}>{notification.description}</Text>
              </View>
            </View>
            <Switch
              value={notifications[notification.key as keyof typeof notifications]}
              onValueChange={(value) => updateNotification(notification.key, value)}
              trackColor={{ false: '#e5e7eb', true: '#bfdbfe' }}
              thumbColor={notifications[notification.key as keyof typeof notifications] ? '#2563EB' : '#9ca3af'}
            />
          </View>
        ))}
      </View>

      <View style={styles.quietHours}>
        <Text style={styles.quietHoursTitle}>Quiet Hours</Text>
        <Text style={styles.quietHoursText}>
          Notifications will be silenced between 22:00 and 07:00 to respect your rest time
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
    margin: 20,
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
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
    lineHeight: 20,
  },
  notificationsList: {
    marginBottom: 24,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  quietHours: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
  },
  quietHoursTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0369a1',
    marginBottom: 4,
  },
  quietHoursText: {
    fontSize: 14,
    color: '#0369a1',
    lineHeight: 20,
  },
});