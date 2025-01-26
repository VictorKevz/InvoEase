import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

// IMPORT PAGES & COMPONENTS...............................................................
import Navbar from "./components/NavBar/Navbar";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import Portal from "./pages/Portal/Portal";
import DetailsInvoicePage from "./pages/DetailedInvoice/DetailsInvoicePage";
import Form from "./components/Form/Form";

// IMPORT REDUCERS & UTILS...............................................................
import { formReducer } from "./reducers/formReducer";
import { invoiceReducer } from "./reducers/invoiceReducer";
import { settingsReducer } from "./reducers/settingsReducer";
import { formatDate } from "./utils/formatDate";

import { useTranslation } from "react-i18next";

// IMPORT INITIAL DATA...............................................................
import { initialFormData } from "./reducers/initialData/formInitialData";
import { initialInvoiceData } from "./reducers/initialData/InvoiceInitialData";
import { initialSettings } from "./reducers/initialData/settingsInitialData";

export const DataContext = createContext();

function App() {
  // FORM STATE DECLARATION.....................................................
  const [form, dispatchForm] = useReducer(formReducer, initialFormData);

  // INVOICE STATE DECLARATION...............................................

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

  // SETTINGS STATE DECLARATION...................................................
  const [settings, dispatchSettings] = useReducer(
    settingsReducer,
    initialSettings
  );

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
