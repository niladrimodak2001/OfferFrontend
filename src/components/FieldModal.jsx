import axios from "axios";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

function FieldModal({ category, onClose, selectedField, fetchFields ,setSelectedField}) {
  const [selectedCategory, setSelectedCategory] = useState(
    selectedField?.category?._id || null
  );
  const [value, setValue] = useState(selectedField?.value || "");
  const [highlighted, setHighlighted] = useState("");
  const [save, setSave] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (selectedField){console.log("came") ; updatePreview(selectedField?.value);}
  }, [selectedField]);

  const updatePreview = (val) => {
    const html = val.replace(/\$\{(.*?)\}/g, (match, p1) => {
      return `<span class="bg-yellow-200 text-blue-700 font-semibold px-1 rounded">${p1}</span>`;
    });
    setHighlighted(html);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    updatePreview(e.target.value);
  };

  const makeVariable = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === end) return;

    const selectedText = value.slice(start, end);
    const variableFormat = `\${${selectedText}}`;
    const newValue = value.slice(0, start) + variableFormat + value.slice(end);

    setValue(newValue);
    updatePreview(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + variableFormat.length,
        start + variableFormat.length
      );
    }, 0);
  };

  const handleSaveField = async () => {
    try {
      setSave(true);
      console.log(value,selectedCategory)
      if (!selectedField) {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}/field/create`,
          {
            value: value,
            category: selectedCategory,
          }
        );
        toast.success("Field created successfully");
      } else {
        const { data } = await axios.put(
          `${import.meta.env.VITE_BASE_API_URL}/field/${selectedField?._id}`,
          {
            value: value,
            category: selectedCategory,
          }
        );
        toast.success("Field updated successfully");
        
      }
      await fetchFields();
      onClose();
      setSelectedField(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error in creating field");
    } finally {
      setSave(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 overflow-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl relative flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>

        {/* Scrollable content */}
        <div className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Add Field
          </h2>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <select
              className="w-1/3 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value={null}>Select Category</option>
              {category?.map((cat) => (
                <option name={cat?.name} value={cat?._id} key={cat?._id}>
                  {cat?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Value */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Value
            </label>

            <div className="flex gap-2 items-start">
              <textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                rows={5}
                className="flex-1 text-lg text-gray-800 border rounded p-2"
                placeholder="Type your value here..."
              />
              <button
                onClick={makeVariable}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition self-start"
              >
                Make Variable
              </button>
            </div>

            {/* Preview */}
            <div
              className="p-3 border rounded bg-gray-50 text-lg text-gray-800 mt-2"
              dangerouslySetInnerHTML={{
                __html: (highlighted || value).replace(/\n/g, "<br>"),
              }}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              disabled={save}
              onClick={handleSaveField}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {save ? "Saving... " : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FieldModal;
