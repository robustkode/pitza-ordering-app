import { cartProductPrice } from "@/AppContext";
import { FiTrash2 } from "react-icons/fi";
import Image from "next/image";

export default function CartProduct({ product, onRemove, index }) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        <Image width={240} height={240} src={product.image} alt={"item"} />
      </div>
      <div className="grow">
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        {product.size && (
          <div className="text-sm text-gray-800">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra) => (
              <div key={extra.name}>
                {extra.name} ${extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">${cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
          <button type="button" onClick={() => onRemove(index)} className="p-2">
            <FiTrash2 size={26} />
          </button>
        </div>
      )}
    </div>
  );
}
