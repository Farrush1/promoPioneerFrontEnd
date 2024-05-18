"use client";
import React, { useEffect, useState } from "react";

export default function BioUserPage() {
  const [user, setUser] = useState({})
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
  const handleClick = async () => {
    try {
      const login = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "johndoe@example.com",
          password: "12345678",
        }),
      });
      const token = await login.json();
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="bg-orange-300 ml-3 p-5 w-full">
        <h1 className="text-xl font-bold">Profile</h1>
        <div className="flex">
          <div className="photo justify-center mt-5">
            <img
              src="https://res.cloudinary.com/dmvigke9d/image/upload/v1715222943/pxbzwswjqjk5hndkoonf.jpg"
              alt="alt"
              className="rounded-full w-36 h-36 mr-5"
            />
            <button
              onClick={handleClick}
              className="mt-3 inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-orange-600 rounded-lg h-[60px]"
            >
              Edit Profile
            </button>
          </div>
          <div className="detail-profile  mx-12 flex">
            <div className="field">
              <p className="mb-2">Name</p>
              <p className="mb-2">Age</p>
              <p className="mb-2">Gender</p>
              <p className="mb-2">Address</p>
              <p className="mb-2">Phone Number</p>
              <p className="mb-2">Email</p>
              <p className="mb-2">Affiliate Code</p>
            </div>
            <div className="field-detail ml-8">
              <p className="mb-2">{user.name}</p>
              <p className="mb-2">{user.age}</p>
              <p className="mb-2">{user.gender}</p>
              <p className="mb-2">{user.full_address}</p>
              <p className="mb-2">Phone Number</p>
              <p className="mb-2">{user.email}</p>
              <p className="mb-2">KLS798</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
