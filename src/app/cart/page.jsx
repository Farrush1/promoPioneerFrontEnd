/* eslint-disable react/jsx-key */
"use client";

// import { useEffect, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
// import { useCookies } from "react-cookie";

export default function Cart() {
  // const [cartList, setCartList] = useState([]);
  // const [cookies] = useCookies(["access_token"]);
  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       const res = await fetch("http://localhost:5000/api/carts", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${cookies.access_token}`,
  //         },
  //       });
  //       console.log(res);
  //       const data = await res.json();
  //       setCartList(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchCart();
  // }, [cookies.access_token]);
  const cartList = [
    {
      id: 1,
      product:
        "The Sliding Mr. Bones (Next Stop, Pottersville) Happy Birthday To You And For Me too",
      price: 20000,
      quantity: 2,
      total_price: 40000,
    },
    {
      id: 2,
      product: "Witchy Woman",
      price: 30000,
      quantity: 3,
      total_price: 40000,
    },
    {
      id: 3,
      product: "Earth, Wind, and Fire",
      price: 40000,
      quantity: 4,
      total_price: 40000,
    },
    {
      id: 4,
      product:
        "The Sliding Mr. Bones (Next Stop, Pottersville) Happy Birthday To You And For Me too",
      price: 20000,
      quantity: 2,
      total_price: 40000,
    },
    {
      id: 5,
      product:
        "The Sliding Mr. Bones (Next Stop, Pottersville) Happy Birthday To You And For Me too",
      price: 20000,
      quantity: 2,
      total_price: 40000,
    },
    {
      id: 6,
      product:
        "The Sliding Mr. Bones (Next Stop, Pottersville) Happy Birthday To You And For Me too",
      price: 20000,
      quantity: 2,
      total_price: 40000,
    },
  ];

  return (
    <main className="xl:max-w-6xl mx-auto px-4 pt-24 xl:px-0">
      <h1 className="lg:text-3xl font-bold pb-8 text-2xl">My Cart</h1>
      <div className="flex flex-col gap-6 md:hidden">
        {cartList &&
          cartList.length > 0 &&
          cartList.map(listing => (
            <div className="flex text-sm gap-3">
              <div className="w-24 h-24 bg-gray-300">img</div>
              <div className="flex flex-col gap-1.5 flex-1 justify-between">
                <h1 className="font-semibold line-clamp-2">
                  {listing.product}
                </h1>
                <div className="flex flex-col gap-1">
                  <p className="text-orange-700 font-bold">
                    <span>Rp </span>
                    {listing.price}
                  </p>
                  <div className="flex gap-2">
                    <button>-</button>
                    <p>{listing.quantity}</p>
                    <button>+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <table className="mb-28 hidden md:table table-auto w-full shadow-lg rounded-xl overflow-hidden">
        <thead>
          <tr className="text-left text-base text-white h-12 bg-gradient-to-b from-orange-600 to-orange-500 rounded-lg shadow-lg">
            <th className="px-2 md:px-6 py-2">Product</th>
            <th className="px-2 md:px-6 py-2">Price</th>
            <th className="px-2 md:px-6 py-2">Quantity</th>
            <th className="px-2 md:px-6 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {cartList &&
            cartList.length > 0 &&
            cartList.map(listing => (
              <tr className="border-b border-slate-200">
                <td className="py-2 md:py-5 px-2 md:px-6 flex flex-row gap-2">
                  <div className="w-24 h-24 bg-gray-300">img</div>
                  <p className="flex-1">{listing.product}</p>
                </td>
                <td className="px-2 md:px-6">{listing.price}</td>
                <td className="px-2 md:px-6">
                  <button className="pr-3">-</button>
                  {listing.quantity}
                  <button className="pl-3">+</button>
                </td>
                <td>
                  <button className="text-red-600 text-sm md:text-3xl pr-2 md:pl-2 hover:-translate-x-2 duration-300">
                    <FaDeleteLeft />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="shadow-t w-full right-0 px-4 py-3 flex mt-4 fixed bg-white bottom-0">
        <div className="xl:max-w-6xl flex items-center justify-between gap-12 text-sm md:text-base w-full mx-auto">
          <p className="font-bold">Total Price</p>
          <div className="flex gap-16 items-center">
            <p className="font-extrabold text-lg text-orange-600">
              <span>Rp</span> 20.000
            </p>
            <button className="text-white px-4 py-2 rounded-md shadow-md hover:opacity-80 duration-300 font-bold bg-gradient-to-b from-orange-600 to-orange-500">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}


