// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { ChartBar as BarChart3, Download, Calendar, TrendingUp } from 'lucide-react-native';
// import { ReportCard } from '@/components/ReportCard';
// import { MonthlyChart } from '@/components/MonthlyChart';

// export default function ReportsScreen() {
//   const [selectedPeriod, setSelectedPeriod] = useState('month');

//   const periods = [
//     { key: 'week', label: 'This Week' },
//     { key: 'month', label: 'This Month' },
//     { key: 'quarter', label: 'Quarter' },
//     { key: 'year', label: 'Year' },
//   ];

//   const reportData = {
//     totalEarnings: 2456.75,
//     totalExpenses: 487.30,
//     netProfit: 1969.45,
//     hoursWorked: 156.5,
//     tripsCompleted: 298,
//     avgHourlyRate: 15.70,
//     avgTripValue: 8.25,
//     platformFees: 491.35,
//   };

//   const expenseBreakdown = [
//     { category: 'Fuel', amount: 245.60, percentage: 50.4 },
//     { category: 'Maintenance', amount: 125.00, percentage: 25.6 },
//     { category: 'Insurance', amount: 89.50, percentage: 18.4 },
//     { category: 'Phone', amount: 27.20, percentage: 5.6 },
//   ];

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Reports & Analytics</Text>
//         <TouchableOpacity style={styles.exportButton}>
//           <Download color="#2563EB" size={20} />
//         </TouchableOpacity>
//       </View>

//       {/* Period Selector */}
//       <View style={styles.periodContainer}>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.periodSelector}
//         >
//           {periods.map((period) => (
//             <TouchableOpacity
//               key={period.key}
//               style={[
//                 styles.periodButton,
//                 selectedPeriod === period.key && styles.periodButtonActive,
//               ]}
//               onPress={() => setSelectedPeriod(period.key)}
//             >
//               <Text
//                 style={[
//                   styles.periodButtonText,
//                   selectedPeriod === period.key && styles.periodButtonTextActive,
//                 ]}
//               >
//                 {period.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Key Metrics */}
//         <View style={styles.metricsGrid}>
//           <ReportCard
//             title="Total Earnings"
//             value={`£${reportData.totalEarnings.toFixed(2)}`}
//             icon={<TrendingUp color="#10B981" size={24} />}
//             color="#10B981"
//             subtitle="Gross income"
//           />
//           <ReportCard
//             title="Net Profit"
//             value={`£${reportData.netProfit.toFixed(2)}`}
//             icon={<BarChart3 color="#2563EB" size={24} />}
//             color="#2563EB"
//             subtitle="After expenses"
//           />
//         </View>

//         <View style={styles.metricsGrid}>
//           <ReportCard
//             title="Hours Worked"
//             value={`${reportData.hoursWorked.toFixed(1)}h`}
//             icon={<Calendar color="#F59E0B" size={24} />}
//             color="#F59E0B"
//             subtitle="Total time"
//           />
//           <ReportCard
//             title="Hourly Rate"
//             value={`£${reportData.avgHourlyRate.toFixed(2)}`}
//             icon={<TrendingUp color="#8B5CF6" size={24} />}
//             color="#8B5CF6"
//             subtitle="Average"
//           />
//         </View>

//         {/* Monthly Trend Chart */}
//         <View style={styles.chartCard}>
//           <Text style={styles.chartTitle}>Monthly Performance Trend</Text>
//           <MonthlyChart />
//         </View>

//         {/* Profit & Loss Summary */}
//         <View style={styles.summaryCard}>
//           <Text style={styles.summaryTitle}>Profit & Loss Summary</Text>

//           <View style={styles.summaryRow}>
//             <Text style={styles.summaryLabel}>Gross Earnings</Text>
//             <Text style={styles.summaryValue}>£{reportData.totalEarnings.toFixed(2)}</Text>
//           </View>

//           <View style={styles.summaryRow}>
//             <Text style={styles.summaryLabel}>Platform Fees</Text>
//             <Text style={[styles.summaryValue, styles.expense]}>-£{reportData.platformFees.toFixed(2)}</Text>
//           </View>

