/*
  # Seed Sample Data

  1. Sample Places
    - Add some initial places in Tokyo for demonstration
    - Include various categories and safety scores

  2. Sample Reviews
    - Add reviews for the sample places
    - Include different ratings and safety scores
    - Add review tags for each review
*/

-- Insert sample places
INSERT INTO places (name, category, location, description, coordinates, hours, image_url) VALUES
(
  'Blue Bottle Coffee',
  'Cafe',
  'Shibuya, Tokyo, Japan',
  'A popular coffee chain known for its high-quality beans and minimalist aesthetic. This Shibuya location is particularly welcoming to solo travelers.',
  point(139.6503, 35.6762),
  'Mon-Sun: 7:00 AM - 10:00 PM',
  'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800'
),
(
  'Capsule Hotel Zen',
  'Hotel',
  'Shinjuku, Tokyo, Japan',
  'Modern capsule hotel with female-only floors and excellent security. Perfect for solo female travelers looking for safe, affordable accommodation.',
  point(139.6917, 35.6896),
  '24/7 Check-in',
  'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800'
),
(
  'Senso-ji Temple',
  'Attraction',
  'Asakusa, Tokyo, Japan',
  'Tokyo''s oldest temple with beautiful architecture and well-maintained grounds. Very safe for solo visitors with good lighting and regular patrols.',
  point(139.7967, 35.7148),
  'Daily: 6:00 AM - 5:00 PM',
  'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-temple-161401.jpeg?auto=compress&cs=tinysrgb&w=800'
),
(
  'Starbucks Reserve Roastery',
  'Cafe',
  'Nakameguro, Tokyo, Japan',
  'Premium Starbucks location with spacious seating and excellent atmosphere for solo work or meetings. Located in a very safe neighborhood.',
  point(139.6982, 35.6434),
  'Mon-Sun: 7:00 AM - 11:00 PM',
  'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800'
);

-- Note: We'll add sample reviews and tags after users start using the app
-- This ensures we have proper user authentication in place