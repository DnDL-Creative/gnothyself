import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Ships from Ohio via USPS. 5-7 business days. Free tracking on every order. 14-day return window for damaged items.",
};

export default function ShippingPage() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>Shipping &amp; Returns</h1>
        <p className={styles.updated}>Last updated: April 11, 2026</p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Shipping</h2>
          <ul>
            <li>All orders ship from Ohio.</li>
            <li>Standard shipping: 5-7 business days.</li>
            <li>We ship USPS unless otherwise noted.</li>
            <li>Tracking is provided for every order.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Returns</h2>
          <p>
            If something arrives damaged or wrong, we&apos;ll make it right.
            Email us within 14 days of delivery at{" "}
            <a href="mailto:dm@inthegno.com">dm@inthegno.com</a>{" "}
            with your order number and a photo.
          </p>
          <p>
            We don&apos;t do returns on apparel unless it&apos;s defective.
            We&apos;re a small operation. Every shirt is printed with intent.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>International</h2>
          <p>
            International shipping is available. Rates and delivery times vary
            by destination. Customs fees are the buyer&apos;s responsibility.
            For international payment options including bank transfers, visit{" "}
            <a href="https://dndlcreative.com" target="_blank" rel="noopener noreferrer">
              dndlcreative.com
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
