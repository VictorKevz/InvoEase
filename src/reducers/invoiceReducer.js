import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
export const invoiceReducer = (state, action) => {
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