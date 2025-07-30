import { useState, useEffect, useRef } from 'react';
import { useAuth } from './useAuth';
import { createCollection } from '@/utils/mongoHelpers';

interface Target {
  id: string;
  week_start: string;
  earnings_target: number;
  hours_target: number;
  trips_target: number;
  created_at: string;
  // Additional flexible fields for MongoDB-style storage
  notes?: string;
  priority?: 'low' | 'medium' | 'high';
  custom_metrics?: {
    [key: string]: {
      target: number;
      current: number;
      unit: string;
    };
  };
  weekly_plan?: {
    [day: string]: {
      hours: string;
      focus_area: string;
      expected_earnings: number;
    };
  };
}

export function useTargets() {
  const { user } = useAuth();
  const [targets, setTargets] = useState<Target[]>([]);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    if (user) {
      loadTargets();
    }
    
    return () => {
      isMountedRef.current = false;
    };
  }, [user]);

  const loadTargets = async () => {
    try {
      if (!user) return;

      const targetsCollection = createCollection(user.id, 'targets');
      const { documents, error } = await targetsCollection.find({}, { 
        sort: { week_start: -1 } 
      });
      
      if (error) throw error;
      
      const convertedTargets = documents.map(doc => ({
        id: doc._id,
        week_start: doc.week_start,
        earnings_target: doc.earnings_target,
        hours_target: doc.hours_target,
        trips_target: doc.trips_target,
        created_at: doc.created_at || new Date().toISOString(),
        notes: doc.notes,
        priority: doc.priority,
        custom_metrics: doc.custom_metrics,
        weekly_plan: doc.weekly_plan,
      }));
      
      if (isMountedRef.current) setTargets(convertedTargets);
    } catch (error) {
      console.error('Error loading targets:', error);
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  };

  const setWeeklyTargets = async (targetData: any) => {
    try {
      if (!user) throw new Error('No user logged in');

      const targetsCollection = createCollection(user.id, 'targets');
      
      // Check if targets already exist for this week
      const { documents: existing } = await targetsCollection.find({ 
        week_start: targetData.week_start 
      });

      if (existing.length > 0) {
        // Update existing targets
        const { error } = await targetsCollection.updateOne(
          { week_start: targetData.week_start },
          { $set: { ...targetData, updated_at: new Date().toISOString() } }
        );
        if (error) throw error;
      } else {
        // Create new targets
        const { insertedId, error } = await targetsCollection.insertOne({
          ...targetData,
          created_at: new Date().toISOString(),
          priority: 'medium',
          custom_metrics: {},
        });
        if (error) throw error;
      }

      await loadTargets();
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const getCurrentWeekTargets = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekStart = startOfWeek.toISOString().split('T')[0];
    
    return targets.find(t => t.week_start === weekStart) || null;
  };

  const getTargetsAnalytics = async () => {
    if (!user) return null;
    
    const targetsCollection = createCollection(user.id, 'targets');
    const { result } = await targetsCollection.aggregate([
      { $group: { 
        _id: null, 
        avgEarningsTarget: { $avg: '$earnings_target' },
        avgHoursTarget: { $avg: '$hours_target' },
        totalWeeks: { $sum: 1 }
      }}
    ]);
    return result[0] || null;
  };

  return {
    targets,
    loading,
    setWeeklyTargets,
    getCurrentWeekTargets,
    getTargetsAnalytics,
    refreshTargets: loadTargets,
  };
}