/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import Image from "next/image";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import AvatarUser from "./AvatarUser";
import CounterCart from "./CounterCart";
import getCategory from "@/libs/fetch/getCategory";

export default function Navbar() {
  const [search, setSearch] = useState('')
  const [isLogin, setIsLogin] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [cookies, _setCookies, removeCookie] = useCookies(["accessToken"]);
  const router = useRouter();
  const pathname = usePathname();
  const isNestedDashboardRoute = pathname.startsWith("/dashboard");

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategory();
      setCategoriesList(categories);
    };
    if (cookies.accessToken) {
      setIsLogin(true);
    }
    fetchCategories();
  }, [cookies]);

  const handleLogOut = () => {
    router.refresh();
    removeCookie("accessToken");
    setIsLogin(false);
    router.push("/");
  };

  const handleSearch = e => {
    e.preventDefault();
    // console.log(search)
    router.push(`/search?keyword=${search}`);
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
                  height={34}
                />
                <span className="hidden font-sans font-bold dark:text-white lg:block text-2xl">
                  Promo Pioneer
                </span>
              </Link>
              <div className="md:flex-1 md:mx-2">
                <div className="flex max-w-[70%] items-center gap-3 md:mx-auto">
                  <div className="dropdown">
                    <div
                      tabIndex={0}
                      role="button"
                      className="text-white hidden sm:block cursor-pointer hover:opacity-80 duration-300 font-semibold">
                      Category
                    </div>

                    <ul
                      tabIndex={0}
                      className="dropdown-content rounded-md mt-2 z-[1] menu py-1 px-2 shadow bg-base-100 w-64">
                      {categoriesList.map(category => (
                        <li key={category.id}>
                          <Link
                            // href={`/category?search`}
                            href={`/${category.name}`}
                            className="hover:text-orange-600 rounded-md border-b  border-slate-200 hover:font-bold hover:bg-transparent duration-300">
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <form className="flex bg-white rounded-md p-1 flex-1 shadow-sm justify-between">
                    <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                      type="text"
                      className="w-36 bg-white flex-1 sm:w-60 h-full focus:outline-none text-sm px-2 py-1 rounded-md"
                    />
                    <button
                      onClick={handleSearch}
                      className="border-l-2 w-8 flex items-center justify-center">
                      <IoSearch className="ml-1 hover:opacity-60 duration-300 rounded-r-md w-full h-full p-1 text-orange-600" />
                    </button>
                  </form>
                  <Link
                    href="/cart"
                    className="relative w-11">
                    <IoCartOutline
                      size={30}
                      className="text-white hover:opacity-80 duration-300 cursor-pointer"
                    />
                    <CounterCart />
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
                    <AvatarUser />
                    {/* <div
                      tabIndex={0}
                      role="button"
                      className="btn px-0 bg-transparent border-none hover:bg-transparent shadow-none h-0 min-h-0">
                      <FaUserCircle
                        size={28}
                        className="text-white translate-y-0.5"
                      />
                    </div> */}
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
