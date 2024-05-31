"use client";
import React, { useState, useEffect } from "react";
import CardCategoryList from "@/components/category/CardCategoryList";
import ReactPaginate from "react-paginate";
import Stack from "@mui/material/Stack";
import ReactSelect from "react-select";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "next/navigation";

export default function FilterPage({ categoryParams }) {
  const searchParams = useSearchParams();
  const newParams = searchParams.get("keyword");
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
        if (newParams) apiUrl += `search=${newParams}`;

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
  }, [selectedCategory, minPrice, maxPrice, cityId, newParams]);

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

  useEffect(() => {
    if (categoryParams && categories.length > 0) {
      const decodedCategoryName = decodeURIComponent(categoryParams);
      const matchedCategory = categories.find(
        (category) => category.name === decodedCategoryName
      );
      if (matchedCategory) {
        setSelectedCategory(matchedCategory.id);
      }
    }
  }, [categoryParams, categories]);

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

  const resetFilter = () => {
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setCityId("");
    setData([]);
    setFilteredData([]);
  };

  return (
    <main className="xl:max-w-6xl min-h-screen mx-auto px-4 pt-24 xl:px-0 mb-4">
      <div className="flex w-full flex-col sm:flex-row gap-8 relative">
        {/* <div className="grid grid-cols-12 gap-4"> */}
        {/* <div className="col-span-12 md:col-span-3 sm:col-span-12 bg-[#f36812] p-4 rounded-lg font-semibold text-white"> */}
        <div className="bg-gradient-to-l text-sm md:text-base from-orange-600 to-orange-500 flex flex-col justify-between sm:min-h-[83vh] p-4 rounded-md shadow-md md:h-fit md:sticky md:top-24">
          <h1 className="text-2xl font-bold text-white pb-2 border-b border-orange-400">
            Filter
          </h1>
          <div className="flex-1 items-start">
            <div className="form-input mt-2 font-normal">
              <label className="form-control w-full">
                <span className="text-white text-sm mb-2">Min Price</span>
                <input
                  type="number"
                  placeholder="..."
                  className="px-3 py-1.5 focus:outline-orange-600 rounded-md w-full text-black"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                />
              </label>
            </div>
            <div className="form-input mt-2 font-normal">
              <label className="form-control w-full">
                <span className="text-white text-sm mb-2">Max Price</span>
                <input
                  type="number"
                  placeholder="..."
                  className="px-3 py-1.5 focus:outline-orange-600 rounded-md w-full text-black"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                />
              </label>
            </div>
            <div className="form-input mt-2 font-normal">
              <label className="form-control w-full">
                <span className="text-white text-sm mb-2">Category</span>
                <ReactSelect
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                  value={
                    selectedCategory
                      ? {
                          value: selectedCategory,
                          label: categories.find(
                            (category) => category.id === selectedCategory
                          )?.name,
                        }
                      : null
                  }
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
                <span className="text-white text-sm mb-2">City</span>
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
          </div>
          <div className="flex justify-center">
            <div className="w-full">
              <button className="py-1.5 bg-white text-slate-700 font-semibold rounded-md hover:bg-orange-200 duration-300 w-full mt-5">
                Filter
              </button>
              <div className="flex justify-center">
                <div className="w-full">
                 
                  <button
                    className="py-1.5 bg-white text-slate-700 font-semibold rounded-md hover:bg-orange-200 duration-300 w-full mt-2"
                    onClick={resetFilter}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* <div className="col-span-12 md:col-span-9 sm:col-span-12 flex justify-center"> */}
        <div>
          {categoryParams && (
            <div className="my-3">
              Search Product with category {decodeURIComponent(categoryParams)}
            </div>
          )}
          {newParams && (
            <div className="my-3">Search Product with keyword {newParams}</div>
          )}
          <CardCategoryList data={data} />
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
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
      {/* <section>Footer</section> */}
    </main>
  );
}
