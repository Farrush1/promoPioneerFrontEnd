'use client';
import React, { useEffect, useState } from 'react';
import CardProduct from '@/components/CardProduct';
import Carousel from '@/components/Carousel';

const Product = () => {
  const [productListing, setProductListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductListing = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        console.log('Data fetched from API:', data);
        const products = data.products || [];
        setProductListing(products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductListing();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="xl:max-w-6xl mx-auto px-4 xl:px-0 mt-20">
      <Carousel />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {productListing.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
      <h1>Home</h1>
    </main>
  );
};

export default Product;
