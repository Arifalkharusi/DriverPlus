// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { Brain, TrendingUp, MapPin, Clock, Lightbulb, Target } from 'lucide-react-native';
// import { InsightCard } from '@/components/InsightCard';
// import { WeeklyPlanCard } from '@/components/WeeklyPlanCard';

// export default function InsightsScreen() {
//   const insights = [
//     {
//       type: 'earnings',
//       title: 'Peak Earnings Window',
//       description: 'Your best earning hours are 17:00-19:00 on weekdays',
//       value: '£18.50/hour',
//       change: '+12%',
//       icon: <TrendingUp color="#10B981" size={24} />,
//       color: '#10B981',
//     },
//     {
//       type: 'location',
//       title: 'Top Pickup Location',
//       description: 'Heathrow Terminal 5 generates highest average fares',
//       value: '£24.30',
//       change: 'avg fare',
//       icon: <MapPin color="#2563EB" size={24} />,
//       color: '#2563EB',
//     },
//     {
//       type: 'timing',
//       title: 'Optimal Work Pattern',
//       description: 'Working 8-9 hours yields best hourly rates',
//       value: '8.5 hours',
//       change: 'sweet spot',
//       icon: <Clock color="#F59E0B" size={24} />,
//       color: '#F59E0B',
//     },
//     {
//       type: 'platform',
//       title: 'Platform Performance',
//       description: 'Uber performs 15% better during rush hours',
//       value: 'Rush hours',
//       change: '+15% vs Bolt',
//       icon: <Target color="#8B5CF6" size={24} />,
//       color: '#8B5CF6',
//     },
//   ];

//   const todayRecommendations = [
//     {
//       time: '14:30',
//       action: 'Head to Heathrow T5',
//       reason: 'BA123 from NYC arriving (298 passengers)',
//       priority: 'high',
//     },
//     {
//       time: '16:00',
//       action: 'Position near King\'s Cross',
//       reason: 'Peak train arrivals + rain expected',
//       priority: 'high',
//     },
//     {
//       time: '17:30',
//       action: 'Central London focus',
//       reason: 'Evening rush + weather impact',
//       priority: 'medium',
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Brain color="#2563EB" size={32} />
//         <View style={styles.headerText}>
//           <Text style={styles.title}>AI Insights</Text>
//           <Text style={styles.subtitle}>Personalized recommendations</Text>
//         </View>
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Today's Briefing */}
//         <View style={styles.briefingCard}>
//           <View style={styles.briefingHeader}>
//             <Lightbulb color="#F59E0B" size={24} />
//             <Text style={styles.briefingTitle}>Today's Action Plan</Text>
//           </View>
//           <Text style={styles.briefingDescription}>
//             Based on flight arrivals, weather, and your performance patterns
//           </Text>

//           {todayRecommendations.map((rec, index) => (
//             <View key={index} style={styles.recommendationItem}>
//               <View style={styles.timeContainer}>
//                 <Text style={styles.recommendationTime}>{rec.time}</Text>
//                 <View style={[
//                   styles.priorityBadge,
//                   { backgroundColor: rec.priority === 'high' ? '#FEF2F2' : '#FEF3C7' }
//                 ]}>
//                   <Text style={[
//                     styles.priorityText,
//                     { color: rec.priority === 'high' ? '#DC2626' : '#D97706' }
//                   ]}>
//                     {rec.priority.toUpperCase()}
//                   </Text>
//                 </View>
//               </View>
//               <Text style={styles.recommendationAction}>{rec.action}</Text>
//               <Text style={styles.recommendationReason}>{rec.reason}</Text>
//             </View>
//           ))}
//         </View>

//         {/* Performance Insights */}
//         <Text style={styles.sectionTitle}>Performance Insights</Text>
//         <View style={styles.insightsGrid}>
//           {insights.map((insight, index) => (
//             <InsightCard key={index} insight={insight} />
//           ))}
//         </View>

//         {/* Weekly Plan */}
//         <Text style={styles.sectionTitle}>Weekly Plan Optimization</Text>
//         <WeeklyPlanCard />

//         {/* Additional Insights */}
//         <View style={styles.additionalInsights}>
//           <Text style={styles.sectionTitle}>Data-Driven Tips</Text>

//           <View style={styles.tipCard}>
//             <Text style={styles.tipTitle}>🎯 Efficiency Tip</Text>
//             <Text style={styles.tipText}>
//               You're most efficient on Tuesdays and Thursdays. Consider focusing longer hours on these days.
//             </Text>
//           </View>

//           <View style={styles.tipCard}>
//             <Text style={styles.tipTitle}>📍 Location Strategy</Text>
//             <Text style={styles.tipText}>
//               Airport runs generate 35% higher fares but require 2x travel time. Best for morning/evening slots.
//             </Text>
//           </View>

