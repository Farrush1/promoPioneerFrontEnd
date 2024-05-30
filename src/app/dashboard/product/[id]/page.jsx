"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Product Details</h1>
      {product ? (
        <div>
          <img
            className="w-full h-64 object-contain mb-4"
            src={product.product_image}
            alt={product.name}
          />
          <div className="flex justify-evenly">
            <div>
              <h3 className="font-semibold mb-4">Data Product</h3>
              <div className="mb-4">
                <strong>Name:</strong> {product.name}
              </div>
              <div className="mb-4">
                <strong>Category:</strong> {product.category?.name}
              </div>
              <div className="mb-4">
                <strong>Price:</strong> Rp. {product.price}
              </div>
              <div className="mb-4">
                <strong>Stock:</strong> {product.stock}
              </div>
              <div className="mb-4">
                <strong>Description:</strong> {product.description}
              </div>
              <div className="mb-4">
                <strong>Warehouse:</strong>
                {product.warehouse?.name}, {product.warehouse?.location}
              </div>
              <div className="mb-4">
                <strong>Weight:</strong> {product.weight} grams
              </div>
              <div className="mb-4">
                <strong>City:</strong> {product.warehouse?.city.name}
              </div>
            </div>
            <div className="overflow-x-auto">
              <h3 className="font-semibold mb-4">Promo Product</h3>
              <table className="table text-center">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Promo</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {product.PromoProduct.map((promoList, index) => (
                    <tr key={promoList.id}>
                      <th>{index + 1}</th>
                      <td>{promoList.promo.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
