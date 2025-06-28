/*
  # Initial SafeWander Database Schema

  1. New Tables
    - `places`
      - `id` (uuid, primary key)
      - `name` (text, place name)
      - `category` (text, place category)
      - `location` (text, location description)
      - `description` (text, detailed description)
      - `coordinates` (point, lat/lng coordinates)
      - `hours` (text, operating hours)
      - `image_url` (text, main image URL)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `reviews`
      - `id` (uuid, primary key)
      - `place_id` (uuid, foreign key to places)
      - `user_id` (uuid, foreign key to auth.users)
      - `author_name` (text, display name)
      - `rating` (integer, 1-5 rating)
      - `safety_score` (numeric, 1-10 safety rating)
      - `review_text` (text, review content)
      - `visit_time` (text, when they visited)
      - `would_recommend` (boolean)
      - `helpful_count` (integer, helpful votes)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `review_tags`
      - `id` (uuid, primary key)
      - `review_id` (uuid, foreign key to reviews)
      - `tag` (text, tag name)
    
    - `place_images`
      - `id` (uuid, primary key)
      - `place_id` (uuid, foreign key to places)
      - `image_url` (text, image URL)
      - `uploaded_by` (uuid, foreign key to auth.users)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read all data
    - Add policies for authenticated users to create/update their own reviews
    - Add policies for authenticated users to upload images

  3. Indexes
    - Add indexes for better query performance on coordinates, ratings, and categories
*/

-- Create places table
CREATE TABLE IF NOT EXISTS places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  location text NOT NULL,
  description text DEFAULT '',
  coordinates point,
  hours text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id uuid REFERENCES places(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  safety_score numeric(3,1) NOT NULL CHECK (safety_score >= 1 AND safety_score <= 10),
  review_text text NOT NULL,
  visit_time text DEFAULT '',
  would_recommend boolean DEFAULT true,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create review_tags table
CREATE TABLE IF NOT EXISTS review_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid REFERENCES reviews(id) ON DELETE CASCADE,
  tag text NOT NULL
);

-- Create place_images table
CREATE TABLE IF NOT EXISTS place_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id uuid REFERENCES places(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE place_images ENABLE ROW LEVEL SECURITY;

-- Places policies (public read, authenticated write)
CREATE POLICY "Anyone can read places"
  ON places
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create places"
  ON places
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update places"
  ON places
  FOR UPDATE
  TO authenticated
  USING (true);

-- Reviews policies
CREATE POLICY "Anyone can read reviews"
  ON reviews
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Review tags policies
CREATE POLICY "Anyone can read review tags"
  ON review_tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage review tags"
  ON review_tags
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM reviews 
      WHERE reviews.id = review_tags.review_id 
      AND reviews.user_id = auth.uid()
    )
  );

-- Place images policies
CREATE POLICY "Anyone can read place images"
  ON place_images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can upload images"
  ON place_images
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_places_category ON places(category);
CREATE INDEX IF NOT EXISTS idx_places_coordinates ON places USING GIST(coordinates);
CREATE INDEX IF NOT EXISTS idx_reviews_place_id ON reviews(place_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_safety_score ON reviews(safety_score);
CREATE INDEX IF NOT EXISTS idx_review_tags_review_id ON review_tags(review_id);
CREATE INDEX IF NOT EXISTS idx_place_images_place_id ON place_images(place_id);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_places_updated_at
  BEFORE UPDATE ON places
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();