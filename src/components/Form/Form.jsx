import React, { useContext } from "react";
import "./form.css";
import ProfileForm from "./ProfileForm";
import Project from "./Project";
import Items from "./Items";
import FormButton from "./FormComponents/FormButton";
import { DataContext } from "../../App";

function Form() {
  const { form, dispatchForm, dispatchInvoice, invoice } =
    useContext(DataContext);

  const handleSubmit = () => {
    // Check the status first to determine if the form should be saved as a draft
    if (form.project.status === "draft") {
      dispatchInvoice({
        type: "CREATE_INVOICE",
        payload: {
          formData: form,
          editingID: form.editingObj?.id,
        },
      });
      console.log("Saving as draft, skipping validation.");
      // Reset form after successful invoice creation saved as draft
      dispatchForm({ type: "RESET_FORM" });
      return; // Exit the function quickly
    }

    // Validate the form before creating the invoice
    validateForm();

    if (form.formValid) {
      console.log("Form is valid, creating invoice.");
      dispatchInvoice({
        type: "CREATE_INVOICE",
        payload: { formData: form, editingID: form.editingObj?.id },
      });

      // Reset form after successful invoice creation
      dispatchForm({ type: "RESET_FORM" });
    } else {
      console.log("Form is invalid.");
      return;
    }
  };

  const validateForm = () => {
    const validationRules = {
      email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: "Invalid email format",
      },
      phone: {
        regex: /^[+]?[0-9]{1,4}([\s.-]?[0-9]{1,15})+$/,
        errorMessage: "Invalid phone number format",
      },
    };

    dispatchForm({
      type: "VALIDATE_FORM",
      payload: { sectionToValidate: "company", validationRules },
    });
    dispatchForm({
      type: "VALIDATE_FORM",
      payload: { sectionToValidate: "client", validationRules },
    });
    dispatchForm({
      type: "VALIDATE_FORM",
      payload: {
        sectionToValidate: "project",
        validationRules: {
          description: { regex: /.+/, errorMessage: "Description is required" },
        },
      },
    });

    validateItems();
  };

  const validateItems = () => {
    const updatedItems = form.items.map((item) => {
      let isValid = true;
      const updatedItem = { ...item };

      if (item.productName?.value?.trim() === "") {
        updatedItem.productName.valid = false;
        updatedItem.productName.errorMessage = "Item name is required";
        isValid = false;
      }

      if (isNaN(item.quantity.value)) {
        updatedItem.quantity.valid = false;
        updatedItem.quantity.errorMessage = "";
        isValid = false;
      }

      if (isNaN(item.price.value)) {
        updatedItem.price.valid = false;
        updatedItem.price.errorMessage = "";
        isValid = false;
      }

      return { ...updatedItem, valid: isValid };
    });

    dispatchForm({
      type: "VALIDATE_ITEMS",
      payload: { items: updatedItems },
    });
  };
  const data = {
    discard: {
      text: "Discard",
      id: "discard",
      actionType: "DISCARD_INVOICE",
      type: "button",
    },

    send: {
      text: form.project.status === "draft" ? "Save as Draft" : "Save & Send",
      id: form.project.status === "draft" ? "draft" : "send",
      actionType: "SAVE_INVOICE",
      type: "button",
    },
  };
  return (
    <article className="form-wrapper">
      <form className="form-container">
        <header className="form-header">
          <h2 className="form-main-title">New Invoice</h2>
          <p className="form-parag">Fill out the form to create an invoice</p>
        </header>
        <div className="form-content">
          <ProfileForm />
          <Project />
          <Items />
        </div>
        <div className="form-action-btn-wrapper">
          <FormButton data={data.discard} onSubmit={handleSubmit} />
          <div className="draft-send-wrapper">
            {/* <FormButton data={data.draft} /> */}
            <FormButton data={data.send} onSubmit={handleSubmit} />
          </div>
        </div>
      </form>
    </article>
  );
}

export default Form;
