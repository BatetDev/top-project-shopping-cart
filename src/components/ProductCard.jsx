import { useState } from 'react';
import QuantitySelector from './QuantitySelector';

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddClick = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <article className='product-card'>
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>

      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        stock={product.stock}
      />

      <button type='button' onClick={handleAddClick}>
        Add to Cart
      </button>
    </article>
  );
}

export default ProductCard;
