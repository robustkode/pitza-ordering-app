"use client";

import MenuItem from "@/components/layout/menu/MenuItem";
import Image from "next/image";
import { useEffect, useState } from "react";
import ItemSkeleton from "./ItemSkeleton";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch("/api/items").then((res) => {
      res.json().then((menuItems) => {
        setBestSellers(menuItems.slice(-9));
      });
    });
  }, []);
  return (
    <section className="mb-8">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={"/sallad1.png"} width={109} height={189} alt={"sallad"} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={"/sallad2.png"} width={107} height={195} alt={"sallad"} />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {!bestSellers.length
          ? [...Array(3)].map((i, index) => <ItemSkeleton key={index} />)
          : bestSellers?.length > 0 &&
            bestSellers.map((item) => <MenuItem key={item._id} {...item} />)}
      </div>
    </section>
  );
}
