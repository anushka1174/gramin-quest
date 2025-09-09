-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUMS for role management
CREATE TYPE public.user_role AS ENUM ('student', 'teacher', 'admin', 'super_admin');
CREATE TYPE public.organization_type AS ENUM ('school', 'college', 'university', 'institute');
CREATE TYPE public.grade_level AS ENUM ('6', '7', '8', '9', '10', '11', '12');
CREATE TYPE public.question_type AS ENUM ('multiple_choice', 'number_input', 'slider', 'matching', 'true_false', 'fill_blank', 'drag_drop', 'essay');
CREATE TYPE public.content_difficulty AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE public.assignment_status AS ENUM ('pending', 'in_progress', 'completed', 'overdue');

-- Organizations table (Schools, Colleges, etc.)
CREATE TABLE public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type organization_type NOT NULL DEFAULT 'school',
    description TEXT,
    address TEXT,
    contact_email TEXT,
    phone TEXT,
    website TEXT,
    logo_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'student',
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    grade_level grade_level,
    phone TEXT,
    date_of_birth DATE,
    address TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes table
CREATE TABLE public.classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    grade_level grade_level NOT NULL,
    subject TEXT,
    academic_year TEXT,
    max_students INTEGER DEFAULT 40,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student-Class enrollment
CREATE TABLE public.class_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    UNIQUE(student_id, class_id)
);

-- Subjects table
CREATE TABLE public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    color TEXT,
    bg_gradient TEXT,
    grade_levels grade_level[] DEFAULT ARRAY['6','7','8','9','10','11','12'],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chapters table
CREATE TABLE public.chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    chapter_number INTEGER NOT NULL,
    difficulty content_difficulty DEFAULT 'beginner',
    estimated_hours INTEGER DEFAULT 2,
    prerequisites TEXT[],
    learning_objectives TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(subject_id, chapter_number)
);

-- Lessons table
CREATE TABLE public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    lesson_number INTEGER NOT NULL,
    content JSONB, -- Rich content with text, images, videos, etc.
    duration_minutes INTEGER DEFAULT 30,
    xp_reward INTEGER DEFAULT 10,
    difficulty content_difficulty DEFAULT 'beginner',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(chapter_id, lesson_number)
);

-- Simulations table
CREATE TABLE public.simulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    simulation_type TEXT, -- 'physics', 'chemistry', 'math', etc.
    config JSONB, -- Simulation configuration and parameters
    xp_reward INTEGER DEFAULT 20,
    difficulty content_difficulty DEFAULT 'beginner',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quizzes table
CREATE TABLE public.quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    instructions TEXT,
    time_limit_minutes INTEGER,
    max_attempts INTEGER DEFAULT 3,
    passing_score INTEGER DEFAULT 70,
    xp_reward INTEGER DEFAULT 50,
    difficulty content_difficulty DEFAULT 'beginner',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz questions table
CREATE TABLE public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type question_type NOT NULL,
    question_number INTEGER NOT NULL,
    options JSONB, -- For multiple choice, matching, etc.
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    points INTEGER DEFAULT 1,
    time_limit_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(quiz_id, question_number)
);

-- Student progress tracking
CREATE TABLE public.student_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    simulation_id UUID REFERENCES public.simulations(id) ON DELETE CASCADE,
    quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
    chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    is_completed BOOLEAN DEFAULT false,
    xp_earned INTEGER DEFAULT 0,
    time_spent_minutes INTEGER DEFAULT 0,
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz attempts tracking
CREATE TABLE public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    attempt_number INTEGER NOT NULL DEFAULT 1,
    score INTEGER DEFAULT 0,
    max_score INTEGER NOT NULL,
    percentage INTEGER DEFAULT 0,
    time_taken_minutes INTEGER,
    answers JSONB, -- Store student answers
    is_completed BOOLEAN DEFAULT false,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table
CREATE TABLE public.achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    badge_type TEXT DEFAULT 'bronze', -- bronze, silver, gold, platinum
    criteria JSONB, -- Conditions to unlock achievement
    xp_reward INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student achievements tracking
CREATE TABLE public.student_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, achievement_id)
);

-- Assignments table (for teachers to assign work)
CREATE TABLE public.assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    assignment_type TEXT NOT NULL, -- 'quiz', 'lesson', 'simulation', 'project'
    resource_id UUID, -- Can reference quiz_id, lesson_id, etc.
    due_date TIMESTAMP WITH TIME ZONE,
    max_points INTEGER DEFAULT 100,
    instructions TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assignment submissions