//           <View style={styles.summaryRow}>
//             <Text style={styles.summaryLabel}>Business Expenses</Text>
//             <Text style={[styles.summaryValue, styles.expense]}>-£{reportData.totalExpenses.toFixed(2)}</Text>
//           </View>

//           <View style={[styles.summaryRow, styles.totalRow]}>
//             <Text style={styles.totalLabel}>Net Profit</Text>
//             <Text style={styles.totalValue}>£{reportData.netProfit.toFixed(2)}</Text>
//           </View>

//           <View style={styles.profitMargin}>
//             <Text style={styles.profitMarginText}>
//               Profit Margin: {((reportData.netProfit / reportData.totalEarnings) * 100).toFixed(1)}%
//             </Text>
//           </View>
//         </View>

//         {/* Expense Breakdown */}
//         <View style={styles.expenseCard}>
//           <Text style={styles.expenseTitle}>Expense Breakdown</Text>
//           {expenseBreakdown.map((expense, index) => (
//             <View key={index} style={styles.expenseItem}>
//               <View style={styles.expenseInfo}>
//                 <Text style={styles.expenseCategory}>{expense.category}</Text>
//                 <Text style={styles.expenseAmount}>£{expense.amount.toFixed(2)}</Text>
//               </View>
//               <View style={styles.expenseBar}>
//                 <View
//                   style={[
//                     styles.expenseBarFill,
//                     { width: `${expense.percentage}%` }
//                   ]}
//                 />
//               </View>
//               <Text style={styles.expensePercentage}>{expense.percentage}%</Text>
//             </View>
//           ))}
//         </View>

//         {/* Performance Metrics */}
//         <View style={styles.performanceCard}>
//           <Text style={styles.performanceTitle}>Performance Metrics</Text>

//           <View style={styles.performanceGrid}>
//             <View style={styles.performanceItem}>
//               <Text style={styles.performanceValue}>{reportData.tripsCompleted}</Text>
//               <Text style={styles.performanceLabel}>Total Trips</Text>
//             </View>
//             <View style={styles.performanceItem}>
//               <Text style={styles.performanceValue}>£{reportData.avgTripValue.toFixed(2)}</Text>
//               <Text style={styles.performanceLabel}>Avg Trip Value</Text>
//             </View>
//             <View style={styles.performanceItem}>
//               <Text style={styles.performanceValue}>{(reportData.tripsCompleted / (reportData.hoursWorked / 24)).toFixed(1)}</Text>
//               <Text style={styles.performanceLabel}>Trips/Day</Text>
//             </View>
//             <View style={styles.performanceItem}>
//               <Text style={styles.performanceValue}>{(reportData.hoursWorked / 4).toFixed(1)}h</Text>
//               <Text style={styles.performanceLabel}>Avg Daily Hours</Text>
//             </View>
//           </View>
//         </View>

//         {/* Tax Information */}
//         <View style={styles.taxCard}>
//           <Text style={styles.taxTitle}>Tax Information</Text>
//           <Text style={styles.taxSubtitle}>Ready for your accountant</Text>

//           <View style={styles.taxRow}>
//             <Text style={styles.taxLabel}>Total Business Income</Text>
//             <Text style={styles.taxValue}>£{reportData.totalEarnings.toFixed(2)}</Text>
//           </View>
//           <View style={styles.taxRow}>
//             <Text style={styles.taxLabel}>Deductible Expenses</Text>
//             <Text style={styles.taxValue}>£{(reportData.totalExpenses + reportData.platformFees).toFixed(2)}</Text>
//           </View>
//           <View style={styles.taxRow}>
//             <Text style={styles.taxLabel}>Taxable Profit</Text>
//             <Text style={styles.taxValue}>£{reportData.netProfit.toFixed(2)}</Text>
//           </View>

