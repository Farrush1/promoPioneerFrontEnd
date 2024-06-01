"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();

        if (data && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error('Fetched data is not an array:', data);
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const handleViewUser = (userId) => {
    router.push(`/dashboard/user/${userId}`);
  };

  return (
    <div className="overflow-x-auto shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 shadow-md bg-white">
        <thead className="bg-gray-50 text-center">
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              User ID
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              View
            </th>
            
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-center">
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.full_address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button className="btn bg-[#ea580c] text-white ml-2" onClick={() => handleViewUser(user.id)}>View</button>
                </td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