CREATE TABLE public.assignment_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status assignment_status DEFAULT 'pending',
    submission_data JSONB, -- Store submission content
    score INTEGER,
    feedback TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE,
    graded_at TIMESTAMP WITH TIME ZONE,
    graded_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(assignment_id, student_id)
);

-- Timetable/Schedule table
CREATE TABLE public.schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday, 6=Saturday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_number TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student statistics/leaderboard
CREATE TABLE public.student_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    total_xp INTEGER DEFAULT 0,
    current_level INTEGER DEFAULT 1,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    total_study_time_minutes INTEGER DEFAULT 0,
    quizzes_completed INTEGER DEFAULT 0,
    perfect_scores INTEGER DEFAULT 0,
    lessons_completed INTEGER DEFAULT 0,
    simulations_completed INTEGER DEFAULT 0,
    achievements_earned INTEGER DEFAULT 0,
    rank_in_class INTEGER,
    rank_global INTEGER,
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_stats ENABLE ROW LEVEL SECURITY;

-- Create security definer functions to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS user_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = _user_id;
$$;

CREATE OR REPLACE FUNCTION public.get_user_organization(_user_id UUID)
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id FROM public.profiles WHERE id = _user_id;
$$;

-- RLS Policies for organizations
CREATE POLICY "Users can view their organization" ON public.organizations
  FOR SELECT USING (id = public.get_user_organization(auth.uid()));

CREATE POLICY "Admins can manage organizations" ON public.organizations
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('admin', 'super_admin'));

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Teachers can view students in their organization" ON public.profiles
  FOR SELECT USING (
    public.get_user_role(auth.uid()) = 'teacher' AND
    organization_id = public.get_user_organization(auth.uid())
  );

CREATE POLICY "Admins can manage all profiles in their organization" ON public.profiles
  FOR ALL USING (
    public.get_user_role(auth.uid()) IN ('admin', 'super_admin') AND
    (organization_id = public.get_user_organization(auth.uid()) OR public.get_user_role(auth.uid()) = 'super_admin')
  );

-- RLS Policies for classes
CREATE POLICY "Students can view their enrolled classes" ON public.classes
  FOR SELECT USING (
    id IN (
      SELECT class_id FROM public.class_enrollments 
      WHERE student_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Teachers can view classes in their organization" ON public.classes
  FOR SELECT USING (
    public.get_user_role(auth.uid()) = 'teacher' AND
    organization_id = public.get_user_organization(auth.uid())
  );

CREATE POLICY "Teachers can manage their assigned classes" ON public.classes
  FOR ALL USING (
    teacher_id = auth.uid() OR
    (public.get_user_role(auth.uid()) IN ('admin', 'super_admin') AND 
     organization_id = public.get_user_organization(auth.uid()))
  );

-- RLS Policies for subjects (public read access)
CREATE POLICY "Anyone can view active subjects" ON public.subjects
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage subjects" ON public.subjects
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('admin', 'super_admin'));

-- RLS Policies for chapters
CREATE POLICY "Anyone can view active chapters" ON public.chapters
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage chapters" ON public.chapters
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('admin', 'super_admin'));

-- RLS Policies for lessons
CREATE POLICY "Anyone can view active lessons" ON public.lessons
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage lessons" ON public.lessons
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('admin', 'super_admin'));

-- RLS Policies for simulations
CREATE POLICY "Anyone can view active simulations" ON public.simulations
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage simulations" ON public.simulations
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('admin', 'super_admin'));

-- RLS Policies for quizzes
CREATE POLICY "Anyone can view active quizzes" ON public.quizzes
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage quizzes" ON public.quizzes
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('admin', 'super_admin'));

-- RLS Policies for quiz questions
CREATE POLICY "Anyone can view quiz questions" ON public.quiz_questions
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage quiz questions" ON public.quiz_questions
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('admin', 'super_admin'));

-- RLS Policies for student progress
CREATE POLICY "Students can view/update their own progress" ON public.student_progress
  FOR ALL USING (student_id = auth.uid());

CREATE POLICY "Teachers can view student progress in their classes" ON public.student_progress
  FOR SELECT USING (
    public.get_user_role(auth.uid()) = 'teacher' AND
    student_id IN (
      SELECT student_id FROM public.class_enrollments ce
      JOIN public.classes c ON ce.class_id = c.id
      WHERE c.teacher_id = auth.uid() OR c.organization_id = public.get_user_organization(auth.uid())
    )
  );

