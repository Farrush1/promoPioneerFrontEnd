/* eslint-disable @next/next/no-img-element */
"use client";

import CardProduct from "@/components/CardProduct";
import Carousel from "@/components/Carousel";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(products);

  // fetching disini
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        const products = data.products || [];
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="relative h-screen w-screen ">
        <BiLoaderCircle className="absolute top-1/2 left-1/2 text-5xl animate-spin-slow duration-1000  text-orange-600" />
      </div>
    );

  return (
    <main className="xl:max-w-6xl pt-16 mx-auto px-4 xl:px-0">
      <div className="md:flex max-h-64 md:flex-row gap-2 my-8">
        <div className="w-full md:w-2/3">
          <Carousel />
        </div>
        <div className="md:w-1/3 hidden md:flex flex-col h-full justify-between">
          <Link href={"/category"}>
            <img
              className="object-cover w-full max-h-32 h-1/2 pb-1 rounded-tr-md"
              src="https://img.freepik.com/free-photo/paper-style-black-friday-assortment_23-2149074084.jpg?t=st=1716817263~exp=1716820863~hmac=24df03a9b92a60eb72bd7c1c8eb6960356cf56edd113f7d1871b906e50985e2c&w=1060"
              alt="Promo 1"
            />
          </Link>
          <Link href={"/category"}>
            <img
              className="object-cover w-full max-h-32 h-1/2 pt-1 rounded-br-md"
              src="https://img.freepik.com/premium-photo/happy-kid-celebration-halloween-party-child-backgroud-with-copy-space_916191-122640.jpg?w=1380"
              alt="Promo 1"
            />
          </Link>
        </div>
      </div>

      {/* contoh penggunaan card menggunakan grid */}
      <div className="rounded-md bg-gray-50">
        <h1 className="w-full bg-gradient-to-l from-orange-600 to-orange-500 py-3 text-white font-semibold md:text-xl text-center rounded-t-md">
          Special Promo
        </h1>
        <div className="grid p-4 xl:grid-flow-row grid-cols-2 auto-cols-max gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map(product => (
            // contoh penggunaan component CardProduct
            <CardProduct
              promo={"Special Promo"} // opsional kalo product promo
              productId={product.id}
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.product_image}
              qty={product.stock}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
