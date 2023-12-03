"use client";
import { IoIosArrowRoundForward } from "react-icons/io";
import UserTabs from "@/components/layout/UserTabs";
import { fetchProfile } from "@/fetchProfile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [menuItemsLoading, setMenuItemsLoading] = useState(true);
  const { loading, data } = fetchProfile();

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
      <UserTabs isAdmin={true} />
      {loading || menuItemsLoading ? (
        <Image
          className="mx-auto my-32"
          src={"/loading.gif"}
          width={100}
          height={100}
          alt="loading"
        />
      ) : !data.admin ? (
        <h1 className=" mx-auto my-32 text-center text-red text-2xl">
          You're not an admin!
        </h1>
      ) : (
        <>
          <div className="mt-8">
            <Link className="button flex" href={"/items/new"}>
              <span>Crete new menu item</span>
              <IoIosArrowRoundForward />
            </Link>
          </div>
          <div>
            <h2 className="text-sm text-gray-500 mt-8">Edit item</h2>
            <div className="grid grid-cols-3 gap-2">
              {menuItems?.length > 0 &&
                menuItems.map((item) => (
                  <Link
                    key={item._id}
                    href={"/items/edit/" + item._id}
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
