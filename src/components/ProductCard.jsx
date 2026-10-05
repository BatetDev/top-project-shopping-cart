import styles from './ProductCard.module.css';

function ProductCard({ product, onAddToCart }) {
  return (
    <article className={styles.productCard}>
      <div className={styles.imageWrapper}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
        />
        <button
          type='button'
          className={styles.addButton}
          onClick={() => onAddToCart(product)}
          aria-label={`Add ${product.title} to cart`}
        >
          +
        </button>
      </div>
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.price}>${product.price.toFixed(2)}</p>
    </article>
  );
}

export default ProductCard;
