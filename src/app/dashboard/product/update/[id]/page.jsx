'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UpdateProduct({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    price: '',
    description: '',
    warehouseName: '',
    warehouseFullAddress: '',
    warehouseCityId: '',
    weight: '',
    stock: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${params.id}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!data.product) {
          throw new Error('Product data is missing');
        }
        setProduct(data.product);
        setFormData((prevData) => ({
          ...prevData,
          name: data.product.name || '',
          categoryId: data.product.categoryId || '',
          price: data.product.price || '',
          description: data.product.description || '',
          warehouseName: data.product.warehouseName || '',
          warehouseFullAddress: data.product.warehouseFullAddress || '',
          warehouseCityId: data.product.warehouseCityId || '',
          weight: data.product.weight || '',
          stock: data.product.stock || '',
        }));
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [params.id]);

  useEffect(() => {
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

    fetchCategories();
    fetchCities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${params.id}`,
        {
          method: 'PUT',
          body: data,
          credentials: 'include',
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      router.push('/dashboard/product');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Category:
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Warehouse Name:
          <input
            type="text"
            name="warehouseName"
            value={formData.warehouseName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Warehouse Full Address:
          <input
            type="text"
            name="warehouseFullAddress"
            value={formData.warehouseFullAddress}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Warehouse City:
          <select
            name="warehouseCityId"
            value={formData.warehouseCityId}
            onChange={handleInputChange}
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Weight:
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
