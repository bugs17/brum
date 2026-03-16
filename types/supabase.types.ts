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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      dilers: {
        Row: {
          alamat: string | null
          created_at: string | null
          id: string
          kontak_diler: string | null
          nama_diler: string
        }
        Insert: {
          alamat?: string | null
          created_at?: string | null
          id?: string
          kontak_diler?: string | null
          nama_diler: string
        }
        Update: {
          alamat?: string | null
          created_at?: string | null
          id?: string
          kontak_diler?: string | null
          nama_diler?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          diler_id: string | null
          full_name: string | null
          id: string
          is_verified: boolean | null
          phone_number: string | null
          role: string | null
        }
        Insert: {
          created_at?: string | null
          diler_id?: string | null
          full_name?: string | null
          id: string
          is_verified?: boolean | null
          phone_number?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string | null
          diler_id?: string | null
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          phone_number?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_diler_id_fkey"
            columns: ["diler_id"]
            isOneToOne: false
            referencedRelation: "dilers"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_logs: {
        Row: {
          condition_in: string | null
          condition_out: string | null
          created_at: string | null
          id: string
          photo_in_url: string | null
          photo_out_url: string | null
          transaction_id: string | null
        }
        Insert: {
          condition_in?: string | null
          condition_out?: string | null
          created_at?: string | null
          id?: string
          photo_in_url?: string | null
          photo_out_url?: string | null
          transaction_id?: string | null
        }
        Update: {
          condition_in?: string | null
          condition_out?: string | null
          created_at?: string | null
          id?: string
          photo_in_url?: string | null
          photo_out_url?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rental_logs_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          app_fee: number | null
          created_at: string | null
          diler_id: string | null
          end_date: string
          id: string
          net_amount: number | null
          payment_link: string | null
          penyewa_id: string | null
          start_date: string
          status_pembayaran: string | null
          status_sewa: string | null
          total_price: number
          vehicle_id: string | null
        }
        Insert: {
          app_fee?: number | null
          created_at?: string | null
          diler_id?: string | null
          end_date: string
          id?: string
          net_amount?: number | null
          payment_link?: string | null
          penyewa_id?: string | null
          start_date: string
          status_pembayaran?: string | null
          status_sewa?: string | null
          total_price: number
          vehicle_id?: string | null
        }
        Update: {
          app_fee?: number | null
          created_at?: string | null
          diler_id?: string | null
          end_date?: string
          id?: string
          net_amount?: number | null
          payment_link?: string | null
          penyewa_id?: string | null
          start_date?: string
          status_pembayaran?: string | null
          status_sewa?: string | null
          total_price?: number
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_diler_id_fkey"
            columns: ["diler_id"]
            isOneToOne: false
            referencedRelation: "dilers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_penyewa_id_fkey"
            columns: ["penyewa_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          created_at: string | null
          diler_id: string | null
          id: string
          model_name: string
          photo_url: string | null
          plate_number: string
          price_per_day: number
          status: string | null
        }
        Insert: {
          created_at?: string | null
          diler_id?: string | null
          id?: string
          model_name: string
          photo_url?: string | null
          plate_number: string
          price_per_day: number
          status?: string | null
        }
        Update: {
          created_at?: string | null
          diler_id?: string | null
          id?: string
          model_name?: string
          photo_url?: string | null
          plate_number?: string
          price_per_day?: number
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_diler_id_fkey"
            columns: ["diler_id"]
            isOneToOne: false
            referencedRelation: "dilers"
            referencedColumns: ["id"]
          },
        ]
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
