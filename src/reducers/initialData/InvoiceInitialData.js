import data from "../../data.json"


const savedData = JSON.parse(localStorage.getItem("invoiceData"));
export const initialInvoiceData = {
    invoiceData: savedData || data,
    clientEmails: [
      ...new Set(savedData?.map((item) => item?.client?.email) || []),
    ],
    status: ["draft", "pending", "paid"],
    showStatus: false,
    warningModal: {
      title: "",
      message: "",
      show: false,
      modalId: null,
    },
  };