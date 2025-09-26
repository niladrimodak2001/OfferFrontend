import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import logo from "../assets/logo.jpg";

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Helvetica"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});

const styles = StyleSheet.create({
  page: {
    position: "relative",
  },
  watermarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  },
  watermarkImage: {
    width: 400,
    height: 100,
    opacity: 0.1,
    transform: "rotate(-30deg)",
  },
});


const calculatePerformanceAllowance=(data)=>{
  const inhand =
    (Number(data?.basic) || 0) +
    (Number(data?.hra) || 0) +
    (Number(data?.leave_travel_allowance) || 0) +
    (Number(data?.city_allowance) || 0) +
    (Number(data?.personal_allowance) || 0) +
    (Number(data?.conveyance_allowance) || 0) +
    (Number(data?.performance_bonus) || 0);
  const totalDeductions =
    (Number(data?.pf) || 0) +
    (Number(data?.epf) || 0) +
    (Number(data?.gratuity) || 0) +
    (Number(data?.professional_tax) || 0) +
    (Number(data?.income_tax) || 0) +
    (Number(data?.mediclaim) || 0);
  const baki=data?.CTC-(inhand+totalDeductions)
  return baki.toFixed(2)
}

function Testing({ data, constraints }) {
  const description = {
    desc: `Dear ${
      data?.name || "_________"
    },\n\tThank you for considering a career with Nexucon Consultancy Services Private Limited. We are pleased to inform you that you have successfully completed our initial selection process, and we are excited to extend an offer of employment. This offer is based on your qualifications and performance during the selection process. You have been selected for the position of ${
      data?.role || "________"
    }.`,
  };

  const list = [
    {
      header: "Joining Date",
      desc: `Your joining date would be on ${data?.joining_date}`,
    },
    {
      header: "Joining Address",
      desc: `Your joining address would be at ${data?.joining_address}`,
    },
    {
      header: "Financial Package",
      desc: `Your annual gross compensation package will amount to Rs. ${data?.CTC}`,
    },
    
  ];

  const extraList = [
    {
      header: "Important Terms and Conditions",
      desc: `• Nexucon will provide you with a welcome relocation bonus of Rs ${data?.bonus1} before you join,which will be processed after the verification of your documents.\n• A one-time bonus will be awarded upon completing ${data?.bonus2} years with Nexucon, followed by another one-time bonus after ${data?.bonus3} years of service with the company.\n• You will become eligible for promotion after ${data?.promotion_year} years of joining. Subsequent promotions will be evaluated every ${data?.subsequent_promotion1} to ${data?.subsequent_promotion2} years based on your performance.\n• Exceptional performance may make you eligible for early promotion, even before the standard timeline.`,
    },
    {
      header: "Effective Date",
      desc: `The terms of this offer will become effective on your first day of employment with Nexucon Consultancy Services Pvt Ltd. You will initially be placed on a probationary period of ${data?.promotion_year} months.`,
    },
    {
      header: "Probation Period",
      desc: `Your first ${data?.effective_probation} months will serve as the probation period. Upon successful completion, your employment will be confirmed. In the event that if your contract needs to be terminated during this probationary period, Nexucon will provide a ${data?.probation_notice}-month notice period.`,
    },
    {
      header: "Notice Period From Nexucon",
      desc: `After confirmation, if Nexucon decides to terminate your contract, a ${data?.notice}-month notice period or equivalent salary compensation for ${data?.notice} months, whichever is deemed suitable by Nexucon, will be provided.`,
    },
    {
      header: "Training and Development",
      desc: "You will be provided with the necessary and relevant training as and when required, based on the assessment of your team lead, manager, and Nexucon.",
    },
    {
      header: "Confidentiality and Non-Disclosure",
      desc: "You are required to strictly adhere to Nexucon's confidentiality and Non-Disclosure Agreement (NDA). Any violation of this clause will result in disciplinary action.",
    },
    {
      header: "Working Schedule",
      desc: "• You will be required to work a 5-day week. Depending on Nexucon and its client's requirements\n• you may need to work in shifts, and you will be informed of any such adjustments in advance.\n• Your work location may be changed at any time, and you may be assigned to any city or country as per Nexucon's requirements.\n• You may also be required to attend the office on any day of the week as needed. Please note that this employment is strictly office-based, and working from home is not permitted.",
    },
    {
      header: "Appraisal Process",
      desc: `• Your performance will be evaluated quarterly, with an overall average assessed at the end of the year, which will determine your annual increment.\n• Your salary may be revised six months after joining, based on your performance.\n• After your confirmation, you will receive at least a market-standard yearly hike each year.\n• You will become eligible for promotion after three years of service. Following your first promotion, you can expect opportunities for promotion approximately every three to four years.\n• If you demonstrate exceptional performance, you may qualify for an early promotion before the standard timeline.\n• A one-time bonus will be awarded after ${data?.bonus2} years with Nexucon, and an additional one- time bonus will be provided after ${data?.bonus3} years of service.\n• Nexucon will offer a welcome relocation bonus of Rs. ${data?.bonus1} before you join, contingent upon verification of your documents`,
    },
  ];

  const thirdList = [
    {
      header: "Leave Policy",
      desc: `Nexucon provides a total of ${
        Number(data.sick_leave) +
        Number(data.casual_leave) +
        Number(data?.earn_leave) +
        Number(data?.flexi_leave) +
        Number(data?.public_holiday)
      } days of leaves, holidays, and off days. Public holidays will be observed based on the client's requirements, which may vary according to the country you are assigned to. Sick leave can be taken at any time; however, all other leave requests must be submitted in advance and approved by Nexucon. If sick leave extends beyond three consecutive days, you will be required to provide a doctor's certificate. Only earned leave can be carried forward to the next year.`,
    },

    {
      header: "Termination Clause",
      desc: `• You will undergo a probation period of ${data?.promotion_year}, during which Nexucon may terminate your contract with a three-month advance notice.\n• After your confirmation, if Nexucon wishes to terminate your employment within the first ${data?.service_aggrement} years, you will receive a five-month advance notice or equivalent salary compensation.\n• After the initial ${data?.service_aggrement} years, you may resign from Nexucon with a three-month notice period.\n• Nexucon may also terminate your contract with a three-month notice after the first ${data?.service_aggrement} years.\n• In cases of serious breaches of trust or misconduct, Nexucon reserves the right to terminate your employment at any time`,
    },
    {
      header: "Service Agreement",
      desc: `• A commitment of ${data?.service_aggrement} years is required with Nexucon. Should you choose to leave before this period, you will be required to pay Nexucon an amount equivalent to 10 months of your current gross salary.`,
    },

    {
      header: "Confidentiality",
      desc: "• During your employment with Nexucon Consultancy Services Pvt Ltd, you will have access to confidential and proprietary information. You agree not to release or disclose such information, either directly or indirectly, unless required by law or with the express written consent of management, provided by an authorized officer.\n• Please review the contents of this offer carefully. If the terms of employment outlined in this agreement are acceptable to you, kindly confirm your acceptance by proposing your start date and signing this document. If not accepted within three days of receipt, this offer may lapse at the discretion of Nexucon Consultancy Services Pvt Ltd. I would like to express my genuine enthusiasm for the possibility of you joining our organization. I hope you find the terms of this offer both reasonable and appealing. Feel free to reach out if you have any questions.",
    },
  ];

  // const calculationOfSalaryBreakUp


  const earnings = [
    { header: "Basic", value: data?.basic || 0 },
    { header: "HRA", value: data?.hra || 0 },
    {
      header: "Leave Travel Allowance",
      value: data?.leave_travel_allowance || 0,
    },
    { header: "City Allowance", value: data?.city_allowance || 0 },
    { header: "Personal Allowance", value: data?.personal_allowance || 0 },
    { header: "Conveyance Allowance", value: data?.conveyance_allowance || 0 },
    { header: "Performance Bonus", value: calculatePerformanceAllowance(data) || 0 },
    {
      header: "Total In Hand",
      value:
        ((Number(data?.basic) || 0) +
        (Number(data?.hra) || 0) +
        (Number(data?.leave_travel_allowance) || 0) +
        (Number(data?.city_allowance) || 0) +
        (Number(data?.personal_allowance) || 0) +
        (Number(data?.conveyance_allowance) || 0) +
        (Number(data?.performance_bonus) || 0)).toFixed(2),
    },
  ];

  const deductions = [
    { header: "PF", value: data?.pf || 0 },
    { header: "EPF", value: data?.epf || 0 },
    { header: "Gratuity", value: data?.gratuity || 0 },
    { header: "Professional Tax", value: data?.professional_tax || 0 },
    { header: "Income Tax", value: data?.income_tax || 0 },
    { header: "Mediclaim", value: data?.mediclaim || 0 },
    {
      header: "Total Deductions",
      value:
        (Number(data?.pf) || 0) +
        (Number(data?.epf) || 0) +
        (Number(data?.gratuity) || 0) +
        (Number(data?.professional_tax) || 0) +
        (Number(data?.income_tax) || 0) +
        (Number(data?.mediclaim) || 0),
    },
  ];

  const leave = [
    { header: "Sick Leave", value: data?.sick_leave },
    { header: "Casual Leave", value: data?.casual_leave },
    { header: "Earn Leave", value: data?.earn_leave },
    { header: "Public Holiday", value: data?.public_holiday },
    { header: "Flexi Leave", value: data?.flexi_leave },
  ];

  return (
    <Document>
      {/* First Page */}
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.watermarkContainer}>
          <Image src={logo} style={styles.watermarkImage} />
        </View>

        <View style={tw("w-full flex justify-end items-end p-4")}>
          <Image src={logo} style={tw("w-1/3")} />
        </View>

        <View style={tw("px-4 mb-4")}>
          <Text style={tw("text-sm font-bold")}>Offer Role : {data?.role}</Text>
          <Text style={tw("text-sm font-bold")}>Ref : {data?.ref}</Text>
          <Text style={tw("text-sm font-bold")}>Date : {data?.date}</Text>
        </View>

        <View style={tw("text-sm px-4")}>
          <Text style={tw("font-bold")}>
            {data?.prefix || "Mr"}.{data?.name}
          </Text>
          <Text>S/O: {data?.son_of||"_________"}</Text>
          <Text>Address: {data?.address||"_______"},</Text>
          <Text>VTC: {data?.vtc||"________"},</Text>
          <Text>State: {data?.state||"_________"},</Text>
          <Text>Pin: {data?.pin||"_________"}</Text>
        </View>

        <View style={tw("text-sm px-4 my-3")}>
          <Text style={tw("font-bold underline")}>Sub: {data?.subject||"__________"}</Text>
        </View>

        <View style={tw("text-sm px-4 my-3")}>
          {description?.desc.split("\n").map((line, i) => (
            <Text key={i} style={tw("mb-2")} wrap>
              {line}
            </Text>
          ))}
        </View>
      </Page>
      {/* Second Page */}
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.watermarkContainer}>
          <Image src={logo} style={styles.watermarkImage} />
        </View>
        <Text style={tw("m-6")}>Some key details are highlighted below</Text>
        <View wrap style={tw("text-sm px-4 my-3")}>
          {list?.map((l, index) => (
            <View key={index} style={tw("flex flex-col gap-2")}>
              <Text style={tw("font-bold")}>{`${index + 1}. ${
                l.header
              }:`}</Text>
              <Text style={tw("my-2 ")}>{l.desc}</Text>

              {l?.header === "Financial Package" && (
                <View style={tw("flex flex-col gap-2")}>
                  <View>
                    <Text styles={tw("font-bold my-2")}>
                      Breakdown of Salary
                    </Text>
                  </View>
                  {/* Earnings Table */}
                  <View style={tw("px-4 my-2")}>
                    <Text style={tw("font-bold mb-4")}>Earnings</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        borderBottomWidth: 1,
                        borderBottomColor: "#000",
                        paddingBottom: 4,
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: "bold" }}>Type</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: "bold" }}>Yearly</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: "bold" }}>Monthly</Text>
                      </View>
                    </View>

                    {earnings?.map((e, idx) => (
                      <View
                        key={idx}
                        style={{ flexDirection: "row", paddingVertical: 4 }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text
                            style={tw(
                              `${e.header === "Total In Hand" && "font-bold"}`
                            )}
                          >
                            {e.header}
                          </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={tw(
                              `${e.header === "Total In Hand" && "font-bold"}`
                            )}
                          >
                            {e?.value || 0}
                          </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={tw(
                              `${e.header === "Total In Hand" && "font-bold"}`
                            )}
                          >
                            {(e?.value / 12).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>

                  {/* Deductions Table */}
                  <View style={tw("px-4")}>
                    <Text style={tw("font-bold mb-4")}>Deductions</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        borderBottomWidth: 1,
                        borderBottomColor: "#000",
                        paddingBottom: 4,
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: "bold" }}>Type</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: "bold" }}>Yearly</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: "bold" }}>Monthly</Text>
                      </View>
                    </View>

                    {deductions?.map((e, idx) => (
                      <View
                        key={idx}
                        style={{ flexDirection: "row", paddingVertical: 4 }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text
                            style={tw(
                              `${
                                e.header === "Total Deductions" && "font-bold"
                              }`
                            )}
                          >
                            {e.header}
                          </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={tw(
                              `${
                                e.header === "Total Deductions" && "font-bold"
                              }`
                            )}
                          >
                            {e?.value || 0}
                          </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={tw(
                              `${
                                e.header === "Total Deductions" && "font-bold"
                              }`
                            )}
                          >
                            {(e?.value / 12).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>

                  <View style={tw("text-sm font-bold px-4 my-5")}>
                    <Text>
                      Total Gross : Total In Hand + Total Deductions ={" "}
                      {(data?.CTC / 12).toFixed(2)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </Page>
      {/* extra page */}
      <Page size="A4" style={styles.page} warp>
        <View style={styles.watermarkContainer}>
          <Image src={logo} style={styles.watermarkImage} />
        </View>

        <View style={tw("text-sm px-4 my-3")}>
          {extraList?.map((l, index) => (
            <View key={index} style={tw("flex flex-col gap-2")}>
              <Text style={tw("font-bold")}>{`${index + 3 + 1}. ${
                l.header
              }:`}</Text>
              {l.desc.split("\n").map((line, i) => (
                <Text key={i} style={tw("mb-2")} wrap>
                  {line}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </Page>
      {/* Third page */}
      <Page size="A4" style={styles.page} warp>
        <View style={styles.watermarkContainer}>
          <Image src={logo} style={styles.watermarkImage} />
        </View>

        <View style={tw("text-sm px-4 my-3")}>
          {thirdList?.map((l, index) => (
            <View key={index} style={tw("flex flex-col gap-2")}>
              <Text style={tw("font-bold")}>{`${index + 11 + 1}. ${
                l.header
              }:`}</Text>
              {l.desc.split("\n").map((line, i) => (
                <Text key={i} style={tw("mb-2")} wrap>
                  {line}
                </Text>
              ))}
              {l.header === "Leave Policy" && (
                <View style={tw("flex flex-col gap-2 mt-8")}>
                  <View style={tw("px-4")}>
                    <Text style={tw("font-bold")}>Holiday Calender</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        borderBottomWidth: 1,
                        borderBottomColor: "#000",
                        paddingBottom: 4,
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: "bold" }}>Leave Type</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: "bold" }}>Days</Text>
                      </View>
                    </View>

                    {leave?.map((e, idx) => (
                      <View
                        key={idx}
                        style={{ flexDirection: "row", paddingVertical: 4 }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text
                            style={tw(
                              `${e.header === "Total In Hand" && "font-bold"}`
                            )}
                          >
                            {e.header}
                          </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={tw(
                              `${e.header === "Total In Hand" && "font-bold"}`
                            )}
                          >
                            {e?.value || 0}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
        <View
          style={tw("w-full flex flex-col justify-end items-end px-6 text-sm")}
        >
          <Text>Yours truly,</Text>
          <Text>Nexucon Consultancy Services Pvt Ltd</Text>
        </View>
        <View style={tw("w-full flex text-sm px-6")}>
          <Text style={tw("font-bold")}>Authorised Signatory </Text>
          <Text>
            I agree to accept the conditions of employment indicated above, this
            ________day of ,____ 2025
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default Testing;
