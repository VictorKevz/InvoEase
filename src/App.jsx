import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import data from "./data.json";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Home from "./pages/Home/Home";
import { useTranslation } from "react-i18next";
import Settings from "./pages/Settings/Settings";
import Portal from "./pages/Portal/Portal";
import DetailsInvoicePage from "./pages/DetailedInvoice/DetailsInvoicePage";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import Form from "./components/Form/Form";
import { formReducer } from "./reducers/formReducer";
import { invoiceReducer } from "./reducers/invoiceReducer";
import { settingsReducer } from "./reducers/settingsReducer";

export const DataContext = createContext();

function App() {
  // FORM STATE DECLARATION...................................................
  const initialFormData = {
    company: {
      name: { value: "", valid: true, errorMessage: "" },
      address: { value: "", valid: true, errorMessage: "" },
      city: { value: "", valid: true },
      postCode: { value: "", valid: true, errorMessage: "" },
      country: { value: "", valid: true, errorMessage: "" },
      email: { value: "", valid: true, errorMessage: "" },
      phone: { value: "", valid: true, errorMessage: "" },
      logo: { value: "", valid: true, errorMessage: "" },
    },
    client: {
      name: { value: "", valid: true, errorMessage: "" },
      email: { value: "", valid: true, errorMessage: "" },
      address: { value: "", valid: true, errorMessage: "" },
      city: { value: "", valid: true, errorMessage: "" },
      postCode: { value: "", valid: true, errorMessage: "" },
      country: { value: "", valid: true, errorMessage: "" },
      phone: { value: "", valid: true, errorMessage: "" },
      avatar: { value: "", valid: true, errorMessage: "" },
    },
    project: {
      invoiceDate: {
        value: dayjs().format("YYYY-MM-DD"),
        valid: true,
        errorMessage: "",
      },
      paymentTerms: {
        value: "Net 1 Day",
        valid: true,
        errorMessage: "",
      },
      description: {
        value: "",
        valid: true,
        errorMessage: "",
      },
      status: {
        value: "pending",
        valid: true,
        errorMessage: "",
      },
    },

    items: [
      {
        id: uuidv4(),
        productName: {
          label: "Item Name",
          id: "productName",
          uniqueId: "product-name-1",
          type: "text",
          placeholder: "Banner Design",
          value: "",
          valid: true,
          errorMessage: "",
        },
        quantity: {
          label: "Qty",
          id: "quantity",
          uniqueId: "quantity-1",
          type: "text",
          placeholder: "",
          value: "",
          valid: true,
          errorMessage: "",
        },
        price: {
          label: "Price",
          id: "price",
          uniqueId: "price-1",
          type: "text",
          placeholder: "",
          value: "",
          valid: true,
          errorMessage: "",
        },
      },
      // next products would be appended here
    ],
    statusDropdown: false,
    paymentTermsDropdown: false,
    showForm: false,
    showItems: false,
    formValid: false,
    editingObj: {},
    isEditing: false,
  };
  const [form, dispatchForm] = useReducer(formReducer, initialFormData);
  // FORM STATE DECLARATION...................................................
  /* 
  .
  .
  .
  */
  // INVOICE STATE DECLARATION...............................................
  const savedData = JSON.parse(localStorage.getItem("invoiceData"));
  const initialInvoiceData = {
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
  const [invoice, dispatchInvoice] = useReducer(
    invoiceReducer,
    initialInvoiceData
  );
  useEffect(() => {
    localStorage.setItem("invoiceData", JSON.stringify(invoice?.invoiceData));
  }, [invoice?.invoiceData]);
  const filteredData = invoice?.invoiceData?.filter((obj) =>
    invoice.status.includes(obj.status)
  );
  // INVOICE STATE DECLARATION...............................................
  /* 
  .
  .
  .
  .
  */
  // SETTINGS STATE DECLARATION...............................................
  const savedCurrency = JSON.parse(localStorage.getItem("currency"));
  const savedLocale = JSON.parse(localStorage.getItem("locale"));
  const savedColorTheme = JSON.parse(localStorage.getItem("colorTheme"));
  const savedFontTheme = JSON.parse(localStorage.getItem("fontTheme"));
  const savedLanguage = JSON.parse(localStorage.getItem("language"));
  const initialSettings = {
    currentTab: "currency",
    currency: savedCurrency || "EUR",
    locale: savedLocale || "fi-FI",
    language: savedLanguage || "en",
    colorTheme: savedColorTheme || "dark",
    fontTheme: savedFontTheme || '"League Spartan", sans-serif',
  };
  const [settings, dispatchSettings] = useReducer(
    settingsReducer,
    initialSettings
  );
  // SETTINGS STATE DECLARATION...............................................

  const { t } = useTranslation();
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(settings.locale, {
      style: "currency",
      currency: settings.currency,
    }).format(amount);
  };
  const formatDate = (inputDate) => {
    let formattedDate;
    const date = new Date(inputDate);
    formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
    return formattedDate;
  };

  return (
    <DataContext.Provider
      value={{
        settings,
        dispatchSettings,
        form,
        dispatchForm,
        invoice,
        dispatchInvoice,
        filteredData,
        t,
        formatCurrency,
        formatDate,
      }}
    >
      <main
        className="outer-container"
        style={{ fontFamily: `${settings.fontTheme}` }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/details/:id" element={<DetailsInvoicePage />} />
        </Routes>
        {form?.showForm && <Form />}
      </main>
    </DataContext.Provider>
  );
}
export default App;
