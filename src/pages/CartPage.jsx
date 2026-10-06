import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import CartItem from '../components/CartItem';
import styles from './CartPage.module.css';

export default function CartPage() {
  const { cartItems, dispatch } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className={styles.cartPage}>
        <div className={styles.empty}>
          <h1>Cart</h1>
          <p>Your cart is empty.</p>
          <Link to='/shop' className={styles.continueLink}>
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.cartPage}>
      <h1>Cart</h1>

      <ul className={styles.cartList}>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() =>
              dispatch({ type: 'INCREASE_QUANTITY', payload: item.id })
            }
            onDecrease={() =>
              dispatch({ type: 'DECREASE_QUANTITY', payload: item.id })
            }
            onRemove={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
          />
        ))}
      </ul>

      <div className={styles.cartActions}>
        <button
          type='button'
          className={styles.clearButton}
          onClick={() => dispatch({ type: 'CLEAR_CART' })}
        >
          Clear Cart
        </button>
        <Link to='/shop' className={styles.continueLink}>
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
