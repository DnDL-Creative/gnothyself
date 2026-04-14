/* ═══════════════════════════════════════════════════════════════════
   Supabase Database Types (Placeholder)
   All intheGno tables use the `itg_` prefix.
   Run `npx supabase gen types typescript` once the project is
   connected to generate real types from your schema.

   Future integration points:
   - Shopify Storefront API (product sync → itg_products)
   - Stripe (subscription/wholesale → itg_subscriptions)
   - Cloudflare Images (asset URLs stored in rows)
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
      itg_posts: {
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
          /** Product handle for CTA block (links to Shopify product) */
          cta_product_handle: string | null;
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
          cta_product_handle?: string | null;
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
          cta_product_handle?: string | null;
          updated_at?: string;
        };
      };
      itg_profiles: {
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
      /** Future: Synced from Shopify Storefront API */
      itg_products: {
        Row: {
          id: string;
          shopify_id: string;
          handle: string;
          title: string;
          description: string | null;
          price: string;
          compare_at_price: string | null;
          currency: string;
          image_url: string | null;
          available: boolean;
          synced_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          shopify_id: string;
          handle: string;
          title: string;
          description?: string | null;
          price: string;
          compare_at_price?: string | null;
          currency?: string;
          image_url?: string | null;
          available?: boolean;
          synced_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          price?: string;
          compare_at_price?: string | null;
          image_url?: string | null;
          available?: boolean;
          synced_at?: string;
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
