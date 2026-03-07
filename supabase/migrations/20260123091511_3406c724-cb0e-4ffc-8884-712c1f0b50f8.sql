-- Create skills table for the skill tree
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  grade INTEGER NOT NULL,
  skill_order INTEGER NOT NULL DEFAULT 0,
  parent_skill_id UUID REFERENCES public.skills(id),
  icon TEXT DEFAULT 'star',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  lesson_order INTEGER NOT NULL DEFAULT 0,
  duration_minutes INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create practice problems table
CREATE TABLE public.practice_problems (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer TEXT NOT NULL,
  difficulty INTEGER DEFAULT 1,
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user skill progress table
CREATE TABLE public.user_skill_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  mastery_level INTEGER DEFAULT 0,
  completed_lessons INTEGER[] DEFAULT '{}',
  completed_problems INTEGER DEFAULT 0,
  total_problems_attempted INTEGER DEFAULT 0,
  last_practiced_at TIMESTAMP WITH TIME ZONE,
  unlocked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

-- Enable RLS on all tables
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skill_progress ENABLE ROW LEVEL SECURITY;

-- Skills are publicly readable
CREATE POLICY "Skills are publicly readable" ON public.skills
  FOR SELECT USING (true);

-- Lessons are publicly readable
CREATE POLICY "Lessons are publicly readable" ON public.lessons
  FOR SELECT USING (true);

-- Practice problems are publicly readable
CREATE POLICY "Practice problems are publicly readable" ON public.practice_problems
  FOR SELECT USING (true);

-- User skill progress policies
CREATE POLICY "Users can view their own progress" ON public.user_skill_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON public.user_skill_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON public.user_skill_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Create updated_at trigger for user_skill_progress
CREATE TRIGGER update_user_skill_progress_updated_at
  BEFORE UPDATE ON public.user_skill_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample skills for Mathematics Grade 1
INSERT INTO public.skills (name, description, subject, grade, skill_order, icon) VALUES
  ('Sonlarni Sanash', 'Sonlarni 1 dan 100 gacha sanashni o''rganing', 'Matematika', 1, 1, 'hash'),
  ('Qo''shish', 'Ikki sonni qo''shishni o''rganing', 'Matematika', 1, 2, 'plus'),
  ('Ayirish', 'Sonlarni ayirishni o''rganing', 'Matematika', 1, 3, 'minus'),
  ('Ko''paytirish', 'Ko''paytirish jadvalini o''rganing', 'Matematika', 1, 4, 'x'),
  ('Bo''lish', 'Bo''lish amalini o''rganing', 'Matematika', 1, 5, 'divide'),
  ('Kasrlar', 'Oddiy kasrlarni o''rganing', 'Matematika', 1, 6, 'pie-chart'),
  ('O''nlik kasrlar', 'O''nlik kasrlarni o''rganing', 'Matematika', 1, 7, 'percent'),
  ('Geometriya', 'Shakl va figuralarni o''rganing', 'Matematika', 1, 8, 'triangle'),
  ('O''lchov', 'Uzunlik, vazn, hajmni o''lchash', 'Matematika', 1, 9, 'ruler'),
  ('Vaqt', 'Soat va vaqtni o''qish', 'Matematika', 1, 10, 'clock');

-- Insert sample lessons
INSERT INTO public.lessons (skill_id, title, content, lesson_order, duration_minutes)
SELECT 
  s.id,
  'Kirish darsi',
  'Bu darsda siz ' || s.name || ' haqida asosiy tushunchalarni o''rganasiz.',
  1,
  5
FROM public.skills s WHERE s.subject = 'Matematika';

INSERT INTO public.lessons (skill_id, title, content, lesson_order, duration_minutes)
SELECT 
  s.id,
  'Amaliy mashqlar',
  'Bu darsda ' || s.name || ' bo''yicha amaliy mashqlar bajarasiz.',
  2,
  10
FROM public.skills s WHERE s.subject = 'Matematika';

-- Insert sample practice problems for first skill (Sonlarni Sanash)
INSERT INTO public.practice_problems (skill_id, question_text, options, correct_answer, difficulty, explanation)
SELECT 
  s.id,
  '5 dan keyin qaysi son keladi?',
  '["4", "6", "7", "5"]'::jsonb,
  '6',
  1,
  '5 dan keyin 6 keladi chunki ketma-ketlikda har bir son oldingisidan 1 ga katta.'
FROM public.skills s WHERE s.name = 'Sonlarni Sanash';

INSERT INTO public.practice_problems (skill_id, question_text, options, correct_answer, difficulty, explanation)
SELECT 
  s.id,
  '10 dan oldin qaysi son keladi?',
  '["9", "11", "8", "10"]'::jsonb,
  '9',
  1,
  '10 dan oldin 9 keladi.'
FROM public.skills s WHERE s.name = 'Sonlarni Sanash';

-- Insert sample practice problems for Qo'shish
INSERT INTO public.practice_problems (skill_id, question_text, options, correct_answer, difficulty, explanation)
SELECT 
  s.id,
  '3 + 4 = ?',
  '["6", "7", "8", "5"]'::jsonb,
  '7',
  1,
  '3 va 4 ni qo''shsak 7 bo''ladi.'
FROM public.skills s WHERE s.name = 'Qo''shish';

INSERT INTO public.practice_problems (skill_id, question_text, options, correct_answer, difficulty, explanation)
SELECT 
  s.id,
  '5 + 5 = ?',
  '["9", "10", "11", "8"]'::jsonb,
  '10',
  2,
  '5 va 5 ni qo''shsak 10 bo''ladi.'
FROM public.skills s WHERE s.name = 'Qo''shish';

-- Insert sample practice problems for Ayirish
INSERT INTO public.practice_problems (skill_id, question_text, options, correct_answer, difficulty, explanation)
SELECT 
  s.id,
  '8 - 3 = ?',
  '["4", "5", "6", "7"]'::jsonb,
  '5',
  1,
  '8 dan 3 ni ayirsak 5 bo''ladi.'
FROM public.skills s WHERE s.name = 'Ayirish';

INSERT INTO public.practice_problems (skill_id, question_text, options, correct_answer, difficulty, explanation)
SELECT 
  s.id,
  '10 - 7 = ?',
  '["2", "3", "4", "5"]'::jsonb,
  '3',
  2,
  '10 dan 7 ni ayirsak 3 bo''ladi.'
FROM public.skills s WHERE s.name = 'Ayirish';