import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem"; // ✅ your custom useSortable component
import { Check } from "lucide-react";
import OfferLetterPDF from "../components/OfferLetterPDF";
import { pdf, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PdfPreview from "./PdfPreview";

function AddPoliciesOfferLetter() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addedCategories, setAddedCategories] = useState([]);
  const [allAddedFields, setAllAddedFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [finalSelectedFields, setFinalSelectedFields] = useState([]);
  const [descCategory, setDescCategory] = useState(null);
  const [removeSelectedFields, setRemoveSelectedFields] = useState([]);
  const [placeholderValues, setPlaceholderValues] = useState({});
  const [showPdf,setShowPdf]=useState(false)
  const [offerLetter, setOfferLetter] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const generatePdf = async () => {
      // Render <OfferLetterPDF /> into a blob
      const blob = await pdf(
        <OfferLetterPDF offerLetter={offerLetter} />
      ).toBlob();
      setPdfUrl(URL.createObjectURL(blob));
    };
    generatePdf();

  }, [offerLetter]);





  const { offerLetterId } = useParams();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/category/all`
      );
      setCategories(data?.data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error fetching categories"
      );
    }
  };

  const fetchAddedCategories = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/offerLetter/${offerLetterId}/getAddedCategories`
      );
      setAddedCategories(data?.data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error fetching added categories"
      );
    }
  };

  const fetchFields = async (categoryId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/field/get/${categoryId}`
      );
      setAllAddedFields(data?.data || []);
      setSelectedFields([]);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching fields");
    }
  };


  const reOrder = async (newOrder) => {
    try {
      await axios.put(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/offerLetter/${offerLetterId}/reorderCategories`,
        { categories: newOrder.map((nw) => nw.category._id) }
      );
      toast.success("Category reordered successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error in reordering categories"
      );
    }
  };


  const handleAddCategory = async () => {
    if (!selectedCategory) {
      toast.warning("Please select a category");
      return;
    }
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/offerLetter/${offerLetterId}/addCategory`,
        { category: selectedCategory }
      );
      toast.success("Category added successfully");
      fetchAddedCategories();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error adding category");
    }
  };


  const handleFieldToggle = (field) => {
    if (selectedFields.find((f) => f._id === field._id)) {
      setSelectedFields((prev) => prev.filter((f) => f._id !== field._id));
    } else {
      setSelectedFields((prev) => [...prev, field]);
    }
  };

 
  const handleAddFields = async () => {
    if (selectedFields.length === 0) {
      toast.warning("Please select at least one field");
      return;
    }
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/offerLetter/${offerLetterId}/category/${descCategory}/addFieldsToTemplate`,
        { fields: selectedFields.map((f) => f._id) }
      );

      // Move to finalSelectedFields
      setFinalSelectedFields((prev) => [
        ...prev,
        ...selectedFields.filter((f) => !prev.find((p) => p._id === f._id)),
      ]);

      // Remove from allAddedFields
      setAllAddedFields((prev) =>
        prev.filter((f) => !selectedFields.find((sf) => sf._id === f._id))
      );

      setSelectedFields([]);
      toast.success("Fields added successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error adding fields");
    }
  };

  const getAddedFields = async () => {
    if (!descCategory) return;
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/offerLetter/${offerLetterId}/category/${descCategory}/getFields`
      );
      setFinalSelectedFields(data?.fields || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching fields");
    }
  };

  const handleRemoveToggle = (field) => {
    if (removeSelectedFields.find((f) => f._id === field._id)) {
      setRemoveSelectedFields((prev) =>
        prev.filter((f) => f._id !== field._id)
      );
    } else {
      setRemoveSelectedFields((prev) => [...prev, field]);
    }
  };


  // const handleRemoveFields = async () => {
  //   if (removeSelectedFields.length === 0) {
  //     toast.warning("Please select at least one field to remove");
  //     return;
  //   }
  //   try {
  //     await axios.post(
  //       `${
  //         import.meta.env.VITE_BASE_API_URL
  //       }/offerLetter/${offerLetterId}/category/${descCategory}/deleteFields`,
  //       { fieldIds: removeSelectedFields.map((f) => f._id) }
  //     );


  //     setAllAddedFields((prevAll) => {

  //       const updatedAvailable = [...new Set(...prevAll, ...removeSelectedFields)];
        

  //       setFinalSelectedFields((prevSelected) =>
  //         prevSelected.filter(
  //           (f) => !removeSelectedFields.find((sf) => sf._id === f._id)
  //         )
  //       );

  //       return updatedAvailable;
  //     });

  //     setRemoveSelectedFields([]);
  //     toast.success("Fields removed successfully");
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message || "Error removing fields");
  //   }
  // };

  const handleRemoveFields = async () => {
    if (removeSelectedFields.length === 0) {
      toast.warning("Please select at least one field to remove");
      return;
    }

    try {
      await axios.post(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/offerLetter/${offerLetterId}/category/${descCategory}/deleteFields`,
        { fieldIds: removeSelectedFields.map((f) => f._id) }
      );

      setFinalSelectedFields((prevSelected) =>
        prevSelected.filter(
          (f) => !removeSelectedFields.some((sf) => sf._id === f._id)
        )
      );

      setAllAddedFields((prevAll) => {
        // Add back the removed fields, but ensure uniqueness by _id
        const combined = [...prevAll, ...removeSelectedFields];
        const unique = combined.filter(
          (f, index, self) => index === self.findIndex((x) => x._id === f._id)
        );
        return unique;
      });

      setRemoveSelectedFields([]);
      toast.success("Fields removed successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error removing fields");
    }
  };



  const handlePlaceholderChange = (fieldId, placeholderType, value) => {
    setPlaceholderValues((prev) => ({
      ...prev,
      [fieldId]: {
        ...prev[fieldId],
        [placeholderType]: value,
      },
    }));
  };

  useEffect(() => {
    fetchCategories();
    fetchAddedCategories();
  }, []);

  useEffect(() => {
    if (descCategory) {getAddedFields();};
  }, [descCategory]);

const handleSaveOfferLetter = async () => {
  const payload = finalSelectedFields.map((field) => ({
    fieldId: field._id,
    values: placeholderValues[field._id] || {},
  }));

  try {
    await axios.post(
      `${
        import.meta.env.VITE_BASE_API_URL
      }/offerLetter/${offerLetterId}/category/${descCategory}/saveFields`,
      { fields: payload }
    );
    toast.success("Placeholder values saved successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error saving placeholders");
  }
};

// useEffect(() => {
//   if (offerLetterData?.fields) {
//     const initial = {};
//     offerLetterData.fields.forEach((f) => {
//       initial[f._id] = f.values || {};
//     });
//     setPlaceholderValues(initial);
//   }
// }, [offerLetterData]);

const fetchPlaceholderValues = async (categoryId) => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_BASE_API_URL
      }/offerLetter/${offerLetterId}/category/${categoryId}/getPlaceholderValues`
    );

    // Convert array of fieldValues to object keyed by fieldId
    const initialValues = {};
    data?.data?.forEach((fv) => {
      initialValues[fv.fieldId._id] = fv.values || {};
    });

    setPlaceholderValues(initialValues);
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Error fetching placeholder values"
    );
  }
};


