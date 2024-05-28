/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

export default function AvatarUser() {
  const [avatar, setAvatar] = useState(null);

  const getAvatar = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/bio', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();
      setAvatar(data.users.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <>
      {avatar ? (
        <div
          tabIndex={0}
          role="button"
          className="px-0 w-[34px] h-[34px] border border-white rounded-full"
        >
          <img
            src={avatar}
            alt="Avatar"
            width={80}
            height={80}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      ) : (
        <div
          tabIndex={0}
          role="button"
          className="btn px-0 bg-transparent border-none hover:bg-transparent shadow-none h-0 min-h-0"
        >
          <FaUserCircle size={28} className="text-white translate-y-0.5" />
        </div>
      )}
    </>
  );
}
