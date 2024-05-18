"use client";
import CardCategoryList from "@/components/category/CardCategoryList";
import CategoryPagination from "@/components/category/CategoryPagination";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Category = () => {
  const data = [
    {
      name: "Mainan Badut",
      imageUrl:
        "https://images.unsplash.com/photo-1622403718261-bd0e7dd01216?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 10000,
      currency: "Rp",
    },
    {
      name: "Mainan Badut",
      imageUrl:
        "https://images.unsplash.com/photo-1622403718261-bd0e7dd01216?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 10000,
      currency: "Rp",
    },
    {
      name: "Mainan Badut",
      imageUrl:
        "https://images.unsplash.com/photo-1622403718261-bd0e7dd01216?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 10000,
      currency: "Rp",
    },
    {
      name: "Mainan Badut",
      imageUrl:
        "https://images.unsplash.com/photo-1622403718261-bd0e7dd01216?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 10000,
      currency: "Rp",
    },
    {
      name: "Mainan Badut",
      imageUrl:
        "https://images.unsplash.com/photo-1622403718261-bd0e7dd01216?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 10000,
      currency: "Rp",
    },
    {
      name: "Mainan Badut",
      imageUrl:
        "https://images.unsplash.com/photo-1622403718261-bd0e7dd01216?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 10000,
      currency: "Rp",
    },
    {
      name: "Mainan Badut",
      imageUrl:
        "https://images.unsplash.com/photo-1622403718261-bd0e7dd01216?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 10000,
      currency: "Rp",
    },
    {
      name: "Mainan Badut",
      imageUrl:
        "https://images.unsplash.com/photo-1622403718261-bd0e7dd01216?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 10000,
      currency: "Rp",
    },
    {
      name: "Mainan Badut",
      imageUrl:
        "https://images.unsplash.com/photo-1622403718261-bd0e7dd01216?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 10000,
      currency: "Rp",
    },
    {
      name: "Mainan Badut",
      imageUrl:
        "https://images.unsplash.com/photo-1622403718261-bd0e7dd01216?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 10000,
      currency: "Rp",
    },
    {
      name: "Mainan Badut",
      imageUrl:
        "https://images.unsplash.com/photo-1622403718261-bd0e7dd01216?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 10000,
      currency: "Rp",
    },
    {
      name: "Mainan Badut",
      imageUrl:
        "https://images.unsplash.com/photo-1622403718261-bd0e7dd01216?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 10000,
      currency: "Rp",
    },
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber - 1);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = data.slice(offset, offset + itemsPerPage);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="font-semibold mb-5">Searching Product Laptop</h1>
      <section>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3 sm:col-span-12  bg-[#f36812] p-4 rounded-lg font-semibold text-white">
          Filter
          <div className="form-input mt-2 font-normal">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-white text-sm">Min Price</span>
              </div>
              <input
                type="text"
                placeholder="..."
                className="input input-bordered w-full text-black"
              />
            </label>
          </div>
          <div className="form-input mt-2 font-normal">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-white text-sm">Max Price</span>
              </div>
              <input
                type="text"
                placeholder="..."
                className="input input-bordered w-full text-black"
              />
            </label>
          </div>
          <div className="form-input mt-2 font-normal">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-white text-sm">Category</span>
              </div>
              <input
                type="text"
                placeholder="..."
                className="input input-bordered w-full text-black"
              />
            </label>
          </div>
          <div className="form-input mt-2 font-normal">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-white text-sm">City</span>
              </div>
              <input
                type="text"
                placeholder="..."
                className="input input-bordered w-full text-black"
              />
            </label>
          </div>
          <div className="flex justify-center">
            <div className="w-full">
              <button className="btn w-full mt-5">Filter</button>
              <button className="btn w-full mt-2">Reset</button>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9 sm:col-span-12 bg-[#f4f4f4] shadow-xl border rounded-lg flex justify-center p-4 overflow-x-auto">
          <div className="px-5">
            <CardCategoryList data={currentItems} />
          </div>
        </div>
      </div>
      <div className="join flex justify-center mt-4">
        <button
          className={`join-item btn bg-white shadow-lg ${
            currentPage === 0 ? "btn-disabled" : ""
          }`}
          onClick={() => handlePageClick(currentPage)}
          disabled={currentPage === 0}
        >
          «
        </button>

        {[...Array(pageCount)].map((_, index) => (
          <button
            key={index + 1}
            className={`join-item btn ${
              currentPage === index
                ? "btn-active bg-orange-600 text-white hover:bg-orange-700 shadow-lg"
                : ""
            }`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`join-item bg-white shadow-lg btn  ${
            currentPage === pageCount - 1 ? "btn-disabled" : ""
          }`}
          onClick={() => handlePageClick(currentPage + 2)}
          disabled={currentPage === pageCount - 1}
        >
          »
        </button>
      </div>
      </section>
      <section>
        Footer
      </section>
    </div>
  );
};

export default Category;
