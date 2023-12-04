export default function AddToCartButton({ hasSizesOrExtras, onClick, price }) {
  const refinedPrice = price ? price : 0;
  if (!hasSizesOrExtras) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="mt-4 bg-primary text-white rounded-full px-8 py-2 text-center"
      >
        <span>Add to cart ${refinedPrice}</span>
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2 text-center"
    >
      <span>Add to cart from ${refinedPrice}</span>
    </button>
  );
}
