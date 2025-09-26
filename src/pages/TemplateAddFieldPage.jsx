// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router";
// import toast from "react-hot-toast";
// import { Edit } from "lucide-react";

// const TemplateAddFieldPage = () => {
//   const [fields, setFields] = useState([]);
//   const [selectedField, setSelectedField] = useState(null);
//   const [allAddedFields, setAllAddedFields] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [inputType, setInputType] = useState("");
//   const [inputValue, setInputValue] = useState("");

//   const { templateId } = useParams();
//   console.log("template id", selectedField);

//   const fetchTemplateAddedFields = async (templateId) => {
//     try {
//       const { data } = await axios.get(
//         `${
//           import.meta.env.VITE_BASE_API_URL
//         }/template/getAllFieldsUnderTemplate/${templateId}`
//       );
//       console.log("added fields", data?.data?.allFields);
//       setAllAddedFields(data?.data?.allFields);
//     } catch (error) {
//       toast.error("Added fields cannot be fetched");
//     }
//   };

//   const fetchFields = async () => {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_BASE_API_URL}/field/getAllFields`
//       );
//       console.log("all fields", data?.data?.fields);
//       setFields(data?.data?.fields || []);
//     } catch (error) {
//       console.error("Error fetching fields:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddFields = async () => {
//     try {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_BASE_API_URL}/field/create`,
//         { header: inputType, value: inputValue, templateId: templateId }
//       );
//       console.log("after adding a new field", data);
//       toast.success("Field added successfully");
//       fetchTemplateAddedFields(templateId);
//     } catch (error) {
//       toast.error("Error in creating field");
//     }
//   };

//   useEffect(() => {
//     fetchTemplateAddedFields(templateId);
//     fetchFields();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-lg text-gray-600">Loading fields...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
//           Fields Manager
//         </h1>

//         <div className="flex gap-6 h-[75vh]">
//           {/* Left Panel */}
//           <div className="w-1/3 bg-gray-50 border-r rounded-lg p-6 flex flex-col">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">
//               Add New Field
//             </h2>
//             <div className="flex flex-col gap-3 mb-6">
//               <input
//                 onChange={(e) => setInputType(e.target.value)}
//                 placeholder="Enter field type"
//                 className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               <input
//                 onChange={(e) => setInputValue(e.target.value)}
//                 placeholder="Enter field value"
//                 className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               <button
//                 onClick={handleAddFields}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
//               >
//                 Add Field
//               </button>
//             </div>

//             <h2 className="text-lg font-semibold text-gray-700 mb-3">
//               All Added Fields
//             </h2>
//             <div className="flex-1 overflow-y-auto space-y-2">
//               {allAddedFields?.map((f) => (
//                 <div
//                   key={f?._id}
//                   onClick={() => setSelectedField(f?._id)}
//                   className={`p-3 rounded-lg border cursor-pointer hover:bg-blue-50 transition ${
//                     selectedField === f?._id
//                       ? "bg-blue-100 border-blue-400"
//                       : "bg-white"
//                   }`}
//                 >
//                   <h3 className="font-medium text-gray-800">{f?.header}</h3>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Panel */}
//           <div className="flex-1 bg-gray-50 rounded-lg p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <Edit className="text-blue-600" />
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Edit Current Field
//               </h2>
//             </div>

