import type { Metadata } from "next";
import styles from "../coming-soon.module.css";

export const metadata: Metadata = {
  title: "Copper",
  description: "Copper goods for the grounded. Ancient tech, modern application. Coming soon.",
};

export default function CopperPage() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          inthe<span className={styles.accent}>Gno</span> Copper
        </h1>
        <p className={styles.message}>
          Turns out copper is more than just pipes.
        </p>
        <span className={styles.badge}>coming soon</span>
      </div>
    </main>
  );
}
