import { supabase } from './supabase';

/**
 * MongoDB-style helper functions for Supabase JSONB operations
 */

export class SupabaseMongo {
  private userId: string;
  private collection: string;

  constructor(userId: string, collection: string) {
    this.userId = userId;
    this.collection = collection;
  }

  // MongoDB-style insertOne
  async insertOne(document: any) {
    const { data, error } = await supabase
      .from('documents')
      .insert({
        user_id: this.userId,
        collection: this.collection,
        data: document,
      })
      .select()
      .single();

    return { insertedId: data?.id, error };
  }

  // MongoDB-style insertMany
  async insertMany(documents: any[]) {
    const { data, error } = await supabase
      .from('documents')
      .insert(
        documents.map(doc => ({
          user_id: this.userId,
          collection: this.collection,
          data: doc,
        }))
      )
      .select();

    return { insertedIds: data?.map(d => d.id) || [], error };
  }

  // MongoDB-style findOne
  async findOne(query: any = {}) {
    let supabaseQuery = supabase
      .from('documents')
      .select('*')
      .eq('user_id', this.userId)
      .eq('collection', this.collection)
      .limit(1);

    // Apply query filters
    supabaseQuery = this.applyQuery(supabaseQuery, query);

    const { data, error } = await supabaseQuery;
    return { document: data?.[0]?.data || null, error };
  }

  // MongoDB-style find
  async find(query: any = {}, options: { limit?: number; sort?: any } = {}) {
    let supabaseQuery = supabase
      .from('documents')
      .select('*')
      .eq('user_id', this.userId)
      .eq('collection', this.collection);

    // Apply query filters
    supabaseQuery = this.applyQuery(supabaseQuery, query);

    // Apply limit
    if (options.limit) {
      supabaseQuery = supabaseQuery.limit(options.limit);
    }

    // Apply sorting
    if (options.sort) {
      Object.entries(options.sort).forEach(([field, direction]) => {
        const ascending = direction === 1;
        if (field.includes('.')) {
          // Sort by nested JSON field
          supabaseQuery = supabaseQuery.order(`data->${field.replace('.', '->')}`, { ascending });
        } else {
          // Sort by top-level field
          supabaseQuery = supabaseQuery.order(`data->>${field}`, { ascending });
        }
      });
    }

    const { data, error } = await supabaseQuery;
    return { documents: data?.map(d => ({ _id: d.id, ...d.data })) || [], error };
  }

  // MongoDB-style updateOne
  async updateOne(query: any, update: any) {
    // First find the document
    const { document } = await this.findOne(query);
    if (!document) {
      return { modifiedCount: 0, error: new Error('Document not found') };
    }

    // Apply update operations
    const updatedData = this.applyUpdate(document, update);

    const { data, error } = await supabase
      .from('documents')
      .update({ data: updatedData })
      .eq('user_id', this.userId)
      .eq('collection', this.collection)
      .select();

    return { modifiedCount: data?.length || 0, error };
  }

  // MongoDB-style deleteOne
  async deleteOne(query: any) {
    let supabaseQuery = supabase
      .from('documents')
      .delete()
      .eq('user_id', this.userId)
      .eq('collection', this.collection);

    supabaseQuery = this.applyQuery(supabaseQuery, query);

    const { data, error } = await supabaseQuery;
    return { deletedCount: data?.length || 0, error };
  }

  // MongoDB-style aggregate (basic support)
  async aggregate(pipeline: any[]) {
    // Basic aggregation support - would need more complex implementation for full MongoDB compatibility
    const { documents, error } = await this.find();
    
    if (error) return { result: [], error };

    // Simple pipeline processing
    let result = documents;
    
    for (const stage of pipeline) {
      if (stage.$match) {
        result = result.filter(doc => this.matchesQuery(doc, stage.$match));
      }
      if (stage.$group) {
        // Basic grouping implementation
        result = this.groupDocuments(result, stage.$group);
      }
      if (stage.$sort) {
        result = this.sortDocuments(result, stage.$sort);
      }
      if (stage.$limit) {
        result = result.slice(0, stage.$limit);
      }
    }

    return { result, error: null };
  }

  private applyQuery(query: any, filters: any) {
    Object.entries(filters).forEach(([key, value]) => {
      if (key.includes('.')) {
        // Nested field query
        query = query.eq(`data->${key.replace('.', '->')}`, value);
      } else {
        // Top-level field query
        query = query.eq(`data->>${key}`, value);
      }
    });
    return query;
  }

  private applyUpdate(document: any, update: any): any {
    const result = { ...document };

    if (update.$set) {
      Object.entries(update.$set).forEach(([key, value]) => {
        this.setNestedValue(result, key, value);
      });
    }

    if (update.$unset) {
      Object.keys(update.$unset).forEach(key => {
        this.unsetNestedValue(result, key);
      });
    }

    if (update.$inc) {
      Object.entries(update.$inc).forEach(([key, value]) => {
        const current = this.getNestedValue(result, key) || 0;
        this.setNestedValue(result, key, current + (value as number));
      });
    }

    return result;
  }

  private setNestedValue(obj: any, path: string, value: any) {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current)) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
  }

  private getNestedValue(obj: any, path: string) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  private unsetNestedValue(obj: any, path: string) {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current)) return;
      current = current[keys[i]];
    }
    
    delete current[keys[keys.length - 1]];
  }

  private matchesQuery(document: any, query: any): boolean {
    return Object.entries(query).every(([key, value]) => {
      const docValue = this.getNestedValue(document, key);
      return docValue === value;
    });
  }

  private groupDocuments(documents: any[], groupStage: any): any[] {
    // Basic grouping implementation
    const groups: { [key: string]: any[] } = {};
    
    documents.forEach(doc => {
      const groupKey = this.getNestedValue(doc, groupStage._id.replace('$', ''));
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(doc);
    });

    return Object.entries(groups).map(([key, docs]) => ({
      _id: key,
      count: docs.length,
      documents: docs,
    }));
  }

  private sortDocuments(documents: any[], sortStage: any): any[] {
    return documents.sort((a, b) => {
      for (const [field, direction] of Object.entries(sortStage)) {
        const aVal = this.getNestedValue(a, field);
        const bVal = this.getNestedValue(b, field);
        
        if (aVal < bVal) return direction === 1 ? -1 : 1;
        if (aVal > bVal) return direction === 1 ? 1 : -1;
      }
      return 0;
    });
  }
}

// Factory function to create MongoDB-style collections
export function createCollection(userId: string, collectionName: string) {
  return new SupabaseMongo(userId, collectionName);
}

// Example usage functions
export const mongoExamples = {
  // Store trip data as documents
  async storeTrip(userId: string, tripData: any) {
    const trips = createCollection(userId, 'trips');
    return await trips.insertOne({
      ...tripData,
      timestamp: new Date().toISOString(),
    });
  },

  // Query trips by date range
  async getTripsByDateRange(userId: string, startDate: string, endDate: string) {
    const trips = createCollection(userId, 'trips');
    return await trips.find({
      'date': { $gte: startDate, $lte: endDate }
    });
  },

  // Update trip rating
  async updateTripRating(userId: string, tripId: string, rating: number) {
    const trips = createCollection(userId, 'trips');
    return await trips.updateOne(
      { tripId },
      { $set: { rating, updatedAt: new Date().toISOString() } }
    );
  },

  // Get analytics aggregation
  async getTripAnalytics(userId: string) {
    const trips = createCollection(userId, 'trips');
    return await trips.aggregate([
      { $group: { _id: '$platform', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
  },
};