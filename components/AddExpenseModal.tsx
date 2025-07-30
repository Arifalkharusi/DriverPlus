import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, ScrollView } from 'react-native';
import { X, DollarSign, FileText, Tag } from 'lucide-react-native';

interface AddExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (expense: any) => void;
  isDark: boolean;
}

const expenseCategories = [
  'Fuel',
  'Car Maintenance',
  'Insurance',
  'Parking',
  'Tolls',
  'Car Wash',
  'Phone Bill',
  'Other',
];

export function AddExpenseModal({ visible, onClose, onAdd, isDark }: AddExpenseModalProps) {
  const [formData, setFormData] = useState({
    category: 'Fuel',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = () => {
    if (!formData.amount || !formData.description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    onAdd({
      category: formData.category,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date,
    });

    // Reset form
    setFormData({
      category: 'Fuel',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/50 justify-end">
        <View className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-t-3xl p-6 max-h-[80%]`}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Add Expense
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X color={isDark ? '#9ca3af' : '#6b7280'} size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Category Selection */}
            <View className="mb-4">
              <Text className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Category
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row">
                  {expenseCategories.map((category) => (
                    <TouchableOpacity
                      key={category}
                      className={`py-2 px-4 rounded-full mr-2 ${
                        formData.category === category
                          ? 'bg-primary-600'
                          : `${isDark ? 'bg-slate-700' : 'bg-gray-100'}`
                      }`}
                      onPress={() => setFormData(prev => ({ ...prev, category }))}
                    >
                      <Text className={`text-sm font-semibold ${
                        formData.category === category 
                          ? 'text-white' 
                          : (isDark ? 'text-gray-300' : 'text-gray-700')
                      }`}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Form Fields */}
            <View className="space-y-4">
              <View>
                <Text className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Amount (£)
                </Text>
                <View className={`flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 border`}>
                  <DollarSign color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
                  <TextInput
                    className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    placeholder="0.00"
                    placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                    value={formData.amount}
                    onChangeText={(value) => setFormData(prev => ({ ...prev, amount: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View>
                <Text className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Description
                </Text>
                <View className={`flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 border`}>
                  <FileText color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
                  <TextInput
                    className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    placeholder="Enter description"
                    placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                    value={formData.description}
                    onChangeText={(value) => setFormData(prev => ({ ...prev, description: value }))}
                    multiline
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity 
              className="bg-error-600 rounded-xl py-4 items-center mt-6"
              onPress={handleSubmit}
            >
              <Text className="text-lg font-bold text-white">Add Expense</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}