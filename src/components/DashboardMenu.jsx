"use client";

import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaWarehouse } from "react-icons/fa6";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import AvatarAdmin from "./AvatarAdmin";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function DashboardMenu() {
  const [_cookies, _setCookies, removeCookie] = useCookies(["accessToken"]);
  const router = useRouter();

  const handleLogout = async () => {
    removeCookie("accessToken");
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  return (
    <>
      <nav className="md:hidden w-full sticky top-4 bg-gradient-to-l from-orange-600 to-orange-500 text-white rounded-lg shadow-lg p-2 mx-auto z-50">
        <div className="flex items-end justify-between px-6 pb-2 border-b border-orange-400">
          <h1 className="font-bold">Dashboard Menu</h1>
          <p className="text-sm">Admin</p>
        </div>
        <div className="flex flex-row justify-around pt-2">
          <Link
            href={"/dashboard"}
            title="Dashboard"
            className="flex p-3 gap-3 items-center hover:font-semibold cursor-pointer hover:bg-white hover:text-slate-800 rounded-full hover:shadow-md duration-300">
            <span>
              <AiFillHome />
            </span>
          </Link>
          <Link
            href={"/dashboard/product"}
            title="Product"
            className="flex p-3 gap-3 items-center hover:font-semibold cursor-pointer hover:bg-white hover:text-slate-800 rounded-full hover:shadow-md duration-300">
            <span>
              <FaCartShopping />
            </span>
          </Link>
          <Link
            href={"/dashboard/promo"}
            title="Promo"
            className="flex p-3 gap-3 items-center hover:font-semibold cursor-pointer hover:bg-white hover:text-slate-800 rounded-full hover:shadow-md duration-300">
            <span>
              <RiDiscountPercentFill />
            </span>
          </Link>
          <Link
            href={"/dashboard/warehouse"}
            title="Warehouse"
            className="flex p-3 gap-3 items-center hover:font-semibold cursor-pointer hover:bg-white hover:text-slate-800 rounded-full hover:shadow-md duration-300">
            <span>
              <FaWarehouse />
            </span>
          </Link>
          <Link
            href={"/dashboard/order"}
            title="Order"
            className="flex p-3 gap-3 items-center hover:font-semibold cursor-pointer hover:bg-white hover:text-slate-800 rounded-full hover:shadow-md duration-300">
            <span>
              <GiCardboardBoxClosed />
            </span>
          </Link>
          <Link
            href={"/dashboard/user"}
            title="User"
            className="flex p-3 gap-3 items-center hover:font-semibold cursor-pointer hover:bg-white hover:text-slate-800 rounded-full hover:shadow-md duration-300">
            <span>
              <FaUser />
            </span>
          </Link>
        </div>
      </nav>

      <div className="hidden h-[95vh] sticky top-4 w-1/4 md:flex flex-col p-4 gap-8 shadow-xl rounded-lg bg-gradient-to-t from-orange-600 to-orange-500 text-white">
        <div className="admin mx-auto py-3">
          <AvatarAdmin />
          <h1 className="text-center text-lg font-semibold mt-4">Admin</h1>
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
        <button
          onClick={handleLogout}
          className="flex flex-1 items-end justify-center">
          <p className="py-2 px-3 gap-3 items-center hover:font-semibold cursor-pointer hover:bg-white hover:text-slate-800 rounded-full hover:shadow-md duration-300 w-full mx-auto flex justify-center">
            Logout
          </p>
        </button>
      </div>
    </>
  );
}
