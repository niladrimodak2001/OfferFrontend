

import { pdf, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import React, { useState } from "react";
import Testing from "./Testing";

import SalaryMasterDataModal from "./SalaryMasterDataModal";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

function KeepIt() {
  const { role,id } = useParams();
  const navigator=useNavigate();
  console.log(role);
  const [openMasterModal, setOpenMasterModal] = useState(false);
  const [data, setData] = useState({
    name: "",
    prefix: "",
    role: role,
    ref: "",
    date: "",
    son_of: "",
    address: "",
    vtc: "",
    district: "",
    state: "",
    pin: "",
    subject: "",
    joining_date: "",
    joining_address: "",
    CTC: "",
    basic: "",
    hra: "",
    leave_travel_allowance: "",
    city_allowance: "",
    personal_allowance: "",
    conveyance_allowance: "",
    performance_bonus: "",
    total_in_hand: "",
    pf: "",
    epf: "",
    gratuity: "",
    profession_tax: "",
    income_tax: "",
    mediclaim: "",
    sick_leave: "",
    casual_leave: "",
    earn_leave: "",
    public_holiday: "",
    flexi_leave: "",
    bonus1: 0,
    bonus2: 0,
    bonus3: 0,
    bonus_year1: 0,
    bonus_year2: 0,
    promotion_year: 0,
    subsequent_promotion1: 0,
    subsequent_promotion2: 0,
    effective_probation: 0,
    probation_notice: 0,
    notice: 0,
    service_aggrement: 0,
  });
  useEffect(()=>{
    if(id){
      const getHistoryData=async()=>{
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/template/getHistoryById/${id}`
        );
        setData(data?.data)
        
      }
      getHistoryData();
    }
  },[id])

  const [file, setFile] = useState("");
  const leaveFields = [
    { label: "Sick Leave", type: "number", data: "sick_leave" },
    { label: "Casual Leave", type: "number", data: "casual_leave" },
    { label: "Earn Leave", type: "number", data: "earn_leave" },
    { label: "Public Holiday", type: "number", data: "public_holiday" },
    { label: "Flexi Leave", type: "number", data: "flexi_leave" },
  ];

  const [masterData, setMasterData] = useState({
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

  const getReferenceNumber = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/template/getLastReferenceNumber/${role}`
      );
      console.log("role - >", role);
      setData((prev) => ({ ...prev, ["ref"]: data?.data }));
      setData((prev) => ({ ...prev, ["role"]: role }));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if(!id)
    getReferenceNumber();
  }, []);

  useEffect(() => {
    CalculateSalaryBreakDown(data?.CTC);
  }, [masterData]);

  const [constraints, setConstraints] = useState({
    
  });

  const inputFields = [
    { label: "Prefix", type: "text", data: "prefix" },
    { label: "Name", type: "text", data: "name" },
    { label: "Role", type: "text", data: "role" },
    { label: "Ref", type: "text", data: "ref" },
    { label: "Date", type: "date", data: "date" },
    { label: "S/O", type: "text", data: "son_of" },
    { label: "Address", type: "text", data: "address" },
    { label: "VTC", type: "text", data: "vtc" },
    { label: "District", type: "text", data: "district" },
    { label: "State", type: "text", data: "state" },
    { label: "Pin", type: "text", data: "pin" },
    { label: "Subject", type: "text", data: "subject" },
    { label: "Joining Date", type: "date", data: "joining_date" },
    { label: "Joining Address", type: "text", data: "joining_address" },
  ];

  const salaryFields = [
    { label: "CTC", type: "number", data: "CTC" },
    { label: "Basic", type: "number", data: "basic" },
    { label: "HRA", type: "number", data: "hra" },
    {
      label: "Leave and Travel Allowance",
      type: "number",
      data: "leave_travel_allowance",
    },
    { label: "City Allowance", type: "number", data: "city_allowance" },
    { label: "Personal Allowance", type: "number", data: "personal_allowance" },
    {
      label: "Conveyance Allowance",
      type: "number",
      data: "conveyance_allowance",
    },
    {
      label: "Personal Allowance",
      type: "number",
      data: "personal_allowance",
    },
    {
      label: "Performance Bonus",
      type: "number",
      data: "performance_allowance",
    },
    { label: "PF", type: "number", data: "pf" },
    { label: "EPF", type: "number", data: "epf" },
    { label: "Gratuity", type: "number", data: "gratuity" },
    { label: "Professional Tax", type: "number", data: "professional_tax" },
    { label: "Income Tax", type: "number", data: "income_tax" },
    { label: "Mediclaim", type: "number", data: "mediclaim" },
  ];

  const customFields = [
    { label: "Bonus", type: "number", data: "bonus1" },
    {
      label: "First Bonus After Completing (years)",
      type: "number",
      data: "bonus2",
    },
    {
      label: "Second Bonus After Completing (years)",
      type: "number",
      data: "bonus3",
    },
    {
      label: "Eligible for promotion after",
      type: "number",
      data: "promotion_year",
    },
    {
      label: "Subsequent Promotion From",
      type: "number",
      data: "subsequent_promotion1",
    },
    {
      label: "Subsequent Promotion To",
      type: "number",
      data: "subsequent_promotion2",
    },
    {
      label: "Probation (months)",
      type: "number",
      data: "effective_probation",
    },
    {
      label: "Probation Notice Period",
      type: "number",
      data: "probation_notice",
    },
    { label: "Notice Period After Probation", type: "number", data: "notice" },
    { label: "Service Agreement", type: "number", data: "service_aggrement" },
  ];

  const earningMasterDataFields = [
    {
      label: "Basic Percentage (%)",
      data: "basicPercentage",
      type: "number",
      default: 35,
    },
    {
      label: "Hra Percentage (%)",
      data: "hraPercentage",
      type: "number",
      default: 50,
    },
    {
      label: "Leave Travel Allowance Percentage (%)",
      data: "leaveTravelAllowancePercentage",
      type: "number",
      default: 2,
    },
    {
      label: "City Allowance Percentage (%)",
      data: "cityAllowancePercentage",
      type: "number",
      default: 2,
    },
    {
      label: "Conveyance Allowance Percentage (%)",
      data: "conveyanceAllowancePercentage",
      type: "number",
      default: 2,
    },
    {
      label: "Personal Allowance Percentage (%)",
      data: "personalAllowancePercentage",
      type: "number",
      default: 2,
    },
  ];
  const deductionMasterDataFields = [
    {
      label: "PF Percentage (%)",
      data: "pfPercentage",
      type: "number",
      default: 12,
    },
    {
      label: "EPF Percentage (%)",
      data: "epfPercentage",
      type: "number",
      default: 12,
    },
    {
      label: "Gratuity Percentage",
      data: "gratuityPercentage",
      type: "number",
      default: 4.81,
    },
  ];

  // useEffect(()=>{
  //   const calculatePerformanceAllowance=async()=>{
  //     const performance=Number(data?.CTC)-((Number(data.pf)+Number(data?.epf)+Number(data?.gratuity)+Number(data?.profession_tax)+Number(data?.income_tax)+Number(data?.mediclaim)))
  //     setData((prev)=>({...prev,["performance_bonus"]:performance}))
  //   }
  //   calculatePerformanceAllowance()
  // },[data])

  const CalculateSalaryBreakDown = (value) => {
    console.log(value);
    const basic = ((masterData?.basicPercentage / 100) * value).toFixed(2);
    const hra = ((masterData?.hraPercentage / 100) * basic).toFixed(2);
    const leave_travel_allowance = (
      (masterData?.leaveTravelAllowancePercentage / 100) *
      basic
    ).toFixed(2);
    const city_allowance = (
      (masterData?.cityAllowancePercentage / 100) *
      basic
    ).toFixed(2);
    const conveyance_allowance = (
      (masterData?.conveyanceAllowancePercentage / 100) *
      basic
    ).toFixed(2);
    const personal_allowance = (
      (masterData?.personalAllowancePercentage / 100) *
      basic
    ).toFixed(2);
    const pf = ((masterData?.pfPercentage / 100) * basic).toFixed(2);
    const epf = ((masterData?.epfPercentage / 100) * basic).toFixed(2);
    const gratuity = ((masterData?.gratuityPercentage / 100) * basic).toFixed(
      2
    );
    

    setData((prev) => ({ ...prev, ["basic"]: basic }));
    setData((prev) => ({ ...prev, ["hra"]: hra }));
    setData((prev) => ({
      ...prev,
      ["leave_travel_allowance"]: leave_travel_allowance,
    }));
    setData((prev) => ({ ...prev, ["city_allowance"]: city_allowance }));
    setData((prev) => ({
      ...prev,
      ["conveyance_allowance"]: conveyance_allowance,
    }));
    setData((prev) => ({ ...prev, ["pf"]: pf }));
    setData((prev) => ({ ...prev, ["epf"]: epf }));
    setData((prev) => ({ ...prev, ["gratuity"]: gratuity }));
    setData((prev) => ({
      ...prev,
      ["personal_allowance"]: personal_allowance,
    }));
  };

  const [loading,setLoading]=useState(false)

  const handleSave = async () => {
    try {
      setLoading(true)
      // 1. Generate PDF blob from Testing component
      const blob = await pdf(<Testing data={data} />).toBlob();

      // 2. Create FormData
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("file", blob, "offer_letter.pdf");

      // console.log(blob)
      // 3. Send to backend
      await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/template/saveData`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Data & PDF saved successfully!");
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save data & PDF.");
    }finally{
      setLoading(false)
    }
  };
  if(loading){
    return <div className="h-screen w-full flex items-center justify-center">
      <h1 className="text-3xl font-bold ">Loading ... </h1>
    </div>
  }

  return (
    <div className="w-full h-screen flex bg-gray-100">
      {/* Left side PDF Preview */}
      <div className="flex flex-col w-2/3 border-r shadow-md">
        <PDFViewer className="w-full h-screen">
          <Testing data={data} constraints={constraints} />
        </PDFViewer>
      </div>

      {/* Right side Inputs */}
      <div className="flex-1 flex-col p-6 overflow-y-auto space-y-6">
        {/* Header */}
        <button
          onClick={() => setOpenMasterModal(true)}
          className="px-6 cursor-pointer py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium shadow"
        >
          Salary Master Data
        </button>
        <h1 className="text-2xl font-bold text-blue-600">
          Offer Letter Customization
        </h1>

        {/* Personal Info */}
        <div className="bg-white rounded-xl shadow p-4 space-y-3">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Personal Information
          </h2>
          {inputFields.map((ip) => (
            <div key={ip.data} className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                {ip.label}
              </label>
              <input
                disabled={ip.label === "Role" || ip.label === "Ref"}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type={ip.type}
                value={data[ip.data]}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, [ip.data]: e.target.value }));
                }}
              />
            </div>
          ))}
        </div>

        {/* Salary Fields */}
        <div className="bg-white rounded-xl shadow p-4 space-y-3">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Salary Break Down
          </h2>
          {salaryFields.map((c) => (
            <div key={c.data} className="flex flex-col">
              <label className="text-sm text-gray-600">{c.label}</label>
              <input
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type={c.type}
                value={data[c?.data]}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    [c.data]: e.target.value,
                  }));
                  c.data === "CTC" && CalculateSalaryBreakDown(e.target.value);
                }}
              />
            </div>
          ))}
        </div>

        {/* Leave Fields */}
        <div className="bg-white rounded-xl shadow p-4 space-y-3">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Leave Summary
          </h2>
          {leaveFields.map((c) => (
            <div key={c.data} className="flex flex-col">
              <label className="text-sm text-gray-600">{c.label}</label>
              <input
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type={c.type}
                value={data[c?.data]}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    [c.data]: e.target.value,
                  }));
                }}
              />
            </div>
          ))}
        </div>

        {/* Custom Fields */}
        <div className="bg-white rounded-xl shadow p-4 space-y-3">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Additional Constraints
          </h2>
          {customFields.map((c) => (
            <div key={c.data} className="flex flex-col">
              <label className="text-sm text-gray-600">{c.label}</label>
              <input
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type={c.type}
                value={data[c?.data]}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    [c.data]: e.target.value,
                  }));
                }}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}

        <div className="flex items-center gap-4">
          {role && data?.name && (
            <PDFDownloadLink
              document={<Testing data={data} />}
              fileName={`offer_${role}_${data?.name}.pdf`}
            >
              {({ loading }) => (
                <button className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow">
                  {loading ? "Preparing..." : "Download PDF"}
                </button>
              )}
            </PDFDownloadLink>
          )}
          {/* 🔹 Save Button */}
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium shadow"
          >
            Save
          </button>
          <button
            onClick={() => {
              navigator("/");
            }}
            className="px-6 py-2 cursor-pointer rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium shadow"
          >
            Generate New
          </button>
        </div>
      </div>
      {openMasterModal && (
        <SalaryMasterDataModal
          earningMasterDataFields={earningMasterDataFields}
          deductionMasterDataFields={deductionMasterDataFields}
          masterData={masterData}
          setMasterData={setMasterData}
          open={openMasterModal}
          close={() => setOpenMasterModal(false)}
        />
      )}
    </div>
  );
}

export default KeepIt;
