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

export const DataContext = createContext();
const formReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_FORM_ITEMS":
      const { formKey } = action.payload;
      return { ...state, [formKey]: true };
    case "UPDATE_PROFILE_FORM":
      const { name, value, file, section } = action.payload;
      return {
        ...state,
        [section]: {
          ...state[section],
          [name]: {
            ...state[section][name],
            value:file || value,
            valid: true,
          }
        },
      };
      case "VALIDATE_FORM":
        const { sectionToValidate, validationRules } = action.payload;
        let isValid = true;
        const updatedSection = { ...state[sectionToValidate] };
      
        Object.keys(updatedSection).forEach((key) => {
          const field = updatedSection[key];
          if (validationRules[key]) {
            const { regex, errorMessage } = validationRules[key];
            if (!regex.test(field.value)) {
              field.valid = false;
              field.errorMessage = errorMessage;
              isValid = false;
            }
          } else if (field.value.trim() === "") {
            field.valid = false;
            field.errorMessage = "Can't be blank.";
            isValid = false;
          }
        });
      
        return {
          ...state,
          [sectionToValidate]: updatedSection,
          formValid: isValid,
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
      const { key: projectKey, option } = action.payload;
      return {
        ...state,
        project: {
          ...state.project,
          [projectKey]: option,
        },
      };
    case "UPDATE_PROJECT_FORM":
      const { name: projectName, value: projectValue } = action.payload;
      return {
        ...state,
        project: {
          ...state.project,
          [projectName]: projectValue,
        },
        projectValid: { ...state.projectValid, [projectName]: true },
      };
    case "UPDATE_ITEMS":
      const { rowId, itemKey, itemValue } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === rowId
            ? {
                ...item,
                [itemKey]: {
                  ...item[itemKey],
                  value: itemValue,
                  valid: true,
                },
              }
            : item
        ),
      };

    case "ADD_ITEMS":
      const uniqueId = uuidv4();
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: uuidv4(),
            productName: {
              id: `productName-${uniqueId}`,
              uniqueId: uuidv4(),
              placeholder: "Item Name",
              value: "",
              type: "text",
              valid: true,
            },
            quantity: {
              id: `quantity-${uniqueId}`,
              uniqueId: uuidv4(),
              value: "",
              type: "text",
              valid: true,
            },
            price: {
              id: `price-${uniqueId}`,
              uniqueId: uuidv4(),
              value: "",
              type: "text",
              valid: true,
            },
          },
        ],
      };
    case "DELETE_ITEMS":
      const { rowId: id } = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
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
      name: { value: "", valid: true,errorMessage:"Can't be blank." },
      address: { value: "", valid: true,errorMessage:"Can't be blank." },
      city: { value: "", valid: true },
      postCode: { value: "", valid: true,errorMessage:"Can't be blank." },
      country: { value: "", valid: true,errorMessage:"Can't be blank." },
      email: { value: "", valid: true,errorMessage:"Can't be blank." },
      phone: { value: "", valid: true,errorMessage:"Can't be blank." },
      logo: { value: "", valid: true },
    },
    client: {
      name: { value: "", valid: true,errorMessage:"Can't be blank." },
      email: { value: "", valid: true,errorMessage:"Can't be blank." },
      address: { value: "", valid: true,errorMessage:"Can't be blank." },
      city: { value: "", valid: true,errorMessage:"Can't be blank." },
      postCode: { value: "", valid: true,errorMessage:"Can't be blank." },
      country: { value: "", valid: true,errorMessage:"Can't be blank." },
      phone: { value: "", valid: true,errorMessage:"Can't be blank." },
      avatar: { value: "", valid: true },
    },
    project: {
      invoiceDate: dayjs().format("YYYY-MM-DD"),
      paymentTerms: "Net 1 Day",
      description: {value: "", valid: true,errorMessage:"Can't be blank."},
      status: "pending",
      
      statusDropdown: false,
      paymentTermsDropdown: false,
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

    showForm: false,
    showItems: false,
    formValid: true,
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
