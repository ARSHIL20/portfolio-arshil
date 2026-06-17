export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_emails: {
        Row: {
          created_at: string
          email: string
        }
        Insert: {
          created_at?: string
          email: string
        }
        Update: {
          created_at?: string
          email?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          created_at: string
          file_type: string | null
          file_url: string | null
          id: string
          image_url: string | null
          issuer: string | null
          position: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          file_type?: string | null
          file_url?: string | null
          id?: string
          image_url?: string | null
          issuer?: string | null
          position?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          file_type?: string | null
          file_url?: string | null
          id?: string
          image_url?: string | null
          issuer?: string | null
          position?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          image_url: string
          position: number
          updated_at: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          position?: number
          updated_at?: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          position?: number
          updated_at?: string
        }
        Relationships: []
      }
      highlights: {
        Row: {
          created_at: string
          id: string
          position: number
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          position?: number
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          position?: number
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      journey: {
        Row: {
          created_at: string
          id: string
          period: string
          position: number
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          period: string
          position?: number
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          period?: string
          position?: number
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          position: number
          status: string | null
          tech: string[]
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          description: string
          id?: string
          position?: number
          status?: string | null
          tech?: string[]
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          position?: number
          status?: string | null
          tech?: string[]
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      site_content: {
        Row: {
          about_body: string
          about_heading: string
          available: boolean
          avatar_url: string | null
          based_in: string
          contact_body: string
          contact_email: string
          contact_heading: string
          contact_phone: string
          github_url: string
          hero_first_name: string
          hero_intro: string
          hero_last_name: string
          hero_tagline: string
          id: string
          linkedin_url: string
          portfolio_label: string
          role: string
          stats_certs: string
          stats_hackathons: string
          stats_projects: string
          status: string
          studying: string
          updated_at: string
        }
        Insert: {
          about_body?: string
          about_heading?: string
          available?: boolean
          avatar_url?: string | null
          based_in?: string
          contact_body?: string
          contact_email?: string
          contact_heading?: string
          contact_phone?: string
          github_url?: string
          hero_first_name?: string
          hero_intro?: string
          hero_last_name?: string
          hero_tagline?: string
          id?: string
          linkedin_url?: string
          portfolio_label?: string
          role?: string
          stats_certs?: string
          stats_hackathons?: string
          stats_projects?: string
          status?: string
          studying?: string
          updated_at?: string
        }
        Update: {
          about_body?: string
          about_heading?: string
          available?: boolean
          avatar_url?: string | null
          based_in?: string
          contact_body?: string
          contact_email?: string
          contact_heading?: string
          contact_phone?: string
          github_url?: string
          hero_first_name?: string
          hero_intro?: string
          hero_last_name?: string
          hero_tagline?: string
          id?: string
          linkedin_url?: string
          portfolio_label?: string
          role?: string
          stats_certs?: string
          stats_hackathons?: string
          stats_projects?: string
          status?: string
          studying?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string
          id: string
          items: string[]
          position: number
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          items?: string[]
          position?: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          items?: string[]
          position?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_collection_table: { Args: { _table: string }; Returns: undefined }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
