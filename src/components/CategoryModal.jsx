import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function CategoryModal({ isOpen, onClose, onSubmit, category }) {
  const [name, setName] = useState(category?.name || "");
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {category?"Edit Category":"Add Category"}
        </h2>

        {/* Input */}
        <div className="mb-6">
          <label
            htmlFor="categoryName"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            id="categoryName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              onSubmit(name);
              onClose();
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;
