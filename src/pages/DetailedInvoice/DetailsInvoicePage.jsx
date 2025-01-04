import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../App";
import { KeyboardArrowLeft } from "@mui/icons-material";
import StatusBar from "../../components/StatusBar";
import "./detailsPage.css";
import InvoiceButton from "../../components/InvoiceButton";
function DetailsInvoicePage() {
  const { invoice, settings, filteredData } = useContext(DataContext);
  const { id } = useParams();
  const currentObj = invoice?.invoiceData?.find((obj) => obj?.id === id);

  const deleteData = {
    text: "Delete",
    id: "delete",
    actionType: "",
  };
  const editData = {
    text: "Edit",
    id: "edit",
    actionType: "",
  };
  const paidData = {
    text: "Mark as Paid",
    id: "markPaid",
    actionType: "",
  };
  const isPaid = currentObj.status === "paid"
  const isPending = currentObj.status === "pending"
  const isDraft = currentObj.status === "draft"
  return (
    <section className="wrapper detailsPage">
      <header className="detailsPage-header">
        <Link to="/portal" className="go-back-link">
          <KeyboardArrowLeft className="arrow-icon" /> Go Back
        </Link>
      </header>
      <div className="detailsPage-content-wrapper">
        <div className="details-actions-card">
          <p className="details-status">
            Status <StatusBar obj={currentObj} />
          </p>
          <div className="edit-delete-paid-wrapper">
            {!isPaid && <InvoiceButton data={editData} />}
             <InvoiceButton data={deleteData} />
            {isPending && <InvoiceButton data={paidData} />}
          </div>
        </div>
        <div className="details-content-card"></div>
      </div>
    </section>
  );
}

export default DetailsInvoicePage;
