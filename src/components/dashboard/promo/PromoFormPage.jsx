'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { createPromo, editPromo } from '@/repository/promo';

const CreateFormPage = ({ id }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    discountPercent: '',
    quantity: '',
    isLimitedQuantity: false,
    isLimitedTime: false,
    startDate: '',
    endDate: '',
    promoTypeId: '',
  });

  const [promoTypes, setPromoTypes] = useState([]);

  useEffect(() => {
    const fetchUpdate = async (id) => {
      if (!id) return; // Only fetch if ID is provided
      try {
        const response = await fetch(`http://localhost:5000/api/promo/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFormData({
          name: data.promo.name || '',
          discountPercent: data.promo.discount_percent || '',
          quantity: data.promo.quantity || '',
          isLimitedQuantity: data.promo.isLimitedQuantity || false,
          isLimitedTime: data.promo.isLimitedTime || false,
          // problem date
          startDate: data.promo.startDate
            ? formatDateTimeLocal(data.promo.start_date)
            : '',
          endDate: data.promo.endDate
            ? formatDateTimeLocal(data.promo.end_date)
            : '',
          // end problem date
          promoTypeId: data.promo.PromoType.id || '',
        });
      } catch (error) {
        console.error('There was an error fetching the promo!', error);
      }
    };

    fetchUpdate(id);
  }, [id]);

  useEffect(() => {
    const fetchPromoTypes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/promo-types');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPromoTypes(data.promoType);
      } catch (error) {
        console.error('There was an error fetching the promo types!', error);
      }
    };

    fetchPromoTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      discountPercent: parseInt(formData.discountPercent),
      quantity: parseInt(formData.quantity),
      isLimitedQuantity: formData.isLimitedQuantity,
      isLimitedTime: formData.isLimitedTime,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      promoTypeId: parseInt(formData.promoTypeId),
    };
    try {
      if (id) {
        await editPromo(id, payload);
      } else {
        await createPromo(payload);
      }
      setFormData({
        name: '',
        discountPercent: '',
        quantity: '',
        isLimitedQuantity: false,
        isLimitedTime: false,
        startDate: '',
        endDate: '',
        promoTypeId: '',
      });
      toast.success('Successfully created promo!');
      setTimeout(() => {
        router.push('/dashboard/promo');
      }, 3000); // 3-second delay
      // router.push("/dashboard/promo");
    } catch (error) {
      console.error('There was an error creating the promo!', error);
    }
  };

  const formatDateTimeLocal = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-5">
        {id ? 'Update' : 'Create'} Promo
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount Percent
          </label>
          <input
            type="number"
            name="discountPercent"
            value={formData.discountPercent}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Is Limited Quantity
          </label>
          <input
            type="checkbox"
            name="isLimitedQuantity"
            checked={formData.isLimitedQuantity}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Is Limited Time
          </label>
          <input
            type="checkbox"
            name="isLimitedTime"
            checked={formData.isLimitedTime}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Promo Type
          </label>
          <select
            name="promoTypeId"
            value={formData.promoTypeId}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="" disabled>
              Select a Promo Type
            </option>
            {promoTypes.map((promoType) => (
              <option key={promoType.id} value={promoType.id}>
                {promoType.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="mt-2 w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm"
          >
            {id ? 'Update' : 'Create'} Promo
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFormPage;
