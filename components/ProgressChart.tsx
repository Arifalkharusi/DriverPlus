import React from 'react';
import { View, Text } from 'react-native';
import { formatCurrency } from '@/utils/formatters';

interface ProgressChartProps {
  progress: number;
  target: number;
  current: number;
  isDark: boolean;
}

export function ProgressChart({ progress, target, current, isDark }: ProgressChartProps) {
  const percentage = Math.min(progress * 100, 100);
  
  return (
    <View>
      <View className="flex-row justify-between items-center mb-3">
        <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {formatCurrency(current)}
        </Text>
        <Text className="text-lg font-semibold text-success-600">
          {percentage.toFixed(0)}%
        </Text>
      </View>
      
      <View className={`w-full h-3 ${isDark ? 'bg-slate-700' : 'bg-gray-200'} rounded-full mb-2`}>
        <View 
          className="h-3 bg-success-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </View>
      
      <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Target: {formatCurrency(target)} • Remaining: {formatCurrency(Math.max(target - current, 0))}
      </Text>
    </View>
  );
}