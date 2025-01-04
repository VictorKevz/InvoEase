import React, { useContext } from "react";
import { DataContext } from "../../App";
import "../Form/form.css";
function InputField({ field }) {
  const { form, dispatchForm } = useContext(DataContext);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = name === "logo" ? files[0] : null;
    dispatchForm({ type: "UPDATE_COMPANY", payload: { name, value, file } });
  };
  return (
    <label className={`form-label ${field.id}`} htmlFor={field.id}>
      {field.label}
      {field.type === "file" ? (
        <div className="custom-file-wrapper">
          <input
            type="file"
            name={field.id}
            id={field.id}
            onChange={handleChange}
            className="input-field file-input"
            accept="image/png, image/jpeg, image/jpg"
          />
          <span className="custom-file-label">Upload your logo</span>
          <span className="custom-file-text">
            {form?.company?.logo?.name
              ? `${form?.company?.logo?.name}`
              : `Recommended size is 150px x 150px (optional). PNG, JPEG, JPG`}
          </span>
        </div>
      ) : (
        <input
          type={field.type}
          name={field.id}
          value={field.value}
          id={field.id}
          placeholder={field.placeholder}
          onChange={handleChange}
          className={`input-field ${field.id}`}
        />
      )}
    </label>
  );
}

export default InputField;
