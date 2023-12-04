"use client";
import { CartContext, cartProductPrice } from "@/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/layout/menu/CartProduct";
import { useProfile } from "@/useProfile";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }
  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }
  async function handleCheckout(ev) {
    ev.preventDefault();

    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later",
    });
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        {cartProducts?.length === 0 && (
          <>
            <p className="mt-4 text-center text-2xl font-semiBold">
              Empty cart!
            </p>
          </>
        )}
      </div>

      {cartProducts?.length > 0 && (
        <>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              {cartProducts.map((product, index) => (
                <CartProduct
                  key={index}
                  index={index}
                  product={product}
                  onRemove={removeCartProduct}
                />
              ))}
              <div className="py-2 pr-16 flex justify-end items-center">
                <div className="text-gray-500">
                  Subtotal:
                  <br />
                  Delivery:
                  <br />
                  Total:
                </div>
                <div className="font-semiboldtext-gray-700 pl-2 text-right">
                  ${subtotal}
                  <br />
                  $5
                  <br />${subtotal + 5}
                </div>
              </div>
            </div>
            <div className="">
              <div className="bg-gray-100 p-4 rounded-lg ">
                <h2>Checkout</h2>
                <form onSubmit={handleCheckout}>
                  <AddressInputs
                    addressProps={address}
                    setAddressProp={handleAddressChange}
                  />
                  <button type="submit">Pay ${subtotal + 5}</button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
