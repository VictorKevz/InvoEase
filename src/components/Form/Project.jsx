import React, { useContext } from "react";
import { DataContext } from "../../App";
import DropDown from "./FormComponents/DropDown";
import "../Form/form.css";
import "./project.css";
function Project() {
  const { form } = useContext(DataContext);
  const {
    invoiceDate,
    paymentTerms,
    status,
    description,
    statusDropdown,
    paymentTermsDropdown,
  } = form.project;

  const dropDownData = {
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
  };

  return (
    <div className="project-wrapper">
      <div className="dropdown-field-wrapper">
        <DropDown
          data={dropDownData.paymentTerms}
          isOpen={paymentTermsDropdown}
          toggleStateKey="paymentTermsDropdown"
          name="paymentTerms"
          selected={paymentTerms}
          caption="Payment Terms"
        />
        <DropDown
          data={dropDownData.status}
          isOpen={statusDropdown}
          toggleStateKey="statusDropdown"
          name="status"
          selected={status}
          caption="Status"
        />
      </div>
    </div>
  );
}

export default Project;
