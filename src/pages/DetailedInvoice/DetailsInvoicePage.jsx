import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../App";
import { KeyboardArrowLeft } from "@mui/icons-material";
import StatusBar from "../../components/StatusBar";
import "./detailsPage.css";
import InvoiceButton from "../../components/InvoiceButton";
import { title } from "framer-motion/client";
import Modal from "../../components/Modal/Modal";
function DetailsInvoicePage() {
  const { invoice, settings, filteredData, dispatchForm } =
    useContext(DataContext);
  const { id } = useParams();
  const currentObj = invoice?.invoiceData?.find((obj) => obj?.id === id);

  const deleteData = {
    text: "Delete",
    color: "delete",
    actionType: "SHOW_WARNING_MODAL",
    id: currentObj?.id,
    title: "Confirm Deletion",
    message: `Are you sure you want to delete invoice #${currentObj?.id}? This action cannot be undone.`,
  };
  const editData = {
    text: "Edit",
    color: "edit",
    actionType: "",
    id: currentObj?.id,
    obj: currentObj,
  };
  const paidData = {
    text: "Mark as Paid",
    color: "markPaid",
    actionType: "SHOW_WARNING_MODAL",
    id: currentObj?.id,
    title: "Confirm Status Change",
    message: `Are you sure you want to mark invoice #${currentObj?.id} as paid? This action cannot be undone.`,
  };
  const isPaid = currentObj?.status === "paid";
  const isPending = currentObj?.status === "pending";
  const isDraft = currentObj?.status === "draft";
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
      {invoice.warningModal.show && <Modal />}
    </section>
  );
}

export default DetailsInvoicePage;
