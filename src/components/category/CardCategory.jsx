/* eslint-disable @next/next/no-img-element */
import React from "react";
const CardCategory = ({ name, imageUrl, price, currency }) => {
  return (
    <div className="bg-white rounded-md flex-wrap flex flex-col shadow-md w-full h-full duration-300 m-1 hover:-translate-x-1 hover:-translate-y-1">
      <div className="h-36 flex bg-gray-200 rounded-t-lg cursor-pointer">
        {imageUrl ? (
          <img
            className="object-cover w-full h-full rounded-t-lg"
            src={imageUrl}
            alt={name}
          />
        ) : (
          <span className="text-gray-500">No Image Available</span>
        )}
      </div>
      <div className="flex flex-col justify-between flex-1">
        <h2 className="text-sm font-semibold px-3 py-2 line-clamp-2 overflow-hidden">
          {name}
        </h2>
        <p className="text-base font-semibold flex justify-between px-3 py-2 text-orange-600">
          <span>Rp </span>
          {price.toLocaleString("id-ID", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </p>
      </div>
    </div>
  );
};

export default CardCategory;
