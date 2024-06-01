'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UpdateBioForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    userCityId: '',
    fullAddress: '',
    age: '',
    gender: '',
    phoneNumber: '',
    avatar: null,
  });
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/bio', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data, 'kdjklajdkla');
        setFormData({
          name: data.users.name,
          userCityId: data.users.city_id,
          fullAddress: data.users.full_address,
          age: data.users.age,
          gender: data.users.gender,
          phoneNumber: data.users.phone_number,
          avatar: null,
        });
        // setFormData(data.users);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchBio();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cities', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        setCities(data.city);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDrop = (acceptedFiles) => {
    setFormData({
      ...formData,
      avatar: acceptedFiles[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('userCityId', formData.userCityId);
    form.append('fullAddress', formData.fullAddress);
    form.append('age', formData.age);
    form.append('gender', formData.gender);
    form.append('phoneNumber', formData.phoneNumber);
    if (formData.avatar) {
      form.append('avatar', formData.avatar);
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/bio', {
        method: 'PUT',
        credentials: 'include',
        body: form,
      });
      const data = await response.json();
      console.log(data);
      router.push('/user/bio');
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    multiple: false,
  });

  return (
    <div className="w-full bg-gray-50 shadow-md rounded p-6 h-fit">
      <h2 className="text-2xl font-bold mb-4">Update Bio</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="fullAddress"
            className="block text-gray-700 font-bold mb-2">
            Full Address
          </label>
          <input
            type="text"
            id="fullAddress"
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-gray-700 font-bold mb-2">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-gray-700 font-bold mb-2">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required>
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="userCityId"
            className="block text-gray-700 font-bold mb-2">
            City
          </label>
          <select
            id="userCityId"
            name="userCityId"
            value={formData.userCityId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required>
            <option value="">Select City</option>
            {cities.map(city => (
              <option
                key={city.id}
                value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="avatar"
            className="block text-gray-700 font-bold mb-2">
            Avatar
          </label>
          <div
            {...getRootProps()}
            className={`w-full p-4 border-2 border-dashed rounded ${
              isDragActive ? "border-blue-500" : "border-gray-300"
            }`}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-center text-blue-500">
                Drop the files here...
              </p>
            ) : (
              <p className="text-center text-gray-700">
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </p>
            )}
          </div>
          {formData.avatar && (
            <div className="mt-4">
              <p className="text-center text-gray-700">
                {formData.avatar.name}
              </p>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded hover:opacity-70 duration-300">
          Update Bio
        </button>
      </form>
    </div>
  );
}
