import { RefreshCcw } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function PdfPreview({
  offerLetter,
  
  fetchOfferLetter,
}) {
  const [refresh, setRefresh] = useState(false);

  const replacePlaceholders = (text, values) => {
    if (!text || !values) return text;
    return text.replace(
      /\$\{(.*?)\}/g,
      (_, key) => values[key] || `\${${key}}`
    );
  };

  useEffect(() => {fetchOfferLetter()}, [refresh]);

  return (
    <div className="w-full h-full border rounded-xl shadow-2xl p-6 bg-white mt-6">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Offer Letter</h1>
        <button onClick={()=>setRefresh(!refresh)} className="p-2 h-fit flex gap-1 bg-slate-300 rounded-xl cursor-pointer">
          <RefreshCcw /> Refresh
        </button>
      </div>

      {/* Header Section */}
      <div className="mb-6">
        <p>
          <strong>Name:</strong> {offerLetter.name}
        </p>
        <p>
          <strong>Role:</strong> {offerLetter.role}
        </p>
        <p>
          <strong>Ref:</strong> {offerLetter.ref}
        </p>
        {offerLetter.joiningDate && (
          <p>
            <strong>Joining Date:</strong>{" "}
            {new Date(offerLetter.joiningDate).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Categories and Fields */}
      {offerLetter.selectedCustomCategorySchema?.map((categoryObj, catIdx) => (
        <div key={categoryObj._id} className="mb-6">
          <h2 className="text-lg font-bold mb-2">
            {catIdx + 1}. {categoryObj.category?.name || "Unnamed"}
          </h2>

          {categoryObj?.fieldValues?.map((field) => {
            const fieldText = replacePlaceholders(
              field?.fieldId?.value,
              field?.values
            );
            return (
              <div
                key={field.fieldId._id}
                className="mb-2 ml-4 leading-relaxed"
              
                style={{ whiteSpace: "pre-line" }}
              >
                <p>{fieldText}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default PdfPreview;
