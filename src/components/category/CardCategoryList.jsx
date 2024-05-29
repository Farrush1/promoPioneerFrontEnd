import React from "react";
import CardCategory from "./CardCategory";
import CardProduct from "../CardProduct";

const CardCategoryList = ({ data }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((product, index) => (
        <CardProduct
          promo={"Special Promo"} // opsional kalo product promo
          productId={product.id}
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.product_image}
          qty={product.stock}
        />
        // <CardCategory
        //   key={index}
        //   name={product.name}
        //   imageUrl={product.imageUrl}
        //   price={product.price}
        //   currency={product.currency}
        // />
      ))}
    </div>
  );
};

export default CardCategoryList;