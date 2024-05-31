/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [promoTypes, setPromoTypes] = useState([]);
  const [selectedPromo, setSelectedPromo] = useState('');
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [itemsPromo, setItemsPromo] = useState({});
  const [shouldFetchProducts, setShouldFetchProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const router = useRouter();
  const productsPerPage = 10;

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, shouldFetchProducts]);

  useEffect(() => {
    fetchPromoTypes();
  }, []);

  const fetchProducts = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products?limit=10&page=${page}`
      );
      const data = await response.json();
      console.log(data.products)
      setProducts(data.products);
      setTotalProducts(data.totalProducts);

      const initialItemsPromo = {};
      data.products.forEach((product) => {
        initialItemsPromo[product.id] = false;
      });
      setItemsPromo(initialItemsPromo);

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchPromoTypes = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/promo-types/promo/2"
      );
      const data = await response.json();
      console.log(data.promoType.promo, "ini promotrye");
      setPromoTypes(data.promoType.promo);
    } catch (error) {
      console.error('Error fetching promo types:', error);
    }
  };

  const handleAddPromo = () => {
     const selectedItems = Object.entries(itemsPromo).filter(
       ([key, value]) => value === true
     );
     console.log("Selected Items:", selectedItems);
     setSelectedProduct(selectedItems)

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPromo("");
  };

  const handleEditProduct = (productId) => {
    router.push(`/dashboard/product/update/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
        credentials: 'include'
      });
      toast.success('Successfully deleted product');
      fetchProducts(currentPage);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleViewDetails = (productId) => {
    router.push(`/dashboard/product/${productId}`);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalProducts / productsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSavePromo = async () => {
    if (!selectedPromo) {
      alert('Please select a promo type.');
      return;
    }

    console.log(selectedPromo, "promo id");
    console.log(selectedProduct, "product id");

    for(let product of selectedProduct){
      await fetchAddPromoProduct(parseInt(product[0]), parseInt(selectedPromo))
    }
    toast.success("Successfully add promo!");
    setShouldFetchProducts((prev) => !prev);
    setSelectedPromo("");
  };

  const fetchAddPromoProduct = async (productId, promoId) =>{
    try {
      const response = await fetch(
        `http://localhost:5000/api/promo/products/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ promoId: promoId }),
        }
      );
      const data = await response.json();
      console.log('Promotion Created:', data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating promotion:', error);
    }
  }

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const checkBoxChange = (id) => {
    setItemsPromo((prevItemsPromo) => ({
      ...prevItemsPromo,
      [id]: !prevItemsPromo[id],
    }));
    
  };

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={false} />
      {console.log(itemsPromo)}
      <div className="flex justify-between mb-12 items-center">
        <h1 className="text-2xl font-bold">Product List</h1>
        <div className="flex justify-end">
          <button className="bg-gradient-to-l from-orange-600 to-orange-500 text-white font-semibold rounded-md shadow-md text-sm px-3 py-3 min-h-0 mx-1 hover:opacity-70 duration-300">
            <Link href="/dashboard/product/create">+ Product</Link>
          </button>
          <button
            className="bg-gradient-to-l from-orange-600 to-orange-500 text-white font-semibold rounded-md shadow-md text-sm px-3 py-3 min-h-0 mx-1 hover:opacity-70 duration-300"
            onClick={handleAddPromo}
          >
            + Promo Product
          </button>
        </div>
      </div>

      <table className="table">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th>
              
            </th>
            <th>Name</th>
            <th>Price</th>
            <th className="text-center">Stock</th>
            <th>Warehouse</th>
            <th className="text-center">Promo</th>
            <th className="text-center">Action</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <th>
                  <label>
                    <input
                      onChange={() => checkBoxChange(product.id)}
                      type="checkbox"
                      className="checkbox"
                      checked={itemsPromo[product.id]}
                    />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={product.product_image} alt={product.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.name}</div>
                      <div className="text-sm opacity-50">
                        {product.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product.price}</td>
                <td className="text-center">{product.stock}</td>
                <td>
                  {product.warehouse
                    ? `${product.warehouse.name}, ${product.warehouse.location}`
                    : "No Warehouse"}
                </td>
                <td>
                  <p
                    className={
                      product.PromoProduct.length === 0
                        ? "bg-red-200 py-1 px-3 text-center rounded-full"
                        : "bg-green-200 py-1 px-3 text-center rounded-full"
                    }
                  >
                    {product.PromoProduct.length === 0 ? "No" : "Yes"}
                  </p>
                </td>
                <td className="border-t py-2 px-4 h-full">
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-gradient-to-l from-blue-600 to-blue-500 text-white px-3 py-1 shadow-md rounded-md hover:opacity-70 duration-300"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-gradient-to-l from-red-600 to-red-500 text-white px-3 py-1 shadow-md rounded-md hover:opacity-70 duration-300"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    className="bg-gradient-to-l from-green-600 to-green-500 text-white px-3 py-1 shadow-md rounded-md hover:opacity-70 duration-300"
                    onClick={() => handleViewDetails(product.id)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center"></td>
              <td colSpan="7" className="text-center">
                {/* punya mas farras */}
                {/* <td colSpan="7" className="text-center"> */}
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add Promo Product</h2>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Choose Promo</span>
              </div>
              <select
                className="select select-bordered w-full"
                onChange={(e) => setSelectedPromo(e.target.value)}
                value={selectedPromo}
              >
                <option disabled value="">
                  Choose Promo
                </option>
                {promoTypes.length > 0 ? (
                  promoTypes.map((promoItem) => (
                    <option key={promoItem.id} value={promoItem.id}>
                      {promoItem.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading promo...</option>
                )}
              </select>
            </label>
            <div className="flex justify-end mt-4 gap-3">
              <button
                className="bg-gradient-to-l from-red-600 to-red-500 text-white px-3 py-1 shadow-md rounded-md hover:opacity-70 duration-300"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-gradient-to-l from-green-600 to-green-500 text-white px-3 py-1 shadow-md rounded-md hover:opacity-70 duration-300"
                onClick={handleSavePromo}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
