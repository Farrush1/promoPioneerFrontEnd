import React from "react";

const DetailProductCard = ({ title, price, imageUrl }) => {
  return (
    <div className="card w-44 bg-base-100 shadow-md rounded-lg">
      <figure>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-32 object-cover rounded-t-lg"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold">{title}</h2>
        <p className="text-orange-600 font-bold">{price}</p>
      </div>
    </div>
  );
};

export default DetailProductCard;
