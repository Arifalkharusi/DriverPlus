import { useState, useEffect, useRef } from 'react';
import { useAuth } from './useAuth';
import { createCollection } from '@/utils/mongoHelpers';

interface Earning {
  id: string;
  platform: 'uber' | 'bolt';
  date: string;
  gross_amount: number;
  platform_fees: number;
  net_amount: number;
  trips_count: number;
  hours_worked: number;
  created_at: string;
  // Additional flexible fields for MongoDB-style storage
  trip_details?: any[];
  location_data?: any;
  weather_conditions?: any;
  surge_multiplier?: number;
  tips?: number;
  bonuses?: number;
}

export function useEarnings() {
  const { user } = useAuth();
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    if (user) {
      loadEarnings();
    }
    
    return () => {
      isMountedRef.current = false;
    };
  }, [user]);

  const loadEarnings = async () => {
    try {
      if (!user) return;

      const earningsCollection = createCollection(user.id, 'earnings');
      const { documents, error } = await earningsCollection.find({}, { 
        sort: { date: -1 } 
      });
      
      if (error) throw error;
      
      // Convert documents to earnings format
      const convertedEarnings = documents.map(doc => ({
        id: doc._id,
        platform: doc.platform,
        date: doc.date,
        gross_amount: doc.gross_amount,
        platform_fees: doc.platform_fees,
        net_amount: doc.net_amount,
        trips_count: doc.trips_count,
        hours_worked: doc.hours_worked,
        created_at: doc.created_at || new Date().toISOString(),
        trip_details: doc.trip_details,
        location_data: doc.location_data,
        weather_conditions: doc.weather_conditions,
        surge_multiplier: doc.surge_multiplier,
        tips: doc.tips,
        bonuses: doc.bonuses,
      }));
      
      if (isMountedRef.current) setEarnings(convertedEarnings);
    } catch (error) {
      console.error('Error loading earnings:', error);
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  };

  const addEarning = async (earningData: any) => {
    try {
      if (!user) throw new Error('No user logged in');

      const earningsCollection = createCollection(user.id, 'earnings');
      const { insertedId, error } = await earningsCollection.insertOne({
        ...earningData,
        created_at: new Date().toISOString(),
        // Add flexible metadata
        metadata: {
          source: 'manual_entry',
          app_version: '1.0.0',
          device_info: null,
        }
      });
      
      if (error) throw error;
      
      const newEarning = {
        id: insertedId,
        ...earningData,
        created_at: new Date().toISOString(),
      };
      
      if (isMountedRef.current) setEarnings(prev => [newEarning, ...prev]);
      return { data: newEarning, error: null };
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

  // MongoDB-style query methods
  const getEarningsByPlatform = async (platform: 'uber' | 'bolt') => {
    if (!user) return [];
    
    const earningsCollection = createCollection(user.id, 'earnings');
    const { documents } = await earningsCollection.find({ platform });
    return documents;
  };

  const getEarningsAnalytics = async () => {
    if (!user) return null;
    
    const earningsCollection = createCollection(user.id, 'earnings');
    const { result } = await earningsCollection.aggregate([
      { $group: { _id: '$platform', totalEarnings: { $sum: '$net_amount' }, count: { $sum: 1 } } },
      { $sort: { totalEarnings: -1 } }
    ]);
    return result;
  };

  return {
    earnings,
    loading,
    addEarning,
    getTodayEarnings,
    getWeeklyEarnings,
    getMonthlyEarnings,
    getHourlyRate,
    getEarningsByPlatform,
    getEarningsAnalytics,
    refreshEarnings: loadEarnings,
  };
}