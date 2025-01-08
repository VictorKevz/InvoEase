import React, { useContext } from "react";
import { DataContext } from "../../App";
import "../Form/form.css";
import { Check } from "@mui/icons-material";

function InputField({ field, section, id }) {
  const { form, dispatchForm } = useContext(DataContext);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files?.[0] || null;
    section === "items"
      ? dispatchForm({
          type: "UPDATE_ITEMS",
          payload: { rowId: id, itemKey: name.split('-')[0], itemValue:value },
        })
      : dispatchForm({
          type: "UPDATE_PROFILE_FORM",
          payload: { name, value, file, section },
        });
  };
  const isValid = form[section][field?.id]?.valid;
  return (
    <label className={`form-label ${field.id}`} htmlFor={field.uniqueId}>
      {field?.label}
      {field.type === "file" ? (
        <div className="custom-file-wrapper">
          <input
            type="file"
            name={field.id}
            id={field.uniqueId}
            onChange={handleChange}
            className="input-field file-input"
            accept="image/png, image/jpeg, image/jpg"
          />
          <span
            className={`custom-file-label ${
              form?.[section]?.[field?.id]?.name && "uploaded"
            }`}
          >
            {form?.[section]?.[field?.id]?.name
              ? "Photo Uploaded"
              : "Upload Photo"}
            {form?.[section]?.[field?.id]?.name && (
              <span className="check-wrapper">
                <Check className="success-icon" />
              </span>
            )}
          </span>
          <span className="custom-file-text">
            {form?.[section]?.[field?.id]?.name
              ? `${form?.[section]?.[field?.id]?.name}`
              : `Recommended size is 150px by 150px (optional). PNG, JPEG, JPG`}
          </span>
        </div>
      ) : (
        <input
          type={field.type}
          name={field.id}
          value={field.value}
          id={field.uniqueId}
          placeholder={field.placeholder}
          onChange={handleChange}
          className={`input-field ${!isValid && "error-border"} ${field.id} `}
        />
      )}
      {!isValid && <span className="error-message">{form?.[section]?.[field?.id]?.errorMessage}</span>}
    </label>
  );
}

export default InputField;
