/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CardProduct() {
  const [productListing, setProductListing] = useState([]);

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        title: "Mainan Crayon Warna Warni Bayi Hijau Biru Merah dan Putih",
        img: "https://images.unsplash.com/photo-1554343594-1c9d305bd51f?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 20000,
      },
      {
        id: 2,
        title: "Susu Bayi Umur 1-3 Tahun",
        img: "https://images.unsplash.com/photo-1595930013415-ca6958dc8a8a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 30000,
      },
      {
        id: 3,
        title: "Troli Bayi",
        img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1475&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 40000,
      },
      {
        id: 4,
        title: "Mainan Crayon Warna Warni Bayi Hijau Biru Merah dan Putih",
        img: "https://images.unsplash.com/photo-1554343594-1c9d305bd51f?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 20000,
      },
    ];
    // ambil data disini
    // const fetchProductListing = async () => {
    //   try {
    //     const res = await fetch("your link");
    //     const data = await res.json();
    //     setProductListing(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    setProductListing(dummyData);
  }, []);

  return (
    <>
      {productListing &&
        productListing.length > 0 &&
        productListing.map(listing => (
          <Link
            href={`/product/${listing.id}`}
            className="shadow-sm w-full rounded-md border border-slate-200 hover:shadow-md duration-300 hover:-translate-x-1 hover:-translate-y-1">
            <img
              src={listing.img}
              className="w-full h-52 sm:h-56 lg:h-64 object-cover rounded-t-sm"
            />
            <div className="p-1.5 flex flex-col gap-1 justify-between h-[82px]">
              <h1 className="text-sm font-medium mb-1.5 line-clamp-2">
                {listing.title}
              </h1>
              <p className="text-sm font-semibold text-orange-600">
                <span>Rp </span>
                {listing.price}
              </p>
            </div>
          </Link>
        ))}
    </>
  );
}