//           <TouchableOpacity style={styles.exportTaxButton}>
//             <Text style={styles.exportTaxButtonText}>Export Tax Summary</Text>
//           </TouchableOpacity>
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
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 60,
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     backgroundColor: '#ffffff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e5e7eb',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '800',
//     color: '#1f2937',
//   },
//   exportButton: {
//     padding: 8,
//   },
//   periodContainer: {
//     backgroundColor: '#ffffff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e5e7eb',
//   },
//   periodSelector: {
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//   },
//   periodButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: '#f3f4f6',
//     marginRight: 12,
//   },
//   periodButtonActive: {
//     backgroundColor: '#2563EB',
//   },
//   periodButtonText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#6b7280',
//   },
//   periodButtonTextActive: {
//     color: '#ffffff',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   metricsGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   chartCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   chartTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1f2937',
//     marginBottom: 16,
//   },
//   summaryCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   summaryTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1f2937',
//     marginBottom: 16,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   summaryLabel: {
//     fontSize: 16,
//     color: '#1f2937',
//   },
//   summaryValue: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1f2937',
//   },
//   expense: {
//     color: '#EF4444',
//   },
//   totalRow: {
//     borderTopWidth: 1,
//     borderTopColor: '#e5e7eb',
//     marginTop: 8,
//     paddingTop: 16,
//   },
//   totalLabel: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1f2937',
//   },
//   totalValue: {
//     fontSize: 18,
//     fontWeight: '800',
//     color: '#10B981',
//   },
//   profitMargin: {
//     marginTop: 12,
//     alignItems: 'center',
//   },
//   profitMarginText: {
//     fontSize: 14,
//     color: '#6b7280',
//   },
//   expenseCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   expenseTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1f2937',
//     marginBottom: 16,
//   },
//   expenseItem: {
//     marginBottom: 16,
//   },
//   expenseInfo: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   expenseCategory: {
//     fontSize: 16,
//     color: '#1f2937',
//   },
//   expenseAmount: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#EF4444',
//   },
//   expenseBar: {
//     height: 8,
//     backgroundColor: '#e5e7eb',
//     borderRadius: 4,
//     marginBottom: 4,
//     overflow: 'hidden',
//   },
//   expenseBarFill: {
//     height: '100%',
//     backgroundColor: '#EF4444',
//     borderRadius: 4,
//   },
//   expensePercentage: {
//     fontSize: 12,
//     color: '#6b7280',
//     textAlign: 'right',
//   },
//   performanceCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   performanceTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1f2937',
//     marginBottom: 16,
//   },
//   performanceGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   performanceItem: {
//     width: '48%',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   performanceValue: {
//     fontSize: 24,
//     fontWeight: '800',
//     color: '#2563EB',
//     marginBottom: 4,
//   },
//   performanceLabel: {
//     fontSize: 12,
//     color: '#6b7280',
//   },
//   taxCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   taxTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1f2937',
//     marginBottom: 4,
//   },
//   taxSubtitle: {
//     fontSize: 14,
//     color: '#6b7280',
//     marginBottom: 16,
//   },
//   taxRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//   },
//   taxLabel: {
//     fontSize: 14,
//     color: '#1f2937',
//   },
//   taxValue: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1f2937',
//   },
//   exportTaxButton: {
//     backgroundColor: '#2563EB',
//     borderRadius: 12,
//     paddingVertical: 12,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   exportTaxButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#ffffff',
//   },
// });

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  ChartBar as BarChart3,
  Download,
  Calendar,
  TrendingUp,
} from 'lucide-react-native';
import { ReportCard } from '@/components/ReportCard';
import { MonthlyChart } from '@/components/MonthlyChart';

