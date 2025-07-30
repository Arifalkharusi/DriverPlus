import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Mail, Phone, MapPin, Settings, Moon, Sun, LogOut, CreditCard as Edit } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, profile, signOut } = useAuth();
  const { theme, isDark, updateTheme } = useTheme();

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            const { error } = await signOut();
            if (error) {
              Alert.alert('Error', 'Failed to sign out');
            } else {
              router.replace('/auth/login');
            }
          }
        }
      ]
    );
  };

  const toggleTheme = () => {
    updateTheme(isDark ? 'light' : 'dark');
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <LinearGradient
        colors={isDark ? ['#1e293b', '#0f172a'] : ['#2563eb', '#1d4ed8']}
        className="pt-16 px-5 pb-8"
      >
        <View className="items-center">
          <View className="w-24 h-24 bg-white/20 rounded-full items-center justify-center mb-4">
            <User color="#ffffff" size={40} />
          </View>
          <Text className="text-white text-2xl font-bold mb-1">
            {profile?.first_name} {profile?.last_name}
          </Text>
          <Text className="text-blue-200 text-base">
            {profile?.email}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 -mt-4" showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-5 mb-4 shadow-sm`}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Profile Information
            </Text>
            <TouchableOpacity>
              <Edit color="#2563eb" size={20} />
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            <View className="flex-row items-center">
              <Mail color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
              <View className="ml-3 flex-1">
                <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Email</Text>
                <Text className={`text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {profile?.email}
                </Text>
              </View>
            </View>

            {profile?.phone && (
              <View className="flex-row items-center">
                <Phone color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
                <View className="ml-3 flex-1">
                  <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Phone</Text>
                  <Text className={`text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {profile.phone}
                  </Text>
                </View>
              </View>
            )}

            <View className="flex-row items-center">
              <MapPin color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
              <View className="ml-3 flex-1">
                <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>City</Text>
                <Text className={`text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {profile?.city}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-5 mb-4 shadow-sm`}>
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Settings
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                {isDark ? (
                  <Moon color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
                ) : (
                  <Sun color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
                )}
                <View className="ml-3 flex-1">
                  <Text className={`text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Dark Mode
                  </Text>
                  <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {isDark ? 'Enabled' : 'Disabled'}
                  </Text>
                </View>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#d1d5db', true: '#2563eb' }}
                thumbColor={isDark ? '#ffffff' : '#f3f4f6'}
              />
            </View>

            <TouchableOpacity className="flex-row items-center">
              <Settings color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
              <View className="ml-3 flex-1">
                <Text className={`text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Notification Settings
                </Text>
                <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage your notifications
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Actions */}
        <View className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-5 mb-6 shadow-sm`}>
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Account
          </Text>

          <TouchableOpacity 
            className="flex-row items-center"
            onPress={handleSignOut}
          >
            <LogOut color="#ef4444" size={20} />
            <View className="ml-3 flex-1">
              <Text className="text-base text-error-600 font-semibold">
                Sign Out
              </Text>
              <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Sign out of your account
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}