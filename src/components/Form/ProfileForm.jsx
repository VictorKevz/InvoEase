import React, { useContext } from "react";
import InputField from "./InputField";
import { DataContext } from "../../App";
import "./form.css";
function ProfileForm() {
  const { form, dispatch } = useContext(DataContext);

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
  const data = {
    company: [
      {
        label: "Name",
        id: "name", 
        uniqueId: "company-name", 
        type: "text",
        placeholder: "Nokia",
        value: name.value,
        
      },
      {
        label: "Email",
        id: "email",
        uniqueId: "company-email",
        type: "text",
        placeholder: "info@nokia.com",
        value: email.value,
      },
      {
        label: "Address",
        id: "address",
        uniqueId: "company-address",
        type: "text",
        placeholder: "Kaapelitie 4, Linnanmaa",
        value: address.value,
      },
      {
        label: "Phone",
        id: "phone",
        uniqueId: "company-phone",
        type: "text",
        placeholder: "+358 71 4004000",
        value: phone.value,
      },
      {
        label: "Post Code",
        id: "postCode",
        uniqueId: "company-postCode",
        type: "text",
        placeholder: "90650",
        value: postCode.value,
      },
      {
        label: "City",
        id: "city",
        uniqueId: "company-city",
        type: "text",
        placeholder: "Oulu",
        value: city.value,
      },
      {
        label: "Country",
        id: "country",
        uniqueId: "company-country",
        type: "text",
        placeholder: "Finland",
        value: country.value,
      },
      {
        label: "",
        id: "logo",
        uniqueId: "company-logo",
        type: "file",
        placeholder: "",
        value: logo.value,
      },
    ],
    client: [
      {
        label: "Name",
        id: "name", // For consistent className
        uniqueId: "client-name", // Unique for input/label
        type: "text",
        placeholder: "John Doe",
        value: clientName.value,
      },
      {
        label: "Email",
        id: "email",
        uniqueId: "client-email",
        type: "text",
        placeholder: "johndoe@example.com",
        value: clientEmail.value,
      },
      {
        label: "Address",
        id: "address",
        uniqueId: "client-address",
        type: "text",
        placeholder: "123 Elm Street",
        value: clientAddress.value,
      },
      {
        label: "Phone",
        id: "phone",
        uniqueId: "client-phone",
        type: "text",
        placeholder: "+1 234 567 8901",
        value: clientPhone.value,
      },
      {
        label: "Post Code",
        id: "postCode",
        uniqueId: "client-postCode",
        type: "text",
        placeholder: "12345",
        value: clientPostCode.value,
      },
      {
        label: "City",
        id: "city",
        uniqueId: "client-city",
        type: "text",
        placeholder: "New York",
        value: clientCity.value,
      },
      {
        label: "Country",
        id: "country",
        uniqueId: "client-country",
        type: "text",
        placeholder: "United States",
        value: clientCountry.value,
      },
      {
        label: "",
        id: "avatar",
        uniqueId: "client-avatar",
        type: "file",
        placeholder: "",
        value: avatar.value,
      },
    ],
  };

  return (
    <div className="profile-wrapper">
      {Object.entries(data).map(([section, fields]) => (
        <fieldset key={section} className={`${section}-wrapper`}>
          <legend className={`${section}-header`}>
            <h3 className="field-heading">
              {section.charAt(0).toUpperCase() + section.slice(1)} Details
            </h3>
          </legend>
          <div className="field-wrapper">
            {fields.map((field) => (
              <div
                key={field.id}
                className={`field ${section}-field ${field.id}`}
              >
                <InputField field={field} section={section} actionType="UPDATE_PROFILE_FORM" />
              </div>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

export default ProfileForm;
