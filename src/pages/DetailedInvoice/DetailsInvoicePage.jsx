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
  // const isDraft = currentObj?.status?.value === "draft";

  const companyLogo = currentObj?.company?.name.slice(0, 1).toUpperCase();
  return (
    <div className="wrapper detailsPage">
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
        <section className="details-content-card">
          <header className="detailsPage-invoice-address">
            <span className="company-avatar">{companyLogo}</span>
            <div className="company-client-address-wrapper">
              <address className="address company-address">
                {Object.keys(currentObj?.company).map((key) => (
                  <p className={`company-${key}`} key={key}>
                    {currentObj?.company?.[key]}
                  </p>
                ))}
              </address>
              <address className="address client-address">
                <h1 className="detailsPage-title">Bill to</h1>
                {Object.keys(currentObj?.client).map((key) => (
                  <p className={`client-${key}`} key={key}>
                    {currentObj?.client?.[key]}
                  </p>
                ))}
              </address>
            </div>
          </header>
          <div className="description-date-due-wrapper">
            <div className="description">
              <p className="details-label">Project Description</p>
              <p>{currentObj?.description}</p>
            </div>
            <div className="date">
              <p className="details-label">Invoice Date</p>
              <p>{currentObj?.createdAt}</p>
            </div>
            <div className="due">
              <p className="details-label">Due Date</p>
              <p>{currentObj?.paymentDue}</p>
            </div>
          </div>
          
        </section>
      </div>
      {invoice.warningModal.show && <Modal />}
    </div>
  );
}

export default DetailsInvoicePage;
