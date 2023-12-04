"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminTab() {
  const path = usePathname();
  return (
    <div className="grid min-w-full sm:grid-cols-4 text-primary font-semibold text-center">
      <div>
        <Link
          href={"/admin/categories "}
          className={path === "/admin/categories" ? "active pb-1" : ""}
        >
          Categories
        </Link>
      </div>
      <div>
        <Link
          href={"/admin/items"}
          className={path.includes("items") ? "active pb-1" : ""}
        >
          Items
        </Link>
      </div>
      <div>
        <Link
          className={path.includes("users") ? "active pb-1" : ""}
          href={"/admin/users"}
        >
          Users
        </Link>
      </div>
      <div>
        {" "}
        <Link
          className={path === "/admin/orders" ? "active pb-1" : ""}
          href={"/admin/orders"}
        >
          Orders
        </Link>
      </div>
    </div>
  );
}
