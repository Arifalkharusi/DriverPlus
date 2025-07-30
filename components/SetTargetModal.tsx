import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { X, Target, DollarSign, Clock, Car } from 'lucide-react-native';

interface SetTargetModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (targets: any) => void;
  isDark: boolean;
}

export function SetTargetModal({ visible, onClose, onSave, isDark }: SetTargetModalProps) {
  const [targets, setTargets] = useState({
    earnings: '800',
    hours: '40',
    trips: '150',
  });

  const handleSubmit = () => {
    if (!targets.earnings || !targets.hours || !targets.trips) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    onSave({
      earnings_target: parseFloat(targets.earnings),
      hours_target: parseFloat(targets.hours),
      trips_target: parseInt(targets.trips),
      week_start: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/50 justify-end">
        <View className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-t-3xl p-6`}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Set Weekly Targets
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X color={isDark ? '#9ca3af' : '#6b7280'} size={24} />
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            <View>
              <Text className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Earnings Target (£)
              </Text>
              <View className={`flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 border`}>
                <DollarSign color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
                <TextInput
                  className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  placeholder="800"
                  placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                  value={targets.earnings}
                  onChangeText={(value) => setTargets(prev => ({ ...prev, earnings: value }))}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View>
              <Text className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Hours Target
              </Text>
              <View className={`flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 border`}>
                <Clock color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
                <TextInput
                  className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  placeholder="40"
                  placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                  value={targets.hours}
                  onChangeText={(value) => setTargets(prev => ({ ...prev, hours: value }))}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View>
              <Text className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Trips Target
              </Text>
              <View className={`flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 border`}>
                <Car color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
                <TextInput
                  className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  placeholder="150"
                  placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                  value={targets.trips}
                  onChangeText={(value) => setTargets(prev => ({ ...prev, trips: value }))}
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity 
            className="bg-primary-600 rounded-xl py-4 items-center mt-6"
            onPress={handleSubmit}
          >
            <Text className="text-lg font-bold text-white">Save Targets</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}