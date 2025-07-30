import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useAuth } from './useAuth';
import { createCollection } from '@/utils/mongoHelpers';
import type { Database } from '@/utils/supabase';

type Expense = Database['public']['Tables']['expenses']['Row'];
type ExpenseInsert = Database['public']['Tables']['expenses']['Insert'];

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
          .eq('user_id', user.id)
          .order('date', { ascending: false });

        if (error) throw error;

        setExpenses(data || []);
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: Omit<ExpenseInsert, 'user_id'>) => {
    try {
      if (!user) throw new Error('No user logged in');

      if (useDocumentStorage) {
        // MongoDB-style document storage
        const expensesCollection = createCollection(user.id, 'expenses');
        const { data, error } = await expensesCollection.insertOne({
          ...expense,
          created_at: new Date().toISOString(),
          // Add flexible fields for receipts, location, etc.
          metadata: {
            source: 'manual_entry',
            location: null, // Could store GPS coordinates
            tags: [], // Custom tags
          }
        });
        
        if (error) throw error;
        
        // Convert back to expense format for state
        const newExpense = {
          id: data.insertedId,
          user_id: user.id,
          ...expense,
          created_at: new Date().toISOString(),
        };
        
        setExpenses(prev => [newExpense, ...prev]);
        return { data: newExpense, error: null };
      } else {
        // Traditional SQL approach
        const { data, error } = await supabase
          .from('expenses')
          .insert({ ...expense, user_id: user.id })
          .select()
          .single();

        if (error) throw error;

        setExpenses(prev => [data, ...prev]);
        return { data: null, error };
      }
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