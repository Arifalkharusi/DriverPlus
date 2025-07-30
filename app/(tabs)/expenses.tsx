import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Receipt, Trash2 } from 'lucide-react-native';
import { useExpenses } from '@/hooks/useExpenses';
import { useTheme } from '@/hooks/useTheme';
import { AddExpenseModal } from '@/components/AddExpenseModal';
import { formatCurrency, formatDate } from '@/utils/formatters';

export default function ExpensesScreen() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const { expenses, loading, addExpense, getTotalExpenses, refreshExpenses } = useExpenses();
  const { isDark } = useTheme();

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshExpenses();
    setRefreshing(false);
  };

  const handleAddExpense = async (expenseData: any) => {
    const { error } = await addExpense(expenseData);
    if (error) {
      Alert.alert('Error', 'Failed to add expense');
    } else {
      setShowAddModal(false);
      Alert.alert('Success', 'Expense added successfully');
    }
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <LinearGradient
        colors={isDark ? ['#1e293b', '#0f172a'] : ['#ef4444', '#dc2626']}
        className="pt-16 px-5 pb-6"
      >
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-white text-3xl font-bold">Expenses</Text>
          <TouchableOpacity 
            className="bg-white/20 rounded-full p-3"
            onPress={() => setShowAddModal(true)}
          >
            <Plus color="#ffffff" size={24} />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between">
          <View className="flex-1 mr-2">
            <Text className="text-red-200 text-sm mb-1">Today</Text>
            <Text className="text-white text-xl font-bold">{formatCurrency(getTotalExpenses('today'))}</Text>
          </View>
          <View className="flex-1 mx-2">
            <Text className="text-red-200 text-sm mb-1">This Week</Text>
            <Text className="text-white text-xl font-bold">{formatCurrency(getTotalExpenses('week'))}</Text>
          </View>
          <View className="flex-1 ml-2">
            <Text className="text-red-200 text-sm mb-1">This Month</Text>
            <Text className="text-white text-xl font-bold">{formatCurrency(getTotalExpenses('month'))}</Text>
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
        <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 mt-4`}>
          Recent Expenses
        </Text>

        {expenses.map((expense) => (
          <View 
            key={expense.id}
            className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-xl p-4 mb-3 shadow-sm`}
          >
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                  {expense.description}
                </Text>
                <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                  {expense.category}
                </Text>
                <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {formatDate(expense.date)}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-lg font-bold text-error-600">
                  -{formatCurrency(expense.amount)}
                </Text>
                <TouchableOpacity className="mt-2 p-1">
                  <Trash2 color={isDark ? '#64748b' : '#9ca3af'} size={16} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {expenses.length === 0 && !loading && (
          <View className="items-center py-12">
            <Receipt color={isDark ? '#64748b' : '#9ca3af'} size={48} />
            <Text className={`text-lg font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-4 mb-2`}>
              No expenses recorded yet
            </Text>
            <Text className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'} text-center mb-6`}>
              Track your business expenses for better financial insights
            </Text>
            <TouchableOpacity 
              className="bg-error-600 rounded-xl px-6 py-3"
              onPress={() => setShowAddModal(true)}
            >
              <Text className="text-white font-semibold">Add First Expense</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <AddExpenseModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddExpense}
        isDark={isDark}
      />
    </View>
  );
}