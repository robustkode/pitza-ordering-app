"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
  const path = usePathname();
  return (
    <div
      className={
        isAdmin
          ? "flex mx-auto w-full  justify-between tabs flex-wrap"
          : "flex gap-8 tabs justify-center flex-wrap"
      }
    >
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            href={"/categories "}
            className={path === "/categories" ? "active" : "text-primary"}
          >
            Categories
          </Link>
          <Link
            href={"/items"}
            className={path.includes("items") ? "active" : ""}
          >
            Items
          </Link>
          <Link
            className={path.includes("/users") ? "active" : ""}
            href={"/users"}
          >
            Users
          </Link>
        </>
      )}
      <Link className={path === "/orders" ? "active" : ""} href={"/orders"}>
        Orders
      </Link>
    </div>
  );
}
