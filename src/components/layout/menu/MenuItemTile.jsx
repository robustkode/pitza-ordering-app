import AddToCartButton from "@/components/layout/menu/AddToCartButton";
import Image from "next/image";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <div className="bg-itemBackground  p-4 rounded-lg flex flex-col text-center group hover:bg-itemBackgroundHover hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="grow">
        <Image
          src={image}
          alt={name}
          height={300}
          width={300}
          className="mx-auto"
        />

        <h4
          className={oswald.className + "font-semibold uppercase text-3xl my-3"}
        >
          {name}
        </h4>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      </div>

      <AddToCartButton
        image={image}
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        price={basePrice}
      />
    </div>
  );
}
