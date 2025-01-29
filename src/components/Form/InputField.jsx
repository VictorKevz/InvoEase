import React, { useContext } from "react";
import { DataContext } from "../../App";
import "../Form/form.css";
import { Check } from "@mui/icons-material";
function InputField({ field, section, id }) {
  const { form, dispatchForm, t } = useContext(DataContext);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files?.[0] || null;
    section === "items"
      ? dispatchForm({
          type: "UPDATE_ITEMS",
          payload: { rowId: id, itemKey: name.split("-")[0], itemValue: value },
        })
      : dispatchForm({
          type: "UPDATE_PROFILE_FORM",
          payload: { name, value, file, section },
        });
  };
  const isValid = form[section][field?.id]?.valid;
  const itemsValid = form?.items?.every(
    (item) => item.productName.valid && item.quantity.valid && item.price.valid
  );
  const isItems = section === "items";
  return (
    <label className={`form-label ${field.id}`} htmlFor={field.uniqueId}>
      <span
        className={`form-label-text ${
          section === "items" && "hide-items-label"
        }`}
      >
        {t(field?.label)}
      </span>
      {field.type === "file" ? (
        <div className="custom-file-wrapper">
          <input
            type="file"
            name={field.id}
            id={field.uniqueId}
            onChange={handleChange}
            className="input-field file-input"
            accept="image/png, image/jpeg, image/jpg"
            aria-invalid={!isValid}
            aria-describedby={`${field.uniqueId}-error`}
          />
          <span
            className={`custom-file-label ${
              form?.[section]?.[field?.id]?.value && "uploaded"
            }`}
          >
            {form?.[section]?.[field?.id]?.value
              ? "Photo Uploaded"
              : "Upload Photo"}
            {form?.[section]?.[field?.id]?.value && (
              <span className="check-wrapper">
                <Check className="success-icon" />
              </span>
            )}
          </span>
          <span className="custom-file-text">
            {form?.[section]?.[field?.id]?.value
              ? `${form?.[section]?.[field?.id]?.value?.name}`
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
          className={`input-field ${field.id} ${!isValid && "error-border"}  ${
            isItems && "items-field"
          } ${isItems && !field.valid && "error-border-items"}
          `}
          aria-invalid={!isValid}
          aria-describedby={`${field.label} error`}
        />
      )}
      {!isValid && (
        <span className="error-message">
          {form?.[section]?.[field?.id]?.errorMessage}
        </span>
      )}
    </label>
  );
}

export default InputField;
