import React, { useContext } from "react";
import { DataContext } from "../../../App";

function FormButton({ data }) {
  const { form, dispatchForm } = useContext(DataContext);
  return (
    <button type={data.type} className={`btn ${data.id}`}>
      {data.text}
    </button>
  );
}

export default FormButton;
