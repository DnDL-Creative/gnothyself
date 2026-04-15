import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Apparel",
  description:
    "Minimalist statement apparel for the spiritually sovereign. 100% ring-spun cotton. Free shipping over $75.",
};

/* ═══════════════════════════════════════════════════════════════════
   Static product data — mirrors Shopify Storefront API shape.
   Will be replaced by shopifyFetch() once the store is live.
   ═══════════════════════════════════════════════════════════════════ */

const products = [
  {
    handle: "proud-unregistered-voter",
    title: "Proud Unregistered Voter",
    description:
      'P. Diddy used to tell us to "Vote or Die!" Then it was finally revealed he was a huge pedo, so... yea we\'re good. This one is bound to catch some fluoride stares at the grocery store. 100% ring-spun cotton. Pre-shrunk.',
    image: "https://media.beinthegno.com/apparel/shirt-proud.png",
    price: "29.00",
    compareAtPrice: "38.00",
    currency: "USD",
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["White", "Black", "Heather Grey"],
    available: false,
    badge: "Coming Soon",
  },
  {
    handle: "literal-tinfoil-hat",
    title: "(Almost) Literal Tinfoil Hat",
    description:
      "They called us crazy. We made the hat. Lined with a Faraday mesh — the same shielding principle used in military-grade EMF enclosures — except this one goes on your head. • Blocks RF & microwave frequencies • Stylish enough for the farmers market • Scientifically grounded, socially questionable • One size fits most awakened heads",
    image: null,
    price: "24.00",
    compareAtPrice: null,
    currency: "USD",
    sizes: ["One Size"],
    colors: ["Silver"],
    available: false,
    badge: "Coming Soon",
  },
];

export default function ApparelPage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>inthe<span className={styles.accent}>Gno</span> Apparel</h1>
        <p className={styles.subtitle}>wear what you mean</p>
      </header>

      <div className={styles.grid}>
        {products.map((product) => (
          <article key={product.handle} className={styles.product}>
            <div className={styles.imageWrap}>
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  width={600}
                  height={600}
                  className={styles.image}
                  priority
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <span>Image Coming Soon</span>
                </div>
              )}
            </div>

            <div className={styles.details}>
              {product.badge && (
                <span className={styles.badge}>{product.badge}</span>
              )}
              <h2 className={styles.productTitle}>{product.title}</h2>
              <p className={styles.productDesc}>{product.description}</p>

              <div className={styles.price}>
                <span className={styles.amount}>${product.price}</span>
                {product.compareAtPrice && (
                  <span className={styles.compareAt}>
                    ${product.compareAtPrice}
                  </span>
                )}
              </div>
              {product.compareAtPrice && (
                <p className={styles.priceNote}>
                  debut drop... so we dropped the price
                </p>
              )}

              {/* Size selector */}
              <div className={styles.optionGroup}>
                <label className={styles.optionLabel}>Size</label>
                <div className={styles.options}>
                  {product.sizes.map((size) => (
                    <button key={size} className={styles.optionBtn}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className={styles.optionGroup}>
                  <label className={styles.optionLabel}>Color</label>
                  <div className={styles.options}>
                    {product.colors.map((color) => (
                      <button key={color} className={styles.optionBtn}>
                        {color}
                      </button>
                    ))}
                  </div>
              </div>

              <button
                className={styles.addToCart}
                disabled={!product.available}
              >
                {product.available ? "Add to Cart" : "Sold Out"}
              </button>

              <p className={styles.shipping}>
                Free shipping on orders over $75
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
