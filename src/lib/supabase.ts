import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if environment variables are properly configured
if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'https://your-project.supabase.co' || 
    supabaseAnonKey === 'your-anon-key-here') {
  console.warn('Supabase not configured. Using mock mode for development.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Mock auth functions for development when Supabase is not configured
export const mockAuth = {
  signUp: async (email: string, password: string) => {
    console.log('Mock sign up:', email)
    return { data: { user: { id: '1', email } }, error: null }
  },
  signIn: async (email: string, password: string) => {
    console.log('Mock sign in:', email)
    return { data: { user: { id: '1', email } }, error: null }
  },
  signOut: async () => {
    console.log('Mock sign out')
    return { error: null }
  },
  getUser: async () => {
    return { data: { user: null }, error: null }
  }
}

// Export the appropriate auth based on configuration
export const auth = (supabaseUrl === 'https://your-project.supabase.co') ? mockAuth : supabase.auth