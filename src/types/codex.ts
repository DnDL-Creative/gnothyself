/* ═══════════════════════════════════════════════════════════════════
   Codex Types — "The Codex" Blog / CMS
   Backed by Supabase `posts` table.
   ═══════════════════════════════════════════════════════════════════ */

export type CodexCategory =
  | "gnosis"           // Core truth-seeking / hidden history
  | "vessel"           // Body fortification, health sovereignty
  | "tartaria"         // Ancient technology, lost civilizations
  | "frequency"        // EMF, sound, vibration, scalar waves
  | "construct"        // Archon systems, modern demiurge analysis
  | "alchemy";         // Transmutation, spiritual practices

export type CodexPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;           // Rich HTML content
  content_markdown?: string; // Raw markdown source
  category: CodexCategory;
  tags: string[];
  featured_image?: string;
  featured_image_alt?: string;
  author_id: string;
  author_name?: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  reading_time_minutes?: number;
  seo_title?: string;
  seo_description?: string;
  /** Social syndication status */
  syndicated_to?: {
    x?: string;        // Post URL on X/Twitter
    threads?: string;  // Post URL on Threads
    pinterest?: string; // Pin URL
  };
};

export type CodexPostPreview = Pick<
  CodexPost,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "category"
  | "tags"
  | "featured_image"
  | "featured_image_alt"
  | "published_at"
  | "reading_time_minutes"
  | "author_name"
>;
