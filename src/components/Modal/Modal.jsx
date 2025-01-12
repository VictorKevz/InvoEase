import React, { useContext } from "react";
import { DataContext } from "../../App";
import { Delete, Paid } from "@mui/icons-material";
import "./modal.css";
import { Link } from "react-router-dom";

function Modal({}) {
  const { invoice, dispatchInvoice } = useContext(DataContext);
  const { title, message, modalId } = invoice.warningModal;
  const isDelete = title === "Confirm Deletion";
  return (
    <div className="wrapper modal">
      <article className="modal-container">
        <header className="modal-header">
          <span
            className={`modal-icon-wrapper ${isDelete ? "delete" : "paid"}`}
          >
            {isDelete ? (
              <Delete className="modal-icon" />
            ) : (
              <Paid className="modal-icon" />
            )}
          </span>
          <div className="modal-text-wrapper">
            <h2 className="modal-title">{title}</h2>
            <p className="modal-parag">{message}</p>
          </div>
        </header>
        <footer className="modal-footer">
          <button
            type="button"
            className="btn cancel"
            onClick={() => dispatchInvoice({ type: "HIDE_WARNING_MODAL" })}
          >
            Cancel
          </button>
          <Link
            to={isDelete ? "/portal" : `/details/${modalId}`}
            className={`btn ${isDelete ? "delete" : "paid"}`}
            onClick={() => {
              dispatchInvoice({
                type: isDelete ? "DELETE_INVOICE" : "MARK_AS_PAID",
                payload: { modalId },
              });
            }}
          >
            {isDelete ? "Delete" : "Mark as Paid"}
          </Link>
        </footer>
      </article>
    </div>
  );
}

export default Modal;
