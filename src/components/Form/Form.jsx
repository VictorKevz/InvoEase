import React, { useContext } from "react";
import "./form.css";
import ProfileForm from "./ProfileForm";
import Project from "./Project";
import Items from "./Items";
import FormButton from "./FormComponents/FormButton";
import { DataContext } from "../../App";
import { p } from "framer-motion/client";

function Form() {
  const { form, dispatchForm,dispatchInvoice } = useContext(DataContext);
  // const { name, address, city, postCode, country, email, phone, logo } =
  //   form.company;
  // const {
  //   name: clientName,
  //   address: clientAddress,
  //   city: clientCity,
  //   postCode: clientPostCode,
  //   country: clientCountry,
  //   email: clientEmail,
  //   phone: clientPhone,
  //   avatar,
  // } = form.client;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    if (form.formValid) {
      console.log("Form is valid");
      dispatchInvoice({ type: "CREATE_INVOICE",payload: { formData:form } });
    } else {
      console.log("Form is invalid");
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
        regex: /^[+]?[0-9]{1,4}?[-.\s]?[0-9]{1,15}$/,
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
      payload: { sectionToValidate: "project", validationRules: { description: { regex: /.+/, errorMessage: "Description is required" } } },
    });
  
    validateItems();
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
        updatedItem.quantity.errorMessage = "";
        isValid = false;
      }
  
      if (isNaN(item.price.value) || item.price.value.trim() === "") {
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
    draft: {
      text: "Save as Draft",
      id: "draft",
      actionType: "SAVE_DRAFT",
      type: "button",
    },
    send: {
      text: "Save & Send",
      id: "send",
      actionType: "SAVE_INVOICE",
      type: "submit",
    },
  };
  return (
    <article className="form-wrapper">
      <form className="form-container" onSubmit={handleSubmit}>
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
          <FormButton data={data.discard} />
          <div className="draft-send-wrapper">
            <FormButton data={data.draft} />
            <FormButton data={data.send} />
          </div>
        </div>
      </form>
    </article>
  );
}

export default Form;
