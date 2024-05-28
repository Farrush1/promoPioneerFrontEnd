'use client';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    affiliateCode: '',
  });
  const router = useRouter();

  const register = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return false;
      }

      return true;
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
      return false;
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register();
    if (success) {
      toast.success('Successfully created account', { duration: 2000 });
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ marginTop: '65px' }}
      />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            or
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-600hover:text-indigo-500 px-2"
            >
              Login
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col gap-4">
            <input
              name="name"
              type="name"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm md:text-base"
              placeholder="Full Name"
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm md:text-base"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm md:text-base"
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              name="confirmPassword"
              type="password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm md:text-base"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            <input
              name="affiliateCode"
              type="text"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm md:text-base"
              placeholder="Affiliate Code"
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 bg-gradient-to-l from-orange-600 to-orange-500 hover:bg-orange-700 text-white font-bold rounded-md shadow-md hover:translate-x-1 hover:translate-y-1 duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
