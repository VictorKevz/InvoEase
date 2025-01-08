import React, { useContext } from "react";
import "./form.css";
import ProfileForm from "./ProfileForm";
import Project from "./Project";
import Items from "./Items";
import FormButton from "./FormComponents/FormButton";
import { DataContext } from "../../App";

function Form() {
  const { form, dispatchForm } = useContext(DataContext);
  const { name, address, city, postCode, country, email, phone, logo } =
    form.company;
  const {
    name: clientName,
    address: clientAddress,
    city: clientCity,
    postCode: clientPostCode,
    country: clientCountry,
    email: clientEmail,
    phone: clientPhone,
    avatar,
  } = form.client;



  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    if(form.valid){
      alert("Form is valid");
    }
    else{
      alert("Form is invalid");
      return;
    }
  };
  
  const validateForm = () => {
    const validationRules = {
      email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: "Invalid email",
      },
      phone: {
        regex: /^[+]?[0-9]{1,4}?[-.\s]?[0-9]{1,15}$/,
        errorMessage: "Invalid phone number",
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
    // dispatchForm({
    //   type: "VALIDATE_FORM",
    //   payload: { sectionToValidate: "project", validationRules },
    // });
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
