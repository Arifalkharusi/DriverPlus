import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Target, Plus, TrendingUp, Clock, Car } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useEarnings } from '@/hooks/useEarnings';
import { SetTargetModal } from '@/components/SetTargetModal';
import { ProgressChart } from '@/components/ProgressChart';

export default function TargetsScreen() {
  const [showSetModal, setShowSetModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { isDark } = useTheme();
  const { getWeeklyEarnings } = useEarnings();

  // Mock targets data - would come from Supabase
  const weeklyTargets = {
    earnings: 800,
    hours: 40,
    trips: 150,
  };

  const currentProgress = {
    earnings: getWeeklyEarnings(),
    hours: 32,
    trips: 127,
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Refresh targets data
    setRefreshing(false);
  };

  const handleSetTarget = (targets: any) => {
    console.log('Setting targets:', targets);
    setShowSetModal(false);
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <LinearGradient
        colors={isDark ? ['#1e293b', '#0f172a'] : ['#8b5cf6', '#7c3aed']}
        className="px-5 pt-16 pb-6"
      >
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-3xl font-bold text-white">Weekly Targets</Text>
          <TouchableOpacity
            className="p-3 rounded-full bg-white/20"
            onPress={() => setShowSetModal(true)}
          >
            <Plus color="#ffffff" size={24} />
          </TouchableOpacity>
        </View>

        <Text className="mb-2 text-base text-purple-200">
          Week of{' '}
          {new Date().toLocaleDateString('en-GB', {
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text className="text-lg text-white">
          {Math.round(
            (currentProgress.earnings / weeklyTargets.earnings) * 100
          )}
          % Complete
        </Text>
      </LinearGradient>

      <ScrollView
        className="flex-1 px-5 -mt-2"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Earnings Target */}
        <View
          className={`${
            isDark ? 'bg-slate-800' : 'bg-white'
          } rounded-2xl p-5 mb-4 mt-4 shadow-sm`}
        >
          <View className="flex-row items-center mb-4">
            <TrendingUp color="#10b981" size={24} />
            <Text
              className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              } ml-3`}
            >
              Earnings Target
            </Text>
          </View>
          <ProgressChart
            progress={currentProgress.earnings / weeklyTargets.earnings}
            target={weeklyTargets.earnings}
            current={currentProgress.earnings}
            isDark={isDark}
          />
        </View>

        {/* Hours Target */}
        <View
          className={`${
            isDark ? 'bg-slate-800' : 'bg-white'
          } rounded-2xl p-5 mb-4 shadow-sm`}
        >
          <View className="flex-row items-center mb-4">
            <Clock color="#f59e0b" size={24} />
            <Text
              className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              } ml-3`}
            >
              Hours Target
            </Text>
          </View>
          <View className="flex-row items-center justify-between mb-3">
            <Text
              className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {currentProgress.hours}h / {weeklyTargets.hours}h
            </Text>
            <Text className="text-lg font-semibold text-warning-600">
              {Math.round((currentProgress.hours / weeklyTargets.hours) * 100)}%
            </Text>
          </View>
          <View
            className={`w-full h-2 ${
              isDark ? 'bg-slate-700' : 'bg-gray-200'
            } rounded-full`}
          >
            <View
              className="h-2 rounded-full bg-warning-600"
              style={{
                width: `${Math.min(
                  (currentProgress.hours / weeklyTargets.hours) * 100,
                  100
                )}%`,
              }}
            />
          </View>
        </View>

        {/* Trips Target */}
        <View
          className={`${
            isDark ? 'bg-slate-800' : 'bg-white'
          } rounded-2xl p-5 mb-4 shadow-sm`}
        >
          <View className="flex-row items-center mb-4">
            <Car color="#8b5cf6" size={24} />
            <Text
              className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              } ml-3`}
            >
              Trips Target
            </Text>
          </View>
          <View className="flex-row items-center justify-between mb-3">
            <Text
              className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {currentProgress.trips} / {weeklyTargets.trips}
            </Text>
            <Text className="text-lg font-semibold text-purple-600">
              {Math.round((currentProgress.trips / weeklyTargets.trips) * 100)}%
            </Text>
          </View>
          <View
            className={`w-full h-2 ${
              isDark ? 'bg-slate-700' : 'bg-gray-200'
            } rounded-full`}
          >
            <View
              className="h-2 bg-purple-600 rounded-full"
              style={{
                width: `${Math.min(
                  (currentProgress.trips / weeklyTargets.trips) * 100,
                  100
                )}%`,
              }}
            />
          </View>
        </View>

        {/* Target Insights */}
        <View
          className={`${
            isDark ? 'bg-slate-800' : 'bg-white'
          } rounded-2xl p-5 mb-6 shadow-sm`}
        >
          <Text
            className={`text-lg font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            } mb-4`}
          >
            This Week's Insights
          </Text>

          <View className="space-y-3">
            <View className="flex-row items-center">
              <View className={`w-2 h-2 rounded-full bg-success-600 mr-3`} />
              <Text
                className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } flex-1`}
              >
                You're ahead of your earnings target by £
                {(
                  currentProgress.earnings -
                  weeklyTargets.earnings *
                    (currentProgress.hours / weeklyTargets.hours)
                ).toFixed(2)}
              </Text>
            </View>

            <View className="flex-row items-center">
              <View className={`w-2 h-2 rounded-full bg-warning-600 mr-3`} />
              <Text
                className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } flex-1`}
              >
                Need {weeklyTargets.hours - currentProgress.hours} more hours to
                reach weekly goal
              </Text>
            </View>

            <View className="flex-row items-center">
              <View className={`w-2 h-2 rounded-full bg-purple-600 mr-3`} />
              <Text
                className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } flex-1`}
              >
                Average{' '}
                {(currentProgress.trips / currentProgress.hours).toFixed(1)}{' '}
                trips per hour
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <SetTargetModal
        visible={showSetModal}
        onClose={() => setShowSetModal(false)}
        onSave={handleSetTarget}
        isDark={isDark}
      />
    </View>
  );
}
