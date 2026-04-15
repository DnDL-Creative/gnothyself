import type { Metadata } from "next";
import { getAllPosts } from "./posts";
import BlogGrid from "./BlogGrid";
import styles from "./page.module.css";

/** Revalidate every 60s so new posts appear without redeploying */
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Observations",
  description:
    "Field notes from the uncomfortable middle. Essays on new-age grift, nonlinear truth, and the patterns they don't want you to see.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Observations</h1>
        <p className={styles.subtitle}>
          field notes from a spirit finding its way out
        </p>
      </header>

      <BlogGrid posts={posts} />
    </main>
  );
}
