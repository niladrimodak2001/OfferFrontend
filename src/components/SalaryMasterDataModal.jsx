import React from 'react'

function SalaryMasterDataModal({
  earningMasterDataFields,
  deductionMasterDataFields,
  masterData,
  setMasterData,
  open,
  close,
}) {
  console.log("object12", masterData);
  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Manage Master Data
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold text-blue-600">Earnings</h1>
            <div className="grid grid-cols-3 gap-2">
              {earningMasterDataFields?.map((ef) => (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {ef?.label}
                  </label>
                  <input
                    type={ef?.type}
                    defaultValue={ef?.default}
                    name="role"
                    value={
                      masterData[ef.data] ? Number(masterData[ef.data]) : Number(ef?.default)
                    }
                    onChange={(e) =>
                      setMasterData((prev) => ({
                        ...prev,
                        [ef.data]: Number(e.target.value),
                      }))
                    }
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
            <h1 className="text-lg font-bold text-blue-600">Deductions</h1>
            <div className="grid grid-cols-3 gap-2">
              {deductionMasterDataFields?.map((ef) => (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {ef?.label}
                  </label>
                  <input
                    type={ef?.type}
                    defaultValue={ef?.default}
                    name="role"
                    value={
                      masterData[ef.data] ? Number(masterData[ef.data]) : Number(ef?.default)
                    }
                    onChange={(e) =>
                      setMasterData((prev) => ({
                        ...prev,
                        [ef.data]: Number(e.target.value),
                      }))
                    }
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            <button
              onClick={()=>{
                setMasterData({
                  basicPercentage: 35,
                  hraPercentage: 50,
                  leaveTravelAllowancePercentage: 2,
                  cityAllowancePercentage: 2,
                  conveyanceAllowancePercentage: 2,
                  personalAllowancePercentage: 2,
                  pfPercentage: 12,
                  epfPercentage: 12,
                  gratuityPercentage: 4.81,
                });
              }}
              className="px-6 cursor-pointer py-2 bg-purple-600 text-white font-medium rounded-lg shadow hover:bg-purple-700 transition-all"
            >
              Reset
            </button>
            <button
              onClick={(e)=>{
                e.preventDefault();
                close()
              }}
              className="px-6 cursor-pointer py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-all"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SalaryMasterDataModal
