import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchJSON } from '../utils/fetchJSON';
import { useCart } from '../context/useCart';
import ProductCard from '../components/ProductCard';
import styles from './ShopPage.module.css';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') ?? 'all';

  const { addItem } = useCart();

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

  const visibleProducts =
    category === 'all'
      ? products
      : products.filter((product) => product.category === category);

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Phones', value: 'smartphones' },
    { label: 'Gear', value: 'mobile-accessories' },
  ];

  return (
    <main className={styles.shopPage}>
      <h1>Shop</h1>

      <div className={styles.filters}>
        {filters.map(({ label, value }) => (
          <button
            key={value}
            type='button'
            className={category === value ? styles.active : ''}
            onClick={() =>
              setSearchParams(value === 'all' ? {} : { category: value })
            }
          >
            {label}
          </button>
        ))}
      </div>

      {visibleProducts.length === 0 ? (
        <p className={styles.noResults}>No products match this filter.</p>
      ) : (
        <div className={styles.productGrid}>
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addItem}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default ShopPage;
