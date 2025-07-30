import { Tabs } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Chrome as Home, TrendingUp, Target, FileText, Plane, User } from 'lucide-react-native';

export default function TabsLayout() {
  const { isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: isDark ? '#334155' : '#e5e7eb',
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: isDark ? '#64748b' : '#6b7280',
        tabBarLabelStyle: {
          fontSize: 0,
          height: 0,
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="targets"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <Target color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="transport"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <Plane color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <FileText color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
