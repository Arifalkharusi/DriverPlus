import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useAuth } from './useAuth';
import type { Database } from '@/utils/supabase';

type Earning = Database['public']['Tables']['earnings']['Row'];
type EarningInsert = Database['public']['Tables']['earnings']['Insert'];

export function useEarnings() {
  const { user } = useAuth();
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadEarnings();
    }
  }, [user]);

  const loadEarnings = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from('earnings')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      setEarnings(data || []);
    } catch (error) {
      console.error('Error loading earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEarning = async (earning: Omit<EarningInsert, 'user_id'>) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('earnings')
        .insert({ ...earning, user_id: user.id })
        .select()
        .single();

      if (error) throw error;

      setEarnings(prev => [data, ...prev]);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const getTodayEarnings = () => {
    const today = new Date().toISOString().split('T')[0];
    return earnings
      .filter(e => e.date === today)
      .reduce((sum, e) => sum + e.net_amount, 0);
  };

  const getWeeklyEarnings = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    return earnings
      .filter(e => new Date(e.date) >= weekAgo)
      .reduce((sum, e) => sum + e.net_amount, 0);
  };

  const getMonthlyEarnings = () => {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    
    return earnings
      .filter(e => new Date(e.date) >= monthAgo)
      .reduce((sum, e) => sum + e.net_amount, 0);
  };

  const getHourlyRate = (period: 'today' | 'week' | 'month' = 'today') => {
    let filteredEarnings: Earning[];
    
    switch (period) {
      case 'week':
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        filteredEarnings = earnings.filter(e => new Date(e.date) >= weekAgo);
        break;
      case 'month':
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        filteredEarnings = earnings.filter(e => new Date(e.date) >= monthAgo);
        break;
      default:
        const today = new Date().toISOString().split('T')[0];
        filteredEarnings = earnings.filter(e => e.date === today);
    }
    
    const totalEarnings = filteredEarnings.reduce((sum, e) => sum + e.net_amount, 0);
    const totalHours = filteredEarnings.reduce((sum, e) => sum + e.hours_worked, 0);
    
    return totalHours > 0 ? totalEarnings / totalHours : 0;
  };

  return {
    earnings,
    loading,
    addEarning,
    getTodayEarnings,
    getWeeklyEarnings,
    getMonthlyEarnings,
    getHourlyRate,
    refreshEarnings: loadEarnings,
  };
}