export default function ReportsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

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

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-16 pb-5 bg-white border-b border-slate-200">
        <Text className="text-2xl font-extrabold text-gray-800">
          Reports & Analytics
        </Text>
        <TouchableOpacity className="p-2">
          <Download color="#2563EB" size={20} />
        </TouchableOpacity>
      </View>

      {/* Period Selector */}
      <View className="bg-white border-b border-slate-200">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16 }}
        >
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              className={`px-4 py-2 rounded-full mr-3 ${
                selectedPeriod === period.key ? 'bg-blue-600' : 'bg-gray-100'
              }`}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text
                className={`text-sm font-semibold ${
                  selectedPeriod === period.key ? 'text-white' : 'text-gray-500'
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
        <View className="p-5 mb-5 bg-white shadow-sm rounded-2xl shadow-black/10">
          <Text className="mb-4 text-lg font-bold text-gray-800">
            Monthly Performance Trend
          </Text>
          <MonthlyChart />
        </View>

        {/* Profit & Loss Summary */}
        <View className="p-5 mb-5 bg-white shadow-sm rounded-2xl">
          <Text className="mb-4 text-lg font-bold text-gray-800">
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
              <Text className="text-base text-gray-800">{item.label}</Text>
              <Text
                className={`text-base font-semibold ${
                  item.expense ? 'text-red-500' : 'text-gray-800'
                }`}
              >
                {item.value}
              </Text>
            </View>
          ))}

          <View className="flex-row justify-between pt-4 mt-2 border-t border-slate-200">
            <Text className="text-lg font-bold text-gray-800">Net Profit</Text>
            <Text className="text-lg font-extrabold text-green-500">
              £{reportData.netProfit.toFixed(2)}
            </Text>
          </View>

          <View className="items-center mt-3">
            <Text className="text-sm text-gray-500">
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
        <View className="p-5 mb-5 bg-white shadow-sm rounded-2xl">
          <Text className="mb-4 text-lg font-bold text-gray-800">
            Expense Breakdown
          </Text>
          {expenseBreakdown.map((item, i) => (
            <View key={i} className="mb-4">
              <View className="flex-row justify-between mb-2">
                <Text className="text-base text-gray-800">{item.category}</Text>
                <Text className="text-base font-semibold text-red-500">
                  £{item.amount.toFixed(2)}
                </Text>
              </View>
              <View className="h-2 mb-1 overflow-hidden rounded-full bg-slate-200">
                <View
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </View>
              <Text className="text-xs text-right text-gray-500">
                {item.percentage}%
              </Text>
            </View>
          ))}
        </View>

        {/* Performance Metrics */}
        <View className="p-5 mb-5 bg-white shadow-sm rounded-2xl">
          <Text className="mb-4 text-lg font-bold text-gray-800">
            Performance Metrics
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <View className="w-[48%] items-center mb-4">
              <Text className="mb-1 text-2xl font-extrabold text-blue-600">
                {reportData.tripsCompleted}
              </Text>
              <Text className="text-xs text-gray-500">Total Trips</Text>
            </View>
            <View className="w-[48%] items-center mb-4">
              <Text className="mb-1 text-2xl font-extrabold text-blue-600">
                £{reportData.avgTripValue.toFixed(2)}
              </Text>
              <Text className="text-xs text-gray-500">Avg Trip Value</Text>
            </View>
            <View className="w-[48%] items-center mb-4">
              <Text className="mb-1 text-2xl font-extrabold text-blue-600">
                {(
                  reportData.tripsCompleted /
                  (reportData.hoursWorked / 24)
                ).toFixed(1)}
              </Text>
              <Text className="text-xs text-gray-500">Trips/Day</Text>
            </View>
            <View className="w-[48%] items-center mb-4">
              <Text className="mb-1 text-2xl font-extrabold text-blue-600">
                {(reportData.hoursWorked / 4).toFixed(1)}h
              </Text>
              <Text className="text-xs text-gray-500">Avg Daily Hours</Text>
            </View>
          </View>
        </View>

        {/* Tax Info */}
        <View className="p-5 mb-5 bg-white shadow-sm rounded-2xl">
          <Text className="mb-1 text-lg font-bold text-gray-800">
            Tax Information
          </Text>
          <Text className="mb-4 text-sm text-gray-500">
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
              <Text className="text-sm text-gray-800">{item.label}</Text>
              <Text className="text-sm font-semibold text-gray-800">
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
    </View>
  );
}
