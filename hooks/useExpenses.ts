import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
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
          .eq('user_id', user.id)
          .order('date', { ascending: false });
      }
      if (error) throw error;
      
      // Convert documents to expenses format
      const convertedExpenses = documents.map(doc => ({
        id: doc._id,
        category: doc.category,
        amount: doc.amount,
        description: doc.description,
        date: doc.date,
        receipt_url: doc.receipt_url,
        created_at: doc.created_at || new Date().toISOString(),
        location: doc.location,
        tags: doc.tags,
        mileage: doc.mileage,
        vendor: doc.vendor,
        payment_method: doc.payment_method,
        tax_deductible: doc.tax_deductible,
      }
      )
      )
      if (useDocumentStorage) {
        // MongoDB-style document storage
      }
      const { documents, error } = await expensesCollection.find({}, { 
        sort: { date: -1 } 
      });
      
      if (error) throw error;
      
      // Convert documents to expenses format
      const convertedExpenses = documents.map(doc => ({
        id: doc._id,
        category: doc.category,
        amount: doc.amount,
        description: doc.description,
        date: doc.date,
        receipt_url: doc.receipt_url,
        created_at: doc.created_at || new Date().toISOString(),
        location: doc.location,
        tags: doc.tags,
        mileage: doc.mileage,
        vendor: doc.vendor,
        payment_method: doc.payment_method,
      }
      )
      )
      const expensesCollection = createCollection(user.id, 'expenses');
      const { insertedId, error } = await expensesCollection.insertOne({
        ...expenseData,
        created_at: new Date().toISOString(),
        // Add flexible metadata
        metadata: {
          source: 'manual_entry',
          location: null, // Could store GPS coordinates
          tags: [], // Custom tags
          tax_deductible: true, // Default for business expenses
        }
      });
      
      if (error) throw error;
      
      const newExpense = {
        id: insertedId,
        ...expenseData,
        created_at: new Date().toISOString(),
      };
      
      setExpenses(prev => [newExpense, ...prev]);
      return { data: newExpense, error: null };
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

  // MongoDB-style query methods
  const getExpensesByCategory = async (category: string) => {
    if (!user) return [];
    
    const expensesCollection = createCollection(user.id, 'expenses');
    const { documents } = await expensesCollection.find({ category });
    return documents;
  };

  const getExpensesAnalytics = async () => {
    if (!user) return null;
    
    const expensesCollection = createCollection(user.id, 'expenses');
    const { result } = await expensesCollection.aggregate([
      { $group: { _id: '$category', totalAmount: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { totalAmount: -1 } }
    ]);
    return result;
  };

  const getTaxDeductibleExpenses = async () => {
    if (!user) return [];
    
    const expensesCollection = createCollection(user.id, 'expenses');
    const { documents } = await expensesCollection.find({ tax_deductible: true });
    return documents;
  };

  // MongoDB-style query methods
  const getExpensesByCategory = async (category: string) => {
    if (!user) return [];
    
    const expensesCollection = createCollection(user.id, 'expenses');
    const { documents } = await expensesCollection.find({ category });
    return documents;
  };

  const getExpensesAnalytics = async () => {
    if (!user) return null;
    
    const expensesCollection = createCollection(user.id, 'expenses');
    const { result } = await expensesCollection.aggregate([
      { $group: { _id: '$category', totalAmount: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { totalAmount: -1 } }
    ]);
    return result;
  };

  const getTaxDeductibleExpenses = async () => {
    if (!user) return [];
    
    const expensesCollection = createCollection(user.id, 'expenses');
    const { documents } = await expensesCollection.find({ tax_deductible: true });
    return documents;
  };

  return {
    expenses,
    loading,
    addExpense,
    getTotalExpenses,
    getExpensesByCategory,
    getExpensesAnalytics,
    getTaxDeductibleExpenses,
    getExpensesByCategory,
    getExpensesAnalytics,
    getTaxDeductibleExpenses,
    refreshExpenses: loadExpenses,
  };
}