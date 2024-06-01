/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";

export default function OrderDetailPage({ paymentId }) {
  const [payment, setPayment] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cities", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setCities(data.city);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/payments/${paymentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        setPayment(data.payment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    };

    fetchPayment();
  }, [paymentId]);

  function findCityNameById(id) {
    const city = cities.find(city => city.id === id);
    return city ? city.name : "City not found";
  }

  if (!payment || !cities.length) {
    return (
      <div className="relative h-screen w-screen ">
        <BiLoaderCircle className="absolute top-1/2 left-1/2 text-5xl animate-spin-slow duration-1000  text-orange-600" />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-md p-3 w-full flex-1 flex flex-col gap-6 md:gap-0 justify-between overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Detail Order</h1>
      {/* <div className="flex justify-between">
        <p>Order ID: {payment.checkout_colection?.id}</p>
        <div className="">
          <p className="">
            Date: {payment.checkout_colection?.updatedAt.slice(0, 10)}
          </p>
          <p>Status: {payment.payment_status}</p>
        </div>
      </div> */}
      {payment.checkout_colection?.checkout.map(checkout => (
        <div
          key={checkout.id}
          className="bg-gray-50 rounded-md mb-5 p-3 space-y-3">
          <div className="flex justify-between font-semibold border-b border-slate-300 pb-3">
            <p>
              From: {findCityNameById(checkout.city_id)} to{" "}
              {findCityNameById(payment.checkout_colection.user.city_id)}
            </p>
            <p>To: {payment.checkout_colection.user.full_address}</p>
          </div>
          <div className="overflow-x-auto ">
            <div className="">
              {/* head */}
              {/* <ul className="flex">
                <li className="w-[50%]">Product</li>
                <li className="text-center min-w-[20%]">Unit Price</li>
                <li className="text-center min-w-[10%]">Quantity</li>
                <li className="text-center min-w-[20%]">Subtotal Price</li>
              </ul> */}
              {/* row 1 */}
              {checkout.checkout_item.map(checkoutItems => (
                <div
                  key={checkoutItems.id}
                  className="flex w-full items-center">
                  <div className="flex items-center gap-3 min-w-[50%]">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={checkoutItems.product.product_image}
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="">{checkoutItems.product.name}</div>
                    </div>
                  </div>
                  <p className="text-center min-w-[20%]">
                    {checkoutItems.product.price}
                  </p>
                  <p className="text-center min-w-[5%]">
                    {checkoutItems.quantity}
                  </p>
                  <div className="text-center min-w-[25%] flex items-center justify-end gap-2">
                    {checkoutItems.original_price !=
                      checkoutItems.total_specific_price && (
                      <p className="line-through text-xs md:text-sm text-red-600">
                        Rp{" "}
                        {checkoutItems.original_price.toLocaleString("id-ID", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    )}
                    <p className="text-center">
                      Rp{" "}
                      {checkoutItems.total_specific_price.toLocaleString(
                        "id-ID",
                        {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between border-t border-slate-300 pt-3">
            <p>Shipping</p>
            <div className="flex items-center gap-3">
              <div className="bg-green-200 font-bold rounded-md border-dashed border-2 border-green-300 text-center px-2 py-1">
                <p>
                  {checkout.shippingCheckout.name.toUpperCase()} (
                  {checkout.shippingCheckout.service})
                </p>
                <p></p>
              </div>
              <p>
                Rp{" "}
                {checkout.shippingCheckout.price.toLocaleString("id-ID", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
          <div className="total flex justify-end gap-3 font-bold">
            <p>Total </p>
            <p>
              Rp{" "}
              {checkout.total_checkout_price.toLocaleString("id-ID", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      ))}
      <div className="total font-bold">
        <p className="flex justify-between">
          Total Product Price
          <p className="flex min-w-[15%] justify-between">
            <span>Rp </span>
            {payment.checkout_colection.total_item_price.toLocaleString(
              "id-ID",
              {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }
            )}
          </p>
        </p>
        <p className="flex justify-between">
          Total Shipping Price
          <p className="flex min-w-[15%] justify-between">
            <span>Rp </span>
            {payment.checkout_colection.total_shipping_price.toLocaleString(
              "id-ID",
              {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }
            )}
          </p>
        </p>
        <p className="flex justify-between">
          Total Price
          <p className="flex min-w-[15%] justify-between">
            <span>Rp </span>
            {payment.checkout_colection.total_price.toLocaleString("id-ID", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
        </p>
      </div>
      <div className="flex mt-5 justify-between bg-orange-200 rounded-md p-2 items-center">
        <p className="">Contact admin for more information</p>
        <a
          href="https://wa.me/6285738436019"
          className="px-3 py-1.5 bg-slate-800 text-white rounded-md duration-300 hover:bg-orange-600">
          {" "}
          Contact
        </a>
      </div>
    </div>
  );
}
