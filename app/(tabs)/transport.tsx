import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { Plane, Brain as Train, Bus, CloudRain, RefreshCw } from 'lucide-react-native';
import { HourlyTransportView } from '@/components/HourlyTransportView';
import { WeatherCard } from '@/components/WeatherCard';
import { transportApi, type HourlyData } from '@/services/transportApi';
import { useTheme } from '@/hooks/useTheme';

export default function TransportScreen() {
  const [selectedTab, setSelectedTab] = useState('airports');
  const [refreshing, setRefreshing] = useState(false);
  const [flightData, setFlightData] = useState<HourlyData[]>([]);
  const [trainData, setTrainData] = useState<HourlyData[]>([]);
  const [coachData, setCoachData] = useState<HourlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  const tabs = [
    { key: 'airports', label: 'Flights', icon: Plane },
    { key: 'trains', label: 'Trains', icon: Train },
    { key: 'coaches', label: 'Coaches', icon: Bus },
    { key: 'weather', label: 'Weather', icon: CloudRain },
  ];

  useEffect(() => {
    loadTransportData();
  }, []);

  const loadTransportData = async () => {
    setLoading(true);
    try {
      const [flights, trains, coaches] = await Promise.all([
        transportApi.getFlightData('BHX'),
        transportApi.getTrainData('BHM'),
        transportApi.getCoachData('BHMCOST'),
      ]);
      
      setFlightData(flights);
      setTrainData(trains);
      setCoachData(coaches);
    } catch (error) {
      console.error('Error loading transport data:', error);
      Alert.alert('Error', 'Failed to load transport data. Using cached data.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTransportData();
    setRefreshing(false);
  };

  const handleItemPress = (hourData: HourlyData) => {
    Alert.alert(
      `${hourData.hour} Details`,
      `${hourData.count} arrivals scheduled\n${hourData.totalPassengers} total passengers`,
      [{ text: 'OK' }]
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Loading transport data...
          </Text>
        </View>
      );
    }

    switch (selectedTab) {
      case 'airports':
        return (
          <View>
            <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
              Birmingham Airport (BHX)
            </Text>
            <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-5`}>
              Flight arrivals by hour
            </Text>
            <HourlyTransportView 
              data={flightData} 
              type="flights" 
              onItemPress={handleItemPress}
              isDark={isDark}
            />
          </View>
        );
      case 'trains':
        return (
          <View>
            <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
              Birmingham New Street
            </Text>
            <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-5`}>
              Train arrivals by hour
            </Text>
            <HourlyTransportView 
              data={trainData} 
              type="trains" 
              onItemPress={handleItemPress}
              isDark={isDark}
            />
          </View>
        );
      case 'coaches':
        return (
          <View>
            <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
              Birmingham Coach Station
            </Text>
            <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-5`}>
              Coach arrivals by hour
            </Text>
            <HourlyTransportView 
              data={coachData} 
              type="coaches" 
              onItemPress={handleItemPress}
              isDark={isDark}
            />
          </View>
        );
      case 'weather':
        return <WeatherCard isDark={isDark} />;
      default:
        return null;
    }
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <View className={`flex-row justify-between items-center pt-16 px-5 pb-5 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-b`}>
        <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Transport Intelligence
        </Text>
        <TouchableOpacity className="p-2" onPress={onRefresh}>
          <RefreshCw color="#2563eb" size={20} />
        </TouchableOpacity>
      </View>

      {/* Tab Bar */}
      <View className={`flex-row ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-b`}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <TouchableOpacity
              key={tab.key}
              className={`flex-1 flex-row items-center justify-center py-4 border-b-2 ${
                selectedTab === tab.key ? 'border-primary-600' : 'border-transparent'
              }`}
              onPress={() => setSelectedTab(tab.key)}
            >
              <IconComponent 
                color={selectedTab === tab.key ? '#2563eb' : (isDark ? '#64748b' : '#6b7280')} 
                size={20} 
              />
              <Text
                className={`text-sm font-semibold ml-1.5 ${
                  selectedTab === tab.key 
                    ? 'text-primary-600' 
                    : (isDark ? 'text-gray-400' : 'text-gray-500')
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView 
        className="flex-1 px-5 pt-5"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderContent()}
      </ScrollView>
    </View>
  );
}