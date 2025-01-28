import React, { useContext } from "react";
import "./portal.css";
import { DataContext } from "../../App";
import { Add, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import Filters from "../../components/Filters";
import "./portal.css";
import InvoiceCard from "../../components/InvoiceCard";
import { motion } from "framer-motion";
import { portalVariants } from "../../variants";

function Portal() {
  const { invoice, dispatchInvoice, filteredData, t, dispatchForm } =
    useContext(DataContext);
  const totalInvoices = filteredData?.length;
  return (
    <motion.section 
    className="wrapper portal"
    variants={portalVariants}
    initial="initial"
    animate="visible"
    exit="exit"
    >
      <header className="portal-header">
        <div className="portal-text-wrapper">
          <h1 className="portal-title">{t("Invoices")}</h1>
          <p className="portal-parag desktop">{`There are ${
            totalInvoices > 0 ? totalInvoices : 0
          } total invoices`}</p>
          <p className="portal-parag mobile">{`${
            totalInvoices > 0 ? totalInvoices : 0
          } invoices`}</p>
        </div>
        <div className="filter-newInvoice-wrapper">
          <div className="filter-wrapper">
            <button
              type="button"
              className="filter-button"
              onClick={() => dispatchInvoice({ type: "TOGGLE_STATUS" })}
            >
              {t("Filter")}<span className="filter-subtext">{t("by status")}</span>
              {invoice.showStatus ? (
                <KeyboardArrowUp className="arrow-menu" />
              ) : (
                <KeyboardArrowDown className="arrow-menu" />
              )}
            </button>
            {invoice.showStatus && <Filters />}
          </div>
          <button
            type="button"
            className="btn new-invoice-btn"
            onClick={() =>
              dispatchForm({
                type: "SHOW_FORM_ITEMS",
                payload: { formKey: "showForm" },
              })
            }
          >
            <span className="add-icon">
              <Add />
            </span>
            {t("New")} <span className="invoice-subtext"> {t("Invoice")}</span>
          </button>
        </div>
      </header>
      <InvoiceCard />
    </motion.section>
  );
}

export default Portal;
