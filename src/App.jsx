import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import data from "./data.json";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Home from "./pages/Home/Home";
import { useTranslation } from "react-i18next";
import Settings from "./pages/Settings/Settings";
import Portal from "./pages/Portal/Portal";

export const DataContext = createContext();
const formReducer = (state, action) => {
  switch (action.type) {
    case value:

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
      const existingStatus = state.status.includes(filter);
      if (existingStatus) {
        return {
          ...state,
          status: state.status.filter((status) => status !== filter),
          
        };
      }
      return { ...state, status: [...state.status, filter]};
    case "TOGGLE_STATUS":
      return { ...state, showStatus: !state.showStatus };
    default:
      state;
  }
};
function App() {
  // FORM STATE DECLARATION...................................................
  const initialFormData = {
    company: {},
    client: {},
    project: {},
    items: [],
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
  };
  const [invoice, dispatchInvoice] = useReducer(
    invoiceReducer,
    initialInvoiceData
  );
  useEffect(() => {
    localStorage.setItem("invoiceData", JSON.stringify(invoice?.invoiceData));
  }, [invoice?.invoiceData]);
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
        </Routes>
      </main>
    </DataContext.Provider>
  );
}

export default App;
