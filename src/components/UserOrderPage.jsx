'use client'
import React, { useEffect, useState } from 'react'
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function UserOrderPage() {
  const [checkout, setCheckout] = useState([])
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
          <div className="card-body mb-5 m-3 bg-slate-200">
            <div className="list-order flex justify-between">
              <div className="product-title flex items-center">
                <img
                  src="https://res.cloudinary.com/dmvigke9d/image/upload/v1715222943/pxbzwswjqjk5hndkoonf.jpg"
                  alt="alt"
                  className="w-24 h-24 mr-5"
                />
                <p className="product-name">Name</p>
              </div>
              <div className="product-price flex items-center">
                <p className="price">Rp. 100.000</p>
              </div>
              <div className="product-quantity flex items-center">
                <p className="quantity">3</p>
              </div>
              <div className="product-subtotal flex items-center">
                <p className="subtotal">Rp. 300.000</p>
              </div>
            </div>
            <div className="list-order flex justify-between">
              <div className="product-title flex items-center">
                <img
                  src="https://res.cloudinary.com/dmvigke9d/image/upload/v1715222943/pxbzwswjqjk5hndkoonf.jpg"
                  alt="alt"
                  className="w-24 h-24 mr-5"
                />
                <p className="product-name">Name</p>
              </div>
              <div className="product-price flex items-center">
                <p className="price">Rp. 100.000</p>
              </div>
              <div className="product-quantity flex items-center">
                <p className="quantity">3</p>
              </div>
              <div className="product-subtotal flex items-center">
                <p className="subtotal">Rp. 300.000</p>
              </div>
            </div>
            <div className="detail-price">
              <div className="shipping flex text-right">
                <p className="shipping">Shipping Cost</p>
                <p className="shipping grow-0 w-48">Rp. 40.000</p>
              </div>
              <div className="total flex text-right">
                <p className="total">Total</p>
                <p className="total-price grow-0 w-48">Rp. 640.000</p>
              </div>
            </div>
          </div>
          <div className="card-body mb-5 m-3 bg-slate-200">
            <div className="list-order flex justify-between">
              <div className="product-title flex items-center">
                <img
                  src="https://res.cloudinary.com/dmvigke9d/image/upload/v1715222943/pxbzwswjqjk5hndkoonf.jpg"
                  alt="alt"
                  className="w-24 h-24 mr-5"
                />
                <p className="product-name">Name</p>
              </div>
              <div className="product-price flex items-center">
                <p className="price">Rp. 100.000</p>
              </div>
              <div className="product-quantity flex items-center">
                <p className="quantity">3</p>
              </div>
              <div className="product-subtotal flex items-center">
                <p className="subtotal">Rp. 300.000</p>
              </div>
            </div>
            <div className="list-order flex justify-between">
              <div className="product-title flex items-center">
                <img
                  src="https://res.cloudinary.com/dmvigke9d/image/upload/v1715222943/pxbzwswjqjk5hndkoonf.jpg"
                  alt="alt"
                  className="w-24 h-24 mr-5"
                />
                <p className="product-name">Name</p>
              </div>
              <div className="product-price flex items-center">
                <p className="price">Rp. 100.000</p>
              </div>
              <div className="product-quantity flex items-center">
                <p className="quantity">3</p>
              </div>
              <div className="product-subtotal flex items-center">
                <p className="subtotal">Rp. 300.000</p>
              </div>
            </div>
            <div className="detail-price">
              <div className="shipping flex text-right">
                <p className="shipping">Shipping Cost</p>
                <p className="shipping grow-0 w-48">Rp. 40.000</p>
              </div>
              <div className="total flex text-right">
                <p className="total">Total</p>
                <p className="total-price grow-0 w-48">Rp. 640.000</p>
              </div>
            </div>
          </div>
          <div className="total mx-4 text-end mb-5">
            <p className="total">Total Shipping Price: 1010101010</p>
            <p className="total">Total Item Price: 1010101010</p>
            <p className="total">Total Price: 1010101010</p>
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
