import { createContext, useReducer, useState } from "react";
import "./App.css";
import data from "./data.json";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Home from "./pages/Home/Home";
import { useTranslation } from "react-i18next";
import Settings from "./pages/Settings/Settings";

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
      const{key,tab} = action.payload;
      return { ...state, [key]: tab };

    default:
      state;
  }
};
function App() {
  const savedData = JSON.parse(localStorage.getItem("invoiceData"));
  const initialFormData = {
    invoiceData: savedData || data,
    company: {},
    client: {},
    project: {},
    items: [],
  };
  const [formData, setFormData] = useReducer(formReducer, initialFormData);

  // SETTINGS DATA DECLARATION
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

  const { t } = useTranslation();
  return (
    <DataContext.Provider
      value={{ settings, dispatchSettings, formData, setFormData, t }}
    >
      <main
        className="outer-container"
        style={{ fontFamily: `${settings.fontTheme}` }}
      >
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </DataContext.Provider>
  );
}

export default App;
