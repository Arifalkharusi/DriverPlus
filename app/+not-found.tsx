import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export default function NotFoundScreen() {
  const { isDark } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className={`flex-1 items-center justify-center p-5 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
        <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          This screen doesn't exist.
        </Text>
        <Link href="/" className="mt-4 py-4">
          <Text className="text-sm text-primary-600">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}