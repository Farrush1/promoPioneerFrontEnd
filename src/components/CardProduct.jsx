/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CardProduct({
  productId,
  name,
  price,
  qty,
  image,
  className,
  promo,
}) {
  return (
    <>
      <Link
        href={`/product/${productId}`}
        className={`shadow-sm w-full relative rounded-md border border-slate-200 ${className} hover:shadow-md duration-300 hover:-translate-x-1 hover:-translate-y-1`}>
        {promo && (
          <span className="absolute object-cover top-0 text-xs font-bold py-1 left-0 bg-gradient-to-t from-orange-600 to-orange-500 text-white px-2 rounded-br-md rounded-tl-md">
            {/* opsional kalo product promo */}
            {promo}
          </span>
        )}
        <img
          src={image}
          className="w-full h-52 sm:h-56 lg:h-64 object-cover rounded-t-md"
        />
        <div className="p-1.5 flex flex-col gap-1 justify-between md:h-24">
          <h1 className="text-sm md:text-base flex-1 font-semibold mb-1.5 line-clamp-2">
            {name}
          </h1>
          <div className="flex justify-between items-end">
            <span className="text-sm">Stock: {qty}</span>
            <p className="font-semibold text-orange-600">
              <span className="text-sm md:text-base">Rp </span>
              {price.toLocaleString("id-ID", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
