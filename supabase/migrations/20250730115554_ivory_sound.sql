/*
  # Add MongoDB-style document storage

  1. Table Updates
    - Add JSONB columns to existing tables for flexible document storage
    - Add indexes for efficient JSON querying
    - Add validation functions for JSON data

  2. New Tables
    - `documents` table for pure document storage
    - Flexible schema with JSONB data column

  3. Security
    - Enable RLS on new tables
    - Add policies for document access
*/

-- Add JSONB columns to existing tables for flexible data
DO $$
BEGIN
  -- Add metadata JSONB column to profiles
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'metadata'
  ) THEN
    ALTER TABLE profiles ADD COLUMN metadata JSONB DEFAULT '{}';
  END IF;

  -- Add details JSONB column to earnings
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'earnings' AND column_name = 'details'
  ) THEN
    ALTER TABLE earnings ADD COLUMN details JSONB DEFAULT '{}';
  END IF;

  -- Add metadata JSONB column to expenses
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'expenses' AND column_name = 'metadata'
  ) THEN
    ALTER TABLE expenses ADD COLUMN metadata JSONB DEFAULT '{}';
  END IF;
END $$;

-- Create pure document storage table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  collection text NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add indexes for efficient JSON querying
CREATE INDEX IF NOT EXISTS profiles_metadata_gin_idx ON profiles USING GIN (metadata);
CREATE INDEX IF NOT EXISTS earnings_details_gin_idx ON earnings USING GIN (details);
CREATE INDEX IF NOT EXISTS expenses_metadata_gin_idx ON expenses USING GIN (metadata);
CREATE INDEX IF NOT EXISTS documents_data_gin_idx ON documents USING GIN (data);
CREATE INDEX IF NOT EXISTS documents_collection_idx ON documents(user_id, collection);

-- Enable RLS on documents table
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Policies for documents table
CREATE POLICY "Users can read own documents"
  ON documents
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents"
  ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents"
  ON documents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents"
  ON documents
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Trigger for updating updated_at on documents
CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Helper functions for JSON operations
CREATE OR REPLACE FUNCTION json_merge(a JSONB, b JSONB)
RETURNS JSONB AS $$
BEGIN
  RETURN a || b;
END;
$$ LANGUAGE plpgsql;

-- Function to validate JSON schema (example)
CREATE OR REPLACE FUNCTION validate_earning_details(details JSONB)
RETURNS BOOLEAN AS $$
BEGIN
  -- Example validation: ensure certain fields exist if provided
  IF details ? 'trip_details' THEN
    RETURN details->'trip_details' ? 'pickup_location' AND 
           details->'trip_details' ? 'dropoff_location';
  END IF;
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;