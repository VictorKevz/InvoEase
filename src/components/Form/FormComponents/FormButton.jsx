import React, { useContext } from "react";
import { DataContext } from "../../../App";

function FormButton({ data, onSubmit }) {
  const { t, dispatchForm } = useContext(DataContext);
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
      {t(data.text)}
    </button>
  );
}

export default FormButton;
