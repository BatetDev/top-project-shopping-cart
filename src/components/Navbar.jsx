import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';

export default function Navbar() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav>
      <Link to='/'>PhoneShop</Link>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/shop'>Shop</Link>
        </li>
        <li>
          <Link to='/cart'>
            Cart
            {totalItems > 0 && (
              <span className='cart-badge'>({totalItems})</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
