-- ═══════════════════════════════════════════════════════════════════
-- intheGno Blog Posts Table
-- Run this in Supabase SQL Editor FIRST, then run the seed script.
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.itg_posts (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title       TEXT NOT NULL DEFAULT '',
  slug        TEXT NOT NULL DEFAULT '',
  date        TEXT NOT NULL DEFAULT '',
  author      TEXT DEFAULT '',
  tag         TEXT DEFAULT '',
  content     JSONB,
  image       TEXT DEFAULT '',
  image_2     TEXT DEFAULT '',
  image_3     TEXT DEFAULT '',
  image_4     TEXT DEFAULT '',
  image_5     TEXT DEFAULT '',
  image_6     TEXT DEFAULT '',
  image_caption TEXT DEFAULT '',
  music_embed TEXT DEFAULT '',
  blogcast_url TEXT DEFAULT '',
  published   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT itg_posts_slug_unique UNIQUE (slug)
);

-- RLS: allow public read for published posts
ALTER TABLE public.itg_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published itg_posts"
  ON public.itg_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can manage itg_posts"
  ON public.itg_posts FOR ALL
  USING (auth.role() = 'authenticated');
