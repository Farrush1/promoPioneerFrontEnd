import Link from "next/link";
import React from "react";

export default function ProfileSidebar() {
  return (
    <div className="text-xl font-bold bg-orange-300 w-64 p-5">
      <div className="flex items-center">
        <img
          src="https://res.cloudinary.com/dmvigke9d/image/upload/v1715222943/pxbzwswjqjk5hndkoonf.jpg"
          alt="alt"
          className="rounded-full w-14 h-14 mr-5"
        />
        <h4 className="text-xl">Name</h4>
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
