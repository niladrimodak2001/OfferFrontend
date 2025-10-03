import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

function CreateOfferLetterModal({ isOpen, onClose,selectedTemplate }) {
console.log(selectedTemplate)
  
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [ref, setRef] = useState("");
  const [joiningDate, setJoiningDate] = useState("");


  const navigate = useNavigate();


  const handleCreate = async () => {
    if (!name || !role || !ref || !selectedTemplate) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
        if(!ref){
            toast.error("Please generate the reference number")
        }
      const { data } = await axios.post(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/offerLetter/${selectedTemplate?._id}/createOfferLetter`,
        { name, role, ref, joiningDate }
      );

      toast.success("Offer letter created successfully");
      onClose();
      console.log(data)
      navigate(`/offerLetter/${data?.data?._id}/editPolicies`); // navigate to edit policies page
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error creating offer letter"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative animate-fadeIn">
        <h2 className="text-xl font-bold mb-4">Create Offer Letter</h2>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Form */}
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold">
            Using Template {selectedTemplate?.tname || "NO"}
          </h1>

          <label className="font-semibold">Candidate Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="font-semibold">Role</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <label className="font-semibold">Reference</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={ref}
            required={true}
            readOnly={true}
            onChange={(e) => setRef(e.target.value)}
          />

          <button onClick={async()=>{
            try {
                const { data } = await axios.get(
                  `${
                    import.meta.env.VITE_BASE_API_URL
                  }/template/getLastReferenceNumber/${role}`
                );
                const ref = data?.data;

                // Extract last 4 digits as a number
                let inc = parseInt(ref?.substr(ref.length - 4) || "0", 10);

                // Increment
                inc += 1;

                // Generate new ref: keep prefix + new increment, padded with leading zeros if needed
                const prefix = ref?.substr(0, ref.length - 4) || "";
                const newRef = prefix + inc.toString().padStart(4, "0");

                setRef(newRef);
            } catch (error) {
                toast.error("Failed to generate reference number")
            }
          }} className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
            Generate Reference
          </button>

          <label className="font-semibold">Joining Date</label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
          />

          <button
            onClick={handleCreate}
            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Create Offer Letter
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateOfferLetterModal;
