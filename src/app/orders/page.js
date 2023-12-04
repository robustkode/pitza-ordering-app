"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/useProfile";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import { useSession } from "next-auth/react";
import { OrdersContext } from "../../OrdersContext";
import CartProduct from "@/components/layout/menu/CartProduct";
import { cartProductPrice } from "@/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data: profile } = useProfile();
  const { orders: guestOrders, setOrders: setGuestOrders } =
    useContext(OrdersContext);
  const session = useSession();

  useEffect(() => {
    fetchOrders();
    setLoadingOrders(false);
  }, []);

  function fetchOrders() {
    if (session.status === "authenticated") {
      console.log("uth");
      setLoadingOrders(true);
      fetch("/api/orders").then((res) => {
        res.json().then((orders) => {
          setOrders(orders.reverse());
          setLoadingOrders(false);
        });
      });
    } else if (guestOrders.length) {
      // const options = {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(guestOrders),
      // };

      const params = JSON.stringify(guestOrders);

      setLoadingOrders(true);
      console.log("orders", guestOrders);
      fetch("/api/orders?list=" + params).then((res) => {
        res.json().then((orders) => {
          console.log(orders, "orders");
          setOrders(orders.reverse());
          setLoadingOrders(false);
        });
      });
    }
  }

  function getSubTotal(order) {
    let subtotal = 0;
    if (order?.cartProducts) {
      for (const product of order?.cartProducts) {
        subtotal += cartProductPrice(product);
      }
    }
    return subtotal;
  }

  //return (
  // <section className="mt-8 w-full">
  //   <div className="mt-8 ">
  //     {loadingOrders ? (
  //       <Image
  //         className="mx-auto my-32"
  //         src={"/loading.gif"}
  //         width={100}
  //         height={100}
  //         alt="loading"
  //       />
  //     ) : orders?.length > 0 ? (
  //       orders.map((order) => (
  //         <div
  //           key={order._id}
  //           className=" w-full orders-list grid md:grid-cols-ordersList md:justify-between bg-gray-100 rounded-lg items-center text-center justify-center p-4 mb-2"
  //         >
  //           <div className="text-gray-700">{order.userEmail}</div>
  //           <div className="text-gray-700 text-sm">
  //             {order.cartProducts.map((p) => p.name).join(", ")}
  //           </div>

  //           <div className={order.paid ? "text-green-500" : "text-red-400"}>
  //             {order.paid ? "Paid" : "Not paid"}
  //           </div>

  //           <div className="text-gray-700 text-sm">
  //             {moment(order.createdAt).format(" h:mm:ss a | MMM D YY ")}
  //           </div>
  //         </div>
  //       ))
  //     ) : (
  //       <p className="text-center text-2xl font-semiBold">
  //         You haven&apos;t ordered yet!
  //       </p>
  //     )}
  //   </div>
  // </section>

  return (
    <section className="max-w-2xl mx-auto mt-8">
      {loadingOrders && (
        <Image
          className="mx-auto my-32"
          src={"/loading.gif"}
          width={100}
          height={100}
          alt="loading"
        />
      )}

      {orders.length ? (
        orders.map((order) => (
          <div className="grid md:grid-cols-2 md:gap-16 mb-3">
            <div className="text-gray-800">
              {order.cartProducts.map((product) => (
                <CartProduct key={product._id} product={product} />
              ))}
              <div className="text-right py-2 text-gray-500">
                Subtotal:
                <span className="text-black  inline-block w-8">
                  ${getSubTotal(order)}
                </span>
                <br />
                Delivery:
                <span className="text-black inline-block w-8">$5</span>
                <br />
                Total:
                <span className="text-black inline-block w-8">
                  ${getSubTotal(order) + 5}
                </span>
              </div>
            </div>
            <div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <AddressInputs disabled={true} addressProps={order} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </section>
  );
}
