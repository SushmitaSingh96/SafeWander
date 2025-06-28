import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Shield, Users, TrendingUp, Star, Coffee, Building, Camera } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'AI-powered safety ratings based on real experiences from women travelers'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Reviews and tips from a supportive community of solo female travelers'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Updates',
      description: 'Constantly updated information from Reddit, social media, and user reports'
    }
  ]

  const categories = [
    { icon: Coffee, name: 'Cafes & Restaurants', count: '2,847' },
    { icon: Building, name: 'Hotels & Stays', count: '1,523' },
    { icon: Camera, name: 'Tourist Attractions', count: '3,291' },
    { icon: MapPin, name: 'Transportation', count: '892' }
  ]

  const recentReviews = [
    {
      id: 1,
      place: 'Blue Bottle Coffee',
      location: 'Tokyo, Japan',
      rating: 4.8,
      review: 'Perfect spot for solo work sessions. Great WiFi, friendly staff, and felt very safe.',
      author: 'Sarah M.',
      category: 'Cafe'
    },
    {
      id: 2,
      place: 'Hostel World Shibuya',
      location: 'Tokyo, Japan',
      rating: 4.6,
      review: 'Female-only dorms available. Great security and helpful staff for solo travelers.',
      author: 'Emma L.',
      category: 'Accommodation'
    },
    {
      id: 3,
      place: 'Senso-ji Temple',
      location: 'Tokyo, Japan',
      rating: 4.9,
      review: 'Beautiful temple, well-lit paths, and plenty of other tourists around. Felt very safe.',
      author: 'Lisa K.',
      category: 'Attraction'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Travel Solo,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                {' '}Travel Safe
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover safe spaces, trusted accommodations, and hidden gems recommended by women travelers worldwide. 
              Our AI continuously monitors reviews and experiences to keep you informed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore" className="btn-primary text-lg px-8 py-3">
                Start Exploring
              </Link>
              <Link to="/add-review" className="btn-secondary text-lg px-8 py-3">
                Share Your Experience
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose SafeWander?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built by women, for women. Our platform combines AI intelligence with community wisdom.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="card text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-600">
              Find exactly what you're looking for
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="card hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <category.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} places</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest Reviews
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from our community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {recentReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="card hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                    {review.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">{review.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{review.place}</h3>
                <p className="text-sm text-gray-500 mb-3">{review.location}</p>
                <p className="text-gray-700 mb-4">"{review.review}"</p>
                <p className="text-sm text-gray-500">— {review.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Help other women travel safely by sharing your experiences
            </p>
            <Link
              to="/add-review"
              className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Add Your First Review
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home