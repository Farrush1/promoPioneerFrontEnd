import CardProduct from "@/components/CardProduct";
import React from "react";

export default function Dashboard() {
  const orders = [
    { id: 1, status: "completed" },
    { id: 2, status: "completed" },
    { id: 3, status: "cancelled" },
  ];

  const transactions = [
    { id: 1, amount: 200000 },
    { id: 2, amount: 300000 },
    { id: 3, amount: 150000 },
  ];

  const shipments = [
    { id: 1, status: "shipped" },
    { id: 2, status: "cancelled" },
    { id: 3, status: "cancelled" },
  ];

  const totalOrders = orders.filter(
    (order) => order.status === "completed"
  ).length;

  const totalRevenue = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const orderCancelled = shipments.filter(
    (shipment) => shipment.status === "cancelled"
  ).length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="flex justify-center mb-6">
        <div className="stats stats-vertical lg:stats-horizontal gap-6">
          <div className="stat place-items-center text-center">
            <div className="stat-title">Total Orders</div>
            <div className="stat-value">{totalOrders}</div>
          </div>

          <div className="stat place-items-center text-center">
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value">Rp.{totalRevenue}</div>
          </div>

          <div className="stat place-items-center text-center">
            <div className="stat-title">Order Cancelled</div>
            <div className="stat-value">{orderCancelled}</div>
          </div>
        </div>
      </div>
      
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Here you can add individual product cards */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <img
            src="product_image_url"
            alt="Product"
            className="w-full mb-4"
          />
          <h2 className="text-lg font-semibold">{/* product name */}</h2>
          <p className="text-gray-600">{/* description */}</p>
          <p className="mt-4 text-xl">Rp.{/* product price */}</p>
        </div>
        {/* Add more product cards as needed */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <img
            src="product_image_url"
            alt="Product"
            className="w-full mb-4"
          />
          <h2 className="text-lg font-semibold">{/* product name */}</h2>
          <p className="text-gray-600">{/* description */}</p>
          <p className="mt-4 text-xl">Rp.{/* product price */}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <img
            src="product_image_url"
            alt="Product"
            className="w-full mb-4"
          />
          <h2 className="text-lg font-semibold">{/* product name */}</h2>
          <p className="text-gray-600">{/* description */}</p>
          <p className="mt-4 text-xl">Rp.{/* product price */}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <img
            src="product_image_url"
            alt="Product"
            className="w-full mb-4"
          />
          <h2 className="text-lg font-semibold">{/* product name */}</h2>
          <p className="text-gray-600">{/* description */}</p>
          <p className="mt-4 text-xl">Rp.{/* product price */}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <img
            src="product_image_url"
            alt="Product"
            className="w-full mb-4"
          />
          <h2 className="text-lg font-semibold">{/* product name */}</h2>
          <p className="text-gray-600">{/* description */}</p>
          <p className="mt-4 text-xl">Rp.{/* product price */}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <img
            src="product_image_url"
            alt="Product"
            className="w-full mb-4"
          />
          <h2 className="text-lg font-semibold">{/* product name */}</h2>
          <p className="text-gray-600">{/* description */}</p>
          <p className="mt-4 text-xl">Rp.{/* product price */}</p>
        </div>
        {/* Continue adding more product cards as needed */}
      </div>
    </div>
  );
}
