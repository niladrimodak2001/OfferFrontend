import React from "react";

function LeaveModal({
  leave,
  setLeave,
  close,
  open,
  handleAddLeaveField,
  leaveModalType,
}) {
  if (!open) return null;

  // Handle change for any leave field
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    const numericValue = Number(value);

    const updatedLeave = { ...leave, [name]: numericValue };

    const total = Object.keys(updatedLeave)
      .filter((key) => key !== "total" && key!=="_id")
      .reduce((sum, key) => sum + (updatedLeave[key] || 0), 0);

    setLeave({ ...updatedLeave, total });
  };

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Leaves</h2>
        <div className="space-y-3">
          {[
            { label: "Sick Leave", name: "sick_leave" },
            { label: "Casual Leave", name: "casual_leave" },
            { label: "Earned Leave", name: "earned_leave" },
            { label: "Public Holiday", name: "public_holiday" },
            { label: "Flexi Leave", name: "flexi_leave" },
          ].map((field) => (
            <div key={field.name} className="flex justify-between items-center">
              <label className="text-gray-700">{field.label}:</label>
              <input
                type="number"
                name={field.name}
                value={leave[field.name]}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-20 text-right"
                min={0}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 text-lg font-medium">
          Total Leaves: <span className="text-blue-600">{leave.total}</span>
        </div>
        {/* handleAddLeaveField */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleAddLeaveField}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {leaveModalType ? "Update leave" : "Create Leave Field"}
          </button>
          <button
            onClick={close}
            className="px-4 py-2 bg-slate-400 text-white rounded hover:bg-slate-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeaveModal;
