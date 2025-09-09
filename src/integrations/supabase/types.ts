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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_type: string | null
          created_at: string | null
          criteria: Json | null
          description: string
          icon: string
          id: string
          is_active: boolean | null
          name: string
          xp_reward: number | null
        }
        Insert: {
          badge_type?: string | null
          created_at?: string | null
          criteria?: Json | null
          description: string
          icon: string
          id?: string
          is_active?: boolean | null
          name: string
          xp_reward?: number | null
        }
        Update: {
          badge_type?: string | null
          created_at?: string | null
          criteria?: Json | null
          description?: string
          icon?: string
          id?: string
          is_active?: boolean | null
          name?: string
          xp_reward?: number | null
        }
        Relationships: []
      }
      chapters: {
        Row: {
          chapter_number: number
          created_at: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["content_difficulty"] | null
          estimated_hours: number | null
          id: string
          is_active: boolean | null
          learning_objectives: string[] | null
          prerequisites: string[] | null
          subject_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          chapter_number: number
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["content_difficulty"] | null
          estimated_hours?: number | null
          id?: string
          is_active?: boolean | null
          learning_objectives?: string[] | null
          prerequisites?: string[] | null
          subject_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          chapter_number?: number
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["content_difficulty"] | null
          estimated_hours?: number | null
          id?: string
          is_active?: boolean | null
          learning_objectives?: string[] | null
          prerequisites?: string[] | null
          subject_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chapters_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      class_enrollments: {
        Row: {
          class_id: string
          enrolled_at: string | null
          id: string
          is_active: boolean | null
          student_id: string
        }
        Insert: {
          class_id: string
          enrolled_at?: string | null
          id?: string
          is_active?: boolean | null
          student_id: string
        }
        Update: {
          class_id?: string
          enrolled_at?: string | null
          id?: string
          is_active?: boolean | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_enrollments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          academic_year: string | null
          created_at: string | null
          description: string | null
          grade_level: Database["public"]["Enums"]["grade_level"]
          id: string
          is_active: boolean | null
          max_students: number | null
          name: string
          organization_id: string
          subject: string | null
          teacher_id: string | null
          updated_at: string | null
        }
        Insert: {
          academic_year?: string | null
          created_at?: string | null
          description?: string | null
          grade_level: Database["public"]["Enums"]["grade_level"]
          id?: string
          is_active?: boolean | null
          max_students?: number | null
          name: string
          organization_id: string
          subject?: string | null
          teacher_id?: string | null
          updated_at?: string | null
        }
        Update: {
          academic_year?: string | null
          created_at?: string | null
          description?: string | null
          grade_level?: Database["public"]["Enums"]["grade_level"]
          id?: string
          is_active?: boolean | null
          max_students?: number | null
          name?: string
          organization_id?: string
          subject?: string | null
          teacher_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          chapter_id: string
          content: Json | null
          created_at: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["content_difficulty"] | null
          duration_minutes: number | null
          id: string
          is_active: boolean | null
          lesson_number: number
          title: string
          updated_at: string | null
          xp_reward: number | null
        }
        Insert: {
          chapter_id: string
          content?: Json | null
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["content_difficulty"] | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          lesson_number: number
          title: string
          updated_at?: string | null
          xp_reward?: number | null
        }
        Update: {
          chapter_id?: string
          content?: Json | null
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["content_difficulty"] | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          lesson_number?: number
          title?: string
          updated_at?: string | null
          xp_reward?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string | null
          contact_email: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          phone: string | null
          type: Database["public"]["Enums"]["organization_type"]
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          phone?: string | null
          type?: Database["public"]["Enums"]["organization_type"]
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          phone?: string | null
          type?: Database["public"]["Enums"]["organization_type"]
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          full_name: string
          grade_level: Database["public"]["Enums"]["grade_level"] | null
          id: string
          is_active: boolean | null
          organization_id: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          full_name: string
          grade_level?: Database["public"]["Enums"]["grade_level"] | null
          id: string
          is_active?: boolean | null
          organization_id?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          full_name?: string
          grade_level?: Database["public"]["Enums"]["grade_level"] | null
          id?: string
          is_active?: boolean | null
          organization_id?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          answers: Json | null
          attempt_number: number
          completed_at: string | null
          created_at: string | null
          id: string
          is_completed: boolean | null
          max_score: number
          percentage: number | null
          quiz_id: string
          score: number | null
          started_at: string | null
          student_id: string
          time_taken_minutes: number | null
        }
        Insert: {
          answers?: Json | null
          attempt_number?: number
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          max_score: number
          percentage?: number | null
          quiz_id: string
          score?: number | null
          started_at?: string | null
          student_id: string
          time_taken_minutes?: number | null
        }
        Update: {
          answers?: Json | null
          attempt_number?: number
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          max_score?: number
          percentage?: number | null
          quiz_id?: string
          score?: number | null
          started_at?: string | null
          student_id?: string
          time_taken_minutes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          correct_answer: string
          created_at: string | null
          explanation: string | null
          id: string
          options: Json | null
          points: number | null
          question_number: number
          question_text: string
          question_type: Database["public"]["Enums"]["question_type"]
          quiz_id: string
          time_limit_seconds: number | null
          updated_at: string | null
        }
        Insert: {
          correct_answer: string
          created_at?: string | null
          explanation?: string | null
          id?: string
          options?: Json | null
          points?: number | null
          question_number: number
          question_text: string
          question_type: Database["public"]["Enums"]["question_type"]
          quiz_id: string
          time_limit_seconds?: number | null
          updated_at?: string | null
        }
        Update: {
          correct_answer?: string
          created_at?: string | null
          explanation?: string | null
          id?: string
          options?: Json | null
          points?: number | null
          question_number?: number
          question_text?: string
          question_type?: Database["public"]["Enums"]["question_type"]
          quiz_id?: string
          time_limit_seconds?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          chapter_id: string | null
          created_at: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["content_difficulty"] | null
          id: string
          instructions: string | null
          is_active: boolean | null
          max_attempts: number | null
          passing_score: number | null
          time_limit_minutes: number | null
          title: string
          updated_at: string | null
          xp_reward: number | null
        }
        Insert: {
          chapter_id?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["content_difficulty"] | null
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          max_attempts?: number | null
          passing_score?: number | null
          time_limit_minutes?: number | null
          title: string
          updated_at?: string | null
          xp_reward?: number | null
        }
        Update: {
          chapter_id?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["content_difficulty"] | null
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          max_attempts?: number | null
          passing_score?: number | null
          time_limit_minutes?: number | null
          title?: string
          updated_at?: string | null
          xp_reward?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      simulations: {
        Row: {
          chapter_id: string
          config: Json | null
          created_at: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["content_difficulty"] | null
          id: string
          is_active: boolean | null
          simulation_type: string | null
          title: string
          updated_at: string | null
          xp_reward: number | null
        }
        Insert: {
          chapter_id: string
          config?: Json | null
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["content_difficulty"] | null
          id?: string
          is_active?: boolean | null
          simulation_type?: string | null
          title: string
          updated_at?: string | null
          xp_reward?: number | null
        }
        Update: {
          chapter_id?: string
          config?: Json | null
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["content_difficulty"] | null
          id?: string
          is_active?: boolean | null
          simulation_type?: string | null
          title?: string
          updated_at?: string | null
          xp_reward?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "simulations_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      student_achievements: {
        Row: {
          achievement_id: string
          earned_at: string | null
          id: string
          student_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string | null
          id?: string
          student_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string | null
          id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_achievements_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_progress: {
        Row: {
          chapter_id: string
          completed_at: string | null
          created_at: string | null
          id: string
          is_completed: boolean | null
          last_accessed_at: string | null
          lesson_id: string | null
          progress_percentage: number | null
          quiz_id: string | null
          simulation_id: string | null
          student_id: string
          time_spent_minutes: number | null
          updated_at: string | null
          xp_earned: number | null
        }
        Insert: {
          chapter_id: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          last_accessed_at?: string | null
          lesson_id?: string | null
          progress_percentage?: number | null
          quiz_id?: string | null
          simulation_id?: string | null
          student_id: string
          time_spent_minutes?: number | null
          updated_at?: string | null
          xp_earned?: number | null
        }
        Update: {
          chapter_id?: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          last_accessed_at?: string | null
          lesson_id?: string | null
          progress_percentage?: number | null
          quiz_id?: string | null
          simulation_id?: string | null
          student_id?: string
          time_spent_minutes?: number | null
          updated_at?: string | null
          xp_earned?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_simulation_id_fkey"
            columns: ["simulation_id"]
            isOneToOne: false
            referencedRelation: "simulations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_stats: {
        Row: {
          achievements_earned: number | null
          created_at: string | null
          current_level: number | null
          current_streak: number | null
          id: string
          last_activity_at: string | null
          lessons_completed: number | null
          longest_streak: number | null
          perfect_scores: number | null
          quizzes_completed: number | null
          rank_global: number | null
          rank_in_class: number | null
          simulations_completed: number | null
          student_id: string
          total_study_time_minutes: number | null
          total_xp: number | null
          updated_at: string | null
        }
        Insert: {
          achievements_earned?: number | null
          created_at?: string | null
          current_level?: number | null
          current_streak?: number | null
          id?: string
          last_activity_at?: string | null
          lessons_completed?: number | null
          longest_streak?: number | null
          perfect_scores?: number | null
          quizzes_completed?: number | null
          rank_global?: number | null
          rank_in_class?: number | null
          simulations_completed?: number | null
          student_id: string
          total_study_time_minutes?: number | null
          total_xp?: number | null
          updated_at?: string | null
        }
        Update: {
          achievements_earned?: number | null
          created_at?: string | null
          current_level?: number | null
          current_streak?: number | null
          id?: string
          last_activity_at?: string | null
          lessons_completed?: number | null
          longest_streak?: number | null
          perfect_scores?: number | null
          quizzes_completed?: number | null
          rank_global?: number | null
          rank_in_class?: number | null
          simulations_completed?: number | null
          student_id?: string
          total_study_time_minutes?: number | null
          total_xp?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_stats_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          bg_gradient: string | null
          color: string | null
          created_at: string | null
          description: string | null
          grade_levels: string[] | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          bg_gradient?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          grade_levels?: string[] | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          bg_gradient?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          grade_levels?: string[] | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_organization: {
        Args: { _user_id: string }
        Returns: string
      }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      assignment_status: "pending" | "in_progress" | "completed" | "overdue"
      content_difficulty: "beginner" | "intermediate" | "advanced"
      grade_level: "6" | "7" | "8" | "9" | "10" | "11" | "12"
      organization_type: "school" | "college" | "university" | "institute"
      question_type:
        | "multiple_choice"
        | "number_input"
        | "slider"
        | "matching"
        | "true_false"
        | "fill_blank"
        | "drag_drop"
        | "essay"
      user_role: "student" | "teacher" | "admin" | "super_admin"
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
    Enums: {
      assignment_status: ["pending", "in_progress", "completed", "overdue"],
      content_difficulty: ["beginner", "intermediate", "advanced"],
      grade_level: ["6", "7", "8", "9", "10", "11", "12"],
      organization_type: ["school", "college", "university", "institute"],
      question_type: [
        "multiple_choice",
        "number_input",
        "slider",
        "matching",
        "true_false",
        "fill_blank",
        "drag_drop",
        "essay",
      ],
      user_role: ["student", "teacher", "admin", "super_admin"],
    },
  },
} as const
