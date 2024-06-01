/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { IoLocation } from 'react-icons/io5';
import { BiLoaderCircle } from 'react-icons/bi';
import {
  fecthChangeAddress,
  fetchBio,
  fetchCheckouts,
  fetchCities,
  fetchPostPayment,
} from '@/libs/fetch/checkouts';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function Checkout({ params: { id } }) {
  const [checkoutList, setCheckoutList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [bioList, setBioList] = useState({});
  const [voucher, setVoucher] = useState('');
  const [selectedCityName, setSelectedCityName] = useState('');
  const [disableOrder, setDisableOrder] = useState('');
  const router = useRouter();
  const [arrDiscount, setArrDiscount] = useState([]);

  // fetching get promo
  const loadPromo = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/promo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();
      setArrDiscount(data.promo);
    } catch (error) {
      console.log();
    }
  };

  // fetching get cities
  const loadCities = async () => {
    const citiesData = await fetchCities();
    if (citiesData) {
      setCitiesList(citiesData);
    }
  };

  // fetching get bio
  const loadBio = async () => {
    const bioData = await fetchBio();
    if (bioData) {
      setBioList(bioData);
    }
  };

  // fetching post apply promo
  const applyPromo = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/checkouts/promo/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ codeVoucher: voucher }),
        }
      );
      if (res.status === 404) {
        return toast.error('Promo not found!');
      }

      toast.success(`${voucher} voucher promo successfully applied!`, {
        duration: 5000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    // fetch get checkout by id
    const loadCheckouts = async () => {
      const checkoutsData = await fetchCheckouts(id);
      if (checkoutsData) {
        setCheckoutList(checkoutsData);
        setLoading(false);
      }
    };
    loadCheckouts(); // render checkout list
    loadCities(); // render cities list
    loadBio(); // render bio list
    loadPromo(); // render promo list
  }, [id]);

  useEffect(() => {
    // render city yang terpilih di fitur edit address
    if (selectedCity) {
      // mencari id city yang cocok dengan id city yang dipilih untuk diambil name nya
      const cityName = citiesList.filter((city) => city.id == selectedCity)[0]
        ?.name;
      setSelectedCityName(cityName);
    }
  }, [citiesList, selectedCity]);

  // fungsi fetch put change address
  const editBioAddress = async () => {
    try {
      // mengubah address ke address baru
      const newAddress = {
        fullAddress: `${fullAddress}, ${selectedCityName}`,
        cityId: +selectedCity,
      };
      fecthChangeAddress(newAddress);
    } catch (error) {
      console.log(error.message);
    }
  };

  // mengambil value city yang dipilih
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // mengambil value address
  const handleAddressChange = (e) => {
    setFullAddress(e.target.value);
  };

  // fungsi mentrigger editBioAddress dan memperbarui state bioList
  const handleSubmitAddress = (e) => {
    e.preventDefault();
    setBioList((prevBioList) => ({
      ...prevBioList,
      city_id: selectedCity,
      full_address: `${fullAddress}, ${selectedCityName}`,
    }));

    editBioAddress();
    document.getElementById('my_modal_1').close();
  };

  const openEditAddress = () => {
    document.getElementById('my_modal_1').showModal();
  };

  // fungsi fetch post payment dan pindah ke route payment by id
  const handleOrder = async () => {
    try {
      setDisableOrder(true);
      const data = await fetchPostPayment(id);
      console.log(data);
      if (data && data.payment?.id) {
        const idURI = encodeURIComponent(JSON.stringify(data.payment.id));
        router.push(`/payment/${idURI}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // untuk menambahkan discount promo
  const handleApplyVoucher = async () => {
    applyPromo();
  };

  // untuk menambahkan discount percent
  const totalDiscountPercent = checkoutList.CheckoutDiscount
    ? checkoutList.CheckoutDiscount.reduce(
        (total, item) => total + item.discount_percent,
        0
      )
    : 0;

  // component saat loading
  if (loading)
    return (
      <div className="relative h-screen w-screen ">
        <BiLoaderCircle className="absolute top-1/2 left-1/2 text-5xl animate-spin-slow duration-1000  text-orange-600" />
      </div>
    );

  return (
    <main className="xl:max-w-6xl mx-auto px-4 pt-24 xl:px-0">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ marginTop: "65px" }}
      />
      {/* Modal Edit Address */}
      <dialog
        id="my_modal_1"
        className="modal">
        <div className="modal-box">
          <form>
            <div className="flex items-center justify-between mb-4 text-sm">
              <p>City</p>
              <div className="dropdown dropdown-bottom">
                <select
                  id="city"
                  name="city"
                  onChange={handleCityChange}
                  className="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:ring-1 sm:text-sm">
                  {citiesList
                    .sort((a, b) => a.name.localeCompare(b.name)) // Mengurutkan berdasarkan nama kota
                    .map(city => (
                      <option
                        key={city.id}
                        value={city.id}>
                        {city.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <input
              type="text"
              placeholder="Full Address"
              onChange={handleAddressChange}
              className="w-full text-sm px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            />
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={handleSubmitAddress}
                type="submit"
                className="btn text-sm w-full hover:opacity-70 shadow-md duration-300 bg-gradient-to-b from-orange-700 to-orange-600 text-white px-3 py-1 min-h-0 h-10 rounded-md">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <h1 className="lg:text-3xl text-2xl pb-8 font-bold">Checkout</h1>
      <div className="flex flex-row gap-2 p-3 bg-gradient-to-l from-orange-600 to-orange-500 text-white rounded-lg shadow-lg mb-6 items-start">
        <IoLocation className="text-xl" />
        <div className="text-sm flex-1">
          <p className="pb-1 font-semibold">Delivery Address</p>
          <p>{bioList.name}</p>
          {bioList && <p>{bioList.full_address}</p>}
        </div>
        <button
          onClick={openEditAddress}
          className="text-sm hover:font-bold duration-300">
          Edit
        </button>
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-3 mb-36 md:hidden">
        {checkoutList &&
          checkoutList.checkout.length > 0 &&
          checkoutList.checkout.map(listing => (
            // List product checkout
            <div
              key={listing.id}
              className="p-3 bg-white rounded-md shadow-md">
              {listing.checkout_item.map(item => (
                <div key={item.id}>
                  <div className="flex text-sm gap-3 mb-2">
                    <img
                      src={item.product.product_image}
                      width={96}
                      height={96}
                      alt={item.product.name}
                    />
                    <div className="flex flex-col gap-1.5 flex-1 justify-between">
                      <h1 className="font-semibold line-clamp-2">
                        {item.product.name}
                      </h1>
                      <div className="flex flex-col gap-1">
                        <p className="text-orange-700 font-semibold">
                          <span>Rp </span>
                          {item.product.price.toLocaleString("id-ID", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </p>
                        <div className="flex gap-2">
                          <p>x{item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-1 flex flex-row justify-between items-center text-xs bg-green-100 rounded-md border-dashed border-2 border-green-200">
                    <h1 className="font-semibold">Shiping Service</h1>
                    <div className="flex items-center min-w-36 gap-2">
                      <p className="font-semibold w-full">
                        Rp{" "}
                        {listing.shippingCheckout.price.toLocaleString(
                          "id-ID",
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }
                        )}
                      </p>
                      <p className="px-3 py-1 uppercase border font-semibold border-green-300 rounded-md">
                        {listing.shippingCheckout.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between text-sm font-bold pt-2 text-orange-700">
                    <p>Subtotal Product</p>
                    {item.total_specific_price !== item.original_price ? (
                      <div className="flex gap-2 items-end">
                        <p className="text-xs line-through">
                          Rp{" "}
                          {item.original_price.toLocaleString("id-ID", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </p>
                        <p>
                          Rp{" "}
                          {item.total_specific_price.toLocaleString("id-ID", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                    ) : (
                      <p>
                        Rp{" "}
                        {item.total_specific_price.toLocaleString("id-ID", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <div className="flex items-center bg-gradient-to-l from-orange-600 to-orange-500 px-4 text-white font-semibold py-3 rounded-md shadow-md">
          <h1 className="w-[40%]">Product</h1>
          <h1 className="w-1/5 text-center">Unit Price</h1>
          <h1 className="w-1/5 text-center">Quantity</h1>
          <h1 className="w-1/5 text-center">Subtotal Product</h1>
        </div>
        <div className="flex items-start mt-3 gap-3 flex-col mb-36">
          {checkoutList &&
            checkoutList.checkout.length > 0 &&
            checkoutList.checkout.map(listing => (
              // List product checkout
              <div
                key={listing.id}
                className="w-full bg-white p-2 rounded-md shadow-md border-b border-slate-400">
                {listing.checkout_item.map(item => (
                  <div
                    key={item.id}
                    className="flex text-black w-full">
                    <div className="flex w-[40%] gap-4">
                      <img
                        src={item.product.product_image}
                        alt={item.product.name}
                        className="w-[72px] h-[72px] object-cover"
                      />
                      <p className="font-semibold line-clamp-3 overflow-hidden">
                        {item.product.name}
                      </p>
                    </div>
                    <p className="w-1/5 text-center">
                      Rp{" "}
                      {item.product.price.toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                    <p className="w-1/5 text-center">{item.quantity}</p>
                    {item.total_specific_price !== item.original_price ? (
                      <div className="flex flex-col gap-2 flex-1 items-center w-1/5 text-center text-orange-700 ">
                        <p className="text-xs line-through">
                          Rp{" "}
                          {item.original_price.toLocaleString("id-ID", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </p>
                        <p className="font-extrabold">
                          Rp{" "}
                          {item.total_specific_price.toLocaleString("id-ID", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                    ) : (
                      <p className="w-1/5 text-center text-orange-700 font-semibold">
                        Rp{" "}
                        {item.total_specific_price.toLocaleString("id-ID", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    )}
                  </div>
                ))}
                <div className="p-1 flex flex-row justify-between items-center text-sm mt-2 bg-green-100 rounded-md border-dashed border-2 border-green-200">
                  <h1 className="font-semibold">Shiping Service</h1>
                  <div className="flex min-w-44 items-center">
                    <p className="font-semibold w-full">
                      Rp{" "}
                      {listing.shippingCheckout.price.toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                    <p className="px-3 uppercase text-xs text-center py-1 border font-semibold border-green-300 rounded-md">
                      {listing.shippingCheckout.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Voucher Code and Total price */}
      <div className="shadow-t w-full right-0 px-4 py-3 mt-4 rounded-md sticky bg-white bottom-0">
        <div className="xl:max-w-6xl flex mb-3 items-center justify-between gap-6 !text-sm md:!text-base w-full mx-auto">
          <div className="flex gap-4 items-center w-full max-w-[28rem]">
            <p className="font-bold w-full max-w-24 md:max-w-32">
              Voucher Code
            </p>
            <input
              name="codeVoucher"
              value={voucher}
              onChange={e => setVoucher(e.target.value)}
              type="text"
              className="border-2 border-green-200 border-dashed px-2 rounded-md py-1 text-sm w-full max-w-96 focus:outline-green-400"
            />
            <div className="dropdown dropdown-top">
              <div
                tabIndex={0}
                role="button"
                className="btn min-w-16 min-h-0 h-8 bg-green-100 text-black">
                Code
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content mb-1 z-[1] menu p-2 shadow bg-base-100 rounded-box w-36">
                {arrDiscount.length <= 1 ? (
                  <li>
                    <p className="hover:bg-white !cursor-text active:!bg-white active:!text-black font-semibold px-1">
                      Not found
                    </p>
                  </li>
                ) : (
                  arrDiscount
                    .filter(promo => promo.name !== "SPECIAL_USER")
                    .map((discount, index) => (
                      <li key={index}>
                        <p className="hover:bg-white !cursor-text active:!bg-white active:!text-black font-semibold px-1">
                          {discount.name}
                        </p>
                      </li>
                    ))
                )}
              </ul>
            </div>
          </div>
          <button
            onClick={handleApplyVoucher}
            className="text-white text-center py-2 sm:px-4 min-w-16 rounded-md shadow-md hover:opacity-80 duration-300 font-bold bg-gradient-to-l from-orange-600 to-orange-500">
            Apply
          </button>
        </div>
        <div className="xl:max-w-6xl flex items-center justify-between gap-6 !text-sm md:!text-base w-full mx-auto">
          <p className="font-bold">Total Price</p>
          <div className="flex gap-3 sm:gap-6 items-center">
            <p className="font-extrabold text-orange-700">
              {checkoutList.CheckoutDiscount.length > 0
                ? `${totalDiscountPercent}% OFF`
                : null}
            </p>
            <p className="font-extrabold text-orange-700">
              Rp{" "}
              {checkoutList.total_price
                // checkoutList.CheckoutDiscount[0].discount_price
                .toLocaleString("id-ID", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
            </p>
            <button
              onClick={handleOrder}
              disabled={disableOrder}
              className="text-white text-center sm:px-4 py-2 flex-1  rounded-md min-w-16 shadow-md hover:opacity-80 duration-300 font-bold bg-gradient-to-l from-orange-600 to-orange-500 disabled:cursor-progress disabled:opacity-50">
              Order
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
