/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";

import { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { FaDeleteLeft } from "react-icons/fa6";
import { BiLoaderCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { deleteCartItem, fetchCarts, updateCartItem } from "@/libs/fetch/carts";
import { storeCarts } from "@/libs/fetch/checkouts";
import toast, { Toaster } from "react-hot-toast";

export default function Cart() {
  const [cartList, setCartList] = useState([]); // Daftar carts
  const [isLoading, setIsLoading] = useState(true); // State loading
  const [disableCheckout, setDisableCheckout] = useState("");
  const router = useRouter();

  // Rendering tampilan awal memuat daftar carts
  useEffect(() => {
    const loadCart = async () => {
      const cartItems = await fetchCarts(setIsLoading);
      if (cartItems) {
        setCartList(cartItems);
      }
    };
    loadCart();
  }, []);

  // Menambahkan quantity di button +
  const handleIncrement = async index => {
    const newCartList = [...cartList];
    newCartList[index].quantity += 1;
    const updatedItem = await updateCartItem(
      newCartList[index].id,
      newCartList[index].quantity
    );
    if (updatedItem) {
      setCartList(newCartList);
    }
  };

  // Mengurangi quantity di button -
  const handleDecrement = async index => {
    const newCartList = [...cartList];
    if (newCartList[index].quantity > 1) {
      newCartList[index].quantity -= 1;
      const updatedItem = await updateCartItem(
        newCartList[index].id,
        newCartList[index].quantity
      );
      if (updatedItem) {
        setCartList(newCartList);
      }
    } else {
      const updatedItem = await deleteCartItem(newCartList[index].id);
      if (updatedItem) {
        newCartList.splice(index, 1);
        setCartList(newCartList);
      }
    }
  };

  // Menghapus item dari daftar cartList
  const handleDelete = async index => {
    const newCartList = [...cartList];
    const deletedItem = await deleteCartItem(newCartList[index].id);
    if (deletedItem) {
      newCartList.splice(index, 1);
      setCartList(newCartList);
    }
  };

  // Menghandle button checkouts untuk dilempar ke route checkouts sesuai id checkouts collection
  const handleCheckouts = async () => {
    try {
      setDisableCheckout(true);
      const carts = await storeCarts(); // fungsi fetch untuk menyimpan checkouts
      // console.log(carts.data);

      if (carts.res.status === 404) {
        toast.error("Please add address on your bio!");
        return setDisableCheckout(false);
      }

      if (carts.data && carts.data.lasCheckColection.id) {
        const idURI = encodeURIComponent(
          JSON.stringify(carts.data.lasCheckColection.id)
        );
        router.push(`/checkout/${idURI}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Menghitung total price dari semua product untuk tampilan
  const calculateTotalPrice = () => {
    return cartList.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  // Untuk tampilan loading
  if (isLoading)
    return (
      <div className="relative h-screen w-screen ">
        <BiLoaderCircle className="absolute top-1/2 left-1/2 text-5xl animate-spin-slow duration-1000  text-orange-600" />
      </div>
    );

  return (
    <main className="xl:max-w-6xl mx-auto relative flex flex-col px-4 pt-24 xl:px-0 min-h-screen h-fit">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ top: 73 }}
      />
      <h1 className="lg:text-3xl font-bold pb-8 text-2xl">My Cart</h1>
      {/* Mobile */}
      <div className="flex flex-1 flex-col gap-6 md:hidden mb-8">
        {cartList.length > 0 ? (
          cartList.map((item, index) => {
            return (
              // cart item
              <div
                key={item.id}
                className="flex text-sm gap-3 shadow-md border-b border-slate-400 p-2 rounded-md">
                <div className="w-24 h-24 flex items-center justify-center">
                  <img
                    src={item.product.product_image}
                    alt={item.product.name}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 justify-between">
                  <h1 className="font-semibold line-clamp-2">
                    {item.product.name}
                  </h1>
                  <div className="flex flex-col gap-1">
                    <p className="text-orange-700 font-bold">
                      {item.product.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                    <div className="flex gap-2">
                      <button onClick={() => handleDecrement(index)}>-</button>
                      <p>{item.quantity}</p>
                      <button onClick={() => handleIncrement(index)}>+</button>
                    </div>
                  </div>
                </div>
                <TiDelete className="text-3xl bg-none rounded-full p-0 text-red-600 hover:size-9 cursor-pointer duration-300" />
              </div>
            );
          })
        ) : (
          <p className="text-center">Cart Empty</p>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden flex-1 h-full md:block mb-8">
        <div className="flex items-center w-full bg-gradient-to-l from-orange-600 to-orange-500 px-4 text-white font-semibold py-3 rounded-md shadow-lg">
          <h1 className="w-[40%] flex-1 flex">Product</h1>
          <h1 className="w-1/5 text-center">Unit Price</h1>
          <h1 className="w-[10%] text-center">Quantity</h1>
          <h1 className="w-1/5 text-center">Subtotal Product</h1>
          <div className="w-[46px]"></div>
        </div>
        <div className="flex items-start mt-3 gap-3 flex-col">
          {cartList.length > 0 ? (
            cartList.map((item, index) => {
              // List product checkout
              return (
                <div
                  key={item.id}
                  className="w-full bg-white p-4 rounded-md shadow-lg border-slate-400 border-b">
                  <div className="flex text-black w-full">
                    <div className="flex flex-1 w-[40%] gap-4">
                      <img
                        src={item.product.product_image}
                        alt={item.product.name}
                        className="w-[72px] h-[72px] object-cover"
                      />
                      <p className="font-semibold line-clamp-3 overflow-hidden">
                        {item.product.name}
                      </p>
                    </div>
                    <div className="w-1/5 flex justify-center">
                      <p className="w-3/5 flex gap-2 justify-between">
                        <span>Rp </span>
                        {item.product.price.toLocaleString("id-ID", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    </div>
                    <div className="w-[10%] text-center">
                      <button
                        onClick={() => handleDecrement(index)}
                        className="pr-3">
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => handleIncrement(index)}
                        className="pl-3">
                        +
                      </button>
                    </div>
                    <div className="w-1/5 flex justify-center">
                      <p className="w-3/5 flex gap-2 justify-between text-orange-700 font-semibold">
                        <span>Rp </span>
                        {(item.product.price * item.quantity).toLocaleString(
                          "id-ID",
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }
                        )}
                      </p>
                    </div>
                    <div className="w-[10%">
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 text-3xl pr-2 md:pl-2 hover:-translate-x-2 duration-300">
                        <FaDeleteLeft />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Cart Empty</p>
          )}
        </div>
      </div>

      {/* Total price */}
      <div className="shadow-t w-full right-0 px-4 py-3 rounded-md sticky flex mt-4 bg-white bottom-0">
        <div className="xl:max-w-6xl flex items-center justify-between gap-12 text-sm md:text-base w-full mx-auto">
          <p className="font-bold">Total Price</p>
          <div className="flex gap-16 items-center">
            <p className="font-extrabold text-orange-600">
              {calculateTotalPrice().toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
            <button
              onClick={handleCheckouts}
              disabled={disableCheckout}
              className="text-white px-4 py-2 rounded-md shadow-md hover:opacity-80 duration-300 font-bold bg-gradient-to-l from-orange-600 to-orange-500 disabled:opacity-50 disabled:cursor-progress">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
