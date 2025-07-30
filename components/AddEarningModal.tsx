import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { X, DollarSign, Clock, Car } from 'lucide-react-native';

interface AddEarningModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (earning: any) => void;
  isDark: boolean;
}

export function AddEarningModal({ visible, onClose, onAdd, isDark }: AddEarningModalProps) {
  const [formData, setFormData] = useState({
    platform: 'uber',
    grossAmount: '',
    platformFees: '',
    tripsCount: '',
    hoursWorked: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = () => {
    if (!formData.grossAmount || !formData.platformFees || !formData.tripsCount || !formData.hoursWorked) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const grossAmount = parseFloat(formData.grossAmount);
    const platformFees = parseFloat(formData.platformFees);
    const netAmount = grossAmount - platformFees;

    onAdd({
      platform: formData.platform,
      date: formData.date,
      gross_amount: grossAmount,
      platform_fees: platformFees,
      net_amount: netAmount,
      trips_count: parseInt(formData.tripsCount),
      hours_worked: parseFloat(formData.hoursWorked),
    });

    // Reset form
    setFormData({
      platform: 'uber',
      grossAmount: '',
      platformFees: '',
      tripsCount: '',
      hoursWorked: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/50 justify-end">
        <View className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-t-3xl p-6 max-h-[80%]`}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Add Earning
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X color={isDark ? '#9ca3af' : '#6b7280'} size={24} />
            </TouchableOpacity>
          </View>

          {/* Platform Selection */}
          <View className="mb-4">
            <Text className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Platform
            </Text>
            <View className="flex-row">
              <TouchableOpacity
                className={`flex-1 py-3 px-4 rounded-l-xl border ${
                  formData.platform === 'uber'
                    ? 'bg-primary-600 border-primary-600'
                    : `${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'}`
                }`}
                onPress={() => setFormData(prev => ({ ...prev, platform: 'uber' }))}
              >
                <Text className={`text-center font-semibold ${
                  formData.platform === 'uber' ? 'text-white' : (isDark ? 'text-gray-300' : 'text-gray-700')
                }`}>
                  Uber
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-3 px-4 rounded-r-xl border ${
                  formData.platform === 'bolt'
                    ? 'bg-primary-600 border-primary-600'
                    : `${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'}`
                }`}
                onPress={() => setFormData(prev => ({ ...prev, platform: 'bolt' }))}
              >
                <Text className={`text-center font-semibold ${
                  formData.platform === 'bolt' ? 'text-white' : (isDark ? 'text-gray-300' : 'text-gray-700')
                }`}>
                  Bolt
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Fields */}
          <View className="space-y-4">
            <View>
              <Text className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Gross Amount (£)
              </Text>
              <View className={`flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 border`}>
                <DollarSign color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
                <TextInput
                  className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  placeholder="0.00"
                  placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                  value={formData.grossAmount}
                  onChangeText={(value) => setFormData(prev => ({ ...prev, grossAmount: value }))}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View>
              <Text className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Platform Fees (£)
              </Text>
              <View className={`flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 border`}>
                <DollarSign color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
                <TextInput
                  className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  placeholder="0.00"
                  placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                  value={formData.platformFees}
                  onChangeText={(value) => setFormData(prev => ({ ...prev, platformFees: value }))}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View>
              <Text className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Number of Trips
              </Text>
              <View className={`flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 border`}>
                <Car color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
                <TextInput
                  className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  placeholder="0"
                  placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                  value={formData.tripsCount}
                  onChangeText={(value) => setFormData(prev => ({ ...prev, tripsCount: value }))}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <View>
              <Text className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Hours Worked
              </Text>
              <View className={`flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 border`}>
                <Clock color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
                <TextInput
                  className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  placeholder="0.0"
                  placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                  value={formData.hoursWorked}
                  onChangeText={(value) => setFormData(prev => ({ ...prev, hoursWorked: value }))}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity 
            className="bg-primary-600 rounded-xl py-4 items-center mt-6"
            onPress={handleSubmit}
          >
            <Text className="text-lg font-bold text-white">Add Earning</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}