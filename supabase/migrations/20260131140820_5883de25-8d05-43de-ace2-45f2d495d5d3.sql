-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'trophy',
  badge_color TEXT NOT NULL DEFAULT 'primary',
  xp_reward INTEGER NOT NULL DEFAULT 10,
  requirement_type TEXT NOT NULL, -- 'skill_complete', 'practice_score', 'streak', 'total_xp', 'skills_mastered'
  requirement_value INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user achievements table
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Enable RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Achievements are publicly readable
CREATE POLICY "Achievements are publicly readable"
  ON public.achievements FOR SELECT
  USING (true);

-- User achievements policies
CREATE POLICY "Users can view their own achievements"
  ON public.user_achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements"
  ON public.user_achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Insert default achievements
INSERT INTO public.achievements (name, description, icon, badge_color, xp_reward, requirement_type, requirement_value) VALUES
  ('Birinchi Qadam', 'Birinchi ko''nikmangizni yakunlang', 'footprints', 'primary', 50, 'skill_complete', 1),
  ('Zo''r O''quvchi', '5 ta ko''nikmani yakunlang', 'book-open', 'accent', 100, 'skills_mastered', 5),
  ('Matematik', '10 ta ko''nikmani yakunlang', 'calculator', 'primary', 200, 'skills_mastered', 10),
  ('Mukammal Ball', 'Mashqda 100% ball oling', 'star', 'accent', 75, 'practice_score', 100),
  ('A''lochi', 'Mashqda 90% dan yuqori ball oling', 'award', 'primary', 50, 'practice_score', 90),
  ('Streak Ustasi', '7 kunlik streak ga erishing', 'flame', 'accent', 150, 'streak', 7),
  ('XP Yig''uvchi', '500 XP to''plang', 'zap', 'primary', 100, 'total_xp', 500),
  ('XP Qiroli', '1000 XP to''plang', 'crown', 'accent', 200, 'total_xp', 1000),
  ('Tezkor Javob', 'Birinchi mashqni yakunlang', 'timer', 'primary', 25, 'practice_score', 1),
  ('Ustoz', 'Barcha 1-sinf matematika ko''nikmalarini yakunlang', 'graduation-cap', 'accent', 500, 'skills_mastered', 10);