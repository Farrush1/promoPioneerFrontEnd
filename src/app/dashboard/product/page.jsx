"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";

export default function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const handleAddPromo = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Fetch product data from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-5 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Product List</h1>
      <div className="flex justify-end mb-4 p-3">
        <button className="btn btn-primary mt-1 bg-orange-600 text-sm px-1 py-1 mx-1">
          <Link href="/dashboard/product/create-product">Add Product</Link>
        </button>
        <button
          className="btn btn-primary mt-1 bg-orange-600 text-sm px-1 py-1 mx-1"
          onClick={handleAddPromo}
        >
          Add Promo Product
        </button>
      </div>
      <table className="table">
        {/* head */}
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Price</th>
            <th className="text-center">Stock</th>
            <th>Warehouse</th>
            <th className="text-center">Action</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={product.image} alt={product.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.name}</div>
                      <div className="text-sm opacity-50">
                        {product.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product.price}</td>
                <td className="text-center">{product.stock}</td>
                <td>{product.promo}</td>
                <td className="border-t py-2 px-4 flex justify-center space-x-2">
                  <Button color="blue">Edit</Button>
                  <Button color="red">Delete</Button>
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">Details</button>
                </th>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add Promo Product</h2>
            {/* Modal content goes here */}

            <label className="form-control">
              <div className="label">
                <span className="label-text">Choose Promo</span>
              </div>
              <select className="select select-bordered w-full">
                <option disabled selected>
                  Choose Promo
                </option>
                <option>Promo 1</option>
                <option>Promo 2</option>
                <option>Promo 3</option>
              </select>
            </label>

            <p>Here you can add a promo product.</p>
            <div className="flex justify-end mt-4">
              <button
                className="btn btn-primary bg-red-500"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary bg-orange-600"
                onClick={handleCloseModal}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
