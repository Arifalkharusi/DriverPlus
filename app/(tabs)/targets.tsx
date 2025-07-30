import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { createCollection } from '@/utils/mongoHelpers';
import { createCollection } from '@/utils/mongoHelpers';

interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  receipt_url?: string;
  created_at: string;
  // Additional flexible fields for MongoDB-style storage
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  tags?: string[];
  mileage?: number;
  vendor?: string;
  payment_method?: string;
  tax_deductible?: boolean;
  notes?: string;
}

export function useExpenses(useDocumentStorage = false) {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadExpenses();
    }
  }, [user]);

  const loadExpenses = async () => {
    try {
      if (!user) return;

      if (useDocumentStorage) {
        // MongoDB-style document storage
        const expensesCollection = createCollection(user.id, 'expenses');
        const { documents, error } = await expensesCollection.find({}, { 
          sort: { date: -1 } 
        });
        
        if (error) throw error;
        
        // Convert documents to expenses format
        const convertedExpenses = documents.map(doc => ({
          id: doc._id,
          user_id: user.id,
          category: doc.category,
          amount: doc.amount,
          description: doc.description,
          date: doc.date,
          receipt_url: doc.receipt_url,
          created_at: doc.created_at || new Date().toISOString(),
        }));
        
        setExpenses(convertedExpenses);
      } else {
        // Traditional SQL approach
        const { data, error } = await supabase
          .from('expenses')
          .select('*')
      if (useDocumentStorage) {
        // MongoDB-style document storage
        id: doc._id,
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshTargets();
    setRefreshing(false);
  };

  const handleSetTargets = async (targetData: any) => {
    const { error } = await setWeeklyTargets(targetData);
    if (error) {
      Alert.alert('Error', 'Failed to set targets');
    } else {
      setShowSetModal(false);
      Alert.alert('Success', 'Targets set successfully');
    }
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <LinearGradient
        colors={isDark ? ['#1e293b', '#0f172a'] : ['#10b981', '#059669']}
        className="pt-16 px-5 pb-6"
      >
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-white text-3xl font-bold">Targets</Text>
          <TouchableOpacity 
            className="bg-white/20 rounded-full p-3"
            onPress={() => setShowSetModal(true)}
          >
            <Plus color="#ffffff" size={24} />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between">
          <View className="flex-1 mr-2">
            <Text className="text-green-200 text-sm mb-1">Today</Text>
            <Text className="text-white text-xl font-bold">{formatCurrency(todayEarnings)}</Text>
          </View>
          <View className="flex-1 mx-2">
            <Text className="text-green-200 text-sm mb-1">This Week</Text>
            <Text className="text-white text-xl font-bold">{formatCurrency(weeklyEarnings)}</Text>
          </View>
          <View className="flex-1 ml-2">
            <Text className="text-green-200 text-sm mb-1">Target</Text>
            <Text className="text-white text-xl font-bold">
              {formatCurrency(currentTargets?.earnings_target || 800)}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        className="flex-1 px-5 -mt-2"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {currentTargets ? (
          <>
            {/* Weekly Progress Overview */}
            <View className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-5 mb-4 mt-4 shadow-sm`}>
              <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Weekly Progress
              </Text>
              <WeeklyProgress 
                targets={{
                  earnings: { target: currentTargets.earnings_target, current: currentProgress.earnings },
                  hours: { target: currentTargets.hours_target, current: currentProgress.hours },
                  trips: { target: currentTargets.trips_target, current: currentProgress.trips },
                }}
              />
            </View>

            {/* Individual Target Cards */}
            <View className="flex-row justify-between mb-4">
              <TargetCard
                title="Earnings"
                target={currentTargets.earnings_target}
                current={currentProgress.earnings}
                unit="£"
                icon={<TrendingUp color="#10b981" size={20} />}
                color="#10b981"
              />
              <TargetCard
                title="Hours"
                target={currentTargets.hours_target}
                current={currentProgress.hours}
                unit=""
                icon={<Clock color="#f59e0b" size={20} />}
                color="#f59e0b"
              />
            </View>

            <TargetCard
              title="Trips"
              target={currentTargets.trips_target}
              current={currentProgress.trips}
              unit=""
              icon={<Car color="#8b5cf6" size={20} />}
              color="#8b5cf6"
              fullWidth
            />
