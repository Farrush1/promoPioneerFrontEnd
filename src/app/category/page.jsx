"use client";
import React, { useState, useEffect } from "react";
import CardCategoryList from "@/components/category/CardCategoryList";
import ReactPaginate from "react-paginate";
import Stack from "@mui/material/Stack";
import ReactSelect from "react-select";
import Pagination from "@mui/material/Pagination";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [cityId, setCityId] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = "http://localhost:5000/api/products?";
        if (selectedCategory) apiUrl += `categories=${selectedCategory}&`;
        if (minPrice) apiUrl += `minPrice=${minPrice}&`;
        if (maxPrice) apiUrl += `maxPrice=${maxPrice}&`;
        if (cityId) apiUrl += `cities=${cityId}&`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        setData(result.products);
        setFilteredData(result.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [selectedCategory, minPrice, maxPrice, cityId]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value - 1);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const result = await response.json();
        setCategories(result.category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cities");
        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }
        const result = await response.json();
        setCities(result.city);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const offset = currentPage * itemsPerPage;
    const currentItems = filteredData.slice(offset, offset + itemsPerPage);
    setData(currentItems);
  }, [currentPage, filteredData]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleCategorySelect = (selectedOption) => {
    setSelectedCategory(selectedOption ? selectedOption.value : "");
    setCurrentPage(0);
  };

  const handleMinPriceChange = (event) => {
    const input = event.target.value;
    if (!isNaN(input) || input === "") {
      setMinPrice(input);
    }
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleCityIdChange = (selectedOption) => {
    setCityId(selectedOption ? selectedOption.value : "");
  };

  return (
    <div className="container mx-auto mt-24">
      <section>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3 sm:col-span-12 bg-[#f36812] p-4 rounded-lg font-semibold text-white">
            Filter
            <div className="form-input mt-2 font-normal">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white text-sm">
                    Min Price
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="..."
                  className="input input-bordered w-full text-black"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                />
              </label>
            </div>
            <div className="form-input mt-2 font-normal">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white text-sm">
                    Max Price
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="..."
                  className="input input-bordered w-full text-black"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                />
              </label>
            </div>
            <div className="form-input mt-2 font-normal">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white text-sm">
                    Category
                  </span>
                </div>
                <ReactSelect
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                  onChange={handleCategorySelect}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      width: "100%",
                      borderRadius: "0.375rem",
                      borderColor: "#d2d6dc",
                      minHeight: "38px",
                    }),
                    menu: (styles) => ({
                      ...styles,
                      zIndex: "9999",
                    }),
                    option: (
                      styles,
                      { isDisabled, isFocused, isSelected }
                    ) => ({
                      ...styles,
                      backgroundColor: isSelected
                        ? "#f36"
                        : isFocused
                        ? "#f0f0f0"
                        : null,
                      color: isSelected ? "white" : "black",
                      cursor: isDisabled ? "not-allowed" : "default",
                    }),
                  }}
                />
              </label>
            </div>
            <div className="form-input mt-2 font-normal">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-white text-sm">City</span>
                </div>
                {Array.isArray(cities) && cities.length > 0 && (
                  <ReactSelect
                    options={cities.map((city) => ({
                      value: city.id,
                      label: city.name,
                    }))}
                    onChange={handleCityIdChange}
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        width: "100%",
                        borderRadius: "0.375rem",
                        borderColor: "#d2d6dc",
                        minHeight: "38px",
                      }),
                      menu: (styles) => ({
                        ...styles,
                        zIndex: "9999",
                      }),
                      option: (
                        styles,
                        { isDisabled, isFocused, isSelected }
                      ) => ({
                        ...styles,
                        backgroundColor: isSelected
                          ? "#f36"
                          : isFocused
                          ? "#f0f0f0"
                          : null,
                        color: isSelected ? "white" : "black",
                        cursor: isDisabled ? "not-allowed" : "default",
                      }),
                    }}
                  />
                )}
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
              <CardCategoryList data={data} />
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center mt-5">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            shape="rounded"
            variant="outlined"
            page={currentPage + 1}
            onChange={handlePageChange}
          />
        </Stack>
      </section>
      <section>Footer</section>
    </div>
  );
};

export default Category;
