-- Create shop items table
CREATE TABLE public.shop_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- 'avatar', 'theme', 'powerup'
  price INTEGER NOT NULL DEFAULT 50,
  icon TEXT NOT NULL DEFAULT 'gift',
  preview_value TEXT, -- For themes: color value, for avatars: image url
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user purchases table
CREATE TABLE public.user_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  item_id UUID NOT NULL REFERENCES public.shop_items(id) ON DELETE CASCADE,
  purchased_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_equipped BOOLEAN NOT NULL DEFAULT false,
  UNIQUE(user_id, item_id)
);

-- Enable RLS
ALTER TABLE public.shop_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_purchases ENABLE ROW LEVEL SECURITY;

-- Shop items are publicly readable
CREATE POLICY "Shop items are publicly readable"
  ON public.shop_items FOR SELECT
  USING (is_active = true);

-- User purchases policies
CREATE POLICY "Users can view their own purchases"
  ON public.user_purchases FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own purchases"
  ON public.user_purchases FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own purchases"
  ON public.user_purchases FOR UPDATE
  USING (auth.uid() = user_id);

-- Insert default shop items
INSERT INTO public.shop_items (name, description, category, price, icon, preview_value) VALUES
  -- Avatar items
  ('Oltin Toj', 'Profilingizga qirollik toji qo''shing', 'avatar', 200, 'crown', '👑'),
  ('Super Qahramon', 'Super qahramon niqobi', 'avatar', 150, 'mask', '🦸'),
  ('Kosmik Shar', 'Kosmik astronavt dubulg''asi', 'avatar', 300, 'rocket', '🚀'),
  ('Sehrli Shapka', 'Sehrgar shapkasi', 'avatar', 175, 'sparkles', '🎩'),
  ('Sport Chempion', 'Oltin medal', 'avatar', 125, 'medal', '🏅'),
  
  -- Themes
  ('Kosmik Mavzu', 'Qorong''u kosmik fon', 'theme', 250, 'moon', 'cosmic'),
  ('O''rmon Mavzusi', 'Yashil tabiat fonida', 'theme', 200, 'trees', 'forest'),
  ('Okean Mavzusi', 'Ko''k okean to''lqinlari', 'theme', 200, 'waves', 'ocean'),
  ('Quyosh Mavzusi', 'Yorqin sariq ranglar', 'theme', 175, 'sun', 'sunny'),
  ('Tungi Mavzu', 'Tungi yulduzli osmon', 'theme', 225, 'star', 'night'),
  
  -- Power-ups
  ('2x XP Boost', '1 soat davomida 2x XP oling', 'powerup', 100, 'zap', 'xp_2x'),
  ('Maslahat Bonusi', '5 ta bepul AI maslahat', 'powerup', 75, 'lightbulb', 'hints_5'),
  ('Streak Himoyasi', 'Streakni yo''qotishdan himoya', 'powerup', 150, 'shield', 'streak_shield'),
  ('Bonus Tangalar', 'Keyingi mashqda 2x tanga', 'powerup', 80, 'coins', 'coins_2x'),
  ('Vaqt Uzaytirish', 'Jangda +10 soniya vaqt', 'powerup', 120, 'timer', 'time_extend');