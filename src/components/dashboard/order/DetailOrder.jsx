"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DetailOrder({ idPayment }) {
  const router = useRouter();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/payments/${idPayment}`,
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
        console.error("Error fetching payment data:", error);
      }
    };

    fetchPayment();
  }, [idPayment]);

  const handleSuccess = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/payments/status/${idPayment}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentStatus: "SUCCESS",
          }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  const handleFailed = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/payments/status/${idPayment}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentStatus: "FAILED",
          }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  if (!payment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-10 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-10">Detail Order</h1>
      <div className="flex justify-between mb-5">
        {console.log(payment)}
        <div>
          <p>
            <strong>Order ID:</strong> {payment.checkout_collection_id}
          </p>
          <p>
            <strong>User ID:</strong> {payment?.checkout_colection?.user_id}
          </p>
        </div>
        <div className="text-right">
          <p>
            <strong>Date:</strong> {payment?.checkout_colection?.updatedAt}
          </p>
          <p>
            <strong>Status:</strong> {payment.payment_status}
          </p>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th className="w-1/4 py-2 px-4">Product</th>
            <th className="w-1/4 py-2 px-4">Unit Price</th>
            <th className="w-1/4 py-2 px-4">Quantity</th>
            <th className="w-1/4 py-2 px-4">Total Price</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {payment.checkout_colection?.checkout?.map((checkout) =>
            checkout.checkout_item.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="py-2 px-4">{item.product.name}</td>
                <td className="py-2 px-4">Rp. {item.product.price}</td>
                <td className="py-2 px-4">{item.quantity}</td>
                <td className="py-2 px-4">Rp. {item.total_specific_price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="mt-5">
        <h2 className="text-xl font-bold">Shipping</h2>
        <p>
          <strong>Type:</strong>{" "}
          {payment.checkout_colection?.checkout?.[0]?.shippingCheckout?.service}
        </p>
        <p>
          <strong>Address:</strong> Jl. kebayoran lama kota jakarta provinsi DKI
          jakarta
        </p>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold">Shipping Price</h2>
        <p>Rp. {payment.checkout_colection?.total_shipping_price}</p>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold">Total Price</h2>
        <p>Rp. {payment.checkout_colection?.total_price}</p>
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
      {payment.payment_status === "SUCCESS" ||
      payment.payment_status === "FAILED" ? (
        <div className="mt-5 bg-sky-300">{payment.payment_status}</div>
      ) : (
        <div className="mt-5 flex justify-between">
          <p>Received an order request?</p>
          <div className="space-x-4">
            <button onClick={handleSuccess} className="btn btn-primary">
              Yes
            </button>
            <button onClick={handleFailed} className="btn btn-secondary">
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
