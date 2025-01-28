import React, { useContext, useEffect } from "react";
import "./form.css";
import ProfileForm from "./ProfileForm";
import Project from "./Project";
import Items from "./Items";
import FormButton from "./FormComponents/FormButton";
import { DataContext } from "../../App";

function Form() {
  const { form, dispatchForm, dispatchInvoice, t } = useContext(DataContext);

  const handleSubmit = () => {
    // Check the status first to determine if the form should be saved as a draft
    if (form.project.status.value === "draft") {
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
    const isFormValid = validateForm();
    if (isFormValid) {
      dispatchInvoice({
        type: "CREATE_INVOICE",
        payload: { formData: form, editingID: form.editingObj?.id },
      });
      console.log("Form is valid, creating invoice.");
      // Reset form after successful invoice creation
      dispatchForm({ type: "RESET_FORM" });
    } else {
      console.log("Form is invalid.");
      return;
    }
  };

  const validateForm = () => {
    let overallValid = true;
    const validationRules = {
      email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: "Invalid email format",
      },
      phone: {
        regex: /^[+]?[0-9]{1,4}([-\s]?[0-9]{1,15})*$/,
        errorMessage: "Invalid phone number format",
      },
      description: {
        regex: /.+/,
        errorMessage: "Description is required",
      },
    };

    ["company", "client", "project"].forEach((section) => {
      let sectionValid = true;
      const updatedSection = { ...form[section] };

      Object.keys(updatedSection).forEach((key) => {
        const field = updatedSection[key];

        // Ensure the field is an object before attempting to set properties on it
        if (typeof field === "object" && field !== null) {
          if (key === "logo" || key === "avatar") {
            // Skip validation for logo and avatar
            field.valid = true;
            field.errorMessage = "";
          } else if (validationRules[key]) {
            const { regex, errorMessage } = validationRules[key];
            if (!regex.test(field.value)) {
              field.valid = false;
              field.errorMessage = errorMessage;
              sectionValid = false;
            }
          } else if (field.value.trim() === "") {
            field.valid = false;
            field.errorMessage = `Invalid ${key}`;
            sectionValid = false;
          } else {
            field.valid = true;
            field.errorMessage = "";
          }
        }
      });

      if (!sectionValid) overallValid = false;

      dispatchForm({
        type: "VALIDATE_FORM",
        payload: { sectionToValidate: section, updatedSection },
      });
    });

    // Validate items and combine validity
    const itemsValid = validateItems();

    // Combine field validation and items validation
    overallValid = overallValid && itemsValid;

    return overallValid;
  };

  const validateItems = () => {
    const updatedItems = form.items.map((item) => {
      let isValid = true;
      const updatedItem = { ...item };

      if (item.productName.value.trim() === "") {
        updatedItem.productName.valid = false;
        updatedItem.productName.errorMessage = "Item name is required";
        isValid = false;
      }

      if (isNaN(item.quantity.value) || item.quantity.value.trim() === "") {
        updatedItem.quantity.valid = false;
        updatedItem.quantity.errorMessage = "Quantity must be a number";
        isValid = false;
      }

      if (isNaN(item.price.value) || item.price.value.trim() === "") {
        updatedItem.price.valid = false;
        updatedItem.price.errorMessage = "Price must be a number";
        isValid = false;
      }

      return { ...updatedItem, valid: isValid };
    });

    dispatchForm({
      type: "VALIDATE_ITEMS",
      payload: { items: updatedItems },
    });

    return updatedItems.every((item) => item.valid);
  };
  const data = {
    discard: {
      text: "Discard",
      id: "discard",
      actionType: "RESET_FORM",
      type: "button",
    },

    send: {
      text:
        form.project.status.value === "draft" ? "Save as Draft" : "Save & Send",
      id: form.project.status.value === "draft" ? "draft" : "send",
      actionType: "SAVE_INVOICE",
      type: "button",
    },
  };
  return (
    <article className="form-wrapper">
      <form className="form-container">
        <header className="form-header">
          <h2 className="form-main-title">
            {form.isEditing
              ? `Edit Invoice #${form.editingObj.id}`
              : t("New Invoice")}
          </h2>
          <p className="form-parag">
            {t("Fill out the form to create an invoice")}
          </p>
        </header>
        <div className="form-content">
          <ProfileForm />
          <Project />
          <Items />
        </div>
        <div className="form-action-btn-wrapper">
          <FormButton data={data.discard} />
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
