import React, { useContext } from "react";
import InputField from "../InputField";
import { DataContext } from "../../../App";

function Company() {
  const { form, dispatch } = useContext(DataContext);

  const { name, address, city, postCode, country, email, phone, logo } =
    form.company;
  const data = [
    {
      label: "Name",
      id: "name",
      type: "text",
      placeholder: "Nokia",
      value: name,
    },
    {
      label: "Email",
      id: "email",
      type: "text",
      placeholder: "info@nokia.com",
      value: email,
    },
    {
      label: "Address",
      id: "address",
      type: "text",
      placeholder: "Kaapelitie 4, Linnanmaa",
      value: address,
    },
    {
      label: "Phone",
      id: "phone",
      type: "text",
      placeholder: "+358 71 4004000",
      value: phone,
    },
    {
      label: "Post Code",
      id: "postCode",
      type: "text",
      placeholder: "90650",
      value: postCode,
    },
    {
      label: "City",
      id: "city",
      type: "text",
      placeholder: "Oulu",
      value: city,
    },

    {
      label: "Country",
      id: "country",
      type: "text",
      placeholder: "Finland",
      value: country,
    },

    {
      label: "",
      id: "logo",
      type: "file",
      placeholder: "",
      value: logo,
    },
  ];

  return (
    <fieldset className="company-wrapper">
      <legend className="company-header">
        <h3 className="field-heading">Company Details</h3>
        <p className="field-parag">
          Please enter all required fields for your company details.
        </p>
      </legend>
      <div className="field-wrapper">
        {data.map((field) => (
          <div key={field.id} className={`field company-field ${field.id}`}>
            <InputField field={field} />
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export default Company;
