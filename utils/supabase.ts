import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          city: string;
          phone?: string;
          avatar_url?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          city: string;
          phone?: string;
          avatar_url?: string;
        };
        Update: {
          first_name?: string;
          last_name?: string;
          city?: string;
          phone?: string;
          avatar_url?: string;
          updated_at?: string;
        };
      };
      earnings: {
        Row: {
          id: string;
          user_id: string;
          platform: 'uber' | 'bolt';
          date: string;
          gross_amount: number;
          platform_fees: number;
          net_amount: number;
          trips_count: number;
          hours_worked: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          platform: 'uber' | 'bolt';
          date: string;
          gross_amount: number;
          platform_fees: number;
          net_amount: number;
          trips_count: number;
          hours_worked: number;
        };
        Update: {
          gross_amount?: number;
          platform_fees?: number;
          net_amount?: number;
          trips_count?: number;
          hours_worked?: number;
        };
      };
      expenses: {
        Row: {
          id: string;
          user_id: string;
          category: string;
          amount: number;
          description: string;
          date: string;
          receipt_url?: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          category: string;
          amount: number;
          description: string;
          date: string;
          receipt_url?: string;
        };
        Update: {
          category?: string;
          amount?: number;
          description?: string;
          date?: string;
          receipt_url?: string;
        };
      };
      targets: {
        Row: {
          id: string;
          user_id: string;
          week_start: string;
          earnings_target: number;
          hours_target: number;
          trips_target: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          week_start: string;
          earnings_target: number;
          hours_target: number;
          trips_target: number;
        };
        Update: {
          earnings_target?: number;
          hours_target?: number;
          trips_target?: number;
        };
      };
    };
  };
};