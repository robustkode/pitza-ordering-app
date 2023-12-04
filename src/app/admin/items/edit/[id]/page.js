"use client";
import DeleteButton from "@/components/layout/DeleteButton";

import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/useProfile";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function EditMenuItemPage() {
  const { id } = useParams();

  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const [menuItemLoading, setMenuItemLoading] = useState(true);

  useEffect(() => {
    fetch("/api/items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
        setMenuItemLoading(false);
      });
    });
  }, [id]);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Saved",
      error: "Error",
    });

    setRedirectToItems(true);
  }

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/items?_id=" + id, {
        method: "DELETE",
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/items");
  }

  return (
    <section className="mt-8">
      {menuItemLoading ? (
        <Image
          className="mx-auto my-32"
          src={"/loading.gif"}
          width={100}
          height={100}
          alt="loading"
        />
      ) : (
        <>
          <div className="max-w-2xl mx-auto mt-8">
            <Link href={"/admin/items"} className="button flex items-center">
              <IoIosArrowRoundBack size={20} />
              <span>Show all items</span>
            </Link>
          </div>
          <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
          <div className="max-w-md mx-auto mt-2 pl-8">
            <div className="max-w-xs ml-auto pl-4">
              <DeleteButton
                label="Delete this menu item"
                onDelete={handleDeleteClick}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