-- RLS Policies for quiz attempts
CREATE POLICY "Students can view/create their own quiz attempts" ON public.quiz_attempts
  FOR ALL USING (student_id = auth.uid());

CREATE POLICY "Teachers can view quiz attempts of their students" ON public.quiz_attempts
  FOR SELECT USING (
    public.get_user_role(auth.uid()) = 'teacher' AND
    student_id IN (
      SELECT student_id FROM public.class_enrollments ce
      JOIN public.classes c ON ce.class_id = c.id
      WHERE c.teacher_id = auth.uid() OR c.organization_id = public.get_user_organization(auth.uid())
    )
  );

-- RLS Policies for achievements
CREATE POLICY "Anyone can view achievements" ON public.achievements
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage achievements" ON public.achievements
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('admin', 'super_admin'));

-- RLS Policies for student achievements
CREATE POLICY "Students can view their own achievements" ON public.student_achievements
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "System can create achievements for students" ON public.student_achievements
  FOR INSERT WITH CHECK (true);

-- RLS Policies for assignments
CREATE POLICY "Teachers can manage assignments for their classes" ON public.assignments
  FOR ALL USING (
    teacher_id = auth.uid() OR
    (public.get_user_role(auth.uid()) = 'teacher' AND
     class_id IN (
       SELECT id FROM public.classes 
       WHERE organization_id = public.get_user_organization(auth.uid())
     ))
  );

CREATE POLICY "Students can view assignments for their classes" ON public.assignments
  FOR SELECT USING (
    class_id IN (
      SELECT class_id FROM public.class_enrollments 
      WHERE student_id = auth.uid() AND is_active = true
    )
  );

-- RLS Policies for assignment submissions
CREATE POLICY "Students can manage their own submissions" ON public.assignment_submissions
  FOR ALL USING (student_id = auth.uid());

CREATE POLICY "Teachers can view/grade submissions for their assignments" ON public.assignment_submissions
  FOR ALL USING (
    assignment_id IN (
      SELECT id FROM public.assignments WHERE teacher_id = auth.uid()
    )
  );

-- RLS Policies for schedules
CREATE POLICY "Users can view schedules for their classes" ON public.schedules
  FOR SELECT USING (
    class_id IN (
      SELECT class_id FROM public.class_enrollments 
      WHERE student_id = auth.uid() AND is_active = true
    ) OR
    teacher_id = auth.uid()
  );

CREATE POLICY "Teachers can manage schedules for their classes" ON public.schedules
  FOR ALL USING (
    teacher_id = auth.uid() OR
    (public.get_user_role(auth.uid()) = 'teacher' AND
     class_id IN (
       SELECT id FROM public.classes 
       WHERE organization_id = public.get_user_organization(auth.uid())
     ))
  );

-- RLS Policies for student stats
CREATE POLICY "Students can view their own stats" ON public.student_stats
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can update their own stats" ON public.student_stats
  FOR UPDATE USING (student_id = auth.uid());

CREATE POLICY "System can create stats for students" ON public.student_stats
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Teachers can view stats of their students" ON public.student_stats
  FOR SELECT USING (
    public.get_user_role(auth.uid()) = 'teacher' AND
    student_id IN (
      SELECT student_id FROM public.class_enrollments ce
      JOIN public.classes c ON ce.class_id = c.id
      WHERE c.teacher_id = auth.uid() OR c.organization_id = public.get_user_organization(auth.uid())
    )
  );

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_email TEXT;
  user_name TEXT;
BEGIN
  -- Extract email and name from auth.users
  user_email := NEW.email;
  user_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(user_email, '@', 1));
  
  -- Insert into profiles table
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    role,
    organization_id
  ) VALUES (
    NEW.id, 
    user_email, 
    user_name,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student'),
    (NEW.raw_user_meta_data->>'organization_id')::UUID
  );
  
  -- Create initial stats for students
  IF COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student') = 'student' THEN
    INSERT INTO public.student_stats (student_id) VALUES (NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers to all relevant tables
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON public.classes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON public.subjects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_chapters_updated_at BEFORE UPDATE ON public.chapters FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_simulations_updated_at BEFORE UPDATE ON public.simulations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON public.quizzes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_quiz_questions_updated_at BEFORE UPDATE ON public.quiz_questions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_student_progress_updated_at BEFORE UPDATE ON public.student_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_assignments_updated_at BEFORE UPDATE ON public.assignments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_assignment_submissions_updated_at BEFORE UPDATE ON public.assignment_submissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON public.schedules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_student_stats_updated_at BEFORE UPDATE ON public.student_stats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();