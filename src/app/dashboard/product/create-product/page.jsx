"use client"

import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    price: '',
    description: '',
    warehouseName: '',
    location: '',
    city: '',
    file: null,
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if(files) {
      setFormData ({ ...formData, [name]: files[0] });
      const selectedFile = files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedFile(imageUrl);
    } else {
      setFormData ({ ...formData, [name]: value });
    }
  };
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: data,
        credentials: 'include'
      });

      if (response.ok) {
        alert('Product added successfully!');
        setFormData({
          productName: '',
          category: '',
          price: '',
          description: '',
          warehouseName: '',
          location: '',
          city: '',
          file: null,
        });
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex space-x-6">
          <div className="flex flex-col space-y-6 w-1/2">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Product Name</span>
              </div>
              <input
                type="text"
                name="productName"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={formData.productName}
                onChange={handleChange}
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select
                name="category"
                className="select select-bordered w-full"
                value={formData.category}
                onChange={handleChange}
              >
                <option disabled selected>
                  Choose Category
                </option>
                <option>Category 1</option>
                <option>Category 2</option>
                <option>Category 3</option>
                <option>Category 4</option>
                <option>Category 5</option>
              </select>
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                type="text"
                name="price"
                placeholder="Rp."
                className="input input-bordered w-full"
                value={formData.price}
                onChange={handleChange}
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
              ></textarea>
            </label>
          </div>

          <div className="w-1/2 flex flex-col justify-between">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <span>Upload File</span>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaFileUpload className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                name="file"
                className="hidden"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

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
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Location</span>
              </div>
              <input
                type="text"
                name="location"
                placeholder="Warehouse Location"
                className="input input-bordered w-full"
                value={formData.location}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="flex flex-col w-1/2">
            <label className="form-control">
              <div className="label">
                <span className="label-text">City</span>
              </div>
              <select
                name="city"
                className="select select-bordered w-full"
                value={formData.city}
                onChange={handleChange}
              >
                <option disabled selected>
                  Warehouse City
                </option>
                <option>City 1</option>
                <option>City 2</option>
                <option>City 3</option>
                <option>City 4</option>
                <option>City 5</option>
              </select>
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-6 bg-orange-600">Add Product</button>
      </form>
    </div>
  );
}
