'use client';

import { useEffect, useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    price: '',
    description: '',
    warehouseName: '',
    warehouseFullAddress: '',
    warehouseCityId: '',
    product_image: null,
    weight: '',
    stock: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
    fetchCities();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCategories(data.category || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cities`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCities(data.city || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const selectedFile = files[0];
      setFormData({ ...formData, [name]: selectedFile });
      setSelectedFile(URL.createObjectURL(selectedFile));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleStockChange = (delta) => {
    setFormData((prevData) => ({
      ...prevData,
      stock: Math.max(0, prevData.stock + delta),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products`, {
        method: 'POST',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        toast.success('Successfully added product');
        setFormData({
          name: '',
          categoryId: '',
          price: '',
          description: '',
          warehouseName: '',
          warehouseFullAddress: '',
          warehouseCityId: '',
          product_image: null,
          weight: '',
          stock: 0,
        });
        setSelectedFile(null);
        router.push(`/dashboard/product`);
      } else {
        const errorData = await response.json();
        console.error('Failed to add product:', errorData);
        alert(`Failed to add product: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the product');
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
                name="categoryId"
                className="select select-bordered w-full"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option disabled value="">
                  Choose Category
                </option>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
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

            <div className="flex items-center space-x-2">
              <label className="form-control flex-1">
                <div className="label">
                  <span className="label-text">Stock</span>
                </div>
              </label>
              <button
                type="button"
                className="btn btn-secondary bg-slate-500"
                onClick={() => handleStockChange(-1)}
              >
                -
              </button>
              <input
                type="number"
                name="stock"
                className="input input-bordered w-full"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: Number(e.target.value) })
                }
                required
              />
              <button
                type="button"
                className="btn btn-secondary bg-slate-500"
                onClick={() => handleStockChange(1)}
              >
                +
              </button>
            </div>

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
                <img src={selectedFile} alt="Selected" className="w-full" />
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
                  Warehouse City
                </option>
                {cities.length > 0 ? (
                  cities.map((city) => (
                    <option key={city.id} value={city.id}>
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
          Add Product
        </button>
      </form>
    </div>
  );
}
