// import axios from "axios";
// import React, { useState } from "react";
// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import { useParams } from "react-router";

// function AddPolicies() {
//   const [category, setCategory] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [addedCategories, setAddedCategories] = useState([]);
//   const [selectFromAdded, setSelectFromAdded] = useState(null);
//   const [loading, setLoading] = useState({
//     fetchingCategory: false,
//     fetchingField: false,
//     fetchSelectedCategory: false,
//   });
//   const [allAddedFields, setAllAddedFields] = useState([]); // fields inside selected category
//   const { templateId } = useParams();

//   const fetchCategories = async () => {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_BASE_API_URL}/category/all`
//       );
//       console.log(data);
//       setCategory(data?.data);
//     } catch (error) {
//       toast.error(
//         error.response.data.message || "Error in fetching categories"
//       );
//     } finally {
//     }
//   };

//   const fetchFields = async () => {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_BASE_API_URL}/field/get/${selectedCategory}`
//       );
//       setFields(data?.data?.fields);
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Error in fetching fields");
//     } finally {
//     }
//   };

//   const fetchAddedCategories = async () => {
//     try {
//       const { data } = await axios.get(
//         `${
//           import.meta.env.VITE_BASE_API_URL
//         }/template/${templateId}/getAddedCategories`
//       );
//       console.log("fetching categories", data.data);
//       setAddedCategories(data?.data);
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || "Error in fetching the categories"
//       );
//     }
//   };
//   useEffect(() => {
//     fetchCategories();
//     fetchAddedCategories();
//   }, []);

//   const handleAddCategory = async () => {
//     try {
//       console.log(selectedCategory);
//       if (!selectedCategory) {
//         toast.warning("Please select category");
//         return;
//       }
//       const { data } = await axios.post(
//         `${
//           import.meta.env.VITE_BASE_API_URL
//         }/template/${templateId}/addCategory`,
//         { category: selectedCategory }
//       );

//       toast.success("Category added successfully");
//       fetchAddedCategories();
//       console.log("added category", data);
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || "Error in adding category to template"
//       );
//     }
//   };
//   useEffect(() => {
//     if (selectFromAdded) fetchFields();
//   }, [selectFromAdded]);
//   return (
//     <div className="w-full border flex min-h-screen">
//       <div className="w-1/4 min-h-full border">
//         <div className="w-full my-2 flex justify-end">
//           <button
//             // onClick={() => navigator(`/template/${t?._id}/addPolicies`)}
//             className="w-fit cursor-pointer flex gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
//           >
//             {/* <ClipboardPlus /> */}
//             Create Category
//           </button>
//         </div>
//         <div className="mb-2">
//           <select
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value={null}>Select Category</option>
//             {category?.map((cat) => (
//               <option name={cat?.name} value={cat?._id} key={cat?._id}>
//                 {cat?.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="w-full mb-6 flex justify-end">
//           <button
//             onClick={handleAddCategory}
//             className="w-fit cursor-pointer flex gap-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
//           >
//             Add Category
//           </button>
//         </div>
//         <div>
//           <h1 className="text-lg font-bold text-blue-500">Added Categories</h1>
//           <div className="flex flex-col gap-3 mt-5">
//             {addedCategories?.map((cat) => (
//               <div
//                 key={cat?._id}
//                 className="w-full p-2 rounded-xl border border-gray-300 cursor-pointer font-semibold"
//               >
//                 {cat?.category?.name}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="flex-1 min-h-full border">hjk</div>
//     </div>
//   );
// }

// export default AddPolicies;
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
import SortableItem from "./SortableItem"; // ✅ your custom component with useSortable

