/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import { BsCartCheckFill } from 'react-icons/bs';
import { FaSignOutAlt } from 'react-icons/fa';

export default function ProfileSidebar() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchBio = async () => {
      const bio = await fetch('http://localhost:5000/api/users/bio', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await bio.json();
      console.log(data.users);
      setUser(data.users);
    };
    fetchBio();
  }, []);
  return (
    <div className="font-semibold bg-gradient-to-bl from-orange-600 to-orange-500 w-full md:w-64 p-5 rounded-lg shadow-lg flex flex-col gap-2 md:h-80 justify-between">
      <div className="flex items-center px-3 pb-3">
        <img
          src={user.avatar}
          alt="alt"
          className="rounded-full w-14 h-14 mr-5"
        />
        <h4 className="font-semibold text-white">{user.name}</h4>
      </div>
      <div className="flex md:flex-col w-full justify-between md:gap-4 md:text-left">
        <Link
          href="/user/bio"
          className="p-2 md:p-0 w-full inline-flex md:justify-start justify-center rounded-full duration-300 hover:bg-white hover:text-orange-600 text-white"
        >
          <p className="hidden md:block text-white cursor-pointer rounded-full hover:shadow-md px-3 py-1 hover:bg-white hover:text-black w-full duration-300">
            My Profile
          </p>
          <FaUser className=" md:hidden w-5" />
        </Link>
        <Link
          href="/user/order"
          className="p-2 md:p-0 w-full inline-flex md:justify-start justify-center rounded-full duration-300 hover:bg-white hover:text-orange-600 text-white"
        >
          <p className="hidden md:block text-white cursor-pointer rounded-full hover:shadow-md px-3 py-1 hover:bg-white hover:text-black w-full duration-300">
            My Order
          </p>
          <BsCartCheckFill className=" md:hidden w-5" />
        </Link>
        <div className="p-2 md:p-0 w-full inline-flex md:justify-start justify-center cursor-pointer rounded-full duration-300 hover:bg-white hover:text-orange-600 text-white">
          <button className="hidden md:block text-white text-left cursor-pointer rounded-full hover:shadow-md px-3 py-1 hover:bg-white hover:text-black w-full duration-300">
            Logout
          </button>
          <FaSignOutAlt className="md:hidden w-5" />
        </div>
      </div>
    </div>
  );
}
