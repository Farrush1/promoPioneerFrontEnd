/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function DetailOrder({ idPayment }) {
  const router = useRouter();
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
          `http://localhost:5000/api/payments/${idPayment}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        const data = await response.json();
        setPayment(data.payment);
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };

    fetchPayment();
  }, [idPayment]);

  const handleSuccess = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/payments/status/${idPayment}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentStatus: 'SUCCESS',
          }),
          credentials: 'include',
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };
  const handleFailed = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/payments/status/${idPayment}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentStatus: 'FAILED',
          }),
          credentials: 'include',
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  function findCityNameById(id) {
    const city = cities.find((city) => city.id === id);
    return city ? city.name : "City not found";
  }

  if (!payment || !cities.length) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="container mx-auto p-10 bg-white shadow-md rounded-lg">
    //   <h1 className="text-3xl font-bold text-center mb-10">Detail Order</h1>
    //   <div className="flex justify-between mb-5">
    //     {console.log(payment)}
    //     <div>
    //       <p>
    //         <strong>Order ID:</strong> {payment.checkout_collection_id}
    //       </p>
    //       <p>
    //         <strong>User ID:</strong> {payment?.checkout_colection?.user_id}
    //       </p>
    //     </div>
    //     <div className="text-right">
    //       <p>
    //         <strong>Date:</strong> {payment?.checkout_colection?.updatedAt}
    //       </p>
    //       <p>
    //         <strong>Status:</strong> {payment.payment_status}
    //       </p>
    //     </div>
    //   </div>
    //   <table className="min-w-full bg-white">
    //     <thead className="bg-gray-200 text-gray-600">
    //       <tr>
    //         <th className="w-1/4 py-2 px-4">Product</th>
    //         <th className="w-1/4 py-2 px-4">Unit Price</th>
    //         <th className="w-1/4 py-2 px-4">Quantity</th>
    //         <th className="w-1/4 py-2 px-4">Total Price</th>
    //       </tr>
    //     </thead>
    //     <tbody className="text-gray-700">
    //       {payment.checkout_colection?.checkout?.map((checkout) =>
    //         checkout.checkout_item.map((item) => (
    //           <tr key={item.id} className="border-t">
    //             <td className="py-2 px-4">{item.product.name}</td>
    //             <td className="py-2 px-4">Rp. {item.product.price}</td>
    //             <td className="py-2 px-4">{item.quantity}</td>
    //             <td className="py-2 px-4">Rp. {item.total_specific_price}</td>
    //           </tr>
    //         ))
    //       )}
    //     </tbody>
    //   </table>
    //   <div className="mt-5">
    //     <h2 className="text-xl font-bold">Shipping</h2>
    //     <p>
    //       <strong>Type:</strong>{" "}
    //       {payment.checkout_colection?.checkout?.[0]?.shippingCheckout?.service}
    //     </p>
    //     <p>
    //       <strong>Address:</strong> Jl. kebayoran lama kota jakarta provinsi DKI
    //       jakarta
    //     </p>
    //   </div>
    //   <div className="mt-5">
    //     <h2 className="text-xl font-bold">Shipping Price</h2>
    //     <p>Rp. {payment.checkout_colection?.total_shipping_price}</p>
    //   </div>
    //   <div className="mt-5">
    //     <h2 className="text-xl font-bold">Total Price</h2>
    //     <p>Rp. {payment.checkout_colection?.total_price}</p>
    //   </div>
    //   <div className="mt-5">
    //     <h2 className="text-xl font-bold">Payment Proof</h2>
    //     <div className="w-48 h-48 bg-gray-200">
    //       <img
    //         src={payment.payment_proof}
    //         alt="Payment Proof"
    //         className="w-full h-full object-cover"
    //       />
    //     </div>
    //   </div>
    //   {payment.payment_status === "SUCCESS" ||
    //   payment.payment_status === "FAILED" ? (
    //     <div className="mt-5 bg-sky-300">{payment.payment_status}</div>
    //   ) : (
    //     <div className="mt-5 flex justify-between">
    //       <p>Received an order request?</p>
    //       <div className="space-x-4">
    //         <button onClick={handleSuccess} className="btn btn-primary">
    //           Yes
    //         </button>
    //         <button onClick={handleFailed} className="btn btn-secondary">
    //           No
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="bg-white shadow-lg rounded-md p-8 flex-1 flex flex-col gap-6 md:gap-0 justify-between overflow-y-auto">
      <h1 className="text-xl">Detail Order</h1>
      <div className="flex justify-between">
        <div className="">
          <p>Order ID: {payment.checkout_colection?.id}</p>
          <p>User ID: {payment.checkout_colection?.user_id}</p>
        </div>
        <div className="">
          <p className="">
            Date: {payment.checkout_colection?.updatedAt.slice(0, 10)}
          </p>
          <p>Status: {payment.payment_status}</p>
        </div>
      </div>
      {payment.checkout_colection?.checkout.map((checkout) => (
        <div key={checkout.id} className="bg-slate-200 mb-5 p-2">
          <p>Order from {findCityNameById(checkout.city_id)}</p>
          <div className="overflow-x-auto ">
            <table className="table ">
              {/* head */}
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="text-center">Unit Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center"></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {checkout.checkout_item.map((checkoutItems) => (
                  <tr key={checkoutItems.id}>
                    <th>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={checkoutItems.product.product_image}
                              alt=""
                            />
                          </div>
                        </div>
                        <div>
                          <div className="">{checkoutItems.product.name}</div>
                        </div>
                      </div>
                    </th>
                    <td className="text-center">
                      {checkoutItems.product.price}
                    </td>
                    <td className="text-center">{checkoutItems.quantity}</td>
                    <td className="text-center">
                      {checkoutItems.original_price !=
                        checkoutItems.total_specific_price && (
                        <p className="line-through bg-red-200">
                          {checkoutItems.original_price}
                        </p>
                      )}
                      <p className="text-center">
                        {" "}
                        Rp.{" "}
                        {checkoutItems.total_specific_price.toLocaleString(
                          "id-ID",
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }
                        )}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between border-t-2 border-slate-500 pt-4 pl-4 pr-24">
            <p>Shipping</p>
            <div className="flex items-center">
              <div className="bg-green-200 text-center p-2">
                <p>{checkout.shippingCheckout.name.toUpperCase()}</p>
                <p>{checkout.shippingCheckout.service}</p>
              </div>
              <p>
                Rp.{" "}
                {checkout.shippingCheckout.price.toLocaleString("id-ID", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
          <div className="total">
            <p>
              Total: Rp.{" "}
              {checkout.total_checkout_price.toLocaleString("id-ID", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      ))}

      <p>
        <strong>Address:</strong>{" "}
        {findCityNameById(payment.checkout_colection?.user.city_id)},{" "}
        {payment.checkout_colection?.user.full_address}
      </p>
      <div className="total text-end">
        <p>
          Total Product Price: Rp.{" "}
          {payment.checkout_colection.total_item_price.toLocaleString("id-ID", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </p>
        <p>
          Total Shipping Price: Rp.{" "}
          {payment.checkout_colection.total_shipping_price.toLocaleString(
            "id-ID",
            {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }
          )}
        </p>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold">Shipping</h2>
        <p>
          <strong>Type:</strong>{' '}
          {payment.checkout_colection?.checkout?.[0]?.shippingCheckout?.service}
        </p>
        <p>
          Total Price: Rp.{" "}
          {payment.checkout_colection.total_price.toLocaleString("id-ID", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </p>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold">Payment Proof</h2>
        <div className="w-48 h-48 bg-gray-200">
          <img
            src={payment.payment_proof}
            alt="Payment Proof"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {payment.payment_status === 'SUCCESS' ||
      payment.payment_status === 'FAILED' ? (
        <div className="mt-5 bg-sky-300">{payment.payment_status}</div>
      ) : (
        <div className="mt-5 flex justify-between bg-yellow-200 p-8">
          <p>Received an order request?</p>
          <div className="space-x-4">
            <button onClick={handleSuccess} className="btn btn-primary px-8">
              Yes
            </button>
            <button onClick={handleFailed} className="btn btn-secondary px-8">
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
