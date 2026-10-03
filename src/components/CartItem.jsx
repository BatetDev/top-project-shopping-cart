function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <article className='cart-item'>
      <img src={item.thumbnail} alt={item.title} />
      <h3>{item.title}</h3>
      <button type='button' onClick={onDecrease} disabled={item.quantity <= 1}>
        -
      </button>
      <p>{item.quantity}</p>
      <button
        type='button'
        onClick={onIncrease}
        disabled={item.quantity >= item.stock}
      >
        +
      </button>
      <p>Price: {item.price.toFixed(2)} each</p>
      <p>
        Subtotal ({item.quantity} {item.quantity === 1 ? 'item' : 'items'}): $
        {(item.quantity * item.price).toFixed(2)}
      </p>
      <button type='button' onClick={onRemove}>
        Remove from Cart
      </button>
    </article>
  );
}

export default CartItem;
