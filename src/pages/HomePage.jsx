import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <main>
      <section className={styles.hero}>
        <Link to='/shop?category=smartphones' className={styles.heroPanel}>
          <img
            src='https://images.unsplash.com/photo-1568909039591-91857e3f46d1?auto=format&fit=crop&w=800&q=80'
            alt=''
          />
          <span className={styles.heroLabel}>Phones</span>
        </Link>
        <Link
          to='/shop?category=mobile-accessories'
          className={styles.heroPanel}
        >
          <img
            src='https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?auto=format&fit=crop&w=800&q=80'
            alt=''
          />
          <span className={styles.heroLabel}>Gear</span>
        </Link>
      </section>
      <section className={styles.intro}>
        <h1>Curated Tech for the Modern Minimalist.</h1>
        <Link to='/shop' className={styles.cta}>
          Shop Now
        </Link>
      </section>
    </main>
  );
}
