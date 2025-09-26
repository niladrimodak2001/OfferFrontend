import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import TemplateModal from "../components/TemplateModal";
import { Trash2 } from "lucide-react";
import { NotepadTextDashed } from "lucide-react";
import { useNavigate } from "react-router";

function Template() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    role: "",
  
    tname: "",
    minYearExp: "",
    maxYearExp: "",
    CTC: "",
  });
 

  const navigator=useNavigate();

  const getAllTemplates = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/template/getAll`
      );
      setTemplates(data?.data?.templates);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTemplates();
  }, []);

  const handleOpenModal = (template = null) => {
    setSelectedTemplate(template);
    setFormData(
      template || {
        role: "",
       
        tname: "",
        minYearExp: "",
        maxYearExp: "",
        CTC: "",
      }
    );
    setOpenModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTemplate) {
        await axios.put(
          `${import.meta.env.VITE_BASE_API_URL}/template/update/${
            selectedTemplate._id
          }`,
          formData
        );
        toast.success("Template updated successfully!");
      } else {
        await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}/template/create`,
          formData
        );
        toast.success("Template created successfully!");
      }
      setOpenModal(false);
      getAllTemplates();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save template");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
        Loading Templates...
      </div>
    );
  }
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          📑 Offer Letter Templates
        </h1>
        <div className="flex gap-3 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search templates..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleOpenModal()}
            className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-all"
          >
            + Create Template
          </button>
          <button onClick={()=>{navigator("/history")}} className="cursor-pointer px-5 py-2 bg-violet-600 text-white font-medium rounded-lg shadow hover:bg-violet-700 transition-all">
            History
          </button>
        </div>
      </div>

      {/* Templates Section */}
      {templates?.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5 border border-gray-100"
            >
              <div className="flex justify-end">
                <Trash2 className="text-red-500 cursor-pointer hover:text-red-700" />
              </div>
              <div className="flex h-40 flex-col gap-1 ">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {t.role}
                </h2>

                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Template Name:</span> {t.tname}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Experience:</span>{" "}
                  {t.minYearExp} - {t.maxYearExp} years
                </p>
                {/* <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">CTC:</span> ₹
                  {t.CTC?.toLocaleString()}
                </p> */}
              </div>
              <div className="flex gap-2  items-center cursor-pointer">
                {/* <button
                  onClick={() => {
                    navigator(`/addFields/${t?._id}`);
                  }}
                  className="w-fit cursor-pointer flex gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
                >
                  <NotepadTextDashed />
                  Add Fields
                </button> */}
                <button
                  onClick={() => {
                    navigator(`/useTemplete/${t.role}`);
                  }}
                  className="w-fit cursor-pointer flex gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
                >
                  <NotepadTextDashed />
                  Use Template
                </button>
                <button
                  onClick={() => handleOpenModal(t)}
                  className="w-fit px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
                >
                  ✏️ Edit Template
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          No templates found. Create one to get started!
        </div>
      )}
      {/* Modal */}
      <TemplateModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEdit={!!selectedTemplate}
      />
    </div>
  );
}

export default Template;
