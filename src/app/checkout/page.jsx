import { IoLocation } from "react-icons/io5";

export default function Checkout() {
  const cartList = [
    {
      id: 1,
      product:
        "The Sliding Mr. Bones (Next Stop, Pottersville) Happy Birthday To You And For Me too",
      price: 20000,
      quantity: 2,
      total_price: 40000,
    },
    {
      id: 2,
      product: "Witchy Woman",
      price: 30000,
      quantity: 3,
      total_price: 40000,
    },
    {
      id: 3,
      product: "Earth, Wind, and Fire",
      price: 40000,
      quantity: 4,
      total_price: 40000,
    },
    {
      id: 4,
      product:
        "The Sliding Mr. Bones (Next Stop, Pottersville) Happy Birthday To You And For Me too",
      price: 20000,
      quantity: 2,
      total_price: 40000,
    },
    {
      id: 5,
      product:
        "The Sliding Mr. Bones (Next Stop, Pottersville) Happy Birthday To You And For Me too",
      price: 20000,
      quantity: 2,
      total_price: 40000,
    },
    {
      id: 6,
      product:
        "The Sliding Mr. Bones (Next Stop, Pottersville) Happy Birthday To You And For Me too",
      price: 20000,
      quantity: 2,
      total_price: 40000,
    },
  ];
  console.log(cartList);

  return (
    <main className="xl:max-w-6xl mx-auto px-4 pt-24 xl:px-0">
      <h1 className="lg:text-3xl text-2xl pb-8 font-bold">Checkout</h1>
      <div className="flex flex-row gap-2 p-3 bg-orange-600 text-white rounded-lg shadow-lg mb-6 items-start">
        <IoLocation className="text-xl" />
        <div className="text-sm flex-1">
          <p className="pb-1 font-semibold">Delivery Address</p>
          <p>Fahlan</p>
          <p>Kel Belian, Batam</p>
        </div>
        <button className="text-sm hover:font-bold duration-300">Edit</button>
      </div>
      <div className="flex flex-col gap-6 md:hidden">
        {cartList &&
          cartList.length > 0 &&
          cartList.map(listing => (
            <div
              key={listing.id}
              className="p-3 bg-gray-100 rounded-lg shadow-lg">
              <div className="flex text-sm gap-3 mb-2">
                <div className="w-24 h-24 bg-gray-300">img</div>
                <div className="flex flex-col gap-1.5 flex-1 justify-between">
                  <h1 className="font-semibold line-clamp-2">
                    {listing.product}
                  </h1>
                  <div className="flex flex-col gap-1">
                    <p className="text-orange-700 font-semibold">
                      <span>Rp </span>
                      {listing.price}
                    </p>
                    <div className="flex gap-2">
                      <p>x{listing.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2 text-sm sm:text-base bg-green-100 rounded-md border-dashed border-2 border-green-200">
                <h1 className="font-semibold">Shiping Option</h1>
                <div className="dropdown dropdown-right">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn rounded-md py-1 px-2 h-8 bg-white mx-0 my-2 min-h-0 m-1">
                    Reguler <span>{">"}</span>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] mt-2 menu p-2 shadow bg-base-100 rounded-md w-52">
                    <li className="hover:bg-orange-100 hover:font-semibold rounded-md duration-300">
                      <button>Hemat</button>
                    </li>
                    <li className="hover:bg-orange-100 hover:font-semibold rounded-md duration-300">
                      <button>Cargo</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="shadow-t w-full right-0 px-4 py-3 flex mt-4 fixed bg-white bottom-0">
        <div className="xl:max-w-6xl flex items-center justify-between gap-12 text-sm md:text-base w-full mx-auto">
          <p className="font-bold">Total Payment</p>
          <div className="flex gap-16 items-center">
            <p className="font-extrabold text-lg text-orange-600">
              <span>Rp</span> 20.000
            </p>
            <button className="text-white px-4 py-2 rounded-md shadow-md hover:opacity-80 duration-300 font-bold bg-gradient-to-b from-orange-600 to-orange-500">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