//           <View style={styles.tipCard}>
//             <Text style={styles.tipTitle}>⏰ Timing Intelligence</Text>
//             <Text style={styles.tipText}>
//               Weekend nights (22:00-02:00) show consistent demand but lower per-hour rates due to traffic.
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8fafc',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: 60,
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     backgroundColor: '#ffffff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e5e7eb',
//   },
//   headerText: {
//     marginLeft: 12,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '800',
//     color: '#1f2937',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#6b7280',
//     marginTop: 2,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   briefingCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   briefingHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   briefingTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1f2937',
//     marginLeft: 8,
//   },
//   briefingDescription: {
//     fontSize: 14,
//     color: '#6b7280',
//     marginBottom: 16,
//   },
//   recommendationItem: {
//     backgroundColor: '#f8fafc',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   recommendationTime: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#2563EB',
//   },
//   priorityBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 8,
//   },
//   priorityText: {
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   recommendationAction: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1f2937',
//     marginBottom: 4,
//   },
//   recommendationReason: {
//     fontSize: 14,
//     color: '#6b7280',
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1f2937',
//     marginBottom: 16,
//   },
//   insightsGrid: {
//     marginBottom: 24,
//   },
//   additionalInsights: {
//     marginBottom: 20,
//   },
//   tipCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   tipTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1f2937',
//     marginBottom: 8,
//   },
//   tipText: {
//     fontSize: 14,
//     color: '#6b7280',
//     lineHeight: 20,
//   },
// });

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  Brain,
  TrendingUp,
  MapPin,
  Clock,
  Lightbulb,
  Target,
} from 'lucide-react-native';
import { InsightCard } from '@/components/InsightCard';
import { WeeklyPlanCard } from '@/components/WeeklyPlanCard';

export default function InsightsScreen() {
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
    <View className="flex-1 bg-slate-50">
      <View className="flex-row items-center px-5 pt-16 pb-5 bg-white border-b border-slate-200">
        <Brain color="#2563EB" size={32} />
        <View className="ml-3">
          <Text className="text-2xl font-extrabold text-gray-800">
            AI Insights
          </Text>
          <Text className="mt-1 text-base text-gray-500">
            Personalized recommendations
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-5 pt-5"
        showsVerticalScrollIndicator={false}
      >
        {/* Today's Briefing */}
        <View className="p-5 mb-6 bg-white shadow-sm rounded-2xl shadow-black/10">
          <View className="flex-row items-center mb-2">
            <Lightbulb color="#F59E0B" size={24} />
            <Text className="ml-2 text-lg font-bold text-gray-800">
              Today's Action Plan
            </Text>
          </View>
          <Text className="mb-4 text-sm text-gray-500">
            Based on flight arrivals, weather, and your performance patterns
          </Text>

          {todayRecommendations.map((rec, index) => (
            <View key={index} className="p-4 mb-3 bg-slate-50 rounded-xl">
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
              <Text className="mb-1 text-base font-semibold text-gray-800">
                {rec.action}
              </Text>
              <Text className="text-sm text-gray-500">{rec.reason}</Text>
            </View>
          ))}
        </View>

        {/* Performance Insights */}
        <Text className="mb-4 text-lg font-bold text-gray-800">
          Performance Insights
        </Text>
        <View className="mb-6">
          {insights.map((insight, index) => (
            <InsightCard key={index} insight={insight} />
          ))}
        </View>

        {/* Weekly Plan */}
        <Text className="mb-4 text-lg font-bold text-gray-800">
          Weekly Plan Optimization
        </Text>
        <WeeklyPlanCard />

        {/* Additional Insights */}
        <View className="mb-5">
          <Text className="mb-4 text-lg font-bold text-gray-800">
            Data-Driven Tips
          </Text>

          <View className="p-4 mb-3 bg-white shadow-sm rounded-xl">
            <Text className="mb-2 text-base font-semibold text-gray-800">
              🎯 Efficiency Tip
            </Text>
            <Text className="text-sm leading-5 text-gray-500">
              You're most efficient on Tuesdays and Thursdays. Consider focusing
              longer hours on these days.
            </Text>
          </View>

          <View className="p-4 mb-3 bg-white shadow-sm rounded-xl">
            <Text className="mb-2 text-base font-semibold text-gray-800">
              📍 Location Strategy
            </Text>
            <Text className="text-sm leading-5 text-gray-500">
              Airport runs generate 35% higher fares but require 2x travel time.
              Best for morning/evening slots.
            </Text>
          </View>

          <View className="p-4 mb-3 bg-white shadow-sm rounded-xl">
            <Text className="mb-2 text-base font-semibold text-gray-800">
              ⏰ Timing Intelligence
            </Text>
            <Text className="text-sm leading-5 text-gray-500">
              Weekend nights (22:00-02:00) show consistent demand but lower
              per-hour rates due to traffic.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
