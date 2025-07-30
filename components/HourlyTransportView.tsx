import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Plane, Brain as Train, Bus } from 'lucide-react-native';
import type { HourlyData } from '@/services/transportApi';

interface HourlyTransportViewProps {
  data: HourlyData[];
  type: 'flights' | 'trains' | 'coaches';
  onItemPress: (hourData: HourlyData) => void;
  isDark: boolean;
}

export function HourlyTransportView({
  data,
  type,
  onItemPress,
  isDark,
}: HourlyTransportViewProps) {
  const getIcon = () => {
    switch (type) {
      case 'flights':
        return Plane;
      case 'trains':
        return Train;
      case 'coaches':
        return Bus;
    }
  };

  const getOpportunityLevel = (count: number, passengers: number) => {
    if (count >= 5 || passengers >= 300)
      return { level: 'High', color: 'bg-success-600' };
    if (count >= 3 || passengers >= 150)
      return { level: 'Medium', color: 'bg-warning-600' };
    return { level: 'Low', color: 'bg-gray-500' };
  };

  const IconComponent = getIcon();

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        {data.map((hourData, index) => {
          const opportunity = getOpportunityLevel(
            hourData.count,
            hourData.totalPassengers
          );

          return (
            <TouchableOpacity
              key={index}
              className={`${
                isDark ? 'bg-slate-800' : 'bg-white'
              } rounded-xl p-4 mr-3 min-w-[140px] shadow-sm`}
              onPress={() => onItemPress(hourData)}
            >
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className={`text-lg font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {hourData.hour}
                </Text>
                <IconComponent color="#2563eb" size={20} />
              </View>

              <Text className={`text-2xl font-bold text-primary-600 mb-1`}>
                {hourData.count}
              </Text>

              <Text
                className={`text-xs ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                } mb-2`}
              >
                {hourData.totalPassengers} passengers
              </Text>

              {opportunity.level !== 'Low' && (
                <View
                  className={`${opportunity.color} rounded-full px-2 py-1 self-start`}
                >
                  <Text className="text-xs font-semibold text-white">
                    {opportunity.level} Volume
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Detailed List */}
      <Text
        className={`text-lg font-bold ${
          isDark ? 'text-white' : 'text-gray-900'
        } mb-3`}
      >
        Detailed Schedule
      </Text>

      {data.map((hourData, hourIndex) => (
        <View key={hourIndex} className="mb-4">
          <Text
            className={`text-base font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            } mb-2`}
          >
            {hourData.hour} - {hourData.count} {type}
          </Text>

          {hourData.items.slice(0, 3).map((item: any, itemIndex) => (
            <View
              key={itemIndex}
              className={`${
                isDark ? 'bg-slate-800' : 'bg-white'
              } rounded-lg p-3 mb-2 shadow-sm`}
            >
              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Text
                    className={`text-sm font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    } mb-1`}
                  >
                    {item.number || item.service} -{' '}
                    {item.airline || item.operator}
                  </Text>
                  <Text
                    className={`text-xs ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    From: {item.origin}
                  </Text>
                  <Text
                    className={`text-xs ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {item.terminal || item.platform || item.bay} • {item.status}
                  </Text>
                </View>
                <View className="items-end">
                  <Text
                    className={`text-sm font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {item.scheduledTime}
                  </Text>
                  {item.passengers && (
                    <Text
                      className={`text-xs ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      ~{item.passengers} pax
                    </Text>
                  )}
                </View>
              </View>
            </View>
          ))}

          {hourData.items.length > 3 && (
            <Text
              className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              } text-center`}
            >
              +{hourData.items.length - 3} more {type}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}
