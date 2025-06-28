import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type Review = Database['public']['Tables']['reviews']['Row']
type ReviewInsert = Database['public']['Tables']['reviews']['Insert']

export interface ReviewWithTags extends Review {
  tags: string[]
}

export const useReviews = (placeId?: string) => {
  return useQuery({
    queryKey: ['reviews', placeId],
    queryFn: async (): Promise<ReviewWithTags[]> => {
      let query = supabase
        .from('reviews')
        .select(`
          *,
          review_tags (tag)
        `)
        .order('created_at', { ascending: false })

      if (placeId) {
        query = query.eq('place_id', placeId)
      }

      const { data, error } = await query

      if (error) throw error

      return data.map((review: any) => ({
        ...review,
        tags: review.review_tags?.map((rt: any) => rt.tag) || []
      }))
    },
    enabled: !!placeId
  })
}

export const useCreateReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (reviewData: {
      review: ReviewInsert
      tags: string[]
    }) => {
      const { review, tags } = reviewData

      // Insert the review
      const { data: reviewResult, error: reviewError } = await supabase
        .from('reviews')
        .insert(review)
        .select()
        .single()

      if (reviewError) throw reviewError

      // Insert the tags
      if (tags.length > 0) {
        const tagInserts = tags.map(tag => ({
          review_id: reviewResult.id,
          tag
        }))

        const { error: tagsError } = await supabase
          .from('review_tags')
          .insert(tagInserts)

        if (tagsError) throw tagsError
      }

      return reviewResult
    },
    onSuccess: (data) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      queryClient.invalidateQueries({ queryKey: ['places'] })
      if (data.place_id) {
        queryClient.invalidateQueries({ queryKey: ['place', data.place_id] })
      }
    }
  })
}

export const useUpdateReviewHelpful = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (reviewId: string) => {
      const { data, error } = await supabase
        .from('reviews')
        .select('helpful_count')
        .eq('id', reviewId)
        .single()

      if (error) throw error

      const { error: updateError } = await supabase
        .from('reviews')
        .update({ helpful_count: data.helpful_count + 1 })
        .eq('id', reviewId)

      if (updateError) throw updateError

      return data.helpful_count + 1
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
    }
  })
}