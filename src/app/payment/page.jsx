/* eslint-disable @next/next/no-img-element */
export default function PaymentPage() {
  const cartList = [
    {
      id: 1,
      product:
        "The Sliding Mr. Bones (Next Stop, Pottersville) Happy Birthday To You And For Me too",
      price: 20000,
      quantity: 2,
      total_price: 40000,
      product_image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      product: "Witchy Woman",
      price: 30000,
      quantity: 3,
      total_price: 40000,
      product_image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      product: "Earth, Wind, and Fire",
      price: 40000,
      quantity: 4,
      total_price: 40000,
      product_image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      product:
        "The Sliding Mr. Bones (Next Stop, Pottersville) Happy Birthday To You And For Me too",
      price: 20000,
      quantity: 2,
      total_price: 40000,
      product_image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      product:
        "The Sliding Mr. Bones (Next Stop, Pottersville) Happy Birthday To You And For Me too",
      price: 20000,
      quantity: 2,
      total_price: 40000,
      product_image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      product:
        "The Sliding Mr. Bones (Next Stop, Pottersville) Happy Birthday To You And For Me too",
      price: 20000,
      quantity: 2,
      total_price: 40000,
      product_image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <main className="xl:max-w-6xl mx-auto px-4 pt-24 xl:px-0">
      <h1 className="lg:text-3xl font-bold pb-8 text-2xl">Payment</h1>
      <div className="w-full">
        <div className="bg-orange-600 text-white font-semibold text-lg mx-auto text-center py-3 rounded-md shadow-md">
          <h1>Transfer Bank BCA</h1>
          <p>111122222333444566777788</p>
        </div>

        {/* Mobile */}
        <div className="my-4 px-4 border border-slate-200 rounded-md shadow-md md:hidden">
          {cartList &&
            cartList.length > 0 &&
            cartList.map(listing => (
              // List product checkout
              <div
                key={listing.id}
                className="py-4 border-b border-slate-200">
                <div className="flex text-sm gap-3 mb-2">
                  <img
                    src={listing.product_image}
                    width={96}
                    height={96}
                    alt={listing.product}
                  />
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
                <div className="flex flex-row justify-between text-sm font-bold pt-2 text-orange-700">
                  <p>Subtotal Product</p>
                  <p>
                    Rp{" "}
                    {listing.total_price.toLocaleString("id-ID", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </div>
            ))}

          <div className="p-2 my-4 text-sm bg-green-100 rounded-md border-dashed border-2 border-green-200">
            <div className="flex justify-between w-full pb-3 border-b border-dashed border-green-400">
              <div>
                <h1 className="font-semibold mb-1">Shiping</h1>
                <p>Reguler</p>
              </div>
              <div>
                <h1 className="font-semibold mb-1">Shiping Price</h1>
                <p>Rp 40.000</p>
              </div>
            </div>
            <div className="pt-3">
              <h1 className="font-semibold mb-1">Address</h1>
              <p>Batam Kota, Kota Batam, Kepulauan Riau</p>
            </div>
          </div>

          <div className="flex mb-4 justify-between text-sm font-bold text-orange-700">
            <h1>Total Price</h1>
            <p>Rp 440.000</p>
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
            {cartList &&
              cartList.length > 0 &&
              cartList.map(listing => (
                // List product checkout
                <div
                  key={listing.id}
                  className="w-full py-6 border-b border-gray-200">
                  <div className="flex text-black w-full">
                    <div className="flex w-[40%] gap-4">
                      <img
                        src={listing.product_image}
                        alt={listing.product}
                        className="w-[72px] h-[72px] object-cover"
                      />
                      <p className="font-semibold line-clamp-3 overflow-hidden">
                        {listing.product}
                      </p>
                    </div>
                    <p className="w-1/5 text-center">{listing.price}</p>
                    <p className="w-1/5 text-center">{listing.quantity}</p>
                    <p className="w-1/5 text-center text-orange-700 font-semibold">
                      {listing.total_price}
                    </p>
                  </div>
                </div>
              ))}
            <div className="p-4 my-4 text-sm bg-green-100 rounded-md border-dashed border-2 border-green-200">
              <div className="flex justify-between w-full pb-3 border-b border-dashed border-green-400">
                <div>
                  <h1 className="font-semibold mb-1">Shiping</h1>
                  <p>Reguler</p>
                </div>
                <div>
                  <h1 className="font-semibold mb-1">Shiping Price</h1>
                  <p>Rp 40.000</p>
                </div>
              </div>
              <div className="pt-3">
                <h1 className="font-semibold mb-1">Address</h1>
                <p>Batam Kota, Kota Batam, Kepulauan Riau</p>
              </div>
            </div>
            <div className="flex mb-4 justify-between text-sm font-bold text-orange-700">
              <h1>Total Price</h1>
              <p>Rp 440.000</p>
            </div>
          </div>
        </div>

        <form className="text-sm flex items-center justify-between border border-slate-200 p-4 shadow-md rounded-md mb-6">
          <div>
            <p className="mb-1.5">Upload Proof of Payment</p>
            <input
              type="file"
              accept="image/*"
            />
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
