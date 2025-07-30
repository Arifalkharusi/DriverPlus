import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/utils/supabase';
import { storeUserToken, getUserToken, removeUserToken } from '@/utils/storage';

interface User {
  id: string;
  email: string;
  created_at: string;
}

interface Profile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  city?: string;
  created_at: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    
    let isInitialLoad = true;

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          if (isMountedRef.current) setUser(session.user as User);
          await loadProfile(session.user.id);
        } else {
          if (isMountedRef.current) {
            setUser(null);
            setProfile(null);
          }
        }
        if (isMountedRef.current && isInitialLoad) {
          setLoading(false);
          isInitialLoad = false;
        }
      }
    );

    // Check for existing session
    checkSession();

    return () => {
      isMountedRef.current = false;
      subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        if (isMountedRef.current) setUser(session.user as User);
        await loadProfile(session.user.id);
      } else {
        if (isMountedRef.current) setLoading(false);
      }
    } catch (error) {
      console.error('Error checking session:', error);
      if (isMountedRef.current) setLoading(false);
    }
  };

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (isMountedRef.current) setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await storeUserToken(data.session?.access_token || '');
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signUp = async (email: string, password: string, profileData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: data.user.id,
            email,
            first_name: profileData.firstName,
            last_name: profileData.lastName,
            phone: profileData.phone,
            city: profileData.city,
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }

        await storeUserToken(data.session?.access_token || '');
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      await removeUserToken();
      if (isMountedRef.current) {
        setUser(null);
        setProfile(null);
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      if (isMountedRef.current) setProfile(data);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };
}