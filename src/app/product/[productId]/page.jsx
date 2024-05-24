"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DetailProductCard from "@/components/DetailProductCard";

const DetailCard = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product detail");
        }
        const data = await response.json();
        console.log("Response from API:", data);
        setProduct(data);
        const categoryId = data.category_id;
        fetchProductsByCategory(categoryId, data.id);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };

    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);

  const fetchProductsByCategory = async (categoryId, productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products?categories=${categoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch related products");
      }
      const data = await response.json();
      console.log("Filtered Data:", data);
      const filteredProducts = data.filter((item) => item.id !== productId);
      setRelatedProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching related products:", error);
      setRelatedProducts([]);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddCart = async () => {
    try {
      const url = `http://localhost:5000/api/carts/cart-items`;
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: quantity,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="xl:max-w-6xl mx-auto pt-20 xl:px-0">
      {product && (
        <section>
          <div className="container bg-gray-100 p-4 md:p-10 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row">
              <img
                src={product.product_image}
                alt="Product"
                className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-10"
              />
              <div className="flex flex-col justify-between w-full md:w-2/3">
                <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
                <p className="mb-2">Brand</p>
                <p className="mb-2">Stock: {product.stock}</p>
                <p className="font-bold">Price: Rp {product.price}</p>
                <div className="flex items-center mt-4">
                  <button
                    onClick={handleDecrement}
                    className="bg-white hover:bg-orange-600 transition duration-200 text-black shadow-md hover:text-white px-4 py-2 rounded-md"
                  >
                    -
                  </button>
                  <span className="bg-white shadow-md border-gray-300 px-4 py-2 mx-2 rounded-md">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="bg-white hover:bg-orange-600 transition duration-200 text-black hover:text-white shadow-md px-4 py-2 rounded-md"
                  >
                    +
                  </button>
                </div>
                <div className="flex mt-4 items-center">
                  <button
                    onClick={handleAddCart}
                    className="btn w-auto mr-2 shadow-md bg-white hover:bg-orange-600 transition duration-200 hover:text-white border-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-2 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    Add to Cart
                  </button>
                  <button className="btn w-24 shadow-md bg-white text-black transition duration-200 hover:bg-orange-600 hover:text-white border-none">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
            <label className="form-control w-full mt-4">
              <div className="label">
                <span className="label-text mb-3">Description</span>
              </div>
              <textarea
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full px-4 py-2"
                value={product.description}
                readOnly
              />
            </label>
          </div>

          <div className="my-10">
            <div className="container bg-gray-100 md:p-10 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-10">
                Product with same category
              </h2>
              <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto sb-hidden">
                {Array.isArray(relatedProducts) &&
                relatedProducts.length > 0 ? (
                  relatedProducts.map((relatedProduct) => (
                    <div
                      key={relatedProduct.id}
                      className="w-2/3 sm:w-1/3 md:w-1/6 mb-2"
                    >
                      <DetailProductCard
                        title={relatedProduct.name}
                        price={relatedProduct.price}
                        imageUrl={relatedProduct.product_image}
                      />
                    </div>
                  ))
                ) : (
                  <p>No related products found</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      <style jsx>{`
        .container {
          margin: auto;
        }

        .sb-hidden::-webkit-scrollbar {
          display: none;
        }

        @media (min-width: 640px) {
          .container {
            margin: auto;
          }
        }
        @media (min-width: 100px) {
          .container {
            margin: auto;
          }
        }
      `}</style>
    </main>
  );
};

export default DetailCard;
