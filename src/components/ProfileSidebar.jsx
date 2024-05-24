'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ProfileSidebar() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchBio = async () => {
      const bio = await fetch("http://localhost:5000/api/users/bio", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await bio.json();
      console.log(data.users);
      setUser(data.users);
    };
    fetchBio();
  }, []);
  return (
    <div className="text-xl font-bold bg-orange-300 w-64 p-5">
      <div className="flex items-center">
        <img
          src={user.avatar}
          alt="alt"
          className="rounded-full w-14 h-14 mr-5"
        />
        <h4 className="text-xl">{user.name}</h4>
      </div>
      <Link href="/user/bio">
        <div className="rounded-lg border-y-2 py-3 px-2 mt-5 hover:bg-orange-700">
          <h3 className="text-lg ">My Profile</h3>
        </div>
      </Link>
      <Link href="/user/order">
        <div className=" rounded-lg border-b-2 py-3 px-2 hover:bg-orange-700">
          <h3 className="text-lg ">My Order</h3>
        </div>
      </Link>

      <button className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-orange-600 rounded-lg h-[60px]">
        Logout
      </button>
    </div>
  );
}