function AddPolicies() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addedCategories, setAddedCategories] = useState([]);
  const [allAddedFields, setAllAddedFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [finalSelectedFields, setFinalSelectedFields] = useState([]);
  const [descCategory,setDescCategory]=useState(null)
  const [removeSelectedFields, setRemoveSelectedFields] = useState([]);

  const { templateId } = useParams();

  // ✅ Fetch all categories
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

  // ✅ Fetch added categories for template
  const fetchAddedCategories = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/template/${templateId}/getAddedCategories`
      );
      setAddedCategories(data?.data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error fetching added categories"
      );
    }
  };

  // ✅ Fetch fields of a category
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

  // ✅ Reorder categories
  const reOrder = async (newOrder) => {
    try {
      await axios.put(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/template/${templateId}/reorderCategories`,
        {
          categories: newOrder.map((nw) => nw._id),
        }
      );
      toast.success("Category reordered successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error in re-ordering the categories"
      );
    }
  };

  // ✅ Add category to template
  const handleAddCategory = async () => {
    if (!selectedCategory) {
      toast.warning("Please select a category");
      return;
    }
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/template/${templateId}/addCategory`,
        { category: selectedCategory }
      );
      toast.success("Category added successfully");
      fetchAddedCategories();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error adding category");
    }
  };

  // ✅ Handle field toggle
  const handleFieldToggle = (field) => {
    if (selectedFields.find((f) => f._id === field._id)) {
        
      setSelectedFields((prev) => prev.filter((f) => f._id !== field._id));

    } else {
      setSelectedFields((prev) => [...prev, field]);
    }
  };

  // ✅ Move selected fields → Selected Fields
  const handleAddFields = async() => {
    if (selectedFields.length === 0) {
      toast.warning("Please select at least one field");
      return;
    }
    console.log("object",templateId,descCategory)
    const { data } = await axios.post(
      `${
        import.meta.env.VITE_BASE_API_URL
      }/template/${templateId}/category/${descCategory}/addFieldsToTemplate`,{
        fields:selectedFields.map((f)=>f._id)
      }
    );

    console.log(data)

    setFinalSelectedFields((prev) => [
      ...prev,
      ...selectedFields.filter((f) => !prev.find((p) => p._id === f._id)),
    ]);

    setAllAddedFields((prev) =>
      prev.filter((f) => !selectedFields.find((sf) => sf._id === f._id))
    );

    setSelectedFields([]);
    toast.success("Fields added successfully");
  };

  //get added fields
  const getAddedFields=async()=>{
    try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BASE_API_URL
          }/template/${templateId}/category/${descCategory}/getFields`
        );

        console.log("Fetching added fields",data)

        setFinalSelectedFields(data?.fields)
        

    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message||"Error in fetching added fields")
    }
  }
  //handle remove toggle
  const handleRemoveToggle = (field) => {
    if (removeSelectedFields.find((f) => f._id === field._id)) {
      setRemoveSelectedFields((prev) =>
        prev.filter((f) => f._id !== field._id)
      );
    } else {
      setRemoveSelectedFields((prev) => [...prev, field]);
    }
  };


  const handleRemoveFields = async () => {
    if (removeSelectedFields.length === 0) {
      toast.warning("Please select at least one field to remove");
      return;
    }

    try {
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/template/${templateId}/category/${descCategory}/deleteFields`,
        {
         fieldIds: removeSelectedFields.map((f) => f._id)  
        }
      );

      console.log(data)

      setFinalSelectedFields((prevSelected) =>
        prevSelected.filter(
          (f) => !removeSelectedFields.some((sf) => sf._id === f._id)
        )
      );

      setAllAddedFields((prevAll) => {
        
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


  useEffect(() => {
    fetchCategories();
    fetchAddedCategories();
  }, []);

  useEffect(()=>{
    if(descCategory)
    getAddedFields();
  },[descCategory])

  return (
    <div className="w-full flex min-h-screen">
      {/* ================= Left Panel: Categories ================= */}
      <div className="w-1/4 border p-4 flex flex-col">
        {/* Select Category */}
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

        {/* Add Button */}
        <button
          onClick={handleAddCategory}
          className="mb-4 w-fit px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
        >
          Add Category
        </button>

        <h1 className="text-lg font-bold text-blue-500 mb-2">
          Added Categories
        </h1>

        {/* Drag & Drop List */}
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
      <div className="flex-1 border p-4">
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
                            ?.replace(/\$\{(.*?)\}/g, (match, p1) => {
                              return `<span class="bg-yellow-200 text-blue-700 font-semibold px-1 rounded">${p1}</span>`;
                            })
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
                <h1 className="text-lg font-bold text-blue-500">
                  Selected Fields
                </h1>
                {finalSelectedFields.map((f, idx) => (
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
                            ?.replace(/\$\{(.*?)\}/g, (match, p1) => {
                              return `<span class="bg-yellow-200 text-blue-700 font-semibold px-1 rounded">${p1}</span>`;
                            })
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
      </div>
    </div>
  );
}

export default AddPolicies;
