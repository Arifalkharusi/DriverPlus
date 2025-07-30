import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, Eye, EyeOff, User, Phone, MapPin, Car } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { isDark } = useTheme();

  const handleRegister = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    const { data, error } = await signUp(formData.email, formData.password, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      city: formData.city,
      phone: formData.phone,
    });
    
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)/dashboard') }
      ]);
    }
    
    setLoading(false);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView 
      className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={isDark ? ['#1e293b', '#0f172a'] : ['#2563eb', '#1d4ed8']}
        className="flex-[0.3] justify-center items-center pt-16"
      >
        <View className="items-center">
          <Car color="#ffffff" size={40} />
          <Text className="text-white text-2xl font-bold mt-3">DriverPro</Text>
          <Text className="text-blue-200 text-sm mt-1">Join thousands of successful drivers</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        className={`flex-[0.7] ${isDark ? 'bg-slate-800' : 'bg-white'} rounded-t-[32px] px-6 pt-8 -mt-4`}
        showsVerticalScrollIndicator={false}
      >
        <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
          Create Account
        </Text>
        <Text className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
          Start optimizing your driving business today
        </Text>

        <View className="mb-6">
          <View className="flex-row mb-4">
            <View className={`flex-1 flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 mr-2 border`}>
              <User color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
              <TextInput
                className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                placeholder="First Name"
                placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                value={formData.firstName}
                onChangeText={(value) => updateFormData('firstName', value)}
                autoCapitalize="words"
              />
            </View>
            <View className={`flex-1 flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 ml-2 border`}>
              <User color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
              <TextInput
                className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                placeholder="Last Name"
                placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                value={formData.lastName}
                onChangeText={(value) => updateFormData('lastName', value)}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View className={`flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 mb-4 border`}>
            <Mail color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
            <TextInput
              className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
              placeholder="Email address"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View className={`flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 mb-4 border`}>
            <Phone color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
            <TextInput
              className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
              placeholder="Phone number (optional)"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
              value={formData.phone}
              onChangeText={(value) => updateFormData('phone', value)}
              keyboardType="phone-pad"
            />
          </View>

          <View className={`flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 mb-4 border`}>
            <MapPin color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
            <TextInput
              className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
              placeholder="Select your city"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
              value={formData.city}
              onChangeText={(value) => updateFormData('city', value)}
            />
          </View>

          <View className={`flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 mb-4 border`}>
            <Lock color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
            <TextInput
              className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
              placeholder="Password (min 6 characters)"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
              ) : (
                <Eye color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
              )}
            </TouchableOpacity>
          </View>

          <View className={`flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 mb-4 border`}>
            <Lock color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
            <TextInput
              className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
              placeholder="Confirm password"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? (
                <EyeOff color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
              ) : (
                <Eye color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          className={`bg-primary-600 rounded-xl py-4 items-center mb-6 ${loading ? 'opacity-60' : ''}`}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text className="text-lg font-bold text-white">
            {loading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        <View className="mb-6">
          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center leading-5`}>
            By creating an account, you agree to our{' '}
            <Text className="text-primary-600 font-semibold">Terms of Service</Text>
            {' '}and{' '}
            <Text className="text-primary-600 font-semibold">Privacy Policy</Text>
          </Text>
        </View>

        <View className="flex-row justify-center items-center mb-10">
          <Text className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Already have an account? 
          </Text>
          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text className="text-base text-primary-600 font-semibold ml-1">Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}