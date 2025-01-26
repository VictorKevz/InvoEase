import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
 

export const initialFormData = {
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