"use client";
import { CartContext, cartProductPrice } from "@/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/layout/menu/CartProduct";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { OrdersContext } from "../../../OrdersContext";
import { useProfile } from "../../../useProfile";
import { useSession } from "next-auth/react";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const { addToOrders } = useContext(OrdersContext);
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { id } = useParams();
  const session = useSession();

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        if (session.status !== "authenticated") {
          console.log(id, "orderId");
          addToOrders({ _id: `ObjectId${id}` });
        }
        console.log("cleaning cart");
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true);

      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      });
    }
  }, [id]);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your order" />
        <div className="mt-4 mb-8">
          <p className="text-grey-500">Thanks for your order.</p>
        </div>
      </div>
      {loadingOrder && (
        <Image
          className="mx-auto my-32"
          src={"/loading.gif"}
          width={100}
          height={100}
          alt="loading"
        />
      )}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product) => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:
              <span className="text-black font-bold inline-block w-8">
                ${subtotal}
              </span>
              <br />
              Delivery:
              <span className="text-black font-bold inline-block w-8">$5</span>
              <br />
              Total:
              <span className="text-black font-bold inline-block w-8">
                ${subtotal + 5}
              </span>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs disabled={true} addressProps={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
