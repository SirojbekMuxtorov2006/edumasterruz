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
      achievements: {
        Row: {
          badge_color: string
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          requirement_type: string
          requirement_value: number
          xp_reward: number
        }
        Insert: {
          badge_color?: string
          created_at?: string
          description: string
          icon?: string
          id?: string
          name: string
          requirement_type: string
          requirement_value?: number
          xp_reward?: number
        }
        Update: {
          badge_color?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          requirement_type?: string
          requirement_value?: number
          xp_reward?: number
        }
        Relationships: []
      }
      battle_answers: {
        Row: {
          answer: string
          answer_time_ms: number
          battle_id: string
          created_at: string
          id: string
          is_correct: boolean
          question_id: string
          user_id: string
        }
        Insert: {
          answer: string
          answer_time_ms: number
          battle_id: string
          created_at?: string
          id?: string
          is_correct: boolean
          question_id: string
          user_id: string
        }
        Update: {
          answer?: string
          answer_time_ms?: number
          battle_id?: string
          created_at?: string
          id?: string
          is_correct?: boolean
          question_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "battle_answers_battle_id_fkey"
            columns: ["battle_id"]
            isOneToOne: false
            referencedRelation: "battles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "battle_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      battles: {
        Row: {
          created_at: string
          current_question: number | null
          ended_at: string | null
          grade: number
          id: string
          player1_id: string | null
          player1_score: number | null
          player2_id: string | null
          player2_score: number | null
          started_at: string | null
          status: string
          subject: string
          total_questions: number | null
          winner_id: string | null
        }
        Insert: {
          created_at?: string
          current_question?: number | null
          ended_at?: string | null
          grade: number
          id?: string
          player1_id?: string | null
          player1_score?: number | null
          player2_id?: string | null
          player2_score?: number | null
          started_at?: string | null
          status?: string
          subject: string
          total_questions?: number | null
          winner_id?: string | null
        }
        Update: {
          created_at?: string
          current_question?: number | null
          ended_at?: string | null
          grade?: number
          id?: string
          player1_id?: string | null
          player1_score?: number | null
          player2_id?: string | null
          player2_score?: number | null
          started_at?: string | null
          status?: string
          subject?: string
          total_questions?: number | null
          winner_id?: string | null
        }
        Relationships: []
      }
      lessons: {
        Row: {
          content: string
          created_at: string
          duration_minutes: number | null
          id: string
          lesson_order: number
          skill_id: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          lesson_order?: number
          skill_id: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          lesson_order?: number
          skill_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_problems: {
        Row: {
          correct_answer: string
          created_at: string
          difficulty: number | null
          explanation: string | null
          id: string
          options: Json
          question_text: string
          skill_id: string
        }
        Insert: {
          correct_answer: string
          created_at?: string
          difficulty?: number | null
          explanation?: string | null
          id?: string
          options: Json
          question_text: string
          skill_id: string
        }
        Update: {
          correct_answer?: string
          created_at?: string
          difficulty?: number | null
          explanation?: string | null
          id?: string
          options?: Json
          question_text?: string
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_problems_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          coins: number | null
          created_at: string
          grade: number | null
          id: string
          streak_days: number | null
          updated_at: string
          user_id: string
          username: string
          xp: number | null
        }
        Insert: {
          avatar_url?: string | null
          coins?: number | null
          created_at?: string
          grade?: number | null
          id?: string
          streak_days?: number | null
          updated_at?: string
          user_id: string
          username: string
          xp?: number | null
        }
        Update: {
          avatar_url?: string | null
          coins?: number | null
          created_at?: string
          grade?: number | null
          id?: string
          streak_days?: number | null
          updated_at?: string
          user_id?: string
          username?: string
          xp?: number | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          correct_answer: string
          created_at: string
          difficulty: number | null
          grade: number
          id: string
          options: Json
          question_text: string
          skill: string
          subject: string
        }
        Insert: {
          correct_answer: string
          created_at?: string
          difficulty?: number | null
          grade: number
          id?: string
          options: Json
          question_text: string
          skill: string
          subject: string
        }
        Update: {
          correct_answer?: string
          created_at?: string
          difficulty?: number | null
          grade?: number
          id?: string
          options?: Json
          question_text?: string
          skill?: string
          subject?: string
        }
        Relationships: []
      }
      shop_items: {
        Row: {
          category: string
          created_at: string
          description: string
          icon: string
          id: string
          is_active: boolean
          name: string
          preview_value: string | null
          price: number
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          icon?: string
          id?: string
          is_active?: boolean
          name: string
          preview_value?: string | null
          price?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          is_active?: boolean
          name?: string
          preview_value?: string | null
          price?: number
        }
        Relationships: []
      }
      skills: {
        Row: {
          created_at: string
          description: string | null
          grade: number
          icon: string | null
          id: string
          name: string
          parent_skill_id: string | null
          skill_order: number
          subject: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          grade: number
          icon?: string | null
          id?: string
          name: string
          parent_skill_id?: string | null
          skill_order?: number
          subject: string
        }
        Update: {
          created_at?: string
          description?: string | null
          grade?: number
          icon?: string | null
          id?: string
          name?: string
          parent_skill_id?: string | null
          skill_order?: number
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "skills_parent_skill_id_fkey"
            columns: ["parent_skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_purchases: {
        Row: {
          id: string
          is_equipped: boolean
          item_id: string
          purchased_at: string
          user_id: string
        }
        Insert: {
          id?: string
          is_equipped?: boolean
          item_id: string
          purchased_at?: string
          user_id: string
        }
        Update: {
          id?: string
          is_equipped?: boolean
          item_id?: string
          purchased_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_purchases_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "shop_items"
            referencedColumns: ["id"]
          },
        ]
      }
      user_skill_progress: {
        Row: {
          completed_lessons: number[] | null
          completed_problems: number | null
          created_at: string
          id: string
          last_practiced_at: string | null
          mastery_level: number | null
          skill_id: string
          total_problems_attempted: number | null
          unlocked: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_lessons?: number[] | null
          completed_problems?: number | null
          created_at?: string
          id?: string
          last_practiced_at?: string | null
          mastery_level?: number | null
          skill_id: string
          total_problems_attempted?: number | null
          unlocked?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_lessons?: number[] | null
          completed_problems?: number | null
          created_at?: string
          id?: string
          last_practiced_at?: string | null
          mastery_level?: number | null
          skill_id?: string
          total_problems_attempted?: number | null
          unlocked?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_skill_progress_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
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
