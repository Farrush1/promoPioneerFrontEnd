"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [promoTypes, setPromoTypes] = useState([]);
  const [selectedPromo, setSelectedPromo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const router = useRouter();
  const productsPerPage = 10;

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchPromoTypes();
  }, []);

  const fetchProducts = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products?limit=10&page=${page}`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotalProducts(data.totalProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchPromoTypes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/promo-types");
      const data = await response.json();
      console.log(data);
      setPromoTypes(data.promoType);
    } catch (error) {
      console.error("Error fetching promo types:", error);
    }
  };

  const handleAddPromo = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditProduct = (productId) => {
    router.push(`/dashboard/product/update/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchProducts(currentPage);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleViewDetails = (productId) => {
    router.push(`/dashboard/product/detail/${productId}`);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalProducts / productsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSavePromo = async () => {
    if (!selectedPromo) {
      alert("Please select a promo type.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/promo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ promoTypeId: selectedPromo }),
      });
      const data = await response.json();
      console.log("Promotion Created:", data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating promotion:", error);
    }
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Product List</h1>
      <div className="flex gap-4 justify-end mb-4 p-3">
        <Link
          href="/dashboard/product/create"
          className="bg-orange-600 text-sm px-3 py-1.5 rounded-md shadow-md text-white font-semibold">
          + Product
        </Link>
        <button
          className="bg-orange-600 text-sm px-3 py-1.5 rounded-md shadow-md text-white font-semibold"
          onClick={handleAddPromo}>
          + Promo Product
        </button>
      </div>
      <table className="table">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                />
                <input
                  type="checkbox"
                  className="checkbox"
                />
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
          {products?.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                    />
                    <input
                      type="checkbox"
                      className="checkbox"
                    />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={product.product_image}
                          alt={product.name}
                        />
                        <img
                          src={product.product_image}
                          alt={product.name}
                        />
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
                    onClick={() => handleEditProduct(product.id)}>
                    Edit
                  </Button>
                  <Button
                    color="red"
                    onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </Button>
                </td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleViewDetails(product.id)}>
                    Details
                  </button>
                </th>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center">
              <td
                colSpan="7"
                className="text-center">
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
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50">
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50">
          Previous
        </button>
        <span className="px-4 py-2 mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50">
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50">
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
              <select
                className="select select-bordered w-full"
                onChange={(e) => setSelectedPromo(e.target.value)}
                value={selectedPromo}
              >
                <option disabled value="">
                  Choose Promo
                </option>
                {promoTypes?.length > 0 ? (
                  promoTypes.map((promo) => (
                    <option key={promo.id} value={promo.id}>
                      {promo.name}
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
                onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="btn btn-primary bg-orange-600"
                onClick={handleSavePromo}
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
