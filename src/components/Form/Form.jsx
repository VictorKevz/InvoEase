import React from "react";
import "./form.css";
import ProfileForm from "./ProfileForm";
import Project from "./Project";
function Form() {
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
        </div>
      </form>
    </article>
  );
}

export default Form;
