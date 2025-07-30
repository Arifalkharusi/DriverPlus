/*
  # Create targets table

  1. New Tables
    - `targets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `week_start` (date)
      - `earnings_target` (decimal)
      - `hours_target` (decimal)
      - `trips_target` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `targets` table
    - Add policies for users to manage their own targets
*/

CREATE TABLE IF NOT EXISTS targets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  week_start date NOT NULL,
  earnings_target decimal(10,2) NOT NULL DEFAULT 0,
  hours_target decimal(4,2) NOT NULL DEFAULT 0,
  trips_target integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, week_start)
);

ALTER TABLE targets ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own targets
CREATE POLICY "Users can read own targets"
  ON targets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to insert their own targets
CREATE POLICY "Users can insert own targets"
  ON targets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own targets
CREATE POLICY "Users can update own targets"
  ON targets
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own targets
CREATE POLICY "Users can delete own targets"
  ON targets
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS targets_user_week_idx ON targets(user_id, week_start DESC);