//             {selectedField ? (
//               allAddedFields
//                 ?.filter((f) => f._id === selectedField)
//                 ?.map((val) => (
//                   <div
//                     key={val._id}
//                     className="bg-white shadow-md rounded-lg p-6 border"
//                   >
//                     <div className="mb-4">
//                       <h3 className="text-sm font-medium text-gray-500">
//                         Header
//                       </h3>
//                       <p className="text-lg text-gray-800">{val?.header}</p>
//                     </div>
//                     <div className="mb-4">
//                       <h3 className="text-sm font-medium text-gray-500">
//                         Value
//                       </h3>
//                       <p className="text-lg text-gray-800">{val?.value}</p>
//                     </div>
//                     <div>
//                       <h3 className="text-sm font-medium text-gray-500 mb-2">
//                         Placeholders
//                       </h3>
//                       <div className="space-y-2">
//                         {val?.placeHolders?.map((p, idx) => (
//                           <div
//                             key={idx}
//                             className="p-3 bg-gray-50 border rounded-lg"
//                           >
//                             <p className="text-gray-700">
//                               <span className="font-medium">Type:</span>{" "}
//                               {p.type}
//                             </p>
//                             <p className="text-gray-700">
//                               <span className="font-medium">Value:</span>{" "}
//                               {p.value}
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//             ) : (
//               <p className="text-gray-500 italic">
//                 Select a field from the left panel to view details.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateAddFieldPage;
import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// import { CSS } from "@dnd-kit/utilities";  // 👈 keep this here

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { Edit } from "lucide-react";
import { MoveLeftIcon } from "lucide-react";
import { Save } from "lucide-react";
import SalaryFieldModal from "../components/SalaryFieldModal";
import LeaveModal from "../components/LeaveModal";
import { Edit2 } from "lucide-react";

