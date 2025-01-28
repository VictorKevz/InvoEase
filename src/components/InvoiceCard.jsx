import React, { useContext, useEffect } from "react";
import { DataContext } from "../App";
import { Link } from "react-router-dom";
import { KeyboardArrowRight } from "@mui/icons-material";
import empty from "../assets/images/illustration-empty.svg";
import StatusBar from "./StatusBar";
import { useFormatCurrency } from "../hooks/useFormatCurrency";
function InvoiceCard() {
  const { filteredData, formatDate,settings,t } = useContext(DataContext);

  const formatCurrency = useFormatCurrency();
const locale = settings.locale || "en-GB";
  return (
    <>
      {filteredData?.length > 0 ? (
        <ul className="invoice-card-list" aria-labelledby="invoice-list">
          {filteredData?.map((obj) => (
            <li key={obj?.id} className="link-item">
              <Link
                to={`/details/${obj?.id}`}
                className="invoice-card"
                aria-label={`View details for invoice ${obj?.id}`}
              >
                <article className="invoice-card-content">
                  <div className="invoice-id-due-total-wrapper">
                    <h2 className="card-title">
                      <span className="hash-sign">#</span>
                      {obj?.id}
                    </h2>
                    <p className="due-date">
                      {t("Due")} {formatDate(obj?.paymentDue,locale)}
                    </p>
                    <p className="total mobile">{formatCurrency(obj?.total)}</p>
                  </div>

                  <p className="client-name desktop">{obj?.client?.name}</p>

                  <div className="total-status-wrapper">
                    <p className="total desktop">
                      {formatCurrency(obj?.total)}
                    </p>
                    <p className="client-name mobile">{obj?.client?.name}</p>

                    <StatusBar obj={obj} />
                    <KeyboardArrowRight
                      className="arrow-icon card"
                      aria-hidden="true"
                    />
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
            {t("No invoices available, select at least one filter or create new ones if you haven't!")}
          </p>
        </div>
      )}
    </>
  );
}
export default InvoiceCard;
