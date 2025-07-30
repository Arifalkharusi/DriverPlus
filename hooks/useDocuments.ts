import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/utils/supabase';
import { useAuth } from './useAuth';

interface Document {
  id: string;
  user_id: string;
  collection: string;
  data: any;
  created_at: string;
  updated_at: string;
}

export function useDocuments(collection?: string) {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    if (user) {
      loadDocuments();
    }
    
    return () => {
      isMountedRef.current = false;
    };
  }, [user, collection]);

  const loadDocuments = async () => {
    try {
      if (!user) return;

      let query = supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (collection) {
        query = query.eq('collection', collection);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (isMountedRef.current) setDocuments(data || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  };

  // Create a new document
  const createDocument = async (collection: string, data: any) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { data: doc, error } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          collection,
          data,
        })
        .select()
        .single();

      if (error) throw error;

      if (isMountedRef.current) setDocuments(prev => [doc, ...prev]);
      return { data: doc, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Update a document
  const updateDocument = async (id: string, data: any) => {
    try {
      const { data: doc, error } = await supabase
        .from('documents')
        .update({ data })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      if (isMountedRef.current) {
        setDocuments(prev => 
          prev.map(d => d.id === id ? doc : d)
        );
      }
      return { data: doc, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Delete a document
  const deleteDocument = async (id: string) => {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);

      if (error) throw error;

      if (isMountedRef.current) setDocuments(prev => prev.filter(d => d.id !== id));
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  // Query documents with MongoDB-style queries
  const queryDocuments = async (collection: string, query: any) => {
    try {
      if (!user) throw new Error('No user logged in');

      let supabaseQuery = supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .eq('collection', collection);

      // Add JSON queries
      Object.entries(query).forEach(([key, value]) => {
        if (key.includes('.')) {
          // Nested field query: "trip.distance"
          supabaseQuery = supabaseQuery.eq(`data->${key.replace('.', '->')}`, value);
        } else {
          // Top-level field query
          supabaseQuery = supabaseQuery.eq(`data->>${key}`, value);
        }
      });

      const { data, error } = await supabaseQuery;

      if (error) throw error;

      return { data: data || [], error: null };
    } catch (error) {
      return { data: [], error };
    }
  };

  // Find documents by JSON path
  const findByPath = async (collection: string, path: string, value: any) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .eq('collection', collection)
        .eq(`data->>${path}`, value);

      if (error) throw error;

      return { data: data || [], error: null };
    } catch (error) {
      return { data: [], error };
    }
  };

  return {
    documents,
    loading,
    createDocument,
    updateDocument,
    deleteDocument,
    queryDocuments,
    findByPath,
    refreshDocuments: loadDocuments,
  };
}

// Helper hook for specific collections
export function useTripsCollection() {
  return useDocuments('trips');
}

export function useSettingsCollection() {
  return useDocuments('settings');
}

export function useAnalyticsCollection() {
  return useDocuments('analytics');
}