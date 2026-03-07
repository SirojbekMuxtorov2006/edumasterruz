-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  username TEXT NOT NULL,
  avatar_url TEXT,
  coins INTEGER DEFAULT 0,
  xp INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  grade INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create questions table
CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  grade INTEGER NOT NULL,
  skill TEXT NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer TEXT NOT NULL,
  difficulty INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create battles table
CREATE TABLE public.battles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  grade INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'waiting',
  player1_id UUID,
  player2_id UUID,
  player1_score INTEGER DEFAULT 0,
  player2_score INTEGER DEFAULT 0,
  current_question INTEGER DEFAULT 0,
  total_questions INTEGER DEFAULT 5,
  winner_id UUID,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create battle_answers table for tracking individual answers
CREATE TABLE public.battle_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  battle_id UUID NOT NULL REFERENCES public.battles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  question_id UUID NOT NULL REFERENCES public.questions(id),
  answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  answer_time_ms INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battle_answers ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Questions policies (public read)
CREATE POLICY "Questions are viewable by everyone" ON public.questions FOR SELECT USING (true);

-- Battles policies
CREATE POLICY "Battles are viewable by everyone" ON public.battles FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create battles" ON public.battles FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Players can update their battles" ON public.battles FOR UPDATE USING (auth.uid() = player1_id OR auth.uid() = player2_id);

-- Battle answers policies
CREATE POLICY "Battle answers viewable by participants" ON public.battle_answers FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.battles 
    WHERE battles.id = battle_answers.battle_id 
    AND (battles.player1_id = auth.uid() OR battles.player2_id = auth.uid())
  )
);
CREATE POLICY "Authenticated users can insert answers" ON public.battle_answers FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Enable realtime for battles table
ALTER PUBLICATION supabase_realtime ADD TABLE public.battles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.battle_answers;

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample questions for battles
INSERT INTO public.questions (subject, grade, skill, question_text, options, correct_answer, difficulty) VALUES
('math', 1, 'addition', '5 + 3 = ?', '["6", "7", "8", "9"]', '8', 1),
('math', 1, 'addition', '7 + 2 = ?', '["8", "9", "10", "11"]', '9', 1),
('math', 1, 'addition', '4 + 6 = ?', '["9", "10", "11", "12"]', '10', 1),
('math', 1, 'subtraction', '10 - 3 = ?', '["5", "6", "7", "8"]', '7', 1),
('math', 1, 'subtraction', '8 - 5 = ?', '["2", "3", "4", "5"]', '3', 1),
('math', 2, 'multiplication', '3 × 4 = ?', '["10", "11", "12", "13"]', '12', 2),
('math', 2, 'multiplication', '5 × 5 = ?', '["20", "25", "30", "35"]', '25', 2),
('math', 2, 'division', '12 ÷ 3 = ?', '["3", "4", "5", "6"]', '4', 2),
('english', 1, 'vocabulary', 'What is the capital of England?', '["Paris", "London", "Berlin", "Rome"]', 'London', 1),
('english', 1, 'vocabulary', 'Which animal says "moo"?', '["Dog", "Cat", "Cow", "Bird"]', 'Cow', 1);