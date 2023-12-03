"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/useProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data: profile } = useProfile();

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch("/api/orders").then((res) => {
      res.json().then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
    });
  }

  return (
    <section className="mt-8 w-full">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8 ">
        {loadingOrders || loading ? (
          <Image
            className="mx-auto my-32"
            src={"/loading.gif"}
            width={100}
            height={100}
            alt="loading"
          />
        ) : (
          orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className=" w-full orders-list grid md:grid-cols-ordersList md:justify-between bg-gray-100 rounded-lg items-center text-center justify-center p-4 mb-2"
            >
              <div className="text-gray-700">{order.userEmail}</div>
              <div className="text-gray-700 text-sm">
                {order.cartProducts.map((p) => p.name).join(", ")}
              </div>

              <div className={order.paid ? "text-green-500" : "text-red-400"}>
                {order.paid ? "Paid" : "Not paid"}
              </div>

              <div className="text-gray-700 text-sm">
                {moment(order.createdAt).format(" h:mm:ss a | MMM D YY ")}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
