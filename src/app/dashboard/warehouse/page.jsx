
'use client';

import React, { useEffect, useState } from 'react';
import { getWarehouse } from '@/libs/fetch/warehouse/index';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';

export default function Warehouse() {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'city_id', direction: 'ascending' });

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const data = await getWarehouse();
        setWarehouses(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching warehouse:', error);
        setError('Failed to load warehouses');
      } finally {
        setLoading(false);
      }
    };
    fetchWarehouse();
  }, []);

  const sortedWarehouses = React.useMemo(() => {
    let sortableWarehouses = [...warehouses];
    if (sortConfig !== null) {
      sortableWarehouses.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableWarehouses;
  }, [warehouses, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        return <ChevronUpIcon className="w-4 h-4 inline" />;
      } else {
        return <ChevronDownIcon className="w-4 h-4 inline" />;
      }
    }
    return null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (warehouses.length === 0) {
    return <div>No warehouses available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold text-center mb-5">Warehouse</h1>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th onClick={() => requestSort('city_id')}>
              City ID {getSortIcon('city_id')}
            </th>
            <th onClick={() => requestSort('name')}>
              Name {getSortIcon('name')}
            </th>
            <th onClick={() => requestSort('address')}>
              Address {getSortIcon('address')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedWarehouses.map((warehouse) => (
            <tr key={warehouse.id} className="hover:bg-orange-100">
              <td className="border-t py-2 px-4 text-center">{warehouse.city_id}</td>
              <td className="border-t py-2 px-4">{warehouse.name}</td>
              <td className="border-t py-2 px-4">{warehouse.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}