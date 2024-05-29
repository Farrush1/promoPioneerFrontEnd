"use client";

import React, { useState, useEffect } from "react";
import CardProduct from "@/components/CardProduct";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    orderCancelled: 0,
  });
  const productsPerPage = 9;

  useEffect(() => {
    fetchProducts(currentPage);
    fetchStats();
  }, [currentPage]);

  const fetchProducts = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products?limit=${productsPerPage}&page=${page}`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotalProducts(data.totalProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/payments/stats`);
      const data = await response.json();
      setStats({
        totalOrders: data.totalOrders,
        totalRevenue: data.totalRevenue,
        orderCancelled: data.orderCancelled,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
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

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="flex justify-center mb-6">
        <div className="stats stats-vertical lg:stats-horizontal gap-6">
          <div className="stat place-items-center text-center">
            <div className="stat-title">Total Orders</div>
            <div className="stat-value">{stats.totalOrders}</div>
          </div>
          <div className="stat place-items-center text-center">
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value">Rp.{stats.totalRevenue}</div>
          </div>
          <div className="stat place-items-center text-center">
            <div className="stat-title">Order Cancelled</div>
            <div className="stat-value">{stats.orderCancelled}</div>
          </div>
        </div>
      </div>

      <h1 className="text-xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(products) &&
          products.map((product) => (
            <CardProduct
              key={product.id}
              name={product.name}
              stock={product.stock}
              image={product.product_image}
              price={product.price}
            />
          ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
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
          Next
        </button>
      </div>
    </div>
  );
}
