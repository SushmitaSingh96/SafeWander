import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type Place = Database['public']['Tables']['places']['Row']
type PlaceInsert = Database['public']['Tables']['places']['Insert']

// Helper function to parse coordinates
const parseCoordinates = (coordinates: string | null): [number, number] => {
  if (!coordinates) return [0, 0]
  
  // Parse PostgreSQL point format: "(lng,lat)"
  const match = coordinates.match(/\(([^,]+),([^)]+)\)/)
  if (match) {
    const lng = parseFloat(match[1])
    const lat = parseFloat(match[2])
    return [lat, lng] // Return as [lat, lng] for consistency with our app
  }
  
  return [0, 0]
}

// Helper function to format coordinates for database
const formatCoordinates = (lat: number, lng: number): string => {
  return `(${lng},${lat})` // PostgreSQL point format: (lng,lat)
}

export interface PlaceWithStats extends Omit<Place, 'coordinates'> {
  coordinates: [number, number]
  rating: number
  safetyScore: number
  totalReviews: number
  tags: string[]
  lastUpdated: string
}

export const usePlaces = (category?: string, searchQuery?: string) => {
  return useQuery({
    queryKey: ['places', category, searchQuery],
    queryFn: async (): Promise<PlaceWithStats[]> => {
      let query = supabase
        .from('places')
        .select(`
          *,
          reviews (
            rating,
            safety_score,
            created_at,
            review_tags (tag)
          )
        `)

      if (category && category !== 'all') {
        query = query.eq('category', category)
      }

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`)
      }

      const { data, error } = await query

      if (error) throw error

      return data.map((place: any) => {
        const reviews = place.reviews || []
        const totalReviews = reviews.length
        
        // Calculate average rating and safety score
        const avgRating = totalReviews > 0 
          ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / totalReviews 
          : 0
        
        const avgSafetyScore = totalReviews > 0 
          ? reviews.reduce((sum: number, r: any) => sum + r.safety_score, 0) / totalReviews 
          : 0

        // Get unique tags from all reviews
        const allTags = reviews.flatMap((r: any) => r.review_tags?.map((rt: any) => rt.tag) || [])
        const uniqueTags = [...new Set(allTags)]

        // Get most recent review date
        const lastReviewDate = reviews.length > 0 
          ? Math.max(...reviews.map((r: any) => new Date(r.created_at).getTime()))
          : new Date(place.updated_at).getTime()

        const lastUpdated = formatTimeAgo(new Date(lastReviewDate))

        return {
          ...place,
          coordinates: parseCoordinates(place.coordinates),
          rating: Math.round(avgRating * 10) / 10,
          safetyScore: Math.round(avgSafetyScore * 10) / 10,
          totalReviews,
          tags: uniqueTags.slice(0, 3), // Show top 3 tags
          lastUpdated
        }
      })
    }
  })
}

export const usePlace = (id: string) => {
  return useQuery({
    queryKey: ['place', id],
    queryFn: async (): Promise<PlaceWithStats | null> => {
      const { data, error } = await supabase
        .from('places')
        .select(`
          *,
          reviews (
            *,
            review_tags (tag)
          ),
          place_images (image_url)
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      if (!data) return null

      const reviews = data.reviews || []
      const totalReviews = reviews.length
      
      const avgRating = totalReviews > 0 
        ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / totalReviews 
        : 0
      
      const avgSafetyScore = totalReviews > 0 
        ? reviews.reduce((sum: number, r: any) => sum + r.safety_score, 0) / totalReviews 
        : 0

      const allTags = reviews.flatMap((r: any) => r.review_tags?.map((rt: any) => rt.tag) || [])
      const uniqueTags = [...new Set(allTags)]

      const lastReviewDate = reviews.length > 0 
        ? Math.max(...reviews.map((r: any) => new Date(r.created_at).getTime()))
        : new Date(data.updated_at).getTime()

      return {
        ...data,
        coordinates: parseCoordinates(data.coordinates),
        rating: Math.round(avgRating * 10) / 10,
        safetyScore: Math.round(avgSafetyScore * 10) / 10,
        totalReviews,
        tags: uniqueTags,
        lastUpdated: formatTimeAgo(new Date(lastReviewDate))
      }
    },
    enabled: !!id
  })
}

export const useCreatePlace = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (place: PlaceInsert & { coordinates?: [number, number] }) => {
      const { coordinates, ...placeData } = place
      
      const dataToInsert = {
        ...placeData,
        coordinates: coordinates ? formatCoordinates(coordinates[0], coordinates[1]) : null
      }

      const { data, error } = await supabase
        .from('places')
        .insert(dataToInsert)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] })
    }
  })
}

// Helper function to format time ago
const formatTimeAgo = (date: Date): string => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays} days ago`
  }
  
  const diffInMonths = Math.floor(diffInDays / 30)
  return `${diffInMonths} months ago`
}