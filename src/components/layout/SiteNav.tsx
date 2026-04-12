import Link from "next/link";
import Image from "next/image";
import styles from "./SiteNav.module.css";

const LOGO_URL =
  "https://imagedelivery.net/5MAOvNjO0OBL917jHWR5AA/85f39318-adc9-4f99-d550-b7f69fba5800/public";

export function SiteNav() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.brand}>
        <Image
          src={LOGO_URL}
          alt="intheGno"
          width={120}
          height={40}
          className={styles.logo}
          priority
        />
      </Link>
      <div className={styles.links}>
        <Link href="/apparel">Apparel</Link>
        <span className={styles.pipeSep} />
        <Link href="/copper">Copper</Link>
        <span className={styles.pipeSep} />
        <Link href="/anti-emf">Anti-EMF</Link>
        <span className={styles.pipeSep} />
        <Link href="/orgone">Orgone</Link>
      </div>
    </nav>
  );
}
