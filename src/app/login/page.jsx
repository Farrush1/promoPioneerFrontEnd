'use client';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCookies } from 'react-cookie';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const [_cookies, setCookies, _removeCookie] = useCookies(['accessToken']); // untuk simpan cookies

  // fetch post login
  const login = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      if (data.role === 'ADMIN') {
        setCookies('accessToken', data.accessToken);
        toast.success('You are logged in as ADMIN', { duration: 3000 });
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      } else {
        setCookies('accessToken', data.accessToken);
        toast.success('Successful login', { duration: 3000 });
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  // simpan nilai input
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ marginTop: '65px' }}
      />
      <div className="max-w-md w-full space-y-16">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            or
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-600hover:text-indigo-500 px-2"
            >
              Register
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col gap-4">
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
          </div>
          {/* <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-md"
                />
                <label
                  htmlFor=""
                  className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
            </div>
          </div> */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 bg-gradient-to-l from-orange-600 to-orange-500 hover:bg-orange-700 text-white font-bold rounded-md shadow-md hover:translate-x-1 hover:translate-y-1 duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
