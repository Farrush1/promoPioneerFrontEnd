"use client";
import { FaPen } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import Link from "next/link";

import React, { useEffect, useState } from "react";

export default function PromoTablePage() {
  const [promo, setPromo] = useState([]);
  useEffect(() => {
    const fetchBio = async () => {
      const promo = await fetch("http://localhost:5000/api/promo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await promo.json();
      console.log(data.promo);
      setPromo(data.promo);
    };
    fetchBio();
  }, []);
  // console.log(promo, "-----------")
  return (
    <div>
      <h1>Promo</h1>
      <Link href="/dashboard/promo/create">
        <button className="btn btn-primary my-5">New Promo</button>
      </Link>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-orange-300 text-slate-800">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Discount (%)</th>
              <th>Limited Quantity</th>
              <th>Limited Time</th>
              <th>Quantity</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Promo Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {promo.map((items) => (
              <tr key={items.id}>
                <th>{items.id}</th>
                <td>{items.name}</td>
                <td>{items.discount_percent}%</td>
                <td>{items.isLimitedQuantity ? "Yes" : "No"}</td>
                <td>{items.isLimitedTime ? "Yes" : "No"}</td>
                <td>{items.isLimitedQuantity ? items.quantity : "-"}</td>
                <td>
                  {items.isLimitedTime ? items.start_date.slice(0, 10) : "-"}
                </td>
                <td>
                  {items.isLimitedTime ? items.end_date.slice(0, 10) : "-"}
                </td>
                <td>All Product</td>
                <td className="flex gap-1">
                  <button className="btn btn-sm btn-warning">
                    <FaPen />
                  </button>
                  <button className="btn btn-sm btn-error">
                    <FaRegTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
