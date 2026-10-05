import { useState, useEffect } from 'react';
import { fetchJSON } from '../utils/fetchJSON';
import { useCart } from '../context/useCart';
import ProductCard from '../components/ProductCard';
import styles from './ShopPage.module.css';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { dispatch } = useCart();

  const handleAddToCart = (product, quantity) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product,
        quantity,
      },
    });
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const [phonesData, accessoriesData] = await Promise.all([
          fetchJSON(`${baseUrl}/smartphones`),
          fetchJSON(`${baseUrl}/mobile-accessories`),
        ]);

        const combinedProducts = [
          ...phonesData.products,
          ...accessoriesData.products,
        ];

        setProducts(combinedProducts);
      } catch (err) {
        console.error(err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className={styles.shopPage}>
      <h1>Shop</h1>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </main>
  );
}

export default ShopPage;
