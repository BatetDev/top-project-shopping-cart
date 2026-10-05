import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={styles.navBar}>
      <Link to='/' className={styles.brand}>
        Lakon Tech
      </Link>
      <div className={styles.links}>
        <Link to='/shop'>Shop</Link>
        <Link to='/cart'>
          Cart
          {totalItems > 0 && (
            <span className={styles.cartBadge}>({totalItems})</span>
          )}
        </Link>
      </div>
    </nav>
  );
}
