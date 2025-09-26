import React from "react";
import { useState } from "react";

function SalaryFieldModal({
  openSalaryModal,
  setOpenSalaryModal,
  earnings,
  setEarnings,
  deductions,
  setDeductions,
  CTC,
  setCTC,
  gross_salary,
  setGrossSalary,
  handleAddSalaryField,
  setInHand,
  in_hand,
  totalDeductions,
  totalEarnings,
  setTotalDeductions,
  setTotalEarnings,
}) {
  if (!openSalaryModal) return null;
  

  const handleEarningsChange = (e) => {
    const { name, value } = e.target;
    console.log("basic", Number(value) * (CTC / 100));
    if (name === "basic") {
      setEarnings({
        ...earnings,
        [name]:( Number(value) * (Number(CTC) / 100)),
      });
      calculateInHand(
        { ...earnings, [name]: Number(value) * (Number(CTC) / 100) },
        deductions
      );
    } else if (name === "hra" || name === "performance_bonus") {
      setEarnings({
        ...earnings,
        [name]: Number(value) * (earnings?.basic / 100),
      });
      calculateInHand(
        { ...earnings, [name]: Number(value) * (earnings?.basic / 100) },
        deductions
      );
    } else {
      setEarnings({
        ...earnings,
        [name]: Number(value),
      });
      calculateInHand({ ...earnings, [name]: Number(value) }, deductions);
    }
    
  };

  const handleDeductionsChange = (e) => {
    const { name, value } = e.target;
    if (name === "pf" || name === "epf") {
      setDeductions({
        ...deductions,
        [name]: Number(value) * (earnings?.basic / 100),
      });
      calculateInHand(earnings, {
        ...deductions,
        [name]: Number(value) * (earnings?.basic / 100),
      });
    } else {
      setDeductions({
        ...deductions,
        [name]: Number(value),
      });
      calculateInHand(earnings, { ...deductions, [name]: Number(value) });
    }
    
  };

  const calculateInHand = (earn, deduct) => {
    let totalEarnings = Object.values(earn).reduce((a, b) => a + b, 0);

    const totalDeductions = Object.values(deduct).reduce((a, b) => a + b, 0);

    const inHand = totalEarnings - totalDeductions;
    setInHand(inHand);
    setTotalEarnings(totalEarnings)
    setTotalDeductions(totalDeductions)
  };

  const handleSubmit = () => {
    handleAddSalaryField();
    setOpenSalaryModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 overflow-auto">
      <div className="bg-white rounded-lg p-6 w-3/4 max-h-[90vh] overflow-auto relative">
        <button
          onClick={() => {setOpenSalaryModal(false); }}
          className="absolute top-4 right-6 text-gray-500 hover:text-gray-800"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">Salary Details</h2>

        <h3 className="font-bold text-lg text-blue-500 my-4">Earnings</h3>
        <label className="block text-sm font-semibold capitalize">CTC</label>
        <input
          type="number"
          value={CTC}
          onChange={(e) => setCTC(e.target.value)}
          className=" border rounded px-2 py-1"
        />
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(earnings).map((key) => (
            <div key={key} className="mb-2 ">
              <label className="font-semibold block text-sm capitalize ">
                {key.replace(/_/g, " ")}
                {key === "basic" || key === "hra" || key === "performance_bonus"
                  ? " (%)"
                  : " Value"}
              </label>

              <input
                type="number"
                name={key}
                defaultValue={0}
                // value={earnings[key]}
                placeholder="In %"
                onChange={handleEarningsChange}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          ))}
        </div>

        <h3 className="font-bold text-lg text-blue-500 my-4">Deductions</h3>
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(deductions).map((key) => (
            <div key={key} className="mb-2">
              <label className="font-semibold block text-sm capitalize">
                {key.replace(/_/g, " ")}
                {key === "pf" || key === "epf" ? " (%)" : " Value"}
              </label>
              <input
                type="number"
                name={key}
                //value={deductions[key]}
                onChange={handleDeductionsChange}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-4">
          <p className="flex flex-col gap-2">
            <p>
              <strong>Gross Salary {" (monthly) "}:</strong>
            </p>
            <p>{(CTC / 12).toFixed(2)}</p>
          </p>
          <p className="flex flex-col gap-2">
            <p>
              <strong>Total Deductions: {" (yearly) "}</strong>{" "}
              {totalDeductions.toFixed(2)}
            </p>
            <p>
              <strong>Total Deductions: {" (monthly) "}</strong>{" "}
              {(totalDeductions / 12).toFixed(2)}
            </p>
          </p>
          <p className="flex flex-col gap-2">
            <p>
              <strong>Total In Hand: {" (yearly) "}</strong>{" "}
              {in_hand.toFixed(2)}
            </p>
            <p>
              <strong>Total In Hand: {" (monthly) "}</strong>{" "}
              {(in_hand / 12).toFixed(2)}
            </p>
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default SalaryFieldModal;
