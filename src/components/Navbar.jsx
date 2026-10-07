import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { useUI } from '../context/useUI';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { cartItems } = useCart();
  const { openCart } = useUI();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={styles.navBar}>
      <Link to='/' className={styles.brand}>
        Lakon Tech
      </Link>
      <div className={styles.links}>
        <Link to='/shop'>Shop</Link>
        <button type='button' className={styles.cartButton} onClick={openCart}>
          Cart
          {totalItems > 0 && (
            <span className={styles.cartBadge}>({totalItems})</span>
          )}
        </button>
      </div>
    </nav>
  );
}
