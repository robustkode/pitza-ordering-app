import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";
import { Rob } from "next/font/google";
import ItemSkeleton from "../components/layout/ItemSkeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
  return (
    <>
      <Hero />
      <Link href="/menu" className="grid grid-cols-3 my-4">
        <div></div>
        <div className="justify-center bg-primary text-black uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full mb-4">
          Explore FULL MENU
          <IoIosArrowRoundForward />
        </div>
        <div></div>
      </Link>
      <HomeMenu />

      <section
        id="about"
        className="about-us my-8 py-8 max-w-4xl mx-auto text-justified"
      >
        <SectionHeaders mainHeader={"About us"} />
        <p className="mt-2">
          Welcome to Pitza Hub, the best place to order pizza online. We are a
          family-owned business that started in 2020 with a passion for making
          delicious pizzas with fresh ingredients and authentic flavors. Whether
          you&apos;re looking for a classic cheese pizza, a spicy pepperoni
          pizza, or a veggie-loaded pizza, we have something for everyone. You
          can also customize your own pizza with our wide range of toppings and
          sauces.
        </p>
        <br />
        <p>
          At Pitza Hub, we care about our customers and our environment.
          That&apos;s why we use eco-friendly packaging and deliver our pizzas
          with electric bikes. We also offer discounts and rewards for loyal
          customers who order regularly from our website. You can also join our
          pizza club and get access to exclusive deals and events.
        </p>
        <br />
        <p>
          Ordering pizza from Pitza Hub is easy and convenient. Just browse our
          menu, select your favorite pizza, and choose your preferred payment
          and delivery options. You can also track your order status and contact
          our customer service anytime. We guarantee that your pizza will arrive
          hot and fresh, or we&apos;ll make it right.
        </p>
        <br />
        <br />
        <p>
          Pitza Hub is more than just a pizza delivery service. It&apos;s a
          community of pizza lovers who share the same vision: to enjoy the best
          pizza in the world. Join us today and discover why Pitza Hub is the
          ultimate destination for pizza enthusiasts. Thank you for choosing
          Pitza Hub. We hope to serve you soon.
        </p>
      </section>
    </>
  );
}
