// "use client";
// import React, { useEffect, useState } from "react";

// export default function OrderDetailPage({ paymentId }) {
//   const [payment, setPayment] = useState({});
//   const [cities, setCities] = useState([]);
//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/cities", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         });
//         const data = await response.json();
//         setCities(data.city);
//         console.log(data.city);
//       } catch (error) {
//         console.error("Error fetching cities:", error);
//       }
//     };

//     fetchCities();
//   }, []);
//   useEffect(() => {
//     const fetchPayment = async () => {
//       const bio = await fetch(
//         `http://localhost:5000/api/payments/${paymentId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         }
//       );
//       const data = await bio.json();
//       console.log(data);
//       setPayment(data.payment);
//     };
//     fetchPayment();
//   }, []);

//   function findCityNameById(id) {
//     const city = cities.find((city) => city.id === id);
//     return city ? city.name : "City not found";
//   }
//   return (
//     <div className="bg-white shadow-lg rounded-md p-5 h-80 flex-1 flex flex-col gap-6 md:gap-0 justify-between">
//       <h1 className="text-xl">Detail Order</h1>
//       <div className="flex justify-between">
//         <p>Order ID: {payment.checkout_colection?.id}</p>
//         <div className="">
//           <p className="">
//             Date: {payment.checkout_colection?.updatedAt.slice(0, 10)}
//           </p>
//           <p>Status: {payment.payment_status}</p>
//         </div>
//       </div>
//       {payment.checkout_colection?.checkout.map((checkout) => (
//         <div key={checkout.id} className="">
//           <p>
//             Order from {() => findCityNameById(checkout.city_id)} to{" "}
//             {payment.checkout_colection.user.city_id}
//           </p>
//           <p>address</p>
//           <div className="flex justify-between">
//             <p>img</p>
//             <p>name</p>
//             <p>unit price</p>
//             <p>quantity</p>
//             <p>total price</p>
//           </div>
//           <div className="flex justify-between">
//             <p>shipping</p>
//             <div className="flex items-center">
//               <div className="">
//                 <p>jne</p>
//                 <p>service</p>
//               </div>
//               <p>price</p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";

export default function OrderDetailPage({ paymentId }) {
  const [payment, setPayment] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cities", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setCities(data.city);
      } catch (error) {
        console.error("Error fetching cities:", error);
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
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        setPayment(data.payment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    };

    fetchPayment();
  }, [paymentId]);

  function findCityNameById(id) {
    const city = cities.find((city) => city.id === id);
    return city ? city.name : "City not found";
  }

  if (!payment || !cities.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-md p-5 flex-1 flex flex-col gap-6 md:gap-0 justify-between">
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
        <div key={checkout.id} className="">
          <p>
            Order from {findCityNameById(checkout.city_id)} to{" "}
            {findCityNameById(payment.checkout_colection.user.city_id)}
          </p>
          <p>Address: {payment.checkout_colection.user.full_address}</p>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className="flex justify-between">
            <p>Image</p>
            <p>Product Name</p>
            <p>Unit Price</p>
            <p>Quantity</p>
            <p>Total Price</p>
          </div> */}
          {checkout.checkout_item.map((item) => (
            <div key={item.id} className="flex justify-between">
              <img
                src={item.product.product_image}
                alt={item.product.name}
                className="w-16 h-16"
              />
              <p>{item.product.name}</p>
              <p>{item.product.price}</p>
              <p>{item.quantity}</p>
              <p>{item.total_specific_price}</p>
            </div>
          ))}
          <div className="flex justify-between">
            <p>Shipping</p>
            <div className="flex items-center">
              <div className="">
                <p>{checkout.shippingCheckout.name}</p>
                <p>{checkout.shippingCheckout.service}</p>
              </div>
              <p>{checkout.shippingCheckout.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
