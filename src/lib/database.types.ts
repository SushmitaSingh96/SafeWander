export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      places: {
        Row: {
          id: string
          name: string
          category: string
          location: string
          description: string
          coordinates: string | null
          hours: string
          image_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          location: string
          description?: string
          coordinates?: string | null
          hours?: string
          image_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          location?: string
          description?: string
          coordinates?: string | null
          hours?: string
          image_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          place_id: string | null
          user_id: string | null
          author_name: string
          rating: number
          safety_score: number
          review_text: string
          visit_time: string
          would_recommend: boolean
          helpful_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          place_id?: string | null
          user_id?: string | null
          author_name: string
          rating: number
          safety_score: number
          review_text: string
          visit_time?: string
          would_recommend?: boolean
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          place_id?: string | null
          user_id?: string | null
          author_name?: string
          rating?: number
          safety_score?: number
          review_text?: string
          visit_time?: string
          would_recommend?: boolean
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      review_tags: {
        Row: {
          id: string
          review_id: string | null
          tag: string
        }
        Insert: {
          id?: string
          review_id?: string | null
          tag: string
        }
        Update: {
          id?: string
          review_id?: string | null
          tag?: string
        }
      }
      place_images: {
        Row: {
          id: string
          place_id: string | null
          image_url: string
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          place_id?: string | null
          image_url: string
          uploaded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          place_id?: string | null
          image_url?: string
          uploaded_by?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}