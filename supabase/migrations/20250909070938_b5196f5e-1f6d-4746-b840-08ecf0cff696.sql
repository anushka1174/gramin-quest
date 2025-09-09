-- Drop existing tables if they exist to start fresh
DROP TABLE IF EXISTS public.student_stats CASCADE;
DROP TABLE IF EXISTS public.schedules CASCADE;
DROP TABLE IF EXISTS public.assignment_submissions CASCADE;
DROP TABLE IF EXISTS public.assignments CASCADE;
DROP TABLE IF EXISTS public.student_achievements CASCADE;
DROP TABLE IF EXISTS public.achievements CASCADE;
DROP TABLE IF EXISTS public.quiz_attempts CASCADE;
DROP TABLE IF EXISTS public.student_progress CASCADE;
DROP TABLE IF EXISTS public.quiz_questions CASCADE;
DROP TABLE IF EXISTS public.quizzes CASCADE;
DROP TABLE IF EXISTS public.simulations CASCADE;
DROP TABLE IF EXISTS public.lessons CASCADE;
DROP TABLE IF EXISTS public.chapters CASCADE;
DROP TABLE IF EXISTS public.subjects CASCADE;
DROP TABLE IF EXISTS public.class_enrollments CASCADE;
DROP TABLE IF EXISTS public.classes CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.organizations CASCADE;

-- Drop existing types if they exist
DROP TYPE IF EXISTS public.assignment_status CASCADE;
DROP TYPE IF EXISTS public.content_difficulty CASCADE;
DROP TYPE IF EXISTS public.question_type CASCADE;
DROP TYPE IF EXISTS public.grade_level CASCADE;
DROP TYPE IF EXISTS public.organization_type CASCADE;
DROP TYPE IF EXISTS public.user_role CASCADE;

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

-- Subjects table (fixed array type)
CREATE TABLE public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    color TEXT,
    bg_gradient TEXT,
    grade_levels TEXT[] DEFAULT ARRAY['6','7','8','9','10','11','12'],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default subjects
INSERT INTO public.subjects (name, description, icon, color, bg_gradient) VALUES
('Physics', 'Explore the fundamental laws of nature through interactive experiments', '⚛️', 'primary', 'bg-gradient-primary'),
('Chemistry', 'Discover the world of atoms, molecules, and chemical reactions', '🧪', 'success', 'bg-gradient-success'),
('Mathematics', 'Master mathematical concepts from algebra to calculus', '📐', 'warning', 'bg-gradient-warning'),
('Biology', 'Study living organisms and their interactions', '🧬', 'purple', 'bg-gradient-purple');

-- Enable Row Level Security on all tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

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

-- Basic RLS Policies
CREATE POLICY "Anyone can view active subjects" ON public.subjects
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (id = auth.uid());

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
    organization_id,
    grade_level
  ) VALUES (
    NEW.id, 
    user_email, 
    user_name,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student'),
    (NEW.raw_user_meta_data->>'organization_id')::UUID,
    (NEW.raw_user_meta_data->>'grade_level')::grade_level
  );
  
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

-- Add update triggers
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON public.classes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON public.subjects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();