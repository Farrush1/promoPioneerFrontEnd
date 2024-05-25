"use client";
import React, { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function UserOrderPage() {
  const [checkout, setCheckout] = useState([]);

  useEffect(() => {
    const fetchCheckout = async () => {
      const check = await fetch("http://localhost:5000/api/users/checkouts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await check.json();
      console.log(data.checkoutCollection);
      setCheckout(data.checkoutCollection);
    };
    fetchCheckout();
  }, []);

  return (
    <div className="bg-orange-300 ml-3 p-5 w-full">
      <h1 className="text-xl font-bold">My Order</h1>
      {/* card order */}
      {checkout.map((items) => (
        <div key={items.id} className="card w-full bg-base-100 shadow-xl mt-3">
          <div className="card-head flex justify-between p-3 border-b-2">
            <h3 className="order">Order ID: {items.id}</h3>
            <h3 className="order">{items.updatedAt.slice(0, 10)}</h3>
            <h3 className="order">Status {items.checkout[0].status}</h3>
          </div>
          {items.checkout.map((checkoutByCity) => (
            <div
              key={checkoutByCity.id}
              className="card-body mb-5 m-3 bg-slate-200 h-64"
            >
              <p>City: {checkoutByCity.checkout_item[0].id}</p>
              {checkoutByCity.checkout_item.map((checkoutItem) => (
                <div
                  key={checkoutItem.id}
                  className="list-order flex justify-between"
                >
                  {console.log(checkoutItem.product.product_image)}
                  <div className="product-title flex items-center h-24">
                    <img
                      src={checkoutItem.product.product_image}
                      alt={checkoutItem.product.name}
                      className="w-[72px] h-[72px] object-cover"
                    />
                    <p className="product-name">{checkoutItem.product.name}</p>
                  </div>
                  <div className="product-price flex items-center">
                    <p className="price">Rp. {checkoutItem.price}</p>
                  </div>
                  <div className="product-quantity flex items-center">
                    <p className="quantity">{checkoutItem.quantity}</p>
                  </div>
                  <div className="product-subtotal flex items-center">
                    <p className="subtotal">Rp. {checkoutItem.subtotal}</p>
                  </div>
                </div>
              ))}

              <div className="detail-price">
                <div className="shipping flex text-right">
                  <p className="shipping">Sub total price</p>
                  <p className="shipping grow-0 w-48">
                    {checkoutByCity.subtotal_price}
                  </p>
                </div>
                <div className="shipping flex text-right">
                  <p className="shipping">Shipping Cost</p>
                  <p className="shipping grow-0 w-48">
                    {checkoutByCity.shippingCheckout.price}
                  </p>
                </div>
                <div className="total flex text-right">
                  <p className="total">Total</p>
                  <p className="total-price grow-0 w-48">
                    {checkoutByCity.total_checkout_price}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="total mx-4 text-end mb-5">
            <p className="total">
              Total Shipping Price: {items.total_shipping_price}
            </p>
            <p className="total">Total Item Price: {items.total_item_price}</p>
            <p className="total">Total Price: {items.total_price}</p>
          </div>
        </div>
      ))}

      <div className="pagination flex justify-center mt-3 gap-2">
        <button className="btn btn-primary">
          <GrFormPrevious />
        </button>
        <button className="btn btn-primary">1</button>
        <button className="btn btn-primary">
          <GrFormNext />
        </button>
      </div>
    </div>
  );
}