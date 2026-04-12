/* ═══════════════════════════════════════════════════════════════════
   Supabase Database Types (Placeholder)
   Run `npx supabase gen types typescript` once the project is
   connected to generate real types from your schema.
   ═══════════════════════════════════════════════════════════════════ */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          content_markdown: string | null;
          category: string;
          tags: string[];
          featured_image: string | null;
          featured_image_alt: string | null;
          author_id: string;
          published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
          reading_time_minutes: number | null;
          seo_title: string | null;
          seo_description: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          content_markdown?: string | null;
          category: string;
          tags?: string[];
          featured_image?: string | null;
          featured_image_alt?: string | null;
          author_id: string;
          published?: boolean;
          published_at?: string | null;
          reading_time_minutes?: number | null;
          seo_title?: string | null;
          seo_description?: string | null;
        };
        Update: {
          slug?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          content_markdown?: string | null;
          category?: string;
          tags?: string[];
          featured_image?: string | null;
          featured_image_alt?: string | null;
          published?: boolean;
          published_at?: string | null;
          reading_time_minutes?: number | null;
          seo_title?: string | null;
          seo_description?: string | null;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          role: "admin" | "editor" | "reader";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          avatar_url?: string | null;
          role?: "admin" | "editor" | "reader";
        };
        Update: {
          display_name?: string | null;
          avatar_url?: string | null;
          role?: "admin" | "editor" | "reader";
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: "admin" | "editor" | "reader";
    };
  };
};
