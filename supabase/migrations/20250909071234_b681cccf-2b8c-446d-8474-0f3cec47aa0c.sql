-- Create remaining content tables

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

-- Enable Row Level Security on all new tables
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_stats ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for content tables (public read access)
CREATE POLICY "Anyone can view active chapters" ON public.chapters
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view active lessons" ON public.lessons
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view active simulations" ON public.simulations
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view active quizzes" ON public.quizzes
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view quiz questions" ON public.quiz_questions
  FOR SELECT USING (true);

-- Add RLS policies for student data
CREATE POLICY "Students can view/update their own progress" ON public.student_progress
  FOR ALL USING (student_id = auth.uid());

CREATE POLICY "Students can view/create their own quiz attempts" ON public.quiz_attempts
  FOR ALL USING (student_id = auth.uid());

CREATE POLICY "Anyone can view achievements" ON public.achievements
  FOR SELECT USING (is_active = true);

CREATE POLICY "Students can view their own achievements" ON public.student_achievements
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can view their own stats" ON public.student_stats
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can update their own stats" ON public.student_stats
  FOR UPDATE USING (student_id = auth.uid());

-- Add update triggers to new tables
CREATE TRIGGER update_chapters_updated_at BEFORE UPDATE ON public.chapters FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_simulations_updated_at BEFORE UPDATE ON public.simulations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON public.quizzes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_quiz_questions_updated_at BEFORE UPDATE ON public.quiz_questions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_student_progress_updated_at BEFORE UPDATE ON public.student_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_student_stats_updated_at BEFORE UPDATE ON public.student_stats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data

-- Get the physics subject ID
DO $$
DECLARE
    physics_id UUID;
    chapter1_id UUID;
    quiz_id UUID;
BEGIN
    -- Get physics subject ID
    SELECT id INTO physics_id FROM public.subjects WHERE name = 'Physics';
    
    -- Insert chapters for Physics
    INSERT INTO public.chapters (subject_id, title, description, chapter_number, difficulty) VALUES
    (physics_id, 'Motion and Forces', 'Laws of motion, Newton''s laws, and force dynamics', 1, 'beginner');
    
    -- Get the chapter ID
    SELECT id INTO chapter1_id FROM public.chapters WHERE subject_id = physics_id AND chapter_number = 1;
    
    -- Insert lessons
    INSERT INTO public.lessons (chapter_id, title, description, lesson_number, content, duration_minutes, xp_reward) VALUES
    (chapter1_id, 'Introduction to Motion', 'Understanding basic concepts of motion and velocity', 1, '{"type": "text", "content": "Motion is the change in position of an object with respect to time..."}', 30, 10),
    (chapter1_id, 'Newton''s First Law', 'The law of inertia and its applications', 2, '{"type": "text", "content": "An object at rest stays at rest and an object in motion stays in motion..."}', 35, 15),
    (chapter1_id, 'Forces and Acceleration', 'Understanding the relationship between force and acceleration', 3, '{"type": "text", "content": "Force equals mass times acceleration (F = ma)..."}', 40, 20);
    
    -- Insert simulations
    INSERT INTO public.simulations (chapter_id, title, description, simulation_type, config, xp_reward) VALUES
    (chapter1_id, 'Projectile Motion Simulator', 'Interactive simulation of projectile motion with various parameters', 'physics', '{"type": "projectile_motion", "parameters": ["velocity", "angle", "height", "gravity"]}', 25);
    
    -- Insert quiz
    INSERT INTO public.quizzes (chapter_id, title, description, instructions, time_limit_minutes, xp_reward) VALUES
    (chapter1_id, 'Forces and Motion Quiz', 'Test your understanding of motion and forces', 'Answer all questions to the best of your ability', 15, 50);
    
    -- Get the quiz ID
    SELECT id INTO quiz_id FROM public.quizzes WHERE chapter_id = chapter1_id;
    
    -- Insert quiz questions
    INSERT INTO public.quiz_questions (quiz_id, question_text, question_type, question_number, options, correct_answer, explanation, points) VALUES
    (quiz_id, 'What is Newton''s First Law of Motion?', 'multiple_choice', 1, 
     '{"options": ["Objects at rest stay at rest, objects in motion stay in motion", "Force equals mass times acceleration", "For every action, there is an equal and opposite reaction", "Energy cannot be created or destroyed"]}',
     'Objects at rest stay at rest, objects in motion stay in motion',
     'Newton''s First Law, also known as the Law of Inertia, states that objects at rest stay at rest and objects in motion stay in motion unless acted upon by an external force.', 1),
     
    (quiz_id, '24 ÷ 6 = ?', 'number_input', 2, '{}', '4', '24 divided by 6 equals 4.', 1),
    
    (quiz_id, '4 × 3 = ?', 'slider', 3, '{"min": 0, "max": 20}', '12', '4 multiplied by 3 equals 12.', 1),
    
    (quiz_id, 'Match the mathematical operations with their results:', 'matching', 4,
     '{"pairs": {"left": ["8 ÷ 4", "36 ÷ 9", "40 ÷ 8"], "right": ["2", "4", "5"]}}',
     '{"8 ÷ 4": "2", "36 ÷ 9": "4", "40 ÷ 8": "5"}',
     'These are basic division problems: 8÷4=2, 36÷9=4, 40÷8=5', 1);
     
    -- Insert sample achievements
    INSERT INTO public.achievements (name, description, icon, badge_type, criteria, xp_reward) VALUES
    ('First Steps', 'Complete your first lesson', 'star', 'bronze', '{"type": "lesson_completed", "count": 1}', 50),
    ('Physics Master', 'Score 100% in 5 physics quizzes', 'trophy', 'gold', '{"type": "perfect_quiz_score", "subject": "physics", "count": 5}', 200),
    ('Speed Learner', 'Complete 10 lessons in one day', 'zap', 'silver', '{"type": "lessons_per_day", "count": 10}', 150),
    ('Streak Champion', 'Maintain 30-day learning streak', 'target', 'platinum', '{"type": "streak_days", "count": 30}', 300);
    
END $$;