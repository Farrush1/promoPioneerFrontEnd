"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const router = useRouter();
  const handleClick = async (e) => {
	e.preventDefault()
    try {
      const login = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const user = await login.json();
      console.log(user);
      if (user.role === "ADMIN") {
        console.log('masuk')
        router.push("/dashboard");
      }
      // router.push('/')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main-h-full flex items-center justify-center mt-32 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            or
            <a
              href="./register"
              className="text-blue-500 hover:text-blue-600hover:text-indigo-500 px-2"
            >
              Register
            </a>
          </p>
        </div>

        <form className="space-y-8">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                onChange={handleChange}
                value={formData.email}
                name="email"
                autoComplete="none"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                text-gray-900 rounded-t-md mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                type="password"
                autoComplete="none"
                required
                onChange={handleChange}
                value={formData.password}
                name="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                text-gray-900 rounded-b-md mb-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-md"
                />
                <label htmlFor="" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <a
                href="./password"
                className="text-blue-500 hover:text-blue-600hover:text-indigo-500 px-2"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div>
            <button
              onClick={handleClick}
              className="w-full flex justify-center items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-md"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
