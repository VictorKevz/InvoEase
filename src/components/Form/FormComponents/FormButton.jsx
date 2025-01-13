import React, { useContext } from "react";
import { DataContext } from "../../../App";

function FormButton({ data, onSubmit }) {
  const { form, dispatchForm } = useContext(DataContext);
  return (
    <button
      type={data.type}
      className={`btn ${data.id}`}
      onClick={() => {
        data.id === "discard"
          ? dispatchForm({
              type: data.actionType,
            })
          : onSubmit();
      }}
    >
      {data.text}
    </button>
  );
}

export default FormButton;
