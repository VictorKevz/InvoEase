import { v4 as uuidv4 } from "uuid";
import { prefillClientCompany } from "../utils/clientCompany";
import dayjs from "dayjs";

export const formReducer = (state, action) => {
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
        company: prefillClientCompany(prefillObj?.company),
        client: prefillClientCompany(prefillObj?.client),
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
            value: String(item?.quantity) || "",
            valid: true,
            errorMessage: "",
          },
          price: {
            label: "Price",
            id: `price-${uuidv4()}`,
            uniqueId: uuidv4(),
            type: "text",
            placeholder: "",
            value: String(item?.price) || "",
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
        [key]: !state[key],
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
        },
        [dropDownKey]: false,
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
              label: "Item Name",
              id: `productName-${uniqueId}`,
              uniqueId: uuidv4(),
              placeholder: "Item Name",
              value: "",
              type: "text",
              valid: true,
            },
            quantity: {
              id: `quantity-${uniqueId}`,
              label: "Qty",
              uniqueId: uuidv4(),
              value: "",
              type: "text",
              valid: true,
            },
            price: {
              id: `price-${uniqueId}`,
              label: "Price",
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
    default:
      return state;
  }
};
