import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <main className={styles.notFound}>
      <h1>404</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to='/shop' className={styles.link}>
        Continue shopping
      </Link>
    </main>
  );
}
