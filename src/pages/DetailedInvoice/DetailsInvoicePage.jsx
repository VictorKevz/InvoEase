import React, { useContext, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../App";
import { KeyboardArrowLeft, Print } from "@mui/icons-material";
import StatusBar from "../../components/StatusBar";
import "./detailsPage.css";
import InvoiceButton from "../../components/InvoiceButton";
import Modal from "../../components/Modal/Modal";
import { useReactToPrint } from "react-to-print";
import { useFormatCurrency } from "../../hooks/useFormatCurrency";
function DetailsInvoicePage() {
  const {
    invoice,
    settings,
    filteredData,
    dispatchForm,
    formatDate,
  } = useContext(DataContext);

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

  const companyLogo = currentObj?.company?.name.slice(0, 1).toUpperCase();
  const items = ["Item Name", "QTY", "Price", "Total"];
  const contentRef = useRef(null);

  const reactToPrintFn = useReactToPrint({ contentRef });
  const formatCurrency = useFormatCurrency();
  return (
    <div className="wrapper detailsPage">
      <header className="detailsPage-header">
        <Link to="/portal" className="go-back-link">
          <KeyboardArrowLeft className="arrow-icon" /> Go Back
        </Link>
      </header>
      <div className="detailsPage-content-wrapper">
        <div className="details-actions-card">
          <span className="details-status">
            Status <StatusBar obj={currentObj} />
          </span>
          <div className="edit-delete-paid-wrapper desktop">
            {!isPaid && <InvoiceButton data={editData} />}
            <InvoiceButton data={deleteData} />
            {isPending && <InvoiceButton data={paidData} />}
          </div>
        </div>
        <section
          className="details-content-card"
          ref={contentRef}
          style={{ fontFamily: settings.fontTheme }}
        >
          <header className="detailsPage-invoice-address">
            <div className="company-client-address-wrapper">
              <div className="company-avatar-print">
                <h1 className="company-avatar">{companyLogo}</h1>
                <button
                  type="button"
                  className="print-btn"
                  onClick={() => reactToPrintFn()}
                >
                  <Print />
                </button>
              </div>

              <div className="address-wrapper">
                <address className="address company-address">
                  {Object.keys(currentObj?.company).map((key) => (
                    <p className={` company-label company-${key}`} key={key}>
                      {currentObj?.company?.[key]}
                    </p>
                  ))}
                </address>
                <address className="address client-address">
                  <h2 className="client-title">Bill & Ship to</h2>
                  {Object.keys(currentObj?.client).map((key) => (
                    <p className={`company-label client-${key}`} key={key}>
                      {currentObj?.client?.[key]}
                    </p>
                  ))}
                </address>
              </div>
            </div>
          </header>
          <div className="description-date-due-wrapper">
            <div className="description">
              <p className="details-label">Project Description</p>
              <span className="details-value">{currentObj?.description}</span>
            </div>
            <div className="date">
              <p className="details-label">Invoice Date</p>
              <span className="details-value">
                {formatDate(currentObj?.createdAt)}
              </span>
            </div>
            <div className="due">
              <p className="details-label">Due Date</p>
              <span className="details-value">
                {formatDate(currentObj?.paymentDue)}
              </span>
            </div>
          </div>
          <div className="details-invoice-wrapper">
            <h2 className="invoice-id">Invoice #{currentObj?.id}</h2>
            <header className="items-header">
              {items.map((item, i) => (
                <div key={i} className="item-header">
                  {i === 0 ? (
                    <span className="item-label">{item}</span>
                  ) : (
                    <div className="qty-price-total-wrapper">
                      <span className="item-label ">{item}</span>
                    </div>
                  )}
                </div>
              ))}
            </header>
            <ul className="items-list">
              {currentObj?.items.map((item) => (
                <li className="item" key={item.name}>
                  <span className="item-value">{item?.name}</span>
                  <span className="item-value desktop">{item?.quantity}</span>
                  <span className="item-value desktop">
                    {formatCurrency(item?.price)}
                  </span>
                  <span className="item-value total">
                    {formatCurrency(item?.total)}
                  </span>
                  <span className="qty-price-wrapper mobile">
                    <span className="item-value qty-price">
                      {item?.quantity} x {formatCurrency(item?.price)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="details-total-wrapper">
              <p className="total-label">Total</p>
              <span className="details-total-value">
                {formatCurrency(currentObj?.total)}
              </span>
            </div>
          </div>
        </section>
        <div className="edit-delete-paid-wrapper mobile">
          {!isPaid && <InvoiceButton data={editData} />}
          <InvoiceButton data={deleteData} />
          {isPending && <InvoiceButton data={paidData} />}
        </div>
      </div>
      {invoice.warningModal.show && <Modal />}
    </div>
  );
}

export default DetailsInvoicePage;
