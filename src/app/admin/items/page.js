"use client";
import { IoIosArrowRoundForward } from "react-icons/io";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/useProfile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [menuItemsLoading, setMenuItemsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
        setMenuItemsLoading(false);
      });
    });
  }, []);

  return (
    <section className="mt-8">
      {menuItemsLoading ? (
        <Image
          className="mx-auto my-32"
          src={"/loading.gif"}
          width={100}
          height={100}
          alt="loading"
        />
      ) : (
        <>
          <div className="mt-8">
            <Link
              className="button flex items-center"
              href={"/admin/items/create"}
            >
              <span>Crete new menu item</span>
              <IoIosArrowRoundForward size={20} />
            </Link>
          </div>
          <div>
            <h2 className="text-sm text-gray-500 mt-8">Edit item</h2>
            <div className="grid grid-cols-3 gap-2">
              {menuItems?.length > 0 &&
                menuItems.map((item) => (
                  <Link
                    key={item._id}
                    href={"/admin/items/edit/" + item._id}
                    className="bg-gray-200 rounded-lg p-4"
                  >
                    <div className="relative">
                      <Image
                        className="rounded-md"
                        src={item.image}
                        width={200}
                        height={200}
                        alt="pizza"
                      />
                    </div>
                    <div className="text-center">{item.name}</div>
                  </Link>
                ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
