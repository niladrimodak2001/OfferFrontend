import { MoveLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import axios from "axios";
import CategoryModal from "../components/CategoryModal";
import toast from "react-hot-toast";
import FieldModal from "../components/FieldModal";

function ManageMasterData() {
  const [type, setType] = useState("Category");
  const [category, setCategory] = useState([]);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openFieldModal, setOpenFieldModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/category/all`
      );
      setCategory(data?.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFields = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/field/all`
      );
      setFields(data?.data?.fields);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error in fetching fields");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type === "Category") fetchCategories();
    if (type === "Field") fetchFields();
  }, [type]);

  const handleAddOrEditCategory = async (name) => {
    try {
      if (!selectedCategory) {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}/category/create`,
          { name }
        );
        setCategory((prev) => [...prev, data.data]);
      } else {
        const { data } = await axios.put(
          `${import.meta.env.VITE_BASE_API_URL}/category/${
            selectedCategory?._id
          }`,
          { name }
        );
        console.log("update", data);
        await fetchCategories();
        setOpenCategoryModal(false);
        toast.success("Category updated successfully");
      }
    } catch (error) {
      if (selectedCategory) toast.error("Error in editing category");
      else toast.error("Error in creating category");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Fetching Master Data ...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 px-8 py-10">
      <div className="max-w-full mx-auto bg-white shadow-2xl rounded-lg p-10">
        <div className="text-4xl flex font-semibold text-gray-800 mb-8 text-center border-b pb-4">
          <button
            onClick={() => {
              navigator("/");
            }}
            className="flex justify-center items-center cursor-pointer "
          >
            <MoveLeft />
          </button>
          <div className="w-full flex justify-center items-center">
            Manage Master Data
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          {/* Dropdown */}
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Type
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Category">Category</option>
              <option value="Field">Field</option>
            </select>
          </div>

          {/* Button */}
          <div className="w-full md:w-auto mt-4 md:mt-7">
            <button
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 shadow-md"
              onClick={() => {
                if (type === "Category") {
                  setOpenCategoryModal(true);
                  setSelectedCategory(null);
                } else {
                    setOpenFieldModal(true)
                    setSelectedField(null);
                };
              }}
            >
              Add {type}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {type === "Category" ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden border">
                <thead className="bg-blue-100 text-gray-700">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold border-b">
                      Sl no.
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold border-b">
                      Category Name
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold border-b">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category?.length > 0 ? (
                    category?.map((item, index) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50 transition duration-200"
                      >
                        <td className="px-6 py-4 border-b text-sm text-gray-700">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 border-b text-sm text-gray-800">
                          {item?.name}
                        </td>
                        <td className="px-6 py-4 border-b text-sm">
                          <button
                            onClick={() => {
                              setSelectedCategory(item);
                              setOpenCategoryModal(true);
                            }}
                            className="text-blue-600 hover:underline mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="px-6 py-4 text-center text-gray-500 italic"
                        colSpan="3"
                      >
                        No Category available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            type === "Field" && (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden border">
                  <thead className="bg-blue-100 text-gray-700">
                    <tr>
                      <th className="text-center w-20 px-6 py-4 text-sm font-semibold border">
                        Sl no.
                      </th>
                      <th className="text-center w-72 px-6 py-4 text-sm font-semibold border">
                        Category Name
                      </th>
                      <th className="text-center w-2/5 px-6 py-4 text-sm font-semibold border">
                        Values
                      </th>
                      <th className="text-center px-6 py-4 text-sm font-semibold border">
                        Placeholders
                      </th>
                      <th className="text-center px-6 py-4 text-sm font-semibold border">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields?.length > 0 ? (
                      fields?.map((item, index) => (
                        <tr
                          key={item._id}
                          className="hover:bg-gray-50 transition duration-200 "
                        >
                          <td className="text-center w-20 px-6 py-4 border-b text-sm text-gray-700 border">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 w-72 border-b text-sm text-gray-800 border">
                            {item?.category?.name}
                          </td>
                          <td
                            className="text-center w-2/5 px-6 py-4 border-b text-sm text-gray-800 border"
                            dangerouslySetInnerHTML={{
                              __html: item?.value
                                ?.replace(/\$\{(.*?)\}/g, (match, p1) => {
                                  return `<span class="bg-yellow-200 text-blue-700 font-semibold px-1 rounded">${p1}</span>`;
                                })
                                .replace(/\n/g, "<br>"),
                            }}
                          />
                          <td className="text-center px-6 py-4 border-b text-sm text-gray-800 border">
                            {item?.placeHolders?.map((place)=><div>
                                <h1>{place?.type} : {place?.value||"-"}</h1>
                            </div>)}
                          </td>
                          <td className="px-6 py-4 border-b text-sm ">
                            <button
                              onClick={() => {
                                setSelectedField(item);
                                setOpenFieldModal(true);
                              }}
                              className="text-blue-600 hover:underline mr-4"
                            >
                              Edit
                            </button>
                            <button
                              // onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          className="px-6 py-4 text-center text-gray-500 italic"
                          colSpan="3"
                        >
                          No Fields available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>
      {openCategoryModal && (
        <CategoryModal
          isOpen={openCategoryModal}
          onClose={() => setOpenCategoryModal(false)}
          onSubmit={handleAddOrEditCategory}
          category={selectedCategory}
        />
      )}
      {openFieldModal && (
        <FieldModal
          category={category}
          onClose={() => setOpenFieldModal(false)}
          selectedField={selectedField}
          fetchFields={fetchFields}
          setSelectedField={setSelectedField}
        />
      )}
    </div>
  );
}

export default ManageMasterData;
