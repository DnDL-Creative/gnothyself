import Image from "next/image";
import { PipeButton } from "@/components/ui/PipeButton/PipeButton";
import styles from "./page.module.css";

const LOGO_URL =
  "https://imagedelivery.net/5MAOvNjO0OBL917jHWR5AA/85f39318-adc9-4f99-d550-b7f69fba5800/public";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Image
          src={LOGO_URL}
          alt="intheGno"
          width={400}
          height={130}
          className={styles.heroLogo}
          priority
        />

        <p className={styles.tagline}>Stay Grounded</p>

        <div className={styles.actions}>
          <PipeButton href="/about">about</PipeButton>
          <PipeButton href="/blog">observations</PipeButton>
        </div>

      </div>
    </main>
  );
}
