"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function TableOrder() {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const fetchOrder = async () => {
      const order = await fetch("http://localhost:5000/api/checkouts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await order.json();
      console.log(data.checkout);
      setOrder(data.checkout);
    };
    fetchOrder();
  }, []);
  return (
    <div className="container mx-auto mt-10 p-5 min-h-[624px] bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-5">Order</h1>
      <table className="min-w-full bg-white text-center">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th className="w-1/4 py-2 px-4">Order Id</th>
            <th className="w-1/4 py-2 px-4">Proof of Payment</th>
            <th className="w-1/4 py-2 px-4">Payment Status</th>
            <th className="w-1/4 py-2 px-4 text-center">Date</th>
            <th className="w-1/4 py-2 px-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {order.map((items) => (
            <tr
              key={items.id}
              className="hover:bg-white hover:text-slate-800 rounded-full hover:shadow-md duration-300"
            >
              <td className="border-t py-2 px-4">{items.id} </td>
              <td className="border-t py-2 px-4">
                {" "}
                {items.payment ? (
                  <img
                    className="w-16 h-16"
                    src={items.payment.payment_proof}
                  />
                ) : (
                  "-"
                )}
              </td>
              <td className="border-t py-2 px-4">{items.status}</td>
              <td className="border-t py-2 px-4">{items.updatedAt}</td>
              <td className="border-t py-2 px-4 flex justify-center space-x-2">
                {items.payment && (
                  <Link href={`/dashboard/order/${items.payment.id}`}>
                    <button className="btn btn-primary"> Detail</button>
                  </Link>
                )}

                {/* <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
