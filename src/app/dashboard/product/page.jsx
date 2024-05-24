"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [promo, setPromo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const router = useRouter();
  const productsPerPage = 10;

  const handleAddPromo = () => {
    setIsModalOpen(true);
    fetchPromo();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products?limit=10&page=${page}`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotalProducts(data.total);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchPromo = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products?specialPromo=true`);
      const data = await response.json();
      setPromo(data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  const handleEditProduct = (productId) => {
    router.push(`/dashboard/product/create/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      });
      fetchProducts(currentPage);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleViewDetails = (productId) => {
    router.push(`http://localhost:5000/api/products/${productId}`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="container mx-auto mt-10 p-5 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Product List</h1>
      <div className="flex justify-end mb-4 p-3">
        <button className="btn btn-primary mt-1 bg-orange-600 text-sm px-1 py-1 mx-1">
          <Link href="/dashboard/product/create">Add Product</Link>
        </button>
        <button
          className="btn btn-primary mt-1 bg-orange-600 text-sm px-1 py-1 mx-1"
          onClick={handleAddPromo}
        >
          Add Promo Product
        </button>
      </div>
      <table className="table">
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
                        <img src={product.product_image} alt={product.name} />
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
                <td>
                  {product.warehouse
                    ? `${product.warehouse.name}, ${product.warehouse.location}`
                    : "No Warehouse"}
                </td>
                <td className="border-t py-2 px-4 flex justify-center space-x-2">
                  <Button
                    color="blue"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="red"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleViewDetails(product.id)}
                  >
                    Details
                  </button>
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
      <div className="flex justify-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add Promo Product</h2>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Choose Promo</span>
              </div>
              <select className="select select-bordered w-full">
                <option disabled selected>
                  Choose Promo
                </option>
                {promo.length > 0 ? (
                  promo.map((promoItem) => (
                    <option key={promoItem.id} value={promoItem.id}>
                      {promoItem.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading promo...</option>
                )}
              </select>
            </label>
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
