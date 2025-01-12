import React, { useContext, useEffect } from "react";
import { DataContext } from "../App";

function InvoiceButton({ data }) {
  const { dispatchForm, dispatchInvoice, form } = useContext(DataContext);

  useEffect(() => {
    if (form.isEditing && form.editingObj) {
      dispatchForm({
        type: "PREFILL_FORM",
        payload: { prefillObj: form.editingObj },
      });
    }
  }, [form?.editingObj]);
  return (
    <button
      type="button"
      className={`btn ${data.color}`}
      onClick={() => {
        data.color === "edit"
          ? dispatchForm({
              type: "EDIT_FORM",
              payload: { editingObj: data.obj },
            })
          : dispatchInvoice({
              type: data.actionType,
              payload: {
                modalId: data.id,
                title: data.title,
                message: data.message,
              },
            });
      }}
    >
      {data.text}
    </button>
  );
}

export default InvoiceButton;
