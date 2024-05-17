import React from "react";
import Button from "@/components/Button";

export default function Product() {
  return (
    <div className="container mx-auto mt-10 p-5 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Product List</h1>
      <div className="flex justify-end mb-4 p-3">

        <button className="btn btn-primary mt-1 bg-orange-600 text-sm px-3 py-1 mx-1" >Add Product</button>
        <button className="btn btn-primary mt-1 bg-orange-600 text-sm px-3 py-1 mx-1" >Add Promo Product</button>

      </div>
      <table className="table min-w-full bg-white">
        {/* head */}
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th></th>
            <th>Product Name</th>
            <th>No. SKU</th>
            <th>Warehouse</th>
            <th>Stock</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>Product 1</td>
            <td>1117111600009872</td>
            <td>Depok</td>
            <td>125</td>
            <td className="border-t py-2 px-4 flex justify-center space-x-2">
              <Button color="blue">Edit</Button>
              <Button color="red">Delete</Button>
            </td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>2</th>
            <td>Product 2</td>
            <td>1117111600009879</td>
            <td>Tasikmalaya</td>
            <td>443</td>
            <td className="border-t py-2 px-4 flex justify-center space-x-2">
              <Button color="blue">Edit</Button>
              <Button color="red">Delete</Button>
            </td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>3</th>
            <td>Product 3</td>
            <td>11171116000098728</td>
            <td>Sumedang</td>
            <td>11</td>
            <td className="border-t py-2 px-4 flex justify-center space-x-2">
              <Button color="blue">Edit</Button>
              <Button color="red">Delete</Button>
            </td>
          </tr>
          {/* row 4 */}
          <tr>
            <th>4</th>
            <td>Product 4</td>
            <td>1117111600009877</td>
            <td>Pandeglang</td>
            <td>23</td>
            <td className="border-t py-2 px-4 flex justify-center space-x-2">
              <Button color="blue">Edit</Button>
              <Button color="red">Delete</Button>
            </td>
          </tr>
          {/* row 5 */}
          <tr>
            <th>5</th>
            <td>Product 5</td>
            <td>1117111600009876</td>
            <td>Bandung</td>
            <td>12</td>
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
