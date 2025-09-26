import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintComponent = React.forwardRef(({ combinedList }, ref) => {
  return (
    <div
      ref={ref}
      className="relative bg-white text-black p-8 print:p-12"
      style={{
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Watermark on each page */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none"
        style={{
          zIndex: 0,
          fontSize: "5rem",
          transform: "rotate(-30deg)",
          whiteSpace: "nowrap",
        }}
      >
        WATERMARK
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-6">
        <h1 className="text-2xl font-bold mb-6">Offer Letter</h1>

        {combinedList.map((section, idx) => (
          <div key={idx} className="mb-6 break-inside-avoid">
            <h2 className="text-lg font-bold mb-2">
              {idx + 1}. {section.header}
            </h2>
            {section.desc.split("\n").map((line, i) => (
              <p key={i} className="mb-2 text-justify">
                {line}
              </p>
            ))}
          </div>
        ))}

        <div className="mt-12">
          <p>Yours sincerely,</p>
          <p className="font-bold">HR Department</p>
        </div>
      </div>
    </div>
  );
});

export default function NO( {list} ) {
    
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Offer Letter",
  });

  // Merge all lists into one
  const combinedList = [...list];

  return (
    <div className="p-8">
      <button
        onClick={handlePrint}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Print / Save as PDF
      </button>

      {/* Hidden printable content */}
      <div className="hidden">
        <PrintComponent ref={componentRef} combinedList={combinedList} />
      </div>
    </div>
  );
}
