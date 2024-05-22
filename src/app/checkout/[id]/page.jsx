/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import { BiLoaderCircle } from "react-icons/bi";

export default function Checkout({ params: { id } }) {
  const [checkoutList, setCheckoutList] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(checkoutList);

  // const cartList = [
  //   {
  //     id: 1,
  //     product:
  //       "The Sliding Mr. Bones (Next Stop, Pottersville) Happy Birthday To You And For Me too",
  //     price: 20000,
  //     quantity: 2,
  //     total_price: 40000,
  //     product_image:
  //       "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     id: 2,
  //     product: "Witchy Woman",
  //     price: 30000,
  //     quantity: 3,
  //     total_price: 40000,
  //     product_image:
  //       "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     id: 3,
  //     product: "Earth, Wind, and Fire",
  //     price: 40000,
  //     quantity: 4,
  //     total_price: 40000,
  //     product_image:
  //       "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     id: 4,
  //     product:
  //       "The Sliding Mr. Bones (Next Stop, Pottersville) Happy Birthday To You And For Me too",
  //     price: 20000,
  //     quantity: 2,
  //     total_price: 40000,
  //     product_image:
  //       "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     id: 5,
  //     product:
  //       "The Sliding Mr. Bones (Next Stop, Pottersville) Happy Birthday To You And For Me too",
  //     price: 20000,
  //     quantity: 2,
  //     total_price: 40000,
  //     product_image:
  //       "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     id: 6,
  //     product:
  //       "The Sliding Mr. Bones (Next Stop, Pottersville) Happy Birthday To You And For Me too",
  //     price: 20000,
  //     quantity: 2,
  //     total_price: 40000,
  //     product_image:
  //       "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  // ];

  useEffect(() => {
    setLoading(true);
    const fetchCheckouts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/checkouts/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        // console.log(data);
        setCheckoutList(data.getCheckCollection);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchCheckouts();
  }, [id]);

  const handleSubmitAddress = e => {
    e.preventDefault();
    document.getElementById("my_modal_1").close();
  };

  const openEditAddress = () => {
    document.getElementById("my_modal_1").showModal();
  };

  if (loading)
    return (
      <div className="relative h-screen w-screen ">
        <BiLoaderCircle className="absolute top-1/2 left-1/2 text-5xl animate-spin-slow duration-1000  text-orange-600" />
      </div>
    );

  return (
    <main className="xl:max-w-6xl mx-auto px-4 pt-24 xl:px-0">
      <h1 className="lg:text-3xl text-2xl pb-8 font-bold">Checkout</h1>
      <div className="flex flex-row gap-2 p-3 bg-orange-600 text-white rounded-lg shadow-lg mb-6 items-start">
        <IoLocation className="text-xl" />
        <div className="text-sm flex-1">
          <p className="pb-1 font-semibold">Delivery Address</p>
          <p>Fahlan</p>
          <p>Kel Belian, Batam</p>
        </div>
        <button
          onClick={openEditAddress}
          className="text-sm hover:font-bold duration-300">
          Edit
        </button>
      </div>
      {/* Mobile */}
      {/* <div className="flex flex-col gap-3 mb-36 md:hidden">
        {checkoutList.length > 0 ? (
          checkoutList.map(item => (
            // List product checkout
            <div
              key={item.id}
              className="p-3 bg-white rounded-md shadow-md">
              <div className="flex text-sm gap-3 mb-2">
                <img
                  src={item.product_image}
                  width={96}
                  height={96}
                  alt={item.product}
                />
                <div className="flex flex-col gap-1.5 flex-1 justify-between">
                  <h1 className="font-semibold line-clamp-2">{item.product}</h1>
                  <div className="flex flex-col gap-1">
                    <p className="text-orange-700 font-semibold">
                      <span>Rp </span>
                      {item.price}
                    </p>
                    <div className="flex gap-2">
                      <p>x{item.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-1 flex flex-row justify-between items-center text-xs bg-green-100 rounded-md border-dashed border-2 border-green-200">
                <h1 className="font-semibold">Shiping Service</h1>
                <div className="flex items-center min-w-36 gap-2">
                  <p className="font-semibold w-full">Rp 40.000</p>
                  <p className="px-3 py-1 border font-semibold border-green-300 rounded-md">
                    Reguler
                  </p>
                </div>
              </div>
              <div className="flex flex-row justify-between text-sm font-bold pt-2 text-orange-700">
                <p>Subtotal Product</p>
                <p>Rp {item.total_price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No Order</p>
        )}
      </div> */}
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="flex items-center bg-orange-600 px-4 text-white font-semibold py-2 rounded-md shadow-md">
          <h1 className="w-[40%]">Product</h1>
          <h1 className="w-1/5 text-center">Unit Price</h1>
          <h1 className="w-1/5 text-center">Quantity</h1>
          <h1 className="w-1/5 text-center">Subtotal Product</h1>
        </div>
        <div className="flex items-start mt-3 gap-3 flex-col mb-36">
          {checkoutList &&
            checkoutList.length > 0 &&
            checkoutList.map(listing => (
              // List product checkout
              <div
                key={listing.id}
                className="w-full bg-white p-2 rounded-md shadow-md">
                <div className="flex text-black w-full">
                  <div className="flex w-[40%] gap-4">
                    <img
                      src={listing.product_image}
                      alt={listing.product}
                      className="w-[72px] h-[72px] object-cover"
                    />
                    <p className="font-semibold line-clamp-3 overflow-hidden">
                      {listing.product}
                    </p>
                  </div>
                  <p className="w-1/5 text-center">
                    Rp{" "}
                    {listing.price.toLocaleString("id-ID", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p className="w-1/5 text-center">{listing.quantity}</p>
                  <p className="w-1/5 text-center text-orange-700 font-semibold">
                    Rp{" "}
                    {listing.total_price.toLocaleString("id-ID", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div className="p-1 flex flex-row justify-between items-center text-sm mt-2 bg-green-100 rounded-md border-dashed border-2 border-green-200">
                  <h1 className="font-semibold">Shiping Service</h1>
                  <div className="flex min-w-44 items-center">
                    <p className="font-semibold w-full">Rp 40.000</p>
                    <p className="px-3 py-1 border font-semibold border-green-300 rounded-md">
                      Reguler
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Voucher Code and Total price */}
      <div className="shadow-t w-full right-0 px-4 py-3 mt-4 fixed bg-white bottom-0">
        <div className="xl:max-w-6xl flex mb-3 items-center justify-between gap-6 !text-sm md:text-base w-full mx-auto">
          <div className="flex gap-4 items-center w-full max-w-[28rem]">
            <p className="font-bold w-full max-w-24 md:max-w-32">
              Voucher Code
            </p>
            <input
              type="text"
              className="border-2 border-green-200 border-dashed px-2 rounded-md py-1 text-sm w-full max-w-96 focus:outline-green-400"
            />
            <div className="dropdown dropdown-top">
              <div
                tabIndex={0}
                role="button"
                className="btn min-w-16 min-h-0 h-8 bg-green-100 text-black">
                Code
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content mb-1 z-[1] menu p-2 shadow bg-base-100 rounded-box w-36">
                <li>
                  <p className="hover:bg-white !cursor-text active:!bg-white active:!text-black font-semibold px-1">
                    DSC60%
                  </p>
                </li>
                <li>
                  <p className="hover:bg-white !cursor-text active:!bg-white active:!text-black font-semibold px-1">
                    GO30K
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <button className="text-white px-4 py-2  min-w-24 rounded-md shadow-md hover:opacity-80 duration-300 font-bold bg-gradient-to-b from-orange-600 to-orange-500">
            Apply
          </button>
        </div>
        <div className="xl:max-w-6xl flex items-center justify-between gap-12 !text-sm md:text-base w-full mx-auto">
          <p className="font-bold">Total Price</p>
          <div className="flex gap-16 items-center">
            <p className="font-extrabold text-orange-600">
              <span>Rp</span> 20.000
            </p>
            <button className="text-white px-4 py-2 flex-1  rounded-md min-w-24 shadow-md hover:opacity-80 duration-300 font-bold bg-gradient-to-b from-orange-600 to-orange-500">
              Order
            </button>
          </div>
        </div>
      </div>
      {/* Modal Edit Address */}
      <dialog
        id="my_modal_1"
        className="modal">
        <div className="modal-box">
          <form>
            <div className="flex items-center justify-between mb-4 text-sm">
              <p>City</p>
              <div className="dropdown dropdown-bottom">
                <select
                  id="city"
                  name="city"
                  className="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:ring-1 sm:text-sm">
                  {[
                    "Batam",
                    "Jakarta",
                    "Bandung",
                    "Lampung",
                    "Yogyakarta",
                    "Semarang",
                  ].map(city => (
                    <option
                      key={city}
                      value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <input
              type="text"
              placeholder="Full Address"
              className="w-full text-sm px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            />
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={e => {
                  handleSubmitAddress(e);
                }}
                type="submit"
                className="btn text-sm w-full hover:opacity-70 shadow-md duration-300 bg-gradient-to-b from-orange-700 to-orange-600 text-white px-3 py-1 min-h-0 h-10 rounded-md">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </main>
  );
}
