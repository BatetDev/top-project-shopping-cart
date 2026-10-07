import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/useCart';
import { useUI } from '../context/useUI';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useUI();
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem } =
    useCart();

  const [shouldRender, setShouldRender] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- coordinates exit animation before unmount
      setShouldRender(true);
    } else {
      setIsActive(false);
      const timer = setTimeout(() => setShouldRender(false), 250);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  useEffect(() => {
    if (!shouldRender || !isCartOpen) return;

    const raf = requestAnimationFrame(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- fires after paint to trigger enter transition
      requestAnimationFrame(() => setIsActive(true));
    });

    return () => cancelAnimationFrame(raf);
  }, [shouldRender, isCartOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isCartOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') closeCart();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isCartOpen, closeCart]);

  // Close on route change
  const location = useLocation();

  useEffect(() => {
    closeCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: only run on pathname change
  }, [location.pathname]);

  if (!shouldRender) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return createPortal(
    <div
      className={`${styles.backdrop} ${isActive ? styles.active : ''}`}
      onClick={closeCart}
    >
      <aside
        className={`${styles.drawer} ${isActive ? styles.active : ''}`}
        role='dialog'
        aria-modal='true'
        aria-label='Shopping cart'
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>Cart</h2>
          <button
            type='button'
            className={styles.closeButton}
            onClick={closeCart}
            aria-label='Close cart'
          >
            ×
          </button>
        </div>

        <div className={styles.body}>
          {cartItems.length === 0 ? (
            <div className={styles.empty}>
              <p>Your cart is empty.</p>
              <Link
                to='/shop'
                className={styles.continueLink}
                onClick={closeCart}
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            <ul className={styles.itemList}>
              {cartItems.map((item) => (
                <li key={item.id} className={styles.item}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                    <div className={styles.itemControls}>
                      <button
                        type='button'
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        −
                      </button>
                      <span className={styles.itemQuantity}>
                        {item.quantity}
                      </span>
                      <button
                        type='button'
                        onClick={() => increaseQuantity(item.id)}
                        disabled={item.quantity >= item.stock}
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        +
                      </button>
                      <button
                        type='button'
                        className={styles.removeButton}
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link
              to='/cart'
              className={styles.viewCartLink}
              onClick={closeCart}
            >
              View full cart
            </Link>
            <Link
              to='/checkout'
              className={styles.checkoutButton}
              onClick={closeCart}
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </div>,
    document.body,
  );
}
