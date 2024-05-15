import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaWarehouse } from "react-icons/fa6";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { FaUser } from "react-icons/fa";

export default function DashboardLayout({ children }) {
  return (
    <main className="w-full">
      <div className="flex flex-row p-4 gap-8 h-screen">
        <div className="w-1/5 flex flex-col p-4 gap-8 shadow-xl rounded-lg h-full bg-orange-600 text-white">
          <div className="admin mx-auto">
            <div className="bg-gray-400 rounded-full w-20 h-20 p-6 text-center my-6">
              img
            </div>
            <h1 className="text-center text-lg font-semibold">Admin</h1>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href={"/dashboard"}
              className="flex py-2 px-3 gap-3 items-center hover:font-semibold cursor-pointer hover:bg-white hover:text-slate-800 rounded-full hover:shadow-md duration-300">
              <span>
                <AiFillHome />
              </span>
              <p className="cursor-pointer">Dashboard</p>
            </Link>
            <Link
              href={"/dashboard/product"}
              className="flex py-2 px-3 gap-3 items-center hover:font-semibold cursor-pointer hover:bg-white hover:text-slate-800 rounded-full hover:shadow-md duration-300">
              <span>
                <FaCartShopping />
              </span>
              <p className="cursor-pointer">Product</p>
            </Link>
            <Link
              href={"/dashboard/promo"}
              className="flex py-2 px-3 gap-3 items-center hover:font-semibold cursor-pointer hover:bg-white hover:text-slate-800 rounded-full hover:shadow-md duration-300">
              <span>
                <RiDiscountPercentFill />
              </span>
              <p className="cursor-pointer">Promo</p>
            </Link>
            <Link
              href={"/dashboard/warehouse"}
              className="flex py-2 px-3 gap-3 items-center hover:font-semibold cursor-pointer hover:bg-white hover:text-slate-800 rounded-full hover:shadow-md duration-300">
              <span>
                <FaWarehouse />
              </span>
              <p className="cursor-pointer">Warehouse</p>
            </Link>
            <Link
              href={"/dashboard/order"}
              className="flex py-2 px-3 gap-3 items-center hover:font-semibold cursor-pointer hover:bg-white hover:text-slate-800 rounded-full hover:shadow-md duration-300">
              <span>
                <GiCardboardBoxClosed />
              </span>
              <p className="cursor-pointer">Order</p>
            </Link>
            <Link
              href={"/dashboard/user"}
              className="flex py-2 px-3 gap-3 items-center hover:font-semibold cursor-pointer hover:bg-white hover:text-slate-800 rounded-full hover:shadow-md duration-300">
              <span>
                <FaUser />
              </span>
              <p className="cursor-pointer">User</p>
            </Link>
          </div>
          <Link
            href={"/login"}
            className="flex flex-1 items-end justify-center">
            <p className="py-2 px-3 gap-3 items-center hover:font-semibold cursor-pointer hover:bg-white hover:text-slate-800 rounded-full hover:shadow-md duration-300 w-full mx-auto flex justify-center">
              Logout
            </p>
          </Link>
        </div>
        {children}
      </div>
    </main>
  );
}
