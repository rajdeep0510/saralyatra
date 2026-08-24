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
      user_profiles: {
        Row: {
          id: string
          name: string
          dietary_preference: string
          home_state: string
          preferred_language: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string
          dietary_preference?: string
          home_state?: string
          preferred_language?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['user_profiles']['Insert']>
        Relationships: []
      }
      saved_trips: {
        Row: {
          id: string
          user_id: string
          title: string
          region: string | null
          category: string | null
          duration_days: number
          trip_data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          user_id: string
          title: string
          region?: string | null
          category?: string | null
          duration_days?: number
          trip_data: Json
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['saved_trips']['Insert']>
        Relationships: []
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
