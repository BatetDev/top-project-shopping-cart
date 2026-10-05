import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <main>
      <section className={styles.hero}>
        <h1>Lakon Tech</h1>
        <Link to='/shop?category=smartphones'>
          <img
            src='https://images.unsplash.com/photo-1568909039591-91857e3f46d1?auto=format&fit=crop&w=800&q=80'
            alt='Shop smartphones'
          />
        </Link>
        <Link to='/shop?category=accessories'>
          <img
            src='https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?auto=format&fit=crop&w=800&q=80'
            alt='Shop accessories'
          />
        </Link>
      </section>
      <section className={styles.intro}>
        <p>Curated Tech for the Modern Minimalist.</p>
        <Link to='/shop' className={styles.cta}>
          Shop Now
        </Link>
      </section>
    </main>
  );
}
