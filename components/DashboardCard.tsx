import React from 'react';
import { View, Text } from 'react-native';

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color: string;
  isDark: boolean;
}

export function DashboardCard({ icon, title, value, subtitle, color, isDark }: DashboardCardProps) {
  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-4 items-center mx-2 shadow-sm`}>
      <View className="mb-2">
        {icon}
      </View>
      <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1 text-center`}>
        {title}
      </Text>
      <Text className="text-xl font-bold mb-0.5" style={{ color }}>
        {value}
      </Text>
      <Text className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} text-center`}>
        {subtitle}
      </Text>
    </View>
  );
}