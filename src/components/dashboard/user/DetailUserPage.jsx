'use client';
import React, { useEffect, useState } from 'react';

export default function DetailUserPage({ userParams }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchBio = async () => {
      const bio = await fetch(`http://localhost:5000/api/users/${userParams}`, {
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
    <div className=" ml-3 p-5 w-full">
      <h1 className="text-xl font-bold">User</h1>
      <div className="flex">
        <div className="photo justify-center mt-5">
          <img
            src="https://res.cloudinary.com/dmvigke9d/image/upload/v1715222943/pxbzwswjqjk5hndkoonf.jpg"
            alt="alt"
            className="rounded-full w-36 h-36 mr-5"
          />
        </div>
        <div className="detail-profile  mx-12 flex">
          <div className="field">
            <p className="mb-2">Id</p>
            <p className="mb-2">Name</p>
            <p className="mb-2">Age</p>
            <p className="mb-2">Gender</p>
            <p className="mb-2">Address</p>
            <p className="mb-2">Phone Number</p>
            <p className="mb-2">Email</p>
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
  );
}
