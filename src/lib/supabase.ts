import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zhbgaipl5w7upko5.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_ZhBgAipl5w7upKO57vK6PQ_sfGdn1nl'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Booking {
  id?: string
  tour_id: string
  user_id?: string
  tour_date: string
  guide_language: 'armenian' | 'english' | 'russian'
  num_adults: number
  num_children: number
  total_price_amd: number
  total_price_eur: number
  status: 'pending' | 'confirmed' | 'cancelled'
  stripe_session_id?: string
  created_at?: string
}

export interface UserProfile {
  id?: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  avatar_url?: string
  created_at?: string
}
