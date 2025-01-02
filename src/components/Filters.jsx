import React, { useContext } from "react";
import { DataContext } from "../App";
import { Check } from "@mui/icons-material";
import "./../pages/Portal/portal.css";
import checkIcon from "../assets/images/icon-check.svg";
function Filters() {
  const { invoice, dispatchInvoice } = useContext(DataContext);
  const filters = ["Draft", "Pending", "Paid"];
  return (
    <ul className="filter-list">
      {filters.map((filter) => {
        const isSelected = invoice.status.includes(filter.toLowerCase());
        return (
          <li key={filter} className="filter-item">
            <button
              className="filter-item-btn"
              onClick={() =>
                dispatchInvoice({ type: "UPDATE_STATUS", payload: { filter:filter.toLowerCase() } })
              }
            >
              <span className={`box ${isSelected && "active-box"}`}>
                {isSelected && <img src={checkIcon} className="check-img" />}
              </span>{" "}
              {filter}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Filters;
