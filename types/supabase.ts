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
      collections: {
        Row: {
          id: string
          user_id: string
          case_id: string
          type: 'LIKE' | 'FAVORITE'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          case_id: string
          type: 'LIKE' | 'FAVORITE'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          case_id?: string
          type?: 'LIKE' | 'FAVORITE'
          created_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          theme_preference: string | null
          language_preference: string | null
          notification_settings: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          theme_preference?: string | null
          language_preference?: string | null
          notification_settings?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          theme_preference?: string | null
          language_preference?: string | null
          notification_settings?: Json | null
        }
      }
    }
    Views: {
      users_view: {
        Row: {
          id: string
          email: string | null
          provider: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      CollectionType: 'LIKE' | 'FAVORITE'
    }
  }
} 