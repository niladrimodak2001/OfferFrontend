import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function HistoryPage() {
    const navigator=useNavigate();
  const historyData = [
    {
      refNo: "REF001",
      name: "John Doe",
      role: "Software Engineer",
      date: "2025-09-20",
      joiningDate: "2025-10-01",
      //url: "https://example.com/offer/ref001",
    },
    {
      refNo: "REF002",
      name: "Jane Smith",
      role: "UI/UX Designer",
      date: "2025-09-21",
      joiningDate: "2025-10-05",
      //url: "https://example.com/offer/ref002",
    },
  ];
  const [history,setHistory]=useState([])
  const getAllHistory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/template/history`
      );
      setHistory(data?.data)
    } catch (error) {
      next(error);
    }
  };
  useEffect(() => {
    getAllHistory();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                Reference No
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                Role
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                Joining Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                URL
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800 border-b">
                  {item?.ref}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">
                  {item?.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">
                  {item?.role}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">
                  {item?.date}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 border-b">
                  {item?.joining_date}
                </td>
                <td className="px-4 py-2 text-sm border-b">
                  <a
                    href={item.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </td>
                <td className="px-4 py-2 text-sm border-b space-x-2">
                  <button onClick={()=>{navigator(`/useTemplete/${item?.role}/edit/${item?._id}`);}} className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryPage;
