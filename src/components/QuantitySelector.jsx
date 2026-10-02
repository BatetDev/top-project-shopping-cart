function QuantitySelector({ quantity, setQuantity, stock }) {
  const increment = () => setQuantity(Math.min(quantity + 1, stock));
  const decrement = () => setQuantity(Math.max(quantity - 1, 1));

  const handleInputChange = (e) => {
    const parsed = parseInt(e.target.value, 10);

    if (Number.isNaN(parsed)) {
      setQuantity(1);
      return;
    }

    setQuantity(Math.min(Math.max(parsed, 1), stock));
  };

  return (
    <div className='quantity-selector'>
      <button type='button' onClick={decrement} disabled={quantity <= 1}>
        -
      </button>
      <input
        type='number'
        value={quantity}
        onChange={handleInputChange}
        min={1}
        max={stock}
      />
      <button type='button' onClick={increment} disabled={quantity >= stock}>
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
