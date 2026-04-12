import type { Metadata } from "next";
import styles from "../coming-soon.module.css";

export const metadata: Metadata = {
  title: "Anti-EMF",
  description: "EMF protection for the aware. Shield your vessel from frequencies that weren't designed to help you. Coming soon.",
};

export default function AntiEmfPage() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          inthe<span className={styles.accent}>Gno</span> Anti-EMF
        </h1>
        <p className={styles.message}>
          5G is fucking us. So we're gonna fight back.
        </p>
        <span className={styles.badge}>coming soon</span>
      </div>
    </main>
  );
}
