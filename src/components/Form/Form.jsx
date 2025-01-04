import React from "react";
import Company from "./FormComponents/Company";
import "./form.css";
function Form() {
  return (
    <article className="form-wrapper">
      <form className="form-container">
        <header className="form-header">
          <h2 className="form-main-title">New Invoice</h2>
          <p className="form-parag">Fill out the form to create an invoice</p>
        </header>
        <div className="form-content">
          <Company />
        </div>
      </form>
    </article>
  );
}

export default Form;
