/*
  # Create earnings table

  1. New Tables
    - `earnings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `platform` (text, 'uber' or 'bolt')
      - `date` (date)
      - `gross_amount` (decimal)
      - `platform_fees` (decimal)
      - `net_amount` (decimal)
      - `trips_count` (integer)
      - `hours_worked` (decimal)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `earnings` table
    - Add policies for users to manage their own earnings data
*/

CREATE TABLE IF NOT EXISTS earnings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL CHECK (platform IN ('uber', 'bolt')),
  date date NOT NULL,
  gross_amount decimal(10,2) NOT NULL DEFAULT 0,
  platform_fees decimal(10,2) NOT NULL DEFAULT 0,
  net_amount decimal(10,2) NOT NULL DEFAULT 0,
  trips_count integer NOT NULL DEFAULT 0,
  hours_worked decimal(4,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE earnings ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own earnings
CREATE POLICY "Users can read own earnings"
  ON earnings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to insert their own earnings
CREATE POLICY "Users can insert own earnings"
  ON earnings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own earnings
CREATE POLICY "Users can update own earnings"
  ON earnings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own earnings
CREATE POLICY "Users can delete own earnings"
  ON earnings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS earnings_user_date_idx ON earnings(user_id, date DESC);
CREATE INDEX IF NOT EXISTS earnings_platform_idx ON earnings(user_id, platform);