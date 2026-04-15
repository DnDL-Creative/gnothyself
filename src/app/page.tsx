import Image from "next/image";
import { PipeButton } from "@/components/ui/PipeButton/PipeButton";
import styles from "./page.module.css";

const LOGO_URL =
  "https://media.beinthegno.com/branding/main-logo.png";

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
