import React, { useContext } from "react";
import { DataContext } from "../../App";
import DropDown from "./FormComponents/DropDown";
import "../Form/form.css";
import "./project.css";
import InputField from "./InputField";
import DatePickerMUI from "./FormComponents/DatePicker";

function Project() {
  const { form } = useContext(DataContext);
  const {
    paymentTerms,
    status,
    description,
    statusDropdown,
    paymentTermsDropdown,
  } = form.project;

  const data = {
    paymentTerms: [
      { value: "Net 1 Day", label: "Net 1 Day" },
      { value: "Net 7 Days", label: "Net 7 Days" },
      { value: "Net 14 Days", label: "Net 14 Days" },
      { value: "Net 30 Days", label: "Net 30 Days" },
    ],
    status: [
      { value: "pending", label: "Pending" },
      { value: "paid", label: "Paid" },
      { value: "draft", label: "Draft" },
    ],
    
    description:{
      value:description.value,
      label:"Project Description",
      type:"text",
      placeholder:"Graphic Design",
      id:"description",
      uniqueId:"project-description"
    }

  };

  return (
    <div className="project-wrapper">
      <fieldset className="dropdown-field-wrapper">
        <DropDown
          data={data.paymentTerms}
          isOpen={paymentTermsDropdown}
          toggleStateKey="paymentTermsDropdown"
          name="paymentTerms"
          selected={paymentTerms.value}
          caption="Payment Terms"
        />
        <DropDown
          data={data.status}
          isOpen={statusDropdown}
          toggleStateKey="statusDropdown"
          name="status"
          selected={status.value}
          caption="Status"
        />
        <DatePickerMUI />
        <InputField field={data.description} section="project" />
        </fieldset>
    </div>
  );
}

export default Project;
