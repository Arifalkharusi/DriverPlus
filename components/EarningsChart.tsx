import React from 'react';
import { View, Text } from 'react-native';

interface EarningsChartProps {
  isDark: boolean;
}

export function EarningsChart({ isDark }: EarningsChartProps) {
  // Mock data for 7-day earnings
  const weekData = [
    { day: 'Mon', amount: 120 },
    { day: 'Tue', amount: 95 },
    { day: 'Wed', amount: 140 },
    { day: 'Thu', amount: 110 },
    { day: 'Fri', amount: 165 },
    { day: 'Sat', amount: 180 },
    { day: 'Sun', amount: 85 },
  ];

  const maxAmount = Math.max(...weekData.map(d => d.amount));

  return (
    <View>
      <View className="flex-row items-end justify-between h-32 mb-4">
        {weekData.map((day, index) => {
          const height = (day.amount / maxAmount) * 100;
          return (
            <View key={index} className="flex-1 items-center">
              <View 
                className="bg-primary-600 rounded-t-sm mx-1"
                style={{ height: `${height}%`, minHeight: 8 }}
              />
            </View>
          );
        })}
      </View>
      
      <View className="flex-row justify-between">
        {weekData.map((day, index) => (
          <View key={index} className="flex-1 items-center">
            <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
              {day.day}
            </Text>
            <Text className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              £{day.amount}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}