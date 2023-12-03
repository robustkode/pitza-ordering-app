"use client";
import ItemSkeleton from "@/components/layout/ItemSkeleton";
import MenuItem from "@/components/layout/menu/MenuItem";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [chosenCategory, setChosenCategory] = useState(0);
  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
    fetch("/api/items").then((res) => {
      res.json().then((menuItems) => setMenuItems(menuItems));
    });
  }, []);

  return (
    <section className="mt-8">
      <div className="flex justify-center gap-8 max-w-2xl mx-auto">
        {categories.length > 0 &&
          categories.map(
            (c, index) =>
              menuItems.some((i) => i.category === categories[index]._id) && (
                <p
                  key={c._id}
                  className={
                    index === chosenCategory
                      ? "border-b border-primary font-bold text-2xl text-gray-700"
                      : "font-bold text-2xl text-gray-500"
                  }
                  onClick={(e) => setChosenCategory(index)}
                >
                  {c.name}
                </p>
              )
          )}
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
        {!categories.length
          ? [...Array(3)].map((i, index) => <ItemSkeleton key={index} />)
          : menuItems
              .filter(
                (item) => item.category === categories[chosenCategory]._id
              )
              .map((item) => <MenuItem key={item._id} {...item} />)}
      </div>
    </section>
  );
}