const fetchOfferLetter = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/offerLetter/${offerLetterId}`
    );
    setOfferLetter(data?.data);
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Error fetching offer letter"
    );
  }
};

// Call fetchOfferLetter on component mount
useEffect(() => {
  fetchOfferLetter();
}, []);


  return (
    <div className="w-full flex min-h-screen">
      {/* ================= Left Panel: Categories ================= */}
      <div className="w-1/4 border p-4 flex flex-col">
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories?.map((cat) => (
            <option key={cat?._id} value={cat?._id}>
              {cat?.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddCategory}
          className="mb-4 w-fit px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
        >
          Add Category
        </button>

        <h1 className="text-lg font-bold text-blue-500 mb-2">
          Added Categories
        </h1>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }) => {
            if (!over || active.id === over.id) return;

            const oldIndex = addedCategories.findIndex(
              (i) => i._id.toString() === active.id
            );
            const newIndex = addedCategories.findIndex(
              (i) => i._id.toString() === over.id
            );

            const newOrder = arrayMove(addedCategories, oldIndex, newIndex);
            setAddedCategories(newOrder);
            reOrder(newOrder);
          }}
        >
          <SortableContext
            items={addedCategories.map((c) => c._id.toString())}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-2 overflow-y-auto">
              {addedCategories.map((cat) => (
                <SortableItem key={cat._id} id={cat._id.toString()}>
                  <div
                    onDoubleClick={() => {
                      fetchFields(cat?.category?._id);
                      setDescCategory(cat?.category?._id);
                      fetchPlaceholderValues(cat?.category?._id);
                    }}
                    className={`w-full p-2 rounded-xl border cursor-pointer font-semibold ${
                      selectedCategory === cat?.category?._id
                        ? "bg-blue-100 border-blue-500"
                        : ""
                    }`}
                  >
                    {cat?.category?.name}
                  </div>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* ================= Right Panel: Fields ================= */}
      <div className="flex-1 w-3/4 border p-4">
        <div className="w-full flex justify-end  items-center">
          <button
            onClick={() => {
              fetchOfferLetter();
              setShowPdf(!showPdf);
            }}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {showPdf ? "Close PDF" : "Preview PDF"}
          </button>
        </div>
        {!descCategory && (
          <p className="text-lg font-bold">
            Please double click on category to select one
          </p>
        )}
        {descCategory &&
        allAddedFields.length === 0 &&
        finalSelectedFields.length === 0 ? (
          <p className="text-lg font-bold">No fields found for this category</p>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Available Fields */}
            {allAddedFields.length > 0 && (
              <>
                <h1 className="text-lg font-bold text-blue-500">
                  Available Fields
                </h1>
                {allAddedFields
                  ?.filter(
                    (f) => !finalSelectedFields.some((sel) => sel._id === f._id)
                  )
                  ?.map((f) => (
                    <div
                      key={f._id}
                      className="flex justify-between gap-2 p-2 border rounded-lg bg-gray-50"
                    >
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: f?.value
                            ?.replace(
                              /\$\{(.*?)\}/g,
                              (_, p1) =>
                                `<span class="bg-yellow-200 text-blue-700 font-semibold px-1 rounded">${p1}</span>`
                            )
                            .replace(/\n/g, "<br>"),
                        }}
                        className="font-medium text-gray-800"
                      />
                      <input
                        type="checkbox"
                        checked={
                          !!selectedFields.find((sf) => sf._id === f._id)
                        }
                        onChange={() => handleFieldToggle(f)}
                        className="w-5 h-5"
                      />
                    </div>
                  ))}

                <button
                  onClick={handleAddFields}
                  className="mt-2 w-fit px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                >
                  Add Selected Fields
                </button>
              </>
            )}

            {/* Selected Fields */}
            {finalSelectedFields.length > 0 && (
              <>
                <div className="flex w-full justify-between">
                  <h1 className="text-lg font-bold text-blue-500">
                    Selected Fields
                  </h1>
                  <button
                    className="mt-2 flex gap-2 w-fit px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                    onClick={handleSaveOfferLetter}
                  >
                    <Check />
                    Save Data
                  </button>
                </div>

                {finalSelectedFields.map((f, idx) => (
                  <>
                    <div
                      key={f._id}
                      className="flex justify-between gap-2 p-2 border rounded-lg bg-green-50"
                    >
                      <div className="flex gap-2">
                        <span className="text-gray-500 font-semibold">
                          {idx + 1}.
                        </span>
                        <h3
                          dangerouslySetInnerHTML={{
                            __html: f?.value
                              ?.replace(
                                /\$\{(.*?)\}/g,
                                (_, p1) =>
                                  `<span class="bg-yellow-200 text-blue-700 font-semibold px-1 rounded">${p1}</span>`
                              )
                              .replace(/\n/g, "<br>"),
                          }}
                          className="font-medium text-gray-800"
                        />
                      </div>
                      <input
                        type="checkbox"
                        checked={
                          !!removeSelectedFields.find((sf) => sf._id === f._id)
                        }
                        onChange={() => handleRemoveToggle(f)}
                        className="w-5 h-5"
                      />
                    </div>
                    <div className="w-full h-fit  flex-col overflow-auto">
                      <div className="flex gap-2">
                        <h1 className="text-blue-500 font-bold">
                          Placeholders
                        </h1>
                      </div>
                      <div className=" flex gap-4 h-fit p-6">
                        {f?.placeHolders?.map((p) => (
                          <div
                            key={p.type}
                            className="flex flex-col items-center justify-center"
                          >
                            <label className="text-center font-bold text-sm">
                              {p.type}
                            </label>
                            <input
                              placeholder={`Enter ${p.type}`}
                              value={placeholderValues[f._id]?.[p.type] || ""}
                              onChange={(e) =>
                                handlePlaceholderChange(
                                  f._id,
                                  p.type,
                                  e.target.value
                                )
                              }
                              className="border rounded-xl py-1 px-2"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ))}

                <button
                  onClick={handleRemoveFields}
                  className="mt-2 w-fit px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                >
                  Remove Selected Fields
                </button>
              </>
            )}
          </div>
        )}
        {/* Preview PDF */}

        {showPdf && offerLetter && (
          <div className="w-full ">
            <PdfPreview

              offerLetter={offerLetter}
              fetchOfferLetter={fetchOfferLetter}
            />
          </div>
        )}

        {/* Download PDF */}
        {/* {offerLetter && (
          <PDFDownloadLink
            document={<OfferLetterPDF offerLetter={offerLetter} />}
            fileName="offer_letter.pdf"
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {({ loading }) => (loading ? "Loading..." : "Download PDF")}
          </PDFDownloadLink>
        )} */}
      </div>
    </div>
  );
}

export default AddPoliciesOfferLetter;
