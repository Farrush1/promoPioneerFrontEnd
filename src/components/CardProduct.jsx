
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CardProduct({key, name, price, image}) {
  const [productListing, setProductListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const fetchProducts = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/products");
  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     console.log("Fetched data:", data);  // Add this line to log the fetched data
  //     setProductListing(data.products);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     setError(error.message);
  //     setLoading(false);
  //   }
  // };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      
        <Link
          key={key}
          href={`/product/${key}`}
          className="shadow-sm w-full rounded-md border border-slate-200 hover:shadow-md duration-300 hover:-translate-x-1 hover:-translate-y-1">
          <img
            src={image}
            className="w-full h-52 sm:h-56 lg:h-64 object-cover rounded-t-sm"
          />
          <div className="p-1.5 flex flex-col gap-1 justify-between h-[82px]">
            <h1 className="text-sm font-medium mb-1.5 line-clamp-2">
              {name}
            </h1>
            <p className="text-sm font-semibold text-orange-600">
              <span>Rp </span>
              {price}
            </p>
          </div>
        </Link>
      
    </>
  );
}
