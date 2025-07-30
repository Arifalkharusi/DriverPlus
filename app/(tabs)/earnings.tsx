import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, TrendingUp, Calendar, DollarSign } from 'lucide-react-native';
import { useEarnings } from '@/hooks/useEarnings';
import { useTheme } from '@/hooks/useTheme';
import { AddEarningModal } from '@/components/AddEarningModal';
import { formatCurrency, formatDate } from '@/utils/formatters';

export default function EarningsScreen() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    earnings,
    loading,
    addEarning,
    getTodayEarnings,
    getWeeklyEarnings,
    getMonthlyEarnings,
    refreshEarnings,
  } = useEarnings();
  const { isDark } = useTheme();

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshEarnings();
    setRefreshing(false);
  };

  const handleAddEarning = async (earningData: any) => {
    const { error } = await addEarning(earningData);
    if (error) {
      Alert.alert('Error', 'Failed to add earning');
    } else {
      setShowAddModal(false);
      Alert.alert('Success', 'Earning added successfully');
    }
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <LinearGradient
        colors={isDark ? ['#1e293b', '#0f172a'] : ['#2563eb', '#1d4ed8']}
        className="px-5 pt-16 pb-6"
      >
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-3xl font-bold text-white">Earnings</Text>
          <TouchableOpacity
            className="p-3 rounded-full bg-white/20"
            onPress={() => setShowAddModal(true)}
          >
            <Plus color="#ffffff" size={24} />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between">
          <View className="flex-1 mr-2">
            <Text className="mb-1 text-sm text-blue-200">Today</Text>
            <Text className="text-xl font-bold text-white">
              {formatCurrency(getTodayEarnings())}
            </Text>
          </View>
          <View className="flex-1 mx-2">
            <Text className="mb-1 text-sm text-blue-200">This Week</Text>
            <Text className="text-xl font-bold text-white">
              {formatCurrency(getWeeklyEarnings())}
            </Text>
          </View>
          <View className="flex-1 ml-2">
            <Text className="mb-1 text-sm text-blue-200">This Month</Text>
            <Text className="text-xl font-bold text-white">
              {formatCurrency(getMonthlyEarnings())}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1 px-5 -mt-2"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text
          className={`text-lg font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          } mb-4 mt-4`}
        >
          Recent Earnings
        </Text>

        {earnings.map((earning) => (
          <View
            key={earning.id}
            className={`${
              isDark ? 'bg-slate-800' : 'bg-white'
            } rounded-xl p-4 mb-3 shadow-sm`}
          >
            <View className="flex-row items-start justify-between mb-2">
              <View className="flex-1">
                <Text
                  className={`text-base font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  } mb-1`}
                >
                  {earning.platform.charAt(0).toUpperCase() +
                    earning.platform.slice(1)}
                </Text>
                <Text
                  className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {formatDate(earning.date)}
                </Text>
              </View>
              <Text className="text-lg font-bold text-success-600">
                {formatCurrency(earning.net_amount)}
              </Text>
            </View>

            <View className="flex-row justify-between pt-3 mt-3 border-t border-gray-200 dark:border-slate-700">
              <View className="items-center">
                <Text
                  className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Trips
                </Text>
                <Text
                  className={`text-sm font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {earning.trips_count}
                </Text>
              </View>
              <View className="items-center">
                <Text
                  className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Hours
                </Text>
                <Text
                  className={`text-sm font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {earning.hours_worked}h
                </Text>
              </View>
              <View className="items-center">
                <Text
                  className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Gross
                </Text>
                <Text
                  className={`text-sm font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {formatCurrency(earning.gross_amount)}
                </Text>
              </View>
              <View className="items-center">
                <Text
                  className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Fees
                </Text>
                <Text
                  className={`text-sm font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {formatCurrency(earning.platform_fees)}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {earnings.length === 0 && !loading && (
          <View className="items-center py-12">
            <DollarSign color={isDark ? '#64748b' : '#9ca3af'} size={48} />
            <Text
              className={`text-lg font-semibold ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              } mt-4 mb-2`}
            >
              No earnings recorded yet
            </Text>
            <Text
              className={`text-sm ${
                isDark ? 'text-gray-500' : 'text-gray-500'
              } text-center mb-6`}
            >
              Start tracking your daily earnings to see insights and progress
            </Text>
            <TouchableOpacity
              className="px-6 py-3 bg-primary-600 rounded-xl"
              onPress={() => setShowAddModal(true)}
            >
              <Text className="font-semibold text-white">
                Add First Earning
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <AddEarningModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddEarning}
        isDark={isDark}
      />
    </View>
  );
}
