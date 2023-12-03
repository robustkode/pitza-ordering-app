export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  price,
  image,
}) {
  const refinedPrice = price ? price : 0;
  if (!hasSizesOrExtras) {
    return (
      <div
        className="mt-4 bg-primary cursor-pointer   text-white rounded-full px-8 py-2 text-center"
        onClick={onClick}
      >
        Add to cart ${refinedPrice}
      </div>
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
