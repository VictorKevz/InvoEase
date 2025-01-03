import React, { useContext } from "react";
import "./portal.css";
import { DataContext } from "../../App";
import { Add, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import Filters from "../../components/Filters";
import "./portal.css";
import InvoiceCard from "../../components/InvoiceCard";
function Portal() {
  const { invoice, dispatchInvoice } = useContext(DataContext);
  const totalInvoices = invoice?.invoiceData?.length;
  return (
    <section className="wrapper portal">
      <header className="portal-header">
        <div className="portal-text-wrapper">
          <h1 className="portal-title">Invoices</h1>
          <p className="portal-parag">{`There are ${totalInvoices} total invoices`}</p>
        </div>
        <div className="filter-newInvoice-wrapper">
          <div className="filter-wrapper">
            <button
            type="button"
              className="filter-button"
              onClick={() => dispatchInvoice({ type: "TOGGLE_STATUS" })}
            >
              Filter by status
              {invoice.showStatus ? (
                <KeyboardArrowUp className="arrow-menu" />
              ) : (
                <KeyboardArrowDown className="arrow-menu" />
              )}
            </button>
            {invoice.showStatus && <Filters />}
          </div>
          <button type="button" className="new-invoice-btn">
            <span className="add-icon">
              <Add />
            </span>
            New Invoice
          </button>
        </div>
      </header>
      <InvoiceCard />
    </section>
  );
}

export default Portal;
