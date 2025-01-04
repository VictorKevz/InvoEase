import React from "react";

function InvoiceButton({ data }) {
  return (
    <button type="button" className={`btn ${data.id}`}>
      {data.text}
    </button>
  );
}

export default InvoiceButton;
