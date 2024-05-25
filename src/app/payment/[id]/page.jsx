/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { fetchBio } from "@/libs/fetch/checkouts";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";

export default function PaymentPage({ params: { id } }) {
  const [paymentList, setPaymentList] = useState({});
  const [shippingServiceList, setShippingServiceList] = useState([]);
  const [bioList, setBioList] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchPayment = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/payments/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        setPaymentList(data.payment);
      } catch (error) {
        console.log(error.message);
      }
    };

    const loadBio = async () => {
      const bioData = await fetchBio();
      if (bioData) {
        setBioList(bioData);
      }
    };

    loadBio();
    fetchPayment().then(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const fetchUniqueService = async () => {
      if (paymentList.checkout_colection) {
        const uniqueService = await getUniqueShippingServices();
        setShippingServiceList(uniqueService.join(", "));
      }
    };

    fetchUniqueService();
  }, [paymentList]);

  const handleImageUpload = async e => {
    const file = e.target.files[0];
    const imageData = new FormData();
    imageData.append("payment_proof", file);
    console.log(imageData);
    try {
      const res = await fetch(
        `http://localhost:5000/api/payments/proof/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          credentials: "include",
          body: imageData,
        }
      );
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setUploadMessage("Please select a payment proof image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("payment_proof", selectedFile);

    async function uploadPaymentProof() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/payments/proof/7",
          {
            method: "PUT",
            headers: {
              Cookie:
                "accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IlVTRVIiLCJpYXQiOjE3MTY1NDcwNjIsImV4cCI6MTcxNjYzMzQ2Mn0.SGyKg5GPeIMwHIlCwVAFNRX-uCXctDWzdtQ4O1e-iSw",
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Payment proof upload failed");
        }

        setUploadMessage("Payment proof uploaded successfully!");
        console.log("Upload response:", response); // Optional for debugging
      } catch (error) {
        console.error("Upload error:", error);
        setUploadMessage("An error occurred during upload. Please try again.");
      }
    }

    uploadPaymentProof(); //
  };

  const getUniqueShippingServices = async () => {
    const checkouts = await paymentList.checkout_colection?.checkout;
    if (!checkouts) return;

    const uniqueServices = new Set();
    checkouts.forEach(checkout => {
      if (checkout.shippingCheckout && checkout.shippingCheckout.service) {
        uniqueServices.add(checkout.shippingCheckout.service);
      }
    });

    return Array.from(uniqueServices);
  };

  if (loading)
    return (
      <div className="relative h-screen w-screen ">
        <BiLoaderCircle className="absolute top-1/2 left-1/2 text-5xl animate-spin-slow duration-1000  text-orange-600" />
      </div>
    );

  return (
    <main className="xl:max-w-6xl mx-auto px-4 pt-24 xl:px-0">
      <h1 className="lg:text-3xl font-bold pb-8 text-2xl">Payment</h1>
      <div className="w-full">
        <div className="bg-orange-600 text-white font-semibold text-lg mx-auto text-center py-3 rounded-md shadow-md">
          <h1>Transfer Bank BCA</h1>
          <p>607882818 a.n Promo Pioneer</p>
        </div>

        {/* Mobile */}
        <div className="my-4 px-4 border border-slate-200 rounded-md shadow-md md:hidden">
          {paymentList?.checkout_colection?.checkout &&
            paymentList.checkout_colection.checkout.map(listing => (
              // List product checkout
              <div
                key={listing.id}
                className="py-4 border-b border-slate-200">
                {listing.checkout_item.map(item => (
                  <div
                    key={item.id}
                    className="flex text-sm gap-3 mb-2">
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
                ))}
                <div className="flex flex-row justify-between text-sm font-bold pt-2 text-orange-700">
                  <p>Subtotal Product</p>
                  <p>
                    Rp{" "}
                    {listing.subtotal_price.toLocaleString("id-ID", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </div>
            ))}
          {paymentList?.checkout_colection?.total_shipping_price && (
            <div className="p-2 my-4 text-sm bg-green-100 rounded-md border-dashed border-2 border-green-200">
              <div className="flex justify-between w-full pb-3 border-b border-dashed border-green-400">
                <div>
                  <h1 className="font-semibold mb-1">Shiping</h1>
                  <p>{shippingServiceList}</p>
                </div>
                <div>
                  <h1 className="font-semibold mb-1">Shiping Price</h1>
                  <p>
                    <span>Rp </span>
                    {paymentList.checkout_colection.total_shipping_price.toLocaleString(
                      "id-ID",
                      { minimumFractionDigits: 0, maximumFractionDigits: 0 }
                    )}
                  </p>
                </div>
              </div>
              <div className="pt-3">
                <h1 className="font-semibold mb-1">Address</h1>
                <p>{bioList.full_address}</p>
              </div>
            </div>
          )}
          <div className="flex mb-4 justify-between text-sm font-bold text-orange-700">
            <h1>Total Price</h1>
            <p>
              Rp{" "}
              {paymentList.checkout_colection.total_price.toLocaleString(
                "id-ID",
                { minimumFractionDigits: 0, maximumFractionDigits: 0 }
              )}
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden mt-4 md:block">
          <div className="flex items-center bg-orange-600 px-4 text-white font-semibold py-2 rounded-md shadow-md">
            <h1 className="w-[40%]">Product</h1>
            <h1 className="w-1/5 text-center">Unit Price</h1>
            <h1 className="w-1/5 text-center">Quantity</h1>
            <h1 className="w-1/5 text-center">Subtotal Product</h1>
          </div>
          <div className="px-4 rounded-md shadow-md border border-slate-200 my-2">
            {paymentList?.checkout_colection?.checkout &&
              paymentList.checkout_colection.checkout.map(listing => (
                // List product checkout
                <div
                  key={listing.id}
                  className="w-full py-6 border-b border-gray-200">
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
                        <span>Rp </span>
                        {item.product.price.toLocaleString("id-ID", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </p>
                      <p className="w-1/5 text-center">{item.quantity}</p>
                      <p className="w-1/5 text-center text-orange-700 font-semibold">
                        Rp{" "}
                        {listing.subtotal_price.toLocaleString("id-ID", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              ))}

            {paymentList?.checkout_colection?.total_shipping_price && (
              <div className="p-4 my-4 text-sm bg-green-100 rounded-md border-dashed border-2 border-green-200">
                <div className="flex justify-between w-full pb-3 border-b border-dashed border-green-400">
                  <div>
                    <h1 className="font-semibold mb-1">Shiping</h1>
                    <p>{shippingServiceList}</p>
                  </div>
                  <div>
                    <h1 className="font-semibold mb-1">Shiping Price</h1>
                    <p>
                      <span>Rp </span>
                      {paymentList.checkout_colection.total_shipping_price.toLocaleString(
                        "id-ID",
                        { minimumFractionDigits: 0, maximumFractionDigits: 0 }
                      )}
                    </p>
                  </div>
                </div>
                <div className="pt-3">
                  <h1 className="font-semibold mb-1">Address</h1>
                  <p>{bioList.full_address}</p>
                </div>
              </div>
            )}
            {paymentList.checkout_colection.total_price && (
              <div className="flex mb-4 justify-between text-sm font-bold text-orange-700">
                <h1>Total Price</h1>
                <p>
                  Rp{" "}
                  {paymentList.checkout_colection.total_price.toLocaleString(
                    "id-ID",
                    { minimumFractionDigits: 0, maximumFractionDigits: 0 }
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="text-sm flex items-center justify-between border border-slate-200 p-4 shadow-md rounded-md mb-6">
          <div>
            <p className="mb-1.5">Upload Proof of Payment</p>
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              required
            />
          </div>

          <div className="w-20 h-20">
            {imageUrl && (
              <Image
                src={imageUrl}
                width={100}
                height={100}
                alt="Image Upload"
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-orange-600 text-white shadow-md rounded-md px-5 font-bold py-1.5 hover:opacity-70 duration-300">
            Pay
          </button>
        </form>
      </div>
    </main>
  );
}
