/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiLoaderCircle } from "react-icons/bi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function UserOrderPage() {
  const router = useRouter();
  const [checkout, setCheckout] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchCheckout = async () => {
      const check = await fetch("http://localhost:5000/api/users/checkouts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await check.json();
      // console.log(data.checkoutCollection);
      setCheckout(data.checkoutCollection);
      setLoading(false);
    };
    fetchCheckout();
  }, []);

  const handlePending = id => {
    router.push(`/payment/${id}`);
  };

  const handleUncompleted = id => {
    router.push(`/checkout/${id}`);
  };

  const handleDetail = id => {
    router.push(`/user/order/${id}`);
  };

  if (loading)
    return (
      <div className="relative h-screen w-screen ">
        <BiLoaderCircle className="absolute top-1/2 left-1/2 text-5xl animate-spin-slow duration-1000  text-orange-600" />
      </div>
    );

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">My Order</h1>
      {/* card order */}
      {checkout.map(items => (
        <div
          key={items.id}
          className="card mb-4 w-full bg-base-100 shadow-md">
          <div className="card-head flex justify-between p-3 border-b-2">
            <h3 className="order">Order ID: {items.id}</h3>
            <h3 className="order">{items.updatedAt.slice(0, 10)}</h3>
            <h3 className="order">
              Status{" "}
              <span className="font-bold text-orange-600">{items.status}</span>
            </h3>
          </div>
          {items.checkout.map(checkoutByCity => (
            <div
              key={checkoutByCity.id}
              className="card-body p-3 m-2 bg-gray-50 rounded-md">
              {/* <p>City: {checkoutByCity.checkout_item[0].id}</p> */}
              {checkoutByCity.checkout_item.map(checkoutItem => (
                <div
                  key={checkoutItem.id}
                  className="list-order flex">
                  {/* {console.log(checkoutItem.product.product_image)} */}
                  <div className="product-title flex text-sm md:text-base min-w-[50%] items-center">
                    <img
                      src={checkoutItem.product.product_image}
                      alt={checkoutItem.product.name}
                      className="w-[72px] h-[72px] object-cover"
                    />
                    <p className="product-name ml-2">
                      {checkoutItem.product.name}
                    </p>
                  </div>
                  <div className="product-price flex text-sm md:text-base min-w-[20%] items-center">
                    <p className="price">
                      Rp.{" "}
                      {checkoutItem.product.price.toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                  <div className="product-quantity flex text-sm md:text-base min-w-[5%] items-center">
                    <p className="quantity">{checkoutItem.quantity}</p>
                  </div>
                  <div className="product-subtotal flex text-sm md:text-base min-w-[25%] items-center">
                    {checkoutItem.original_price !==
                      checkoutItem.total_specific_price && (
                      <p className="original_price line-through text-red-600 text-xs md:text-sm text-center">
                        Rp.{" "}
                        {checkoutItem.original_price.toLocaleString("id-ID", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    )}
                    <p className="subtotal text-center font-bold">
                      Rp.{" "}
                      {checkoutItem.total_specific_price.toLocaleString(
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

              <div className="w-full flex justify-end text-sm md:text-base">
                <div className="detail-price mt-4 w-full md:max-w-[40%]">
                  <div className="shipping flex justify-between">
                    <p className="shipping">Subtotal price</p>
                    <p className="shipping text-right max-w-[35%]">
                      Rp.{" "}
                      {checkoutByCity.subtotal_price.toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                  <div className="shipping flex justify-between">
                    <p className="shipping">Shipping Cost</p>
                    <p className="shipping text-right max-w-[35%]">
                      Rp.{" "}
                      {checkoutByCity.shippingCheckout.price.toLocaleString(
                        "id-ID",
                        {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }
                      )}
                    </p>
                  </div>
                  <div className="total flex justify-between text-green-500 font-bold">
                    <p className="total flex-1">Total</p>
                    <p className="total-price text-right max-w-[35%]">
                      Rp.{" "}
                      {checkoutByCity.total_checkout_price?.toLocaleString(
                        "id-ID",
                        {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="total mx-5 font-bold text-sm md:text-base text-end mb-5">
            <p className="total w-full flex gap-2 justify-between">
              Total Shipping Price{" "}
              <span className="min-w-[30%] text-end">
                Rp.{" "}
                {items.total_shipping_price?.toLocaleString("id-ID", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </p>
            <p className="total w-full flex gap-2 justify-between">
              Total Item Price{" "}
              <span className="min-w-[30%] text-end">
                Rp.{" "}
                {items.total_item_price?.toLocaleString("id-ID", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </p>
            <p className="total w-full flex gap-2 justify-between">
              Total Price{" "}
              <span className="min-w-[30%] text-end">
                Rp.{" "}
                {items.total_price?.toLocaleString("id-ID", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </p>
            {items.payment?.payment_status === "WAITING" ||
            items.payment?.payment_status === "SUCCESS" ||
            items.payment?.payment_status === "FAILED" ? (
              <button
                onClick={() => handleDetail(items.payment.id)}
                className="mt-4 px-3 py-2 bg-green-300 duration-300 hover:bg-green-400 rounded-md shadow-sm w-full text-black font-semibold">
                Detail
              </button>
            ) : items.status === "UNCOMPLETED" ? (
              <button
                onClick={() => handleUncompleted(items.id)}
                className="mt-4 px-3 py-2 bg-green-300 duration-300 hover:bg-green-400 rounded-md shadow-sm w-full text-black font-semibold">
                Selesaikan Pembayaran
              </button>
            ) : (
              <button
                onClick={() => handlePending(items.payment.id)}
                className="mt-4 px-3 py-2 bg-green-300 duration-300 hover:bg-green-400 rounded-md shadow-sm w-full text-black font-semibold">
                Selesaikan Pembayaran
              </button>
            )}
          </div>
        </div>
      ))}

      <div className="pagination flex justify-center mt-3 gap-2">
        <button className="text-orange-600 font-semibold px-2 py-1 rounded-md">
          <GrFormPrevious />
        </button>
        <p className="">1</p>
        <button className="text-orange-600 font-semibold px-2 py-1 rounded-md">
          <GrFormNext />
        </button>
      </div>
    </div>
  );
}
