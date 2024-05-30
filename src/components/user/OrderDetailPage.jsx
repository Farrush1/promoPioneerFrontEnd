'use client';
import React, { useEffect, useState } from 'react';

export default function OrderDetailPage({ paymentId }) {
  const [payment, setPayment] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cities', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        setCities(data.city);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/payments/${paymentId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        const data = await response.json();
        setPayment(data.payment);
      } catch (error) {
        console.error('Error fetching payment:', error);
      }
    };

    fetchPayment();
  }, [paymentId]);

  function findCityNameById(id) {
    const city = cities.find((city) => city.id === id);
    return city ? city.name : 'City not found';
  }

  if (!payment || !cities.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-md p-8 flex-1 flex flex-col gap-6 md:gap-0 justify-between overflow-y-auto">
      <h1 className="text-xl">Detail Order</h1>
      <div className="flex justify-between">
        <p>Order ID: {payment.checkout_colection?.id}</p>
        <div className="">
          <p className="">
            Date: {payment.checkout_colection?.updatedAt.slice(0, 10)}
          </p>
          <p>Status: {payment.payment_status}</p>
        </div>
      </div>
      {payment.checkout_colection?.checkout.map((checkout) => (
        <div key={checkout.id} className="bg-slate-200 mb-5 p-2">
          <p>
            Order from {findCityNameById(checkout.city_id)} to{' '}
            {findCityNameById(payment.checkout_colection.user.city_id)}
          </p>
          <p>Address: {payment.checkout_colection.user.full_address}</p>
          <div className="overflow-x-auto ">
            <table className="table ">
              {/* head */}
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="text-center">Unit Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center"></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {checkout.checkout_item.map((checkoutItems) => (
                  <tr key={checkoutItems.id}>
                    <th>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={checkoutItems.product.product_image}
                              alt=""
                            />
                          </div>
                        </div>
                        <div>
                          <div className="">{checkoutItems.product.name}</div>
                        </div>
                      </div>
                    </th>
                    <td className="text-center">
                      {checkoutItems.product.price}
                    </td>
                    <td className="text-center">{checkoutItems.quantity}</td>
                    <td className="text-center">
                      {checkoutItems.original_price !=
                        checkoutItems.total_specific_price && (
                        <p className="line-through bg-red-200">
                          {checkoutItems.original_price}
                        </p>
                      )}
                      <p className="text-center">
                        {checkoutItems.total_specific_price}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between border-t-2 border-slate-500 pt-4 pl-4 pr-24">
            <p>Shipping</p>
            <div className="flex items-center">
              <div className="bg-green-200 text-center p-2">
                <p>{checkout.shippingCheckout.name.toUpperCase()}</p>
                <p>{checkout.shippingCheckout.service}</p>
              </div>
              <p>{checkout.shippingCheckout.price}</p>
            </div>
          </div>
          <div className="total">
            <p>
              Total:{' '}
              {checkout.total_checkout_price.toLocaleString('id-ID', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      ))}
      <div className="total text-end">
        <p>
          Total Product Price: Rp.
          {payment.checkout_colection.total_item_price.toLocaleString('id-ID', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </p>
        <p>
          Total Shipping Price:{' '}
          {payment.checkout_colection.total_shipping_price}
        </p>
        <p>
          Total Price: Rp.{' '}
          {payment.checkout_colection.total_price.toLocaleString('id-ID', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </p>
      </div>
      <div className="flex mt-5 justify-between bg-yellow-200 p-4 items-center">
        <p className="">Contact admin for more information</p>
        <a href="https://wa.me/6285738436019" className="btn btn-primary px-4">
          {' '}
          Contact
        </a>
      </div>
    </div>
  );
}
