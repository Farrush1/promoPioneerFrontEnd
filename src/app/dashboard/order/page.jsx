import React from 'react';
import Link from 'next/link';

export default function Order() {
  return (
    <div className="container mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-5">Order</h1>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th className="w-1/4 py-2 px-4">Order Id</th>
            <th className="w-1/4 py-2 px-4">Proof of Payment</th>
            <th className="w-1/4 py-2 px-4">Payment Status</th>
            <th className="w-1/4 py-2 px-4 text-center">Detail Payment</th>
            <th className="w-1/4 py-2 px-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          <tr className="hover:bg-white hover:text-slate-800 rounded-full hover:shadow-md duration-300">
            <td className="border-t py-2 px-4"> - </td>
            <td className="border-t py-2 px-4"> - </td>
            <td className="border-t py-2 px-4"> -</td>
            <td className="border-t py-2 px-4"> -</td>
            <td className="border-t py-2 px-4 flex justify-center space-x-2">
              <Link href="/dashboard/order/1">
                <button className="btn btn-primary"> Detail</button>
               </Link>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
    </div>
  );
}
