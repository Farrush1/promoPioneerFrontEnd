/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies(["accessToken"]);
  const router = useRouter();
  const pathname = usePathname();
  const isNestedDashboardRoute = pathname.startsWith("/dashboard");

  useEffect(() => {
    if (cookies.accessToken) {
      setIsLogin(true);
    }
  }, [cookies]);

  const handleLogOut = () => {
    router.refresh();
    removeCookie("accessToken");
    setIsLogin(false);
    router.push("/");
  };

  return (
    <>
      {!isNestedDashboardRoute && (
        <div>
          <nav className="bg-gradient-to-l from-orange-600 to-orange-500 py-1 fixed w-full z-20 top-0 start-0 shadow-md">
            <div className="xl:max-w-6xl md:gap-12 gap-3 mx-auto xl:px-0 flex flex-wrap flex-row w-full items-center justify-between py-3 px-4">
              <Link
                href="/"
                className="flex items-end gap-1">
                <Image
                  src={"/logo-white.svg"}
                  alt="logo"
                  width={34}
                  height={34}></Image>
                <span className="hidden font-sans font-bold dark:text-white lg:block text-2xl">
                  Promo Pioneer
                </span>
              </Link>
              <div className="md:flex-1 md:mx-2">
                <div className="flex w-full items-center gap-3">
                  <Link href={"/category"}>
                    <p className="text-white hidden sm:block cursor-pointer hover:opacity-80 duration-300 font-semibold">
                      Category
                    </p>
                  </Link>
                  <form className="flex bg-white rounded-md p-1 flex-1 shadow-sm justify-between">
                    <input
                      type="text"
                      className="w-36 bg-white flex-1 sm:w-60 h-full focus:outline-none text-sm px-2 py-1 rounded-md"
                    />
                    <button className="border-l-2 w-8 flex items-center justify-center">
                      <IoSearch className="ml-1 hover:opacity-60 duration-300 rounded-r-md w-full h-full p-1 text-orange-600" />
                    </button>
                  </form>
                  <Link href="/cart">
                    <IoCart
                      size={30}
                      className="text-white hover:opacity-80 duration-300 cursor-pointer"
                    />
                  </Link>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                {!isLogin ? (
                  <Link href="/login">
                    <button
                      type="button"
                      className="text-white text-sm font-semibold hover:opacity-70 duration-300 rounded-md md:px-3 md:py-2 text-center">
                      Log In
                    </button>
                  </Link>
                ) : (
                  <div className="dropdown dropdown-hover dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn px-0 bg-transparent border-none hover:bg-transparent shadow-none h-0 min-h-0">
                      <FaUserCircle
                        size={28}
                        className="text-white translate-y-0.5"
                      />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu shadow bg-base-100 text-black rounded-box w-52">
                      <li>
                        <Link href="/user/bio">Profile</Link>
                      </li>
                      <li>
                        <button onClick={handleLogOut}>Log Out</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
