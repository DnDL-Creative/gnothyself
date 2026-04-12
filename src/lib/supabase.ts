/* ═══════════════════════════════════════════════════════════════════
   Supabase Client — Server & Browser
   Uses @supabase/ssr for App Router compatibility.

   SETUP: Run these commands before using this module:
     npm install @supabase/supabase-js @supabase/ssr

   Then uncomment the code below and remove the placeholder export.
   ═══════════════════════════════════════════════════════════════════ */

// import { createBrowserClient } from "@supabase/ssr";
// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";
// import type { Database } from "@/types/database";

/**
 * Create a Supabase client for use in Client Components.
 * This client uses the anon key and is safe to expose in the browser.
 */
// export function createSupabaseBrowserClient() {
//   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//   const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
//
//   if (!supabaseUrl || !supabaseKey) {
//     throw new Error(
//       "[GnoThyself] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
//     );
//   }
//
//   return createBrowserClient<Database>(supabaseUrl, supabaseKey);
// }

/**
 * Create a Supabase client for use in Server Components, API routes,
 * and Server Actions. Reads/writes cookies for session management.
 */
// export async function createSupabaseServerClient() {
//   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//   const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
//
//   if (!supabaseUrl || !supabaseKey) {
//     throw new Error(
//       "[GnoThyself] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
//     );
//   }
//
//   const cookieStore = await cookies();
//
//   return createServerClient<Database>(supabaseUrl, supabaseKey, {
//     cookies: {
//       getAll() {
//         return cookieStore.getAll();
//       },
//       setAll(cookiesToSet) {
//         try {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             cookieStore.set(name, value, options)
//           );
//         } catch {
//           // `setAll` can fail in Server Components (read-only context).
//           // This is expected — session refresh happens via middleware.
//         }
//       },
//     },
//   });
// }

export {};
