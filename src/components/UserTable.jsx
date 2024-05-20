import React from "react";

const UserTable = () => {
  const renderActionBox = () => {
    return (
      <div className="flex justify-center items-center h-full">
        <input type="checkbox" className="checkbox" />
      </div>
    );
  };

  return (
    <div className="overflow-x-auto shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 shadow-md bg-white">
        <thead className="bg-gray-50 text-center">
          <tr>
            <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
              User ID
            </th>
            <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone Number
            </th>
            <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
              City
            </th>
            <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-center">
          <tr className="hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              1
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              Nama 1
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              Indonesia
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              +62 999999999
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <button className="btn bg-[#ea580c] text-white">View</button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {renderActionBox()}
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              2
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              Nama 2
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              Indonesia
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              +62 999999999
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <button className="btn bg-[#ea580c] text-white">View</button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {renderActionBox()}
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              3
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              Nama 3
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              Indonesia
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              +62 999999999
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <button className="btn bg-[#ea580c] text-white">View</button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {renderActionBox()}
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              4
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              Nama 4
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              Indonesia
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              +62 999999999
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <button className="btn bg-[#ea580c] text-white">View</button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {renderActionBox()}
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              5
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              Nama 5
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              Indonesia
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              +62 999999999
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <button className="btn bg-[#ea580c] text-white">View</button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {renderActionBox()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
