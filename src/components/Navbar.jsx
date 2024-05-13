/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { IoCart } from "react-icons/io5";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"]);
  const route = useRouter();

  useEffect(() => {
    if (cookies.access_token) {
      setIsLogin(true);
    }
  }, [cookies]);

  const handleLogOut = () => {
    location.reload();
    removeCookie("access_token");
    setIsLogin(false);
    route.push("/");
  };

  return (
    <nav className="bg-gradient-to-b from-orange-600 to-orange-500 py-1 fixed w-full z-20 top-0 start-0 shadow-md">
      <div className="xl:max-w-6xl md:gap-12 mx-auto xl:px-0 flex flex-wrap flex-row w-full items-center justify-between py-2 px-4">
        <Link
          href="/"
          className="flex items-end gap-1">
          <Image
            src={"/logo-white.svg"}
            alt="logo"
            width={34}
            height={34}></Image>
          <span className="hidden font-sans font-bold dark:text-white md:block text-2xl">
            Promo Pioneer
          </span>
        </Link>
        <div className="md:flex-1 mx-2">
          <div className="flex w-full items-center gap-3">
            <Link href={"/category"}>
              <p className="text-white cursor-pointer hover:opacity-80 duration-300 font-medium">
                Category
              </p>
            </Link>
            <form className="flex bg-white rounded-md p-1 flex-1 shadow-sm">
              <input
                type="text"
                className="w-full h-full focus:outline-none text-sm px-2 py-1 rounded-md"
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
        <div className="flex">
          {/* {isLogin && (
            <Link href="/newbook">
              <button
                type="button"
                className="bg-white text-orange-600 text-sm font-semibold hover:opacity-80 mr-4 duration-300 rounded-md md:px-3 md:py-1 text-center shadow-sm">
                Add New Book
              </button>
            </Link>
          )} */}
          {!isLogin ? (
            <Link href="/login">
              <button
                type="button"
                className="bg-white text-orange-600 text-sm font-semibold hover:opacity-80 duration-300 rounded-md md:px-3 md:py-1 text-center shadow-sm">
                Log In
              </button>
            </Link>
          ) : (
            <Link href="/">
              <button
                type="button"
                className="bg-white text-orange-600 text-sm font-semibold hover:opacity-80 duration-300 rounded-md md:px-3 md:py-1 text-center shadow-sm"
                onClick={handleLogOut}>
                Log Out
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
