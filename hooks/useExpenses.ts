import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useAuth } from './useAuth';
import type { Database } from '@/utils/supabase';

type Expense = Database['public']['Tables']['expenses']['Row'];
type ExpenseInsert = Database['public']['Tables']['expenses']['Insert'];

export function useExpenses() {
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

      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      setExpenses(data || []);
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: Omit<ExpenseInsert, 'user_id'>) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('expenses')
        .insert({ ...expense, user_id: user.id })
        .select()
        .single();

      if (error) throw error;

      setExpenses(prev => [data, ...prev]);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const getTotalExpenses = (period: 'today' | 'week' | 'month' = 'month') => {
    let filteredExpenses: Expense[];
    
    switch (period) {
      case 'today':
        const today = new Date().toISOString().split('T')[0];
        filteredExpenses = expenses.filter(e => e.date === today);
        break;
      case 'week':
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        filteredExpenses = expenses.filter(e => new Date(e.date) >= weekAgo);
        break;
      default:
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        filteredExpenses = expenses.filter(e => new Date(e.date) >= monthAgo);
    }
    
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  return {
    expenses,
    loading,
    addExpense,
    getTotalExpenses,
    refreshExpenses: loadExpenses,
  };
}