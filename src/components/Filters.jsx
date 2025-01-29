import React, { useContext } from "react";
import { DataContext } from "../App";
import "./../pages/Portal/portal.css";
import checkIcon from "../assets/images/icon-check.svg";
import { motion } from "framer-motion";
import { modalVariants } from "../variants";

function Filters() {
  const { invoice, dispatchInvoice, t } = useContext(DataContext);
  const filters = ["Draft", "Pending", "Paid"];
  return (
    <motion.ul
      className="filter-list"
      variants={modalVariants}
      initial="initial"
      animate="visible"
      exit="exit"
      aria-labelledby="filter-list-heading"
    >
      <h2 id="filter-list-heading" className="sr-only">
        {t("Filter Invoices")}
      </h2>

      {filters.map((filter) => {
        const isSelected = invoice.status.includes(filter.toLowerCase());
        return (
          <li key={filter} className="filter-item">
            <button
              className="filter-item-btn"
              onClick={() =>
                dispatchInvoice({
                  type: "UPDATE_STATUS",
                  payload: { filter: filter.toLowerCase() },
                })
              }
              aria-pressed={isSelected}
              aria-label={
                isSelected
                  ? `${filter} filter selected`
                  : `${filter} filter not selected`
              }
            >
              <span className={`box ${isSelected && "active-box"}`}>
                {isSelected && (
                  <img
                    src={checkIcon}
                    className="check-img"
                    alt=""
                    aria-hidden="true"
                  />
                )}
              </span>{" "}
              {t(filter)}
            </button>
          </li>
        );
      })}
    </motion.ul>
  );
}

export default Filters;
