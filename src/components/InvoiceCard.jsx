import React, { useContext, useEffect } from "react";
import { DataContext } from "../App";
import { Link } from "react-router-dom";
import { KeyboardArrowRight } from "@mui/icons-material";
import empty from "../assets/images/illustration-empty.svg";
import StatusBar from "./StatusBar";
function InvoiceCard() {
  const { invoice, settings, filteredData } = useContext(DataContext);

  const getFormattedDate = (inputDate) => {
    let formattedDate;
    const date = new Date(inputDate);
    formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
    return formattedDate;
  };

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case "usd":
        return "$";
      case "euro":
        return "€";
      case "pound":
        return "£";
      default:
        return "$";
    }
  };

  return (
    <>
      {filteredData?.length > 0 ? (
        <ul className="invoice-card-list">
          {filteredData?.map((obj) => (
            <li key={obj?.id} className="link-item">
              <Link to={`/details/${obj?.id}`} className="invoice-card">
                <article className="invoice-card-content">
                  <h2 className="card-title">
                    <span className="hash-sign">#</span>
                    {obj?.id}
                  </h2>
                  <p className="due-date">
                    Due {getFormattedDate(obj?.paymentDue)}
                  </p>
                  <p className="client-name">{obj?.client?.name}</p>
                  <div className="total-status-wrapper">
                    <p className="total">
                      {getCurrencySymbol(settings.currency)} {obj?.total}
                    </p>
                    <StatusBar obj={obj} />
                    <KeyboardArrowRight className="arrow-icon" />
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-wrapper">
          <img src={empty} alt="" className="empty-img" />
          <p className="no-invoice">
            No invoices available, select at least one filter or create new ones
            if you haven't!
          </p>
        </div>
      )}
    </>
  );
}
export default InvoiceCard;
