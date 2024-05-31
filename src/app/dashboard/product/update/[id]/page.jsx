"use client";

import React, { useState, useEffect } from "react";
import { FaFileUpload } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function UpdateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    price: "",
    description: "",
    warehouseName: "",
    warehouseFullAddress: "",
    warehouseCityId: "",
    product_image: null,
    weight: "",
    stock: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
    fetchCategories();
    fetchCities();
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
      setFormData({
        name: data.name,
        category_id: data.category_id,
        price: data.price,
        description: data.description,
        warehouseName: data.warehouse.name,
        warehouseFullAddress: data.warehouse.location,
        warehouseCityId: data.warehouse.city.id,
        product_image: data.product_image,
        weight: data.weight,
        stock: data.stock,
      });

      setSelectedFile(data.product_image || null);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategories(data.category);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cities`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCities(data.city);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const selectedFile = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedFile,
      }));
      setSelectedFile(URL.createObjectURL(selectedFile));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    console.log(formData);

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Successfully updated product");
        router.push(`/dashboard/product`);
      } else {
        const errorData = await response.json();
        console.error("Failed to update product:", errorData);
        alert(`Failed to update product: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the product");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Update Product</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex space-x-6">
          <div className="flex flex-col space-y-6 w-1/2">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Product Name</span>
              </div>
              <input
                type="text"
                name="name"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select
                name="category_id"
                className="select select-bordered w-full"
                value={formData.category_id}
                onChange={handleChange}
                required
              >
                <option disabled value="">
                  Choose Category
                </option>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading categories...</option>
                )}
              </select>
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                type="number"
                name="price"
                placeholder="Rp."
                className="input input-bordered w-full"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </label>
          </div>

          <div className="w-1/2 flex flex-col justify-between">
            {!selectedFile ? (
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <span>Upload File</span>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaFileUpload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500">JPG or PNG</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  name="product_image"
                  className="hidden"
                  onChange={handleChange}
                  required
                />
              </label>
            ) : (
              <div className="mt-4">
                <img
                  src={selectedFile}
                  alt="Selected"
                  className="w-full cursor-pointer"
                  onClick={() =>
                    document.getElementById("dropzone-file").click()
                  }
                />
                <input
                  id="dropzone-file"
                  type="file"
                  name="product_image"
                  className="hidden"
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6">Warehouse</h1>

        <div className="flex space-x-6">
          <div className="flex flex-col space-y-6 w-1/2">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Warehouse Name</span>
              </div>
              <input
                type="text"
                name="warehouseName"
                placeholder="Warehouse Name"
                className="input input-bordered w-full"
                value={formData.warehouseName}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Warehouse Address</span>
              </div>
              <input
                type="text"
                name="warehouseFullAddress"
                placeholder="Warehouse Address"
                className="input input-bordered w-full"
                value={formData.warehouseFullAddress}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Weight (in grams)</span>
              </div>
              <input
                type="number"
                name="weight"
                placeholder="Product weight"
                className="input input-bordered w-full"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="flex flex-col w-1/2">
            <label className="form-control">
              <div className="label">
                <span className="label-text">City</span>
              </div>
              <select
                name="warehouseCityId"
                className="select select-bordered w-full"
                value={formData.warehouseCityId}
                onChange={handleChange}
                required
              >
                <option disabled value="">
                  Choose City
                </option>
                {cities?.length > 0 ? (
                  cities.map((city) => (
                    <option value={city.id} key={city.id}>
                      {city.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading cities...</option>
                )}
              </select>
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-6 bg-orange-600">
          Update Product
        </button>
      </form>
    </div>
  );
}
