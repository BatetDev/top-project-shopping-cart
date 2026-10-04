import { useCart } from '../context/useCart';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cartItems, dispatch } = useCart();

  if (cartItems.length === 0) {
    return (
      <main>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to='/shop'>Continue shopping</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Cart</h1>
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
      <button type='button' onClick={() => dispatch({ type: 'CLEAR_CART' })}>
        Clear Cart
      </button>
      <Link to='/shop'>Continue shopping</Link>
    </main>
  );
}
