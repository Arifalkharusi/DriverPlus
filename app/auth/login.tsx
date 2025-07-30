import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, Eye, EyeOff, Car } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { isDark } = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    
    const { data, error } = await signIn(email, password);
    
    if (error) {
      Alert.alert('Error', error.message);
    } else if (data.user) {
      router.replace('/(tabs)/dashboard');
    }
    
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView 
      className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={isDark ? ['#1e293b', '#0f172a'] : ['#2563eb', '#1d4ed8']}
        className="flex-[0.4] justify-center items-center pt-16"
      >
        <View className="items-center">
          <Car color="#ffffff" size={48} />
          <Text className="text-white text-3xl font-bold mt-4">DriverPro</Text>
          <Text className="text-blue-200 text-base mt-2">Optimize Your Earnings</Text>
        </View>
      </LinearGradient>

      <View className={`flex-[0.6] ${isDark ? 'bg-slate-800' : 'bg-white'} rounded-t-[32px] px-6 pt-8 -mt-4`}>
        <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
          Welcome Back
        </Text>
        <Text className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
          Sign in to continue managing your driving business
        </Text>

        <View className="mb-6">
          <View className={`flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 mb-4 border`}>
            <Mail color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
            <TextInput
              className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
              placeholder="Email address"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View className={`flex-row items-center ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-xl px-4 border`}>
            <Lock color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
            <TextInput
              className={`flex-1 text-base py-4 ml-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
              placeholder="Password"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="password"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
              ) : (
                <Eye color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity className="self-end mb-6">
          <Text className="text-sm text-primary-600 font-semibold">Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className={`bg-primary-600 rounded-xl py-4 items-center mb-6 ${loading ? 'opacity-60' : ''}`}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-lg font-bold text-white">
            {loading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center">
          <Text className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Don't have an account? 
          </Text>
          <Link href="/auth/register" asChild>
            <TouchableOpacity>
              <Text className="text-base text-primary-600 font-semibold ml-1">Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}