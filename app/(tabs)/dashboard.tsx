import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Clock, Target, Car, Zap, Receipt, Settings, Plus } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { useEarnings } from '@/hooks/useEarnings';
import { useExpenses } from '@/hooks/useExpenses';
import { useTheme } from '@/hooks/useTheme';
import { DashboardCard } from '@/components/DashboardCard';
import { ProgressChart } from '@/components/ProgressChart';
import { EarningsChart } from '@/components/EarningsChart';
import { AddEarningModal } from '@/components/AddEarningModal';
import { AddExpenseModal } from '@/components/AddExpenseModal';
import { formatCurrency, formatDate } from '@/utils/formatters';

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [showEarningModal, setShowEarningModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  
  const { profile } = useAuth();
  const { earnings, getTodayEarnings, getWeeklyEarnings, getHourlyRate, addEarning, refreshEarnings } = useEarnings();
  const { expenses, getTotalExpenses, addExpense, refreshExpenses } = useExpenses();
  const { isDark } = useTheme();

  const todayEarnings = getTodayEarnings();
  const weeklyEarnings = getWeeklyEarnings();
  const weeklyTarget = 800;
  const hoursWorked = 8.5;
  const tripsCompleted = 23;
  const weeklyExpenses = getTotalExpenses('week');

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refreshEarnings(), refreshExpenses()]);
    setRefreshing(false);
  };

  const handleAddEarning = async (earningData: any) => {
    const { error } = await addEarning(earningData);
    if (error) {
      Alert.alert('Error', 'Failed to add earning');
    } else {
      setShowEarningModal(false);
      Alert.alert('Success', 'Earning added successfully');
    }
  };

  const handleAddExpense = async (expenseData: any) => {
    const { error } = await addExpense(expenseData);
    if (error) {
      Alert.alert('Error', 'Failed to add expense');
    } else {
      setShowExpenseModal(false);
      Alert.alert('Success', 'Expense added successfully');
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <LinearGradient
        colors={isDark ? ['#1e293b', '#0f172a'] : ['#2563eb', '#1d4ed8']}
        className="pt-16 px-5 pb-8"
      >
        <View className="flex-row justify-between items-start mb-6">
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold mb-1">
              {getGreeting()}, {profile?.first_name || 'Driver'}!
            </Text>
            <Text className="text-blue-200 text-base">
              {new Date().toLocaleDateString('en-GB', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </View>
          <TouchableOpacity className="bg-white/20 rounded-full p-3">
            <Settings color="#ffffff" size={24} />
          </TouchableOpacity>
        </View>
        
        <View className="items-start">
          <Text className="text-blue-200 text-sm mb-1">Today's Earnings</Text>
          <Text className="text-white text-4xl font-bold">£{todayEarnings.toFixed(2)}</Text>
          <Text className="text-blue-200 text-sm mt-1">
            £{(weeklyTarget - weeklyEarnings).toFixed(2)} to weekly target
          </Text>
        </View>
      </LinearGradient>

      <ScrollView 
        className="flex-1 px-5 -mt-2" 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Quick Actions */}
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity 
            className="flex-1 bg-success-600 rounded-xl p-4 mr-2 flex-row items-center justify-center"
            onPress={() => setShowEarningModal(true)}
          >
            <Plus color="#ffffff" size={20} />
            <Text className="text-white font-semibold ml-2">Add Earning</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 bg-error-600 rounded-xl p-4 ml-2 flex-row items-center justify-center"
            onPress={() => setShowExpenseModal(true)}
          >
            <Plus color="#ffffff" size={20} />
            <Text className="text-white font-semibold ml-2">Add Expense</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View className="flex-row justify-between mb-4">
          <DashboardCard
            icon={<TrendingUp color="#10b981" size={24} />}
            title="Weekly Progress"
            value={`£${weeklyEarnings.toFixed(2)}`}
            subtitle={`${((weeklyEarnings / weeklyTarget) * 100).toFixed(0)}% of £${weeklyTarget}`}
            color="#10b981"
            isDark={isDark}
          />
          <DashboardCard
            icon={<Clock color="#f59e0b" size={24} />}
            title="Hours Today"
            value={`${hoursWorked}h`}
            subtitle="Great pace!"
            color="#f59e0b"
            isDark={isDark}
          />
        </View>

        <View className="flex-row justify-between mb-4">
          <DashboardCard
            icon={<Car color="#8b5cf6" size={24} />}
            title="Trips Today"
            value={tripsCompleted.toString()}
            subtitle="Above average"
            color="#8b5cf6"
            isDark={isDark}
          />
          <DashboardCard
            icon={<Zap color="#ef4444" size={24} />}
            title="Hourly Rate"
            value={`£${getHourlyRate('today').toFixed(2)}`}
            subtitle="Per hour"
            color="#ef4444"
            isDark={isDark}
          />
        </View>

        {/* Recent Earnings */}
        <View className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-5 mb-4 shadow-sm`}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recent Earnings
            </Text>
            <TouchableOpacity onPress={() => setShowEarningModal(true)}>
              <Plus color="#2563eb" size={20} />
            </TouchableOpacity>
          </View>
          
          {earnings.slice(0, 3).map((earning) => (
            <View
              key={earning.id}
              className={`${isDark ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-3 mb-2`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {earning.platform.charAt(0).toUpperCase() + earning.platform.slice(1)}
                  </Text>
                  <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {formatDate(earning.date)} • {earning.trips_count} trips
                  </Text>
                </View>
                <Text className="text-sm font-bold text-success-600">
                  {formatCurrency(earning.net_amount)}
                </Text>
              </View>
            </View>
          ))}
          
          {earnings.length === 0 && (
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center py-4`}>
              No earnings recorded yet
            </Text>
          )}
        </View>

        {/* Recent Expenses */}
        <View className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-5 mb-4 shadow-sm`}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recent Expenses
            </Text>
            <TouchableOpacity onPress={() => setShowExpenseModal(true)}>
              <Plus color="#ef4444" size={20} />
            </TouchableOpacity>
          </View>
          
          {expenses.slice(0, 3).map((expense) => (
            <View
              key={expense.id}
              className={`${isDark ? 'bg-slate-700' : 'bg-gray-50'} rounded-xl p-3 mb-2`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {expense.description}
                  </Text>
                  <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {expense.category} • {formatDate(expense.date)}
                  </Text>
                </View>
                <Text className="text-sm font-bold text-error-600">
                  -{formatCurrency(expense.amount)}
                </Text>
              </View>
            </View>
          ))}
          
          {expenses.length === 0 && (
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center py-4`}>
              No expenses recorded yet
            </Text>
          )}
        </View>

        {/* Weekly Progress Chart */}
        <View className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-5 mb-4 shadow-sm`}>
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Weekly Target Progress
          </Text>
          <ProgressChart 
            progress={weeklyEarnings / weeklyTarget} 
            target={weeklyTarget} 
            current={weeklyEarnings}
            isDark={isDark}
          />
        </View>

        {/* Earnings Trend */}
        <View className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-5 mb-4 shadow-sm`}>
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            7-Day Earnings Trend
          </Text>
          <EarningsChart isDark={isDark} />
        </View>

        {/* Today's Insights */}
        <View className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-5 mb-4 shadow-sm`}>
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Today's Opportunities
          </Text>
          
          <View className="flex-row items-center mb-3">
            <View className={`w-10 h-10 rounded-full ${isDark ? 'bg-slate-700' : 'bg-gray-100'} items-center justify-center mr-3`}>
              <Zap color="#f59e0b" size={20} />
            </View>
            <View className="flex-1">
              <Text className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-0.5`}>
                Peak demand expected at 17:00-19:00
              </Text>
              <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Based on historical data
              </Text>
            </View>
          </View>
          
          <View className="flex-row items-center">
            <View className={`w-10 h-10 rounded-full ${isDark ? 'bg-slate-700' : 'bg-gray-100'} items-center justify-center mr-3`}>
              <TrendingUp color="#10b981" size={20} />
            </View>
            <View className="flex-1">
              <Text className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-0.5`}>
                Light rain predicted - 15% demand increase
              </Text>
              <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Weather forecast
              </Text>
            </View>
          </View>
        </View>

        {/* Weekly Summary */}
        <View className={`${isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700' : 'bg-gradient-to-r from-blue-50 to-indigo-50'} rounded-2xl p-5 mb-6`}>
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
            Weekly Summary
          </Text>
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-2xl font-bold text-success-600">
                £{(weeklyEarnings - weeklyExpenses).toFixed(2)}
              </Text>
              <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Net Profit This Week
              </Text>
            </View>
            <View className="items-end">
              <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {((weeklyEarnings / weeklyTarget) * 100).toFixed(0)}%
              </Text>
              <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Target Progress
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <AddEarningModal
        visible={showEarningModal}
        onClose={() => setShowEarningModal(false)}
        onAdd={handleAddEarning}
        isDark={isDark}
      />

      <AddExpenseModal
        visible={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        onAdd={handleAddExpense}
        isDark={isDark}
      />
    </View>
  );
}