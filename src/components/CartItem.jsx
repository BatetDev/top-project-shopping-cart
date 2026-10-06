import styles from './CartItem.module.css';

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <li className={styles.cartItem}>
      <img src={item.thumbnail} alt={item.title} className={styles.thumbnail} />

      <div className={styles.info}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.unitPrice}>${item.price.toFixed(2)} each</p>
      </div>

      <div className={styles.quantityControls}>
        <button
          type='button'
          onClick={onDecrease}
          disabled={item.quantity <= 1}
          aria-label={`Decrease quantity of ${item.title}`}
        >
          −
        </button>
        <span className={styles.quantity}>{item.quantity}</span>
        <button
          type='button'
          onClick={onIncrease}
          disabled={item.quantity >= item.stock}
          aria-label={`Increase quantity of ${item.title}`}
        >
          +
        </button>
      </div>

      <p className={styles.subtotal}>
        ${(item.quantity * item.price).toFixed(2)}
      </p>

      <button
        type='button'
        className={styles.removeButton}
        onClick={onRemove}
        aria-label={`Remove ${item.title} from cart`}
      >
        ×
      </button>
    </li>
  );
}

export default CartItem;
