import React from 'react';
import 'tailwindcss/tailwind.css';

export default function Orderdetail() {
  return (
    <div className="container mx-auto p-10 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-10">Detail Order</h1>
      
      <div className="flex justify-between mb-5">
        <div>
          <p><strong>Order ID:</strong> XXXXXXX</p>
          <p><strong>User ID:</strong> XXXXXXX</p>
        </div>
        <div className="text-right">
          <p><strong>Date:</strong> XXXXXXX</p>
          <p><strong>Status:</strong> Pending</p>
        </div>
      </div>
      
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th className="w-1/4 py-2 px-4">Product</th>
            <th className="w-1/4 py-2 px-4">Unit Price</th>
            <th className="w-1/4 py-2 px-4">Quantity</th>
            <th className="w-1/4 py-2 px-4">Total Price</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {['AAA', 'BBB', 'CC', 'DDD'].map((product, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">{product}</td>
              <td className="py-2 px-4">Rp. 20000</td>
              <td className="py-2 px-4">2</td>
              <td className="py-2 px-4">Rp. 40000</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-5">
        <h2 className="text-xl font-bold">Shipping</h2>
        <p><strong>Type:</strong> Reguler</p>
        <p><strong>Address:</strong> Jl. kebayoran lama kota jakarta provinsi DKI jakarta</p>
      </div>
      
      <div className="mt-5">
        <h2 className="text-xl font-bold">Shipping Price</h2>
        <p>Rp. 40000</p>
      </div>
      
      <div className="mt-5">
        <h2 className="text-xl font-bold">Total Price</h2>
        <p>Rp. 200000</p>
      </div>
      
      <div className="mt-5">
        <h2 className="text-xl font-bold">Payment Proof</h2>
        <div className="w-48 h-48 bg-gray-200"></div>
      </div>
      
      <div className="mt-5 flex justify-between">
        <p>Received an order request?</p>
        <div className="space-x-4">
          <button className="btn btn-primary">Yes</button>
          <button className="btn btn-secondary">No</button>
        </div>
      </div>
    </div>
  );
}