/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CardProduct() {
  const [productListing, setProductListing] = useState([]);
  const [promo, setPromo] = useState([]);
  const [special, setSpecial] = useState([]);
  
  useEffect(() => {
    const fetchPromo = async () => {
      const promo = await fetch(
        "http://localhost:5000/api/products?specialPromo=true",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await promo.json();
      console.log(data.products);
      setSpecial(data.products);
    };
    fetchPromo();
  }, []);
  useEffect(() => {
    const fetchPromo = async () => {
      const promo = await fetch("http://localhost:5000/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await promo.json();
      console.log(data.products);
      setPromo(data.products);
    };
    fetchPromo();
  }, []);

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        title: "Mainan Anak Telephone Mobil Tarik",
        img: "https://img.lazcdn.com/g/p/0d8f63a7edd37170dd4781676747132a.jpg_720x720q80.jpg",
        price: 30000,
        isPromo: true,
      },
      {
        id: 2,
        title: "Susu Bayi Umur 1-3 Tahun",
        img: "https://images.unsplash.com/photo-1595930013415-ca6958dc8a8a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 30000,
        isPromo: true,
      },
      {
        id: 3,
        title: "Troli Bayi",
        img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1475&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 40000,
        isPromo: true,
      },
      {
        id: 4,
        title: "Mainan Crayon Warna Warni",
        img: "https://images.unsplash.com/photo-1554343594-1c9d305bd51f?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 20000,
        isPromo: true,
      },
      {
        id: 5,
        title: "Baby doll",
        img: "https://dynamic.zacdn.com/2_cQoIfksG1L4p7guc46EkBeNgg=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/figoltoys-0388-6343943-1.jpg",
        price: 25000,
        isPromo: false,
      },
      {
        id: 6,
        title: "Wooden Building Block Mainan Susun Balok Kayu Bangun Geometri",
        img: "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/5/20/f6274e3c-32f7-403d-b43e-1c1a9068acaa.jpg",
        price: 20000,
        isPromo: false,
      },
      {
        id: 7,
        title: "Mainan Piano",
        img: "https://down-id.img.susercontent.com/file/13a67dcd643332d580b1710c631e00d4",
        price: 30000,
        isPromo: false,
      },
      {
        id: 8,
        title: "Baju Bayi",
        img: "https://down-id.img.susercontent.com/file/id-11134207-7qukz-liayj6o1goip4c",
        price: 30000,
        isPromo: false,
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
        productListing.map((listing) => (
          <Link
            href={`/product/${listing.id}`}
            className="shadow-sm w-full rounded-md border border-slate-200 hover:shadow-md duration-300 hover:-translate-x-1 hover:-translate-y-1 relative"
          >
            {listing.isPromo && (
              <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-md">
                Spesial Promo
              </div>
            )}
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
