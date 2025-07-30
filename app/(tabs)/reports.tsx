






















import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  ChartBar as BarChart3,
  Download,
  Calendar,
  TrendingUp,
  Brain,
  MapPin,
  Clock,
  Lightbulb,
  Target,
} from 'lucide-react-native';
import { ReportCard } from '@/components/ReportCard';
import { MonthlyChart } from '@/components/MonthlyChart';
import { InsightCard } from '@/components/InsightCard';
import { WeeklyPlanCard } from '@/components/WeeklyPlanCard';
import { useTheme } from '@/hooks/useTheme';

export default function ReportsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedTab, setSelectedTab] = useState('reports');
  const { isDark } = useTheme();

  const periods = [
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'quarter', label: 'Quarter' },
    { key: 'year', label: 'Year' },
  ];

  const reportData = {
    totalEarnings: 2456.75,
    totalExpenses: 487.3,
    netProfit: 1969.45,
    hoursWorked: 156.5,
    tripsCompleted: 298,
    avgHourlyRate: 15.7,
    avgTripValue: 8.25,
    platformFees: 491.35,
  };

  const expenseBreakdown = [
    { category: 'Fuel', amount: 245.6, percentage: 50.4 },
    { category: 'Maintenance', amount: 125.0, percentage: 25.6 },
    { category: 'Insurance', amount: 89.5, percentage: 18.4 },
    { category: 'Phone', amount: 27.2, percentage: 5.6 },
  ];

  const insights = [
    {
      type: 'earnings',
      title: 'Peak Earnings Window',
      description: 'Your best earning hours are 17:00-19:00 on weekdays',
      value: '£18.50/hour',
      change: '+12%',
      icon: <TrendingUp color="#10B981" size={24} />,
      color: '#10B981',
    },
    {
      type: 'location',
      title: 'Top Pickup Location',
      description: 'Heathrow Terminal 5 generates highest average fares',
      value: '£24.30',
      change: 'avg fare',
      icon: <MapPin color="#2563EB" size={24} />,
      color: '#2563EB',
    },
    {
      type: 'timing',
      title: 'Optimal Work Pattern',
      description: 'Working 8-9 hours yields best hourly rates',
      value: '8.5 hours',
      change: 'sweet spot',
      icon: <Clock color="#F59E0B" size={24} />,
      color: '#F59E0B',
    },
    {
      type: 'platform',
      title: 'Platform Performance',
      description: 'Uber performs 15% better during rush hours',
      value: 'Rush hours',
      change: '+15% vs Bolt',
      icon: <Target color="#8B5CF6" size={24} />,
      color: '#8B5CF6',
    },
  ];

  const todayRecommendations = [
    {
      time: '14:30',
      action: 'Head to Heathrow T5',
      reason: 'BA123 from NYC arriving (298 passengers)',
      priority: 'high',
    },
    {
      time: '16:00',
      action: "Position near King's Cross",
      reason: 'Peak train arrivals + rain expected',
      priority: 'high',
    },
    {
      time: '17:30',
      action: 'Central London focus',
      reason: 'Evening rush + weather impact',
      priority: 'medium',
    },
  ];

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <View className={`flex-row items-center justify-between px-5 pt-16 pb-5 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b`}>
        <Text className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {selectedTab === 'reports' ? 'Reports & Analytics' : 'AI Insights'}
        </Text>
        <TouchableOpacity className="p-2">
          <Download color="#2563EB" size={20} />
        </TouchableOpacity>
      </View>

      {/* Tab Selector */}
      <View className={`flex-row ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b`}>
        <TouchableOpacity
          className={`flex-1 py-4 items-center border-b-2 ${
            selectedTab === 'reports' ? 'border-primary-600' : 'border-transparent'
          }`}
          onPress={() => setSelectedTab('reports')}
        >
          <BarChart3 
            color={selectedTab === 'reports' ? '#2563eb' : (isDark ? '#64748b' : '#6b7280')} 
            size={20} 
          />
          <Text
            className={`text-sm font-semibold mt-1 ${
              selectedTab === 'reports' 
                ? 'text-primary-600' 
                : (isDark ? 'text-gray-400' : 'text-gray-500')
            }`}
          >
            Reports
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-4 items-center border-b-2 ${
            selectedTab === 'insights' ? 'border-primary-600' : 'border-transparent'
          }`}
          onPress={() => setSelectedTab('insights')}
        >
          <Brain 
            color={selectedTab === 'insights' ? '#2563eb' : (isDark ? '#64748b' : '#6b7280')} 
            size={20} 
          />
          <Text
            className={`text-sm font-semibold mt-1 ${
              selectedTab === 'insights' 
                ? 'text-primary-600' 
                : (isDark ? 'text-gray-400' : 'text-gray-500')
            }`}
          >
            Insights
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'reports' ? (
        <>
      {/* Period Selector */}
          <View className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b`}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16 }}
        >
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              className={`px-4 py-2 rounded-full mr-3 ${
                selectedPeriod === period.key ? 'bg-blue-600' : (isDark ? 'bg-slate-700' : 'bg-gray-100')
              }`}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text
                className={`text-sm font-semibold ${
                  selectedPeriod === period.key ? 'text-white' : (isDark ? 'text-gray-300' : 'text-gray-500')
                }`}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1 px-5 pt-5"
        showsVerticalScrollIndicator={false}
      >
        {/* Key Metrics */}
        <View className="flex-row justify-between mb-4">
          <ReportCard
            title="Total Earnings"
            value={`£${reportData.totalEarnings.toFixed(2)}`}
            icon={<TrendingUp color="#10B981" size={24} />}
            color="#10B981"
            subtitle="Gross income"
          />
          <ReportCard
            title="Net Profit"
            value={`£${reportData.netProfit.toFixed(2)}`}
            icon={<BarChart3 color="#2563EB" size={24} />}
            color="#2563EB"
            subtitle="After expenses"
          />
        </View>

        <View className="flex-row justify-between mb-5">
          <ReportCard
            title="Hours Worked"
            value={`${reportData.hoursWorked.toFixed(1)}h`}
            icon={<Calendar color="#F59E0B" size={24} />}
            color="#F59E0B"
            subtitle="Total time"
          />
          <ReportCard
            title="Hourly Rate"
            value={`£${reportData.avgHourlyRate.toFixed(2)}`}
            icon={<TrendingUp color="#8B5CF6" size={24} />}
            color="#8B5CF6"
            subtitle="Average"
          />
        </View>

        {/* Monthly Trend Chart */}
        <View className={`p-5 mb-5 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-sm rounded-2xl shadow-black/10`}>
          <Text className={`mb-4 text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Monthly Performance Trend
          </Text>
          <MonthlyChart />
        </View>

        {/* Profit & Loss Summary */}
        <View className={`p-5 mb-5 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-sm rounded-2xl`}>
          <Text className={`mb-4 text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Profit & Loss Summary
          </Text>

          {[
            {
              label: 'Gross Earnings',
              value: `£${reportData.totalEarnings.toFixed(2)}`,
            },
            {
              label: 'Platform Fees',
              value: `-£${reportData.platformFees.toFixed(2)}`,
              expense: true,
            },
            {
              label: 'Business Expenses',
              value: `-£${reportData.totalExpenses.toFixed(2)}`,
              expense: true,
            },
          ].map((item, i) => (
            <View key={i} className="flex-row justify-between py-2">
              <Text className={`text-base ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.label}</Text>
              <Text
                className={`text-base font-semibold ${
                  item.expense ? 'text-red-500' : (isDark ? 'text-white' : 'text-gray-800')
                }`}
              >
                {item.value}
              </Text>
            </View>
          ))}

          <View className={`flex-row justify-between pt-4 mt-2 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
            <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Net Profit</Text>
            <Text className="text-lg font-extrabold text-green-500">
              £{reportData.netProfit.toFixed(2)}
            </Text>
          </View>

          <View className="items-center mt-3">
            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Profit Margin:{' '}
              {(
                (reportData.netProfit / reportData.totalEarnings) *
                100
              ).toFixed(1)}
              %
            </Text>
          </View>
        </View>

        {/* Expense Breakdown */}
        <View className={`p-5 mb-5 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-sm rounded-2xl`}>
          <Text className={`mb-4 text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Expense Breakdown
          </Text>
          {expenseBreakdown.map((item, i) => (
            <View key={i} className="mb-4">
              <View className="flex-row justify-between mb-2">
                <Text className={`text-base ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.category}</Text>
                <Text className="text-base font-semibold text-red-500">
                  £{item.amount.toFixed(2)}
                </Text>
              </View>
              <View className={`h-2 mb-1 overflow-hidden rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                <View
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </View>
              <Text className={`text-xs text-right ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {item.percentage}%
              </Text>
            </View>
          ))}
        </View>

        {/* Performance Metrics */}
        <View className={`p-5 mb-5 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-sm rounded-2xl`}>
          <Text className={`mb-4 text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Performance Metrics
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <View className="w-[48%] items-center mb-4">
              <Text className="mb-1 text-2xl font-extrabold text-blue-600">
                {reportData.tripsCompleted}
              </Text>
              <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Trips</Text>
            </View>
            <View className="w-[48%] items-center mb-4">
              <Text className="mb-1 text-2xl font-extrabold text-blue-600">
                £{reportData.avgTripValue.toFixed(2)}
              </Text>
              <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Avg Trip Value</Text>
            </View>
            <View className="w-[48%] items-center mb-4">
              <Text className="mb-1 text-2xl font-extrabold text-blue-600">
                {(
                  reportData.tripsCompleted /
                  (reportData.hoursWorked / 24)
                ).toFixed(1)}
              </Text>
              <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Trips/Day</Text>
            </View>
            <View className="w-[48%] items-center mb-4">
              <Text className="mb-1 text-2xl font-extrabold text-blue-600">
                {(reportData.hoursWorked / 4).toFixed(1)}h
              </Text>
              <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Avg Daily Hours</Text>
            </View>
          </View>
        </View>

        {/* Tax Info */}
        <View className={`p-5 mb-5 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-sm rounded-2xl`}>
          <Text className={`mb-1 text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Tax Information
          </Text>
          <Text className={`mb-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Ready for your accountant
          </Text>

          {[
            { label: 'Total Business Income', value: reportData.totalEarnings },
            {
              label: 'Deductible Expenses',
              value: reportData.totalExpenses + reportData.platformFees,
            },
            { label: 'Taxable Profit', value: reportData.netProfit },
          ].map((item, i) => (
            <View key={i} className="flex-row justify-between py-2">
              <Text className={`text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.label}</Text>
              <Text className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                £{item.value.toFixed(2)}
              </Text>
            </View>
          ))}

          <TouchableOpacity className="items-center py-3 mt-4 bg-blue-600 rounded-xl">
            <Text className="text-base font-semibold text-white">
              Export Tax Summary
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
        </>
      ) : (
        /* Insights Content */
        <ScrollView
          className="flex-1 px-5 pt-5"
          showsVerticalScrollIndicator={false}
        >
          {/* Today's Briefing */}
          <View className={`p-5 mb-6 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-sm rounded-2xl shadow-black/10`}>
            <View className="flex-row items-center mb-2">
              <Lightbulb color="#F59E0B" size={24} />
              <Text className={`ml-2 text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Today's Action Plan
              </Text>
            </View>
            <Text className={`mb-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Based on flight arrivals, weather, and your performance patterns
            </Text>

            {todayRecommendations.map((rec, index) => (
              <View key={index} className={`p-4 mb-3 ${isDark ? 'bg-slate-700' : 'bg-slate-50'} rounded-xl`}>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-base font-bold text-blue-600">
                    {rec.time}
                  </Text>
                  <View
                    className={`px-2 py-0.5 rounded-md ${
                      rec.priority === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                    }`}
                  >
                    <Text
                      className={`text-[10px] font-bold ${
                        rec.priority === 'high'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {rec.priority.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text className={`mb-1 text-base font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {rec.action}
                </Text>
                <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{rec.reason}</Text>
              </View>
            ))}
          </View>

          {/* Performance Insights */}
          <Text className={`mb-4 text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Performance Insights
          </Text>
          <View className="mb-6">
            {insights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </View>

          {/* Weekly Plan */}
          <Text className={`mb-4 text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Weekly Plan Optimization
          </Text>
          <WeeklyPlanCard />

          {/* Additional Insights */}
          <View className="mb-5">
            <Text className={`mb-4 text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Data-Driven Tips
            </Text>

            <View className={`p-4 mb-3 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-sm rounded-xl`}>
              <Text className={`mb-2 text-base font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                🎯 Efficiency Tip
              </Text>
              <Text className={`text-sm leading-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                You're most efficient on Tuesdays and Thursdays. Consider focusing
                longer hours on these days.
              </Text>
            </View>

            <View className={`p-4 mb-3 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-sm rounded-xl`}>
              <Text className={`mb-2 text-base font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                📍 Location Strategy
              </Text>
              <Text className={`text-sm leading-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Airport runs generate 35% higher fares but require 2x travel time.
                Best for morning/evening slots.
              </Text>
            </View>

            <View className={`p-4 mb-3 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-sm rounded-xl`}>
              <Text className={`mb-2 text-base font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                ⏰ Timing Intelligence
              </Text>
              <Text className={`text-sm leading-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Weekend nights (22:00-02:00) show consistent demand but lower
                per-hour rates due to traffic.
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
