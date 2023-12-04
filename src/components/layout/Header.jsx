"use client";
import { CartContext } from "@/AppContext";
import { HiMiniBars2 } from "react-icons/hi2";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import { GrCart } from "react-icons/gr";
import { useProfile } from "@/useProfile";

function AuthLinks({ status, userName }) {
  const { cartProducts, clearCart } = useContext(CartContext);
  if (status === "authenticated") {
    return (
      <>
        <Link href={"/profile"} className="whitespace-nowrap">
          {userName}
        </Link>
        <button
          onClick={() => {
            clearCart();
            signOut({ callbackUrl: "/" });
          }}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <Link
        href={"/register"}
        className="bg-primary ml-2 rounded-full text-white px-8 py-2"
      >
        Sign&nbsp;Up
      </Link>
    );
  }
}

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [pathname, setPathname] = useState("");
  const { data } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.href;
      setPathname(pathname);
      pathname, "oop";
    }
    ("oops");
  }, []);

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  function checkPathname(param) {
    pathname.includes(param);
  }

  const path = false;

  return (
    <header className="sticky top-0 z-50 bg-white border-b p-4 border-primary ">
      <div className=" max-w-6xl mx-auto ">
        <div className="flex items-center md:hidden justify-between">
          <Link
            className={
              `${path === "/profile" ? "active" : ""}` +
              "text-primary uppercase font-semibold text-2xl"
            }
            href={"/"}
          >
            PITZA HUB
          </Link>
          <div className="flex gap-8 items-center">
            <Link href={"/cart"} className="relative">
              <GrCart size={26} />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              )}
            </Link>
            <button
              className="p-1 border"
              onClick={() => setMobileNavOpen((prev) => !prev)}
            >
              <HiMiniBars2 size={20} />
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div
            onClick={() => setMobileNavOpen(false)}
            className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center text-gray-900"
          >
            <Link href={"/"}>Home</Link>
            <Link
              className={path === "menu" ? "text-primary" : ""}
              href={"/menu"}
            >
              Menu
            </Link>
            {!data.admin ? (
              <>
                <Link href={"/orders"}>Orders</Link>
                <Link href={"/#about"}>About</Link>
              </>
            ) : (
              <Link href={"/admin/categories"}>Dashboard</Link>
            )}

            <AuthLinks status={status} userName={userName} />
          </div>
        )}
        <div className="hidden md:flex items-center justify-between">
          <nav className="flex items-center gap-12 text-gray-900 font-bold text-xl">
            <Link
              className="text-primary uppercase font-semibold text-2xl"
              href={"/"}
            >
              pitza hub
            </Link>
            <Link href={"/"}>Home</Link>
            <Link
              className={checkPathname("menu") ? "active-primary" : ""}
              href={"/menu"}
            >
              Menu
            </Link>
            {!data.admin ? (
              <>
                <Link href={"/orders"}>Orders</Link>
                <Link href={"/#about"}>About</Link>
              </>
            ) : (
              <Link href={"/admin/categories"}>Dashboard</Link>
            )}
          </nav>
          <nav className="flex items-center gap-4 text-gray-800 font-semibold">
            <AuthLinks status={status} userName={userName} />
            <Link href={"/cart"} className="relative">
              <GrCart size={30} />
              {cartProducts?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
