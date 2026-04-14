/**
 * Blog post data fetcher.
 * Reads from Supabase `itg_posts` table (primary).
 * Content is stored as HTML strings (same as DNDL `posts` table).
 * Falls back to static data if DB is unreachable.
 */

import { createSupabaseServerClient } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";

/* ═══════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════ */

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  tags: string[];
  readTime: string;
  heroImage?: string;
  heroImageAlt?: string;
  /** Raw HTML body content — rendered via html-react-parser */
  content: string;
}

/* ═══════════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════════ */

/** Strip HTML tags to get plain text for word counting / subtitle extraction */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function estimateReadTime(html: string): string {
  const words = stripHtml(html).split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/** Extract a subtitle from the first <p> tag content */
function extractSubtitle(html: string): string {
  const match = html.match(/<p[^>]*>(.*?)<\/p>/s);
  if (!match) return "";
  const text = stripHtml(match[1]);
  if (text.length <= 80) return text;
  // Cut at first period after 40 chars or at 80 chars
  const periodIdx = text.indexOf(".", 40);
  if (periodIdx > 0 && periodIdx < 120) return text.slice(0, periodIdx + 1);
  return text.slice(0, 80) + "…";
}

/* ═══════════════════════════════════════════════════════════════════
   DB row → BlogPost mapper
   ═══════════════════════════════════════════════════════════════════ */

function rowToPost(row: any): BlogPost {
  const html = typeof row.content === "string" ? row.content : "";
  return {
    slug: row.slug,
    title: row.title,
    subtitle: extractSubtitle(html),
    date: row.date,
    tags: row.tag ? [row.tag] : [],
    readTime: estimateReadTime(html),
    heroImage: row.image || undefined,
    heroImageAlt: row.title,
    content: html,
  };
}

/* ═══════════════════════════════════════════════════════════════════
   Public API — used by blog pages
   ═══════════════════════════════════════════════════════════════════ */

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("itg_posts")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: false });

    if (error) throw error;
    if (data && data.length > 0) {
      return data.map(rowToPost);
    }
  } catch (e) {
    console.warn("[intheGno] Failed to fetch posts from DB, using static fallback:", e);
  }

  return Object.values(STATIC_POSTS);
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("itg_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error) throw error;
    if (data) return rowToPost(data);
  } catch (e) {
    console.warn("[intheGno] Failed to fetch post from DB, using static fallback:", e);
  }

  return STATIC_POSTS[slug];
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error("Missing Supabase env vars");

    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("itg_posts")
      .select("slug")
      .eq("published", true);

    if (error) throw error;
    if (data && data.length > 0) {
      return data.map((r) => r.slug);
    }
  } catch (e) {
    console.warn("[intheGno] Failed to fetch slugs from DB, using static fallback:", e);
  }

  return Object.keys(STATIC_POSTS);
}

/* ═══════════════════════════════════════════════════════════════════
   Static fallback (abbreviated)
   ═══════════════════════════════════════════════════════════════════ */

const STATIC_POSTS: Record<string, BlogPost> = {
  "new-age-grift": {
    slug: "new-age-grift",
    title: "new age grift",
    subtitle: "when spirituality becomes a sales funnel",
    date: "Apr 11, 2026",
    tags: ["manipulation"],
    readTime: "6 min read",
    content: "<p>Content unavailable — please check database connection.</p>",
  },
  "truth-isnt-linear": {
    slug: "truth-isnt-linear",
    title: "truth isn't linear",
    subtitle: "on the obsession with being right",
    date: "Apr 18, 2026",
    tags: ["NPCs"],
    readTime: "8 min read",
    content: "<p>Content unavailable — please check database connection.</p>",
  },
  "will-we-split-in-two": {
    slug: "will-we-split-in-two",
    title: "humanity has already split",
    subtitle: "the torus, the pendulum, and the pattern",
    date: "Apr 25, 2026",
    tags: ["NPCs"],
    readTime: "10 min read",
    content: "<p>Content unavailable — please check database connection.</p>",
  },
  "what-is-freedom": {
    slug: "what-is-freedom",
    title: "what is freedom",
    subtitle: "because it damn sure isn't what they told you",
    date: "May 2, 2026",
    tags: ["sovereignty"],
    readTime: "7 min read",
    content: "<p>Content unavailable — please check database connection.</p>",
  },
  "how-theyre-cooking-us": {
    slug: "how-theyre-cooking-us",
    title: "how they're cooking us",
    subtitle: "food, frequencies, and the slow kill",
    date: "May 9, 2026",
    tags: ["vessel"],
    readTime: "9 min read",
    content: "<p>Content unavailable — please check database connection.</p>",
  },
  "violence-is-never-the-answer": {
    slug: "violence-is-never-the-answer",
    title: "\"violence is not the answer\"",
    subtitle: "said the people who bomb countries for oil",
    date: "May 16, 2026",
    tags: ["hypocrisy"],
    readTime: "8 min read",
    content: "<p>Content unavailable — please check database connection.</p>",
  },
};
