import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The rules. Products sold as-is, no medical claims, do your own research. Operated by DnDL Creative LLC.",
};

export default function TermsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.updated}>Last updated: April 11, 2026</p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The basics</h2>
          <p>
            By using this site or purchasing from intheGno, you agree to these
            terms. intheGno is operated by DnDL Creative LLC. For full legal
            and company information, visit{" "}
            <a href="https://dndlcreative.com" target="_blank" rel="noopener noreferrer">
              dndlcreative.com
            </a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Products</h2>
          <p>
            Our products (apparel, copper goods, orgone, EMF protection) are
            sold as-is. We make no medical claims. These are physical products
            rooted in historical and esoteric use. We are transparent about
            this. Do your own research.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Payments</h2>
          <p>
            All payments are processed securely through Shopify. For payment
            methods, billing inquiries, and financial terms, refer to{" "}
            <a href="https://dndlcreative.com" target="_blank" rel="noopener noreferrer">
              dndlcreative.com
            </a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Intellectual property</h2>
          <p>
            All content, designs, branding, and copy on this site are owned by
            DnDL Creative LLC. Don&apos;t copy our stuff. If you want to
            collaborate, reach out.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Limitation of liability</h2>
          <p>
            We are not responsible for how you use our products. We sell
            physical goods. What you do with them is your business.
          </p>
        </section>
      </div>
    </main>
  );
}
