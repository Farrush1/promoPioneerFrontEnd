/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";

import { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { FaDeleteLeft } from "react-icons/fa6";
import { BiLoaderCircle } from "react-icons/bi";
import Link from "next/link";

export default function Cart() {
  const [cartList, setCartList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(cartList);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/carts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        setCartList(data.carts.cartItem);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, []);

  const updateCartItem = async (itemId, newQuantity) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/carts/cart-items/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const deleteCartItem = async itemId => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/carts/cart-items/${itemId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

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

  const handleDelete = async index => {
    const newCartList = [...cartList];
    const deletedItem = await deleteCartItem(newCartList[index].id);
    if (deletedItem) {
      newCartList.splice(index, 1);
      setCartList(newCartList);
    }
  };

  const calculateTotalPrice = () => {
    return cartList.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  if (isLoading)
    return (
      <p className="h-screen flex justify-center items-center text-5xl animate-spin-slow text-orange-600 duration-1000">
        <BiLoaderCircle />
      </p>
    );

  return (
    <main className="xl:max-w-6xl mx-auto px-4 pt-24 xl:px-0">
      <h1 className="lg:text-3xl font-bold pb-8 text-2xl">My Cart</h1>

      {/* Mobile */}
      <div className="flex flex-col gap-6 md:hidden mb-20">
        {cartList.length > 0 ? (
          cartList.map((item, index) => {
            return (
              // cart item
              <div className="flex text-sm gap-3 shadow-md p-2 rounded-md">
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
                      <span>Rp </span>
                      {item.product.price}
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
      <div className="hidden md:block mb-24">
        <div className="flex items-center w-full bg-orange-600 px-4 text-white font-semibold py-2 rounded-md shadow-md">
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
                <div className="w-full bg-white p-2 rounded-md shadow-md">
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
                    <p className="w-1/5 text-center">{item.product.price}</p>
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
                    <p className="w-1/5 text-center text-orange-700 font-semibold">
                      {item.product.price * item.quantity}
                    </p>
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
      <div className="shadow-t w-full right-0 px-4 py-3 flex mt-4 fixed bg-white bottom-0">
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
            <Link
              href={"/checkout"}
              className="text-white px-4 py-2 rounded-md shadow-md hover:opacity-80 duration-300 font-bold bg-gradient-to-b from-orange-600 to-orange-500">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

{
  /* <table className="mb-28 hidden md:table table-auto w-full rounded-sm overflow-hidden shadow-lg">
  <thead>
    <tr className="text-left text-base text-white h-12 bg-orange-600 shadow-lg">
      <th className="px-2 md:px-6 py-2">Product</th>
      <th className="px-2 md:px-6 py-2 text-center">Price</th>
      <th className="px-2 md:px-6 py-2 text-center">Quantity</th>
      <th className="px-2 md:px-6 py-2 text-center"></th>
    </tr>
  </thead>
  <tbody>
    {cartList.length > 0 ? (
      cartList.map((item, index) => {
        return (
          <tr className="border-b border-slate-200">
            <td className="py-2 md:py-5 px-2 md:px-6 flex flex-row gap-4">
              <img
                src={item.product.product_image}
                alt={item.product.name}
                className="object-cover w-24 h-24"
              />
              <p className="flex-1 font-semibold">{item.product.name}</p>
            </td>
            <td className="px-2 md:px-6 text-center font-semibold">
              {item.product.price}
            </td>
            <td className="px-2 md:px-6 text-center">
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
            </td>
            <td>
              <button className="text-red-600 text-sm md:text-3xl pr-2 md:pl-2 hover:-translate-x-2 duration-300">
                <FaDeleteLeft />
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <p>Cart Empty</p>
    )}
  </tbody>
</table>; */
}
