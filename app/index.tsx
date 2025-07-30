import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Car } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

export default function SplashScreen() {
  const { user, loading } = useAuth();
  const { isDark } = useTheme();

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        if (user) {
          router.replace('/(tabs)/dashboard');
        } else {
          router.replace('/auth/login');
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [user, loading]);

  return (
    <LinearGradient
      colors={isDark ? ['#1e293b', '#0f172a'] : ['#2563eb', '#1d4ed8']}
      className="items-center justify-center flex-1"
    >
      <View className="items-center animate-pulse">
        <Car color="#ffffff" size={64} />
        <Text className="mt-4 text-4xl font-bold text-white">DriverPro</Text>
        <Text className="mt-2 text-lg text-blue-200">
          Optimize Your Earnings
        </Text>
      </View>
    </LinearGradient>
  );
}
