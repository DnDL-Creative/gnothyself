import type { Metadata } from "next";
import styles from "../coming-soon.module.css";

export const metadata: Metadata = {
  title: "Orgone",
  description: "Orgone energy tools for the curious. Everything else is a lie — might as well try something ancient. Coming soon.",
};

export default function OrgonePage() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          inthe<span className={styles.accent}>Gno</span> Orgone
        </h1>
        <p className={styles.message}>
          Well... turns out everything else is a lie, so there&apos;s no reason not to try.
        </p>
        <span className={styles.badge}>coming soon</span>
      </div>
    </main>
  );
}
