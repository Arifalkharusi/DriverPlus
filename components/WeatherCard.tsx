import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Cloud, CloudRain, Sun, Wind, Droplets } from 'lucide-react-native';
import { weatherApi, type WeatherData } from '@/services/weatherApi';

interface WeatherCardProps {
  isDark: boolean;
}

export function WeatherCard({ isDark }: WeatherCardProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeatherData();
  }, []);

  const loadWeatherData = async () => {
    try {
      const data = await weatherApi.getWeatherData('Birmingham');
      setWeatherData(data);
    } catch (error) {
      console.error('Error loading weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'rain':
        return <CloudRain color="#3b82f6" size={24} />;
      case 'cloud':
        return <Cloud color="#6b7280" size={24} />;
      case 'sun':
        return <Sun color="#f59e0b" size={24} />;
      default:
        return <Cloud color="#6b7280" size={24} />;
    }
  };

  if (loading || !weatherData) {
    return (
      <View className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-5 shadow-sm`}>
        <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Loading weather data...
        </Text>
      </View>
    );
  }

  return (
    <View>
      {/* Current Weather */}
      <View className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-5 mb-4 shadow-sm`}>
        <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
          Current Weather
        </Text>
        
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {weatherData.current.temperature}°C
            </Text>
            <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {weatherData.current.condition}
            </Text>
          </View>
          <CloudRain color="#3b82f6" size={48} />
        </View>

        <View className="flex-row justify-between">
          <View className="items-center">
            <Droplets color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
              {weatherData.current.humidity}%
            </Text>
          </View>
          <View className="items-center">
            <Wind color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
              {weatherData.current.windSpeed} mph
            </Text>
          </View>
          <View className="items-center">
            <CloudRain color={isDark ? '#9ca3af' : '#6b7280'} size={20} />
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
              {weatherData.current.rainChance}%
            </Text>
          </View>
        </View>
      </View>

      {/* Demand Impact */}
      <View className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-5 mb-4 shadow-sm`}>
        <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
          Demand Impact
        </Text>
        <View className="flex-row items-center">
          <View 
            className="w-3 h-3 rounded-full mr-3"
            style={{ backgroundColor: weatherData.demandImpact.color }}
          />
          <Text className={`text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {weatherData.demandImpact.text}
          </Text>
        </View>
      </View>

      {/* Hourly Forecast */}
      <View className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-5 shadow-sm`}>
        <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
          Hourly Forecast
        </Text>
        
        {weatherData.hourly.map((hour, index) => (
          <View key={index} className="flex-row items-center justify-between py-2">
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} w-12`}>
              {hour.time}
            </Text>
            <View className="flex-1 flex-row items-center ml-3">
              {getWeatherIcon(hour.condition)}
              <Text className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'} ml-2`}>
                {hour.temp}°C
              </Text>
            </View>
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {hour.rain}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}