const TemplateAddFieldPage = () => {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [allAddedFields, setAllAddedFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [inputType, setInputType] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editHeader, setEditHeader] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editPlaceholder, setEditPlaceholders] = useState([]);
  const [isAddPlaceholderValues, setIsAddPlaceholderValues] = useState(null);
  const [openSalaryModal, setOpenSalaryModal] = useState(false);
  const [in_hand, setInHand] = useState(0);
  const [earnings, setEarnings] = useState({
    basic: 0,
    hra: 0,
    leave_travel_allowance: 0,
    city_allowance: 0,
    personal_allowance: 0,
    conveyance_allowance: 0,
    performance_bonus: 0,
    variable_pay: 0,
  });
  const [deductions, setDeductions] = useState({
    pf: 0,
    epf: 0,
    gratuity: 0,
    professional_tax: 0,
    income_tax: 0,
    mediclaim: 0,
  });
  const [leave, setLeave] = useState({
    sick_leave: 0,
    casual_leave: 0,
    earned_leave: 0,
    public_holiday: 0,
    flexi_leave: 0,
    total: 0,
  });
  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const [leaveModalType, setLeaveModalType] = useState(null);
  const [CTC, setCTC] = useState(0);
  const [gross_salary, setGrossSalary] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  /**
   * Added by chatgpt
   */
  const [highlighted, setHighlighted] = useState("");
  const [menuPos, setMenuPos] = useState(null);

  const textareaRef = useRef(null);
  /**
   * ended
   */

  const { templateId } = useParams();
  const navigator = useNavigate();
  console.log("template id", selectedField);

  const SortableItem = ({ id, children, onDoubleClick, isSelected }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });

    const style = {
      // transform: CSS.Transform.toString(transform),
      transition,
      cursor: "grab",
      opacity: isDragging ? 0.6 : 1,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onDoubleClick={onDoubleClick} // 👈 changed here
        className={`p-3 rounded-lg border transition ${
          isSelected
            ? "bg-blue-100 border-blue-400"
            : "bg-white hover:bg-blue-50"
        }`}
      >
        {children}
      </div>
    );
  };

  const handleAddLeaveField = async () => {
    try {
      if (leaveModalType) {
        const { data } = await axios.put(
          `${
            import.meta.env.VITE_BASE_API_URL
          }/field/updateLeave/${leaveModalType}`,
          {
            leave,
          }
        );
        console.log(data);
      } else {
        const { data } = await axios.post(
          `${
            import.meta.env.VITE_BASE_API_URL
          }/field/addLeaveField/${templateId}`,
          {
            leave,
          }
        );
        console.log(data);
      }
      // setOpenLeaveModal(false)
      // fetchTemplateAddedFields(templateId);
      // setLeave({
      //   sick_leave: 0,
      //   casual_leave: 0,
      //   earned_leave: 0,
      //   public_holiday: 0,
      //   flexi_leave: 0,
      //   total: 0,
      // });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setOpenLeaveModal(false);
      fetchTemplateAddedFields(templateId);
      setLeave({
        sick_leave: 0,
        casual_leave: 0,
        earned_leave: 0,
        public_holiday: 0,
        flexi_leave: 0,
        total: 0,
      });
    }
  };

  const handleAddSalaryField = async () => {
    try {
      console.log(
        CTC,
        earnings,
        deductions,
        gross_salary,
        in_hand,
        totalDeductions,
        totalEarnings
      );
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/field/addSalaryField/${templateId}`,
        {
          salary: {
            CTC: CTC,
            earnings: earnings,
            deductions: deductions,
            gross_salary: gross_salary,
            in_hand: in_hand,
            total_deductions: totalDeductions,
            total_earnings: totalEarnings,
          },
        }
      );
      console.log(data);
      fetchTemplateAddedFields(templateId);
      toast.success("Salary field added successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchTemplateAddedFields = async (templateId) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/template/getAllFieldsUnderTemplate/${templateId}`
      );
      console.log("added fields", data);
      setAllAddedFields(data?.data?.allFields?.fields);
    } catch (error) {
      toast.error("Added fields cannot be fetched");
    }
  };

  const fetchFields = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/field/getAllFields`
      );
      console.log("all fields", data?.data?.fields);
      setFields(data?.data?.fields || []);
    } catch (error) {
      console.error("Error fetching fields:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFields = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/field/create`,
        { header: inputType, value: inputValue, templateId: templateId }
      );
      console.log("after adding a new field", data);
      setInputType("");
      setInputValue("");
      toast.success("Field added successfully");
      fetchTemplateAddedFields(templateId);
    } catch (error) {
      toast.error("Error in creating field");
    }
  };

  useEffect(() => {
    fetchTemplateAddedFields(templateId);
    fetchFields();
  }, []);

  useEffect(() => {
    if (selectedField) {
      const field = allAddedFields.find((f) => f._id === selectedField);
      if (field) {
        setEditHeader(field?.header || "");
        setEditValue(field?.value || "");
        setEditPlaceholders(field?.placeHolders || []);
        updatePreview(field?.value || "");
      }
    }
  }, [selectedField, allAddedFields]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading fields...</div>
      </div>
    );
  }

  /**
   *
   * chatgpt given
   */

  // Context menu for selection
  const handleContextMenu = (e) => {
    e.preventDefault();
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (textarea.selectionStart === textarea.selectionEnd) return; // no selection

    setMenuPos({ x: e.clientX, y: e.clientY });
  };

  // Convert selection into variable (${word})
  const makeVariable = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editValue.substring(start, end);

    const variableFormat = `\${${selectedText}}`;

    const newValue =
      editValue.substring(0, start) + variableFormat + editValue.substring(end);

    setEditValue(newValue);
    setMenuPos(null);
    updatePreview(newValue);
  };

  // Preview builder (highlight vars, hide ${ })
  const updatePreview = (val) => {
    const html = val.replace(/\$\{(.*?)\}/g, (match, p1) => {
      return `<span class="bg-yellow-200 text-blue-700 font-semibold px-1 rounded">${p1}</span>`;
    });
    setHighlighted(html);
  };

  // Handle typing changes
  const handleChange = (e) => {
    const val = e.target.value;
    setEditValue(val);
    updatePreview(val);
  };

  /**
   * IMP
   */

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="w-full mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl flex gap-4 font-bold text-gray-800 mb-8 border-b pb-4">
          <button className="cursor-pointer " onClick={() => navigator("/")}>
            <MoveLeftIcon />
          </button>
          <span>Fields Manager</span>
        </h1>

        <div className="flex gap-6 min-h-screen">
          {/* Left Panel */}
          <div className="w-1/4 bg-gray-50 border-r rounded-lg p-6 flex flex-col">
            <div className="w-full flex mb-3 justify-between">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Add New Field
              </h2>
              {/* <button
                onClick={() => setOpenSalaryModal(true)}
                className="bg-green-600 cursor-pointer p-1 hover:bg-green-700 text-white font-medium rounded-lg transition text-sm"
              >
                Add Salary Field
              </button> */}
              <button
                onClick={() => setOpenLeaveModal(true)}
                className="bg-violet-600 cursor-pointer p-1 hover:bg-violet-700 text-white font-medium  rounded-lg transition text-sm"
              >
                Add Leave Field
              </button>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <input
                value={inputType}
                onChange={(e) => setInputType(e.target.value)}
                placeholder="Enter field type"
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter field value"
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={handleAddFields}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
              >
                Add Field
              </button>
            </div>

            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              All Added Fields
            </h2>

            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={async ({ active, over }) => {
                let fields;
                if (active.id !== over?.id) {
                  setAllAddedFields((items) => {
                    const oldIndex = items.findIndex(
                      (i) => i._id === active.id
                    );
                    const newIndex = items.findIndex((i) => i._id === over.id);
                    const newOrder = arrayMove(items, oldIndex, newIndex);

                    // Update UI immediately
                    fields = newOrder.map((item, idx) => ({
                      ...item,
                      number: idx + 1,
                    }));
                    return fields;
                  });

                  // Fire API call separately (no await inside setState)
                  try {
                    await axios.put(
                      `${
                        import.meta.env.VITE_BASE_API_URL
                      }/template/updateTemplateFieldOrder/${templateId}`,
                      {
                        fields: fields.map((f) => f._id), // <-- ONLY IDs sent
                      }
                    );
                    toast.success("Order saved");
                  } catch (err) {
                    console.error("Failed to save order:", err);
                    toast.error(
                      "Failed to save new order and will reset to the original order"
                    );
                    fetchTemplateAddedFields(templateId);
                  }
                }
              }}
            >
              <SortableContext
                items={allAddedFields.map((f) => f._id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex-1 overflow-y-auto space-y-2">
                  {allAddedFields?.map((f, idx) => (
                    <SortableItem
                      key={f._id}
                      id={f._id}
                      onDoubleClick={() => setSelectedField(f?._id)}
                      isSelected={selectedField === f?._id}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-semibold">
                          {idx + 1}.
                        </span>
                        <h3 className="font-medium text-gray-800">
                          {f?.header}
                        </h3>
                      </div>
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          {/* Right Panel */}
          <div className="flex-1 bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Current Field
              </h2>
            </div>

            {selectedField ? (
              (() => {
                const val = allAddedFields.find((f) => f._id === selectedField);
                if (!val) return null;

                return (
                  <div
                    key={val._id}
                    className="bg-white shadow-md rounded-lg p-6 border"
                  >
                    <div className="mb-4">
                      <div className="w-full flex justify-end items-end">
                        {!openEditModal ? (
                          <button
                            className="cursor-pointer flex gap-1"
                            onClick={() => setOpenEditModal(true)}
                          >
                            Edit
                            <Edit className="text-blue-600 " />
                          </button>
                        ) : (
                          <button
                            onClick={async () => {
                              try {
                                const { data } = await axios.put(
                                  `${
                                    import.meta.env.VITE_BASE_API_URL
                                  }/field/editField/${selectedField}`,
                                  { header: editHeader, value: editValue }
                                );
                                console.log(
                                  "new",
                                  data?.data?.field?.placeHolders
                                );
                                // ✅ update local state
                                setAllAddedFields((prev) =>
                                  prev.map((f) =>
                                    f._id === selectedField
                                      ? {
                                          ...f,
                                          header: editHeader,
                                          value: editValue,
                                          placeHolders:
                                            data?.data?.field?.placeHolders,
                                        }
                                      : f
                                  )
                                );

                                toast.success("Field updated");
                                setOpenEditModal(false);
                              } catch (err) {
                                toast.error("Failed to update field");
                              }
                            }}
                            className="cursor-pointer flex gap-1"
                          >
                            Save
                            <Save className="text-blue-600 " />
                          </button>
                        )}
                      </div>

                      <h3 className="text-sm font-medium text-gray-500">
                        Header
                      </h3>
                      <textarea
                        disabled={!openEditModal}
                        value={editHeader}
                        onChange={(e) => setEditHeader(e.target.value)}
                        className="w-full text-lg text-gray-800"
                      />
                    </div>
                    {console.log("val -> ", val)}
                    {val?.subCategory === "Salary" ? (
                      <div className="space-y-6">
                        <div className="w-full flex justify-end ">
                          <button
                            onClick={() => {
                              setOpenSalaryModal(true);
                            }}
                            className="p-2 bg-green-500 hover:bg-green-700 rounded-lg text-white cursor-pointer"
                          >
                            🖋️Edit salary
                          </button>
                        </div>
                        {/* CTC & In-Hand */}
                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-blue-50 p-4 rounded-lg shadow">
                            <h3 className="text-sm font-medium text-gray-600">
                              CTC
                            </h3>
                            <p className="text-xl font-bold text-gray-900">
                              ₹ {val?.salary?.CTC?.toLocaleString()}
                            </p>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg shadow">
                            <h3 className="text-sm font-medium text-gray-600">
                              In-Hand
                            </h3>
                            <p className="text-xl font-bold text-gray-900">
                              ₹ {val?.salary?.in_hand?.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Earnings */}
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800 mb-3">
                            Earnings
                          </h2>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(val?.salary?.earnings || {}).map(
                              ([key, value]) => {
                                if (key === "_id") return;
                                return (
                                  <div
                                    key={key}
                                    className="bg-white border rounded-lg p-3 flex justify-between"
                                  >
                                    <span className="capitalize text-gray-700">
                                      {key.replace(/_/g, " ")}
                                    </span>
                                    <span className="font-medium text-gray-900">
                                      ₹ {value?.toLocaleString()}
                                    </span>
                                  </div>
                                );
                              }
                            )}
                          </div>
                          <div className="mt-3 flex justify-end">
                            <span className="text-sm font-medium text-gray-600 mr-2">
                              Total Earnings:
                            </span>
                            <span className="text-sm font-bold text-gray-900">
                              ₹ {val?.salary?.total_earnings?.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Deductions */}
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800 mb-3">
                            Deductions
                          </h2>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(val?.salary?.deductions || {}).map(
                              ([key, value]) => {
                                if (key === "_id") return;
                                return (
                                  <div
                                    key={key}
                                    className="bg-white border rounded-lg p-3 flex justify-between"
                                  >
                                    <span className="capitalize text-gray-700">
                                      {key.replace(/_/g, " ")}
                                    </span>
                                    <span className="font-medium text-gray-900">
                                      ₹ {value?.toLocaleString()}
                                    </span>
                                  </div>
                                );
                              }
                            )}
                          </div>
                          <div className="mt-3 flex justify-end">
                            <span className="text-sm font-medium text-gray-600 mr-2">
                              Total Deductions:
                            </span>
                            <span className="text-sm font-bold text-gray-900">
                              ₹{" "}
                              {val?.salary?.total_deductions?.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Gross Salary */}
                        <div className="bg-purple-50 p-4 rounded-lg shadow text-center">
                          <h3 className="text-sm font-medium text-gray-600">
                            Gross Salary
                          </h3>
                          <p className="text-2xl font-bold text-gray-900">
                            ₹ {(val?.salary?.CTC / 12).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-gray-500">
                            Value
                          </h3>

                          {/* Textarea for raw editing (stores ${var}) */}
                          {openEditModal && (
                            <textarea
                              ref={textareaRef}
                              value={editValue}
                              onChange={handleChange}
                              onContextMenu={handleContextMenu}
                              rows={5}
                              className="w-full text-lg text-gray-800 border rounded p-2"
                            />
                          )}

                          {/* Custom context menu */}
                          {menuPos && (
                            <div
                              className="absolute bg-white border shadow p-2 text-sm cursor-pointer z-10"
                              style={{ top: menuPos.y, left: menuPos.x }}
                              onClick={makeVariable}
                            >
                              Make Variable
                            </div>
                          )}

                          {/* Preview with highlights (variables without ${}) */}
                          {/* <div
                            className="p-3 border rounded bg-gray-50 text-lg text-gray-800"
                            // dangerouslySetInnerHTML={{
                            //   __html: highlighted || editValue,
                            // }}
                            
                          /> */}
                          <div
                            className="p-3 border rounded bg-gray-50 text-lg text-gray-800"
                            dangerouslySetInnerHTML={{
                              __html: (highlighted || editValue).replace(
                                /\n/g,
                                "<br>"
                              ),
                            }}
                          />
                        </div>
                        {/* {console.log(val)} */}
                        {val?.subCategory === "Leave" && (
                          <div>
                            <div className="w-full flex justify-between">
                              <h1 className="text-lg font-bold text-blue-500">
                                Leave Summary{" "}
                              </h1>
                              <button
                                onClick={() => {
                                  setOpenLeaveModal(true);
                                  setLeaveModalType(val?._id);
                                  setLeave(val?.leave);
                                }}
                                className="text-blue-500"
                              >
                                <Edit2 />
                              </button>
                            </div>
                            <div className="flex flex-col gap-2 justify-center">
                              {[
                                { label: "Sick Leave", name: "sick_leave" },
                                { label: "Casual Leave", name: "casual_leave" },
                                { label: "Earned Leave", name: "earned_leave" },
                                {
                                  label: "Public Holiday",
                                  name: "public_holiday",
                                },
                                { label: "Flexi Leave", name: "flexi_leave" },
                              ].map((l) => (
                                <div className="flex w-2/3 p-4 justify-around gap-3 border-2 border-slate-400 rounded-lg">
                                  <div className="">{l?.label}</div>
                                  <div className="">{val?.leave[l.name]}</div>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2 text-lg">
                              <h1 className="font-semibold text-blue-500">
                                Total :{" "}
                              </h1>
                              <h1 className="">{val?.leave?.total}</h1>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col gap-1">
                          <div className="w-full flex justify-between">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                              Placeholders
                            </h3>
                            {isAddPlaceholderValues === true ? (
                              <button
                                onClick={async () => {
                                  try {
                                    const { data } = await axios.put(
                                      `${
                                        import.meta.env.VITE_BASE_API_URL
                                      }/field/updatePlaceholders/${selectedField}`,
                                      { editPlaceholder }
                                    );
                                    console.log("placeholder", data);
                                    toast.success(
                                      "updated place-holders value"
                                    );
                                    setIsAddPlaceholderValues(false);
                                  } catch (error) {
                                    setIsAddPlaceholderValues(false);
                                  }
                                }}
                                className="p-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                onClick={() => setIsAddPlaceholderValues(true)}
                                className="p-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                              >
                                Add Values
                              </button>
                            )}
                          </div>

                          <div className="space-y-2">
                            {val?.placeHolders?.map((p, idx) => (
                              <div
                                key={idx}
                                className="p-3 bg-gray-50 border rounded-lg"
                              >
                                <p className="text-gray-700">
                                  <span className="font-medium">Type:</span>{" "}
                                  {p.type}
                                </p>
                                <div className="text-gray-700 flex gap-2">
                                  <span className="font-medium">Value:</span>{" "}
                                  <input
                                    onChange={(e) =>
                                      setEditPlaceholders((prev) =>
                                        prev.map((ph) =>
                                          ph.type === p.type
                                            ? { ...ph, data: e.target.value }
                                            : ph
                                        )
                                      )
                                    }
                                    className={`p-1 ${
                                      isAddPlaceholderValues && "border-2"
                                    }`}
                                    defaultValue={p?.data}
                                    disabled={!isAddPlaceholderValues}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })()
            ) : (
              <p className="text-gray-500 italic">
                Select a field from the left panel to view details.
              </p>
            )}
          </div>
        </div>
      </div>
      {openSalaryModal && (
        <SalaryFieldModal
          openSalaryModal={openSalaryModal}
          setOpenSalaryModal={setOpenSalaryModal}
          earnings={earnings}
          setEarnings={setEarnings}
          deductions={deductions}
          setDeductions={setDeductions}
          CTC={CTC}
          setCTC={setCTC}
          gross_salary={gross_salary}
          setGrossSalary={setGrossSalary}
          handleAddSalaryField={handleAddSalaryField}
          setInHand={setInHand}
          in_hand={in_hand}
          totalDeductions={totalDeductions}
          totalEarnings={totalEarnings}
          setTotalDeductions={setTotalDeductions}
          setTotalEarnings={setTotalEarnings}
        />
      )}

      {openLeaveModal && (
        <LeaveModal
          leave={leave}
          setLeave={setLeave}
          close={() => {
            setOpenLeaveModal(false);
            setLeaveModalType(null);
          }}
          open={openLeaveModal}
          handleAddLeaveField={handleAddLeaveField}
          leaveModalType={leaveModalType}
        />
      )}
    </div>
    
  );
};

export default TemplateAddFieldPage;
