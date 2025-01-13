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

export const DataContext = createContext();
const formReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_FORM_ITEMS":
      const { formKey } = action.payload;
      return {
        ...state,
        [formKey]: !state[formKey],
      };
    case "EDIT_FORM":
      const { editingObj } = action.payload;
      return {
        ...state,
        isEditing: true,
        showForm: true,
        editingObj: editingObj,
      };
    case "PREFILL_FORM":
      const { prefillObj } = action.payload;
      return {
        ...state,
        company: {
          name: { value: prefillObj?.company?.name, valid: true },
          address: { value: prefillObj?.company?.address, valid: true },
          city: { value: prefillObj?.company?.city, valid: true },
          postCode: { value: prefillObj?.company?.postCode, valid: true },
          country: { value: prefillObj?.company?.country, valid: true },
          email: { value: prefillObj?.company?.email, valid: true },
          phone: { value: prefillObj?.company?.phone, valid: true },
          logo: { value: prefillObj?.company?.logo, valid: true },
        },
        client: {
          name: { value: prefillObj?.client?.name, valid: true },
          email: { value: prefillObj?.client?.email, valid: true },
          address: { value: prefillObj?.client?.address, valid: true },
          city: { value: prefillObj?.client?.city, valid: true },
          postCode: { value: prefillObj?.client?.postCode, valid: true },
          country: { value: prefillObj?.client?.country, valid: true },
          phone: { value: prefillObj?.client?.phone, valid: true },
          avatar: { value: prefillObj?.client?.avatar, valid: true },
        },
        project: {
          invoiceDate: {
            value: prefillObj?.createdAt,
            valid: true,
            errorMessage: "",
          },
          paymentTerms: {
            value: `Net ${prefillObj?.paymentTerms} Day`,
            valid: true,
            errorMessage: "",
          },
          description: {
            value: prefillObj?.description,
            valid: true,
            errorMessage: "",
          },
          status: {
            value: prefillObj?.status,
            valid: true,
            errorMessage: "",
          },
          statusDropdown: false,
          paymentTermsDropdown: false,
        },
        items: prefillObj?.items.map((item) => ({
          id: item.id,
          productName: {
            label: "Item Name",
            id: `productName-${uuidv4()}`,
            uniqueId: uuidv4(),
            type: "text",
            placeholder: item?.name,
            value: item.name,
            valid: true,
            errorMessage: "",
          },
          quantity: {
            label: "Qty",
            id: `quantity-${uuidv4()}`,
            uniqueId: uuidv4(),
            type: "text",
            placeholder: "",
            value: parseFloat(item.quantity) || 0,
            valid: true,
            errorMessage: "",
          },
          price: {
            label: "Price",
            id: `price-${uuidv4()}`,
            uniqueId: uuidv4(),
            type: "text",
            placeholder: "",
            value: parseFloat(item.price) || 0,
            valid: true,
            errorMessage: "",
          },
        })),
      };
    case "UPDATE_PROFILE_FORM":
      const { name, value, file, section } = action.payload;
      return {
        ...state,
        [section]: {
          ...state[section],
          [name]: {
            ...state[section][name],
            value: file || value,
            valid: true,
          },
        },
      };
    case "VALIDATE_FORM": {
      const { sectionToValidate, updatedSection } = action.payload;
      return {
        ...state,
        [sectionToValidate]: updatedSection,
      };
    }
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
      const { key: projectKey, option, dropDownKey } = action.payload;
      return {
        ...state,
        project: {
          ...state.project,
          [projectKey]: {
            ...state.project[projectKey],
            value: option,
            valid: true,
          },
          [dropDownKey]: false,
        },
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
    case "VALIDATE_ITEMS":
      const { items } = action.payload;
      return {
        ...state,
        items,
        formValid: items.every((item) => item.valid),
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

    case "RESET_FORM":
      return {
        ...state,
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
        ],
        showForm: false,
        showItems: false,
        formValid: false,
        editingObj: {},
        isEditing: false,
      };
    default:
      return state;
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
    case "SHOW_WARNING_MODAL":
      const { title, message, modalId } = action.payload;
      return {
        ...state,
        warningModal: {
          ...state.warningModal,
          title,
          message,
          show: true,
          modalId,
        },
      };
    case "HIDE_WARNING_MODAL":
      return {
        ...state,
        warningModal: {
          title: "",
          message: "",
          show: false,
          modalId: null,
        },
      };
    case "MARK_AS_PAID":
      const { modalId: paidId } = action.payload;
      return {
        ...state,
        invoiceData: state.invoiceData.map((item) =>
          item.id === paidId
            ? {
                ...item,
                status: "paid",
              }
            : item
        ),
        warningModal: {
          title: "",
          message: "",
          show: false,
          modalId: null,
        },
      };

    case "CREATE_INVOICE":
      const { formData, editingID } = action.payload;
      const numberOfDays = parseInt(
        formData?.project?.paymentTerms?.value?.match(/\d+/)?.[0]
      );
      return {
        ...state,
        invoiceData: editingID
          ? // If editing, update the specific object
            state.invoiceData.map(
              (invoice) =>
                invoice.id === editingID
                  ? {
                      ...invoice,
                      createdAt: formData?.project?.invoiceDate?.value,
                      paymentDue: dayjs(formData?.project?.invoiceDate?.value)
                        .add(numberOfDays, "day")
                        .format("YYYY-MM-DD"),
                      paymentTerms: numberOfDays,
                      description: formData?.project?.description?.value,
                      status: formData?.project?.status?.value,
                      company: {
                        name: formData?.company?.name.value,
                        address: formData?.company?.address.value,
                        city: formData?.company?.city.value,
                        postCode: formData?.company?.postCode.value,
                        country: formData?.company?.country.value,
                        email: formData?.company?.email.value,
                        phone: formData?.company?.phone.value,
                        logo: formData?.company?.logo?.value,
                      },
                      client: {
                        name: formData?.client?.name.value,
                        address: formData?.client?.address.value,
                        city: formData?.client?.city.value,
                        postCode: formData?.client?.postCode.value,
                        country: formData?.client?.country.value,
                        email: formData?.client?.email.value,
                        phone: formData?.client?.phone.value,
                        avatar: formData?.client?.avatar.value,
                      },
                      items: formData?.items?.map((item) => ({
                        id: item.id || uuidv4(), // Preserve existing ID or generate new
                        name: item.productName.value,
                        quantity: Number(item.quantity.value),
                        price: Number(item.price.value),
                        total:
                          Number(item.quantity.value) *
                          Number(item.price.value),
                      })),
                      total: formData?.items.reduce(
                        (acc, item) =>
                          acc +
                          Number(item.quantity.value) *
                            Number(item.price.value),
                        0
                      ),
                    }
                  : invoice // Preserve other objects
            )
          : // If creating a new invoice, append to the array
            [
              ...state.invoiceData,
              {
                id: uuidv4().slice(0, 6),
                createdAt: formData?.project?.invoiceDate?.value,
                paymentDue: dayjs(formData?.project?.invoiceDate?.value)
                  .add(numberOfDays, "day")
                  .format("YYYY-MM-DD"),
                paymentTerms: numberOfDays,
                description: formData?.project?.description?.value,
                status: formData?.project?.status?.value,
                company: {
                  name: formData?.company?.name.value,
                  address: formData?.company?.address.value,
                  city: formData?.company?.city.value,
                  postCode: formData?.company?.postCode.value,
                  country: formData?.company?.country.value,
                  email: formData?.company?.email.value,
                  phone: formData?.company?.phone.value,
                  logo: formData?.company?.logo?.value,
                },
                client: {
                  name: formData?.client?.name.value,
                  address: formData?.client?.address.value,
                  city: formData?.client?.city.value,
                  postCode: formData?.client?.postCode.value,
                  country: formData?.client?.country.value,
                  email: formData?.client?.email.value,
                  phone: formData?.client?.phone.value,
                  avatar: formData?.client?.avatar.value,
                },
                items: formData?.items?.map((item) => ({
                  id: uuidv4(),
                  name: item.productName.value,
                  quantity: Number(item.quantity.value),
                  price: Number(item.price.value),
                  total: Number(item.quantity.value) * Number(item.price.value),
                })),
                total: formData?.items.reduce(
                  (acc, item) =>
                    acc +
                    Number(item.quantity.value) * Number(item.price.value),
                  0
                ),
                clientEmails: [
                  ...state.clientEmails,
                  formData?.client?.email?.value,
                ],
              },
            ],
      };
    case "DELETE_INVOICE":
      const { modalId: id } = action.payload;
      return {
        ...state,
        invoiceData: state.invoiceData.filter((item) => item.id !== id),
        warningModal: {
          title: "",
          message: "",
          show: false,
          modalId: null,
        },
      };

    default:
      state;
  }
};
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
        {form?.showForm && <Form />}
      </main>
    </DataContext.Provider>
  );
}

export default App;
