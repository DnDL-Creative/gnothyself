import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we handle your data. No tracking pixels, no retargeting ads, no selling your information.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: April 11, 2026</p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Who we are</h2>
          <p>
            intheGno is a brand operated by DnDL Creative LLC. For all legal,
            payment, and company matters, visit{" "}
            <a href="https://dndlcreative.com" target="_blank" rel="noopener noreferrer">
              dndlcreative.com
            </a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What we collect</h2>
          <p>
            When you make a purchase, we collect the information needed to
            fulfill your order: name, shipping address, email, and payment
            details. Payment processing is handled by Shopify. We never see
            or store your full credit card number.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What we don&apos;t do</h2>
          <ul>
            <li>We don&apos;t sell your data to third parties.</li>
            <li>We don&apos;t run invasive tracking or retargeting ads.</li>
            <li>We don&apos;t send you marketing emails unless you opt in.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Cookies</h2>
          <p>
            We use essential cookies to keep the site functional (cart, session).
            No third-party analytics cookies. No Facebook pixel. No Google
            Analytics. We genuinely do not care about your browsing habits.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact</h2>
          <p>
            Questions about your data? Email us at{" "}
            <a href="mailto:dm@inthegno.com">dm@inthegno.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
