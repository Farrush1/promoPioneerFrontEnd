import React from 'react';
import Button from '@/components/warehouse'

export default function Warehouse() {
  return (
    <div className="container mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-5">Warehouse</h1>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th className="w-1/4 py-2 px-4">Name</th>
            <th className="w-1/4 py-2 px-4">Full Address</th>
            <th className="w-1/4 py-2 px-4">City</th>
            <th className="w-1/4 py-2 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          <tr>
            <td className="border-t py-2 px-4">Andi</td>
            <td className="border-t py-2 px-4">Jl. Merdeka No. 1</td>
            <td className="border-t py-2 px-4">Jakarta</td>
            <td className="border-t py-2 px-4 flex justify-center space-x-2">
              <Button color="blue">Edit</Button>
              <Button color="red">Delete</Button>
            </td>
          </tr>
          
          <tr>
            <td className="border-t py-2 px-4">Rana</td>
            <td className="border-t py-2 px-4">Jl. bambu. 1</td>
            <td className="border-t py-2 px-4">Bandung</td>
            <td className="border-t py-2 px-4 flex justify-center space-x-2">
              <Button color="blue">Edit</Button>
              <Button color="red">Delete</Button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}
