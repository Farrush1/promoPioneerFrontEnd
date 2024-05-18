import React from "react";
import CardCategory from "./CardCategory";

const CardCategoryList = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {data.map((product, index) => (
        <CardCategory
          key={index}
          name={product.name}
          imageUrl={product.imageUrl}
          price={product.price}
          currency={product.currency}
        />
      ))}
    </div>
  );
};

export default CardCategoryList;