import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch. We read everything. General inquiries, order issues, and business matters.",
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>Contact</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>General inquiries</h2>
          <p>
            <a href="mailto:dm@inthegno.com">dm@inthegno.com</a>
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Order issues</h2>
          <p>
            Wrong size? Damaged in transit? Hit us up at the email above with
            your order number. We&apos;ll sort it out.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Business &amp; legal</h2>
          <p>
            intheGno is operated by DnDL Creative LLC, based in Ohio. For invoicing,
            partnerships, legal matters, or company information, visit{" "}
            <a href="https://dndlcreative.com" target="_blank" rel="noopener noreferrer">
              dndlcreative.com
            </a>.
          </p>
        </section>

      </div>
    </main>
  );
}
