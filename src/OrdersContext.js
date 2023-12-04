"use client";
import { createContext, useEffect, useState } from "react";

export const OrdersContext = createContext({});

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("orders")) {
      setOrders(JSON.parse(ls.getItem("orders")));
    }
  }, []);

  function saveOrdersToLocalStorage(orders) {
    if (ls) {
      ls.setItem("orders", JSON.stringify(orders));
    }
  }

  function addToOrders(order) {
    setOrders((pr) => {
      const newOrders = [...pr, order];
      saveOrdersToLocalStorage(newOrders);
      return newOrders;
    });
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addToOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
