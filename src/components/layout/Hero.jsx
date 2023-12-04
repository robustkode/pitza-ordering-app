import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-12">
        <h2 className="text-4xl font-semibold">
          Enjoy endless slices <br /> of your favorites at
          <br />
          <span className="text-primary text-center">PITZA HUB </span>
        </h2>
        <p className="my-6 text-gray-700 text-sm text-justify">
          From Classic to Specialty to Deep Dish and Thin Crust Flatbreads, we
          create pizzas so fantastic you will have to try them all! Enjoy
          endless slices of your favorites at Pitza Hub or take your pie to-go
          for pickup or delivery.
        </p>
      </div>
      <div className="relative">
        <Image
          src={"/pizza.png"}
          layout={"fill"}
          objectFit={"contain"}
          alt={"pizza"}
        />
      </div>
    </section>
  );
}
