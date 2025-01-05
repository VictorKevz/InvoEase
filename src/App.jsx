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

export const DataContext = createContext();
const formReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_FORM":
      return { ...state, showForm: true };
    case "UPDATE_PROFILE_FORM":
      const { name, value, file, section } = action.payload;
      return {
        ...state,
        [section]: {
          ...state[section],
          [name]: file || value,
        },
        [`${section}Valid`]: { ...state[`${section}Valid`], [name]: true },
      };
      case "TOGGLE_DROPDOWN":
        const { key } = action.payload;
        return {
          ...state,
          project: {
            ...state.project,
            [key]: !state.project[key],
          },
        };
        case "UPDATE_DROPDOWN_SELECTION":
      const { key:projectKey, option } = action.payload;
      return {
        ...state,
        project: {
          ...state.project,
          [projectKey]: option,
        },
      };
      
    default:
      state;
  }
};
const settingsReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TAB":
      const { key, tab } = action.payload;
      return { ...state, [key]: tab };

    default:
      state;
  }
};
const invoiceReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATUS":
      const { filter } = action.payload;
      return {
        ...state,
        status: state.status.includes(filter)
          ? state.status.filter((status) => status !== filter)
          : [...state.status, filter],
      };
    case "TOGGLE_STATUS":
      return { ...state, showStatus: !state.showStatus };
    default:
      state;
  }
};
function App() {
  // FORM STATE DECLARATION...................................................
  const initialFormData = {
    company: {
      name: "",
      address: "",
      city: "",
      postCode: "",
      country: "",
      email: "",
      phone: "",
      logo: "",
      companyValid: {
        name: true,
        address: true,
        city: true,
        postCode: true,
        country: true,
        email: true,
        phone: true,
        logo: true,
      },
    },
    client: {
      name: "",
      email: "",
      address: "",
      city: "",
      postCode: "",
      country: "",
      phone: "",
      avatar: "",
      clientValid: {
        name: true,
        email: true,
        address: true,
        city: true,
        postCode: true,
        country: true,
        phone: true,
      },
    },
    project: {
      invoiceDate: "",
      paymentTerms: "Net 1 Day",
      description: "",
      status: "pending",
      projectValid: {
        invoiceDate: true,
        paymentTerms: true,
        description: true,
      },
      statusDropdown:false,
      paymentTermsDropdown:false
    },
    items: [
      {
        id: 1,
        name: "",
        quantity: "",
        price: "",
        total: "",
        itemValid: {
          name: true,
          quantity: true,
          price: true,
        },
      },
    ],
    showForm: false,
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
    status: ["draft", "pending", "paid"],
    showStatus: false,
    clients: [],
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
  const savedCurrecny = JSON.parse(localStorage.getItem("currency"));
  const savedColorTheme = JSON.parse(localStorage.getItem("colorTheme"));
  const savedFontTheme = JSON.parse(localStorage.getItem("fontTheme"));
  const savedLanguage = JSON.parse(localStorage.getItem("language"));
  const initialSettings = {
    currentTab: "currency",
    currency: savedCurrecny || "euro",
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
      </main>
    </DataContext.Provider>
  );
}

export default App;
