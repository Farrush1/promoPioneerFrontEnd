import React from 'react';
;

const CardCategory = ({ name, imageUrl, price, currency }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl w-full h-full duration-300 m-1 hover:-translate-x-1 hover:-translate-y-1">
      <div className="h-32 flex items-center justify-center bg-gray-200 rounded-t-lg">
        {imageUrl ? (
          <img className="object-cover w-full h-full rounded-t-lg" src={imageUrl} alt={name} />
        ) : (
          <span className="text-gray-500">No Image Available</span>
        )}
      </div>
      <div>
        <h2 className="text-sm font-semibold m-5">{name}</h2>
        <p className="text-base font-semibold m-5 text-orange-600">
          {currency} {price}
        </p>
      </div>
    </div>
  );
};

export default CardCategory;
