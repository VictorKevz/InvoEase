import React, { useContext } from "react";
import { DataContext } from "../../App";
import InputField from "./InputField";
import { Add, Delete } from "@mui/icons-material";
import "./items.css";
import { useFormatCurrency } from "../../hooks/useFormatCurrency";

function Items() {
  const { form, dispatchForm,t } = useContext(DataContext);
  const headings = ["Item Name", "Qty", "Price", "Total"];
  const isDisabled = form?.items?.length === 1;

  const formatCurrency = useFormatCurrency();
  return (
    <div className="items-wrapper">
      <h3 className="items-title">Item List</h3>
      <header className="items-form-header">
        {headings.map((heading) => (
          <span key={heading} className="form-label">
            {heading}
          </span>
        ))}
      </header>
      {form?.items.map((field) => {
        let total = Number(
          Number(field?.quantity?.value) * Number(field?.price?.value)
        );
        total = formatCurrency (total)
        return (
          <fieldset key={field?.id} className="items-field">
            <div className="items-product-name">
              <InputField
                section="items"
                field={field.productName}
                id={field.id}
              />
            </div>
            <div className="items-qty">
              <InputField
                section="items"
                field={field.quantity}
                id={field.id}
              />
            </div>
            <div className="items-price">
              <InputField section="items" field={field.price} id={field.id} />
            </div>
            <span className="total-value">{total}</span>

            <button
              type="button"
              className={`delete-btn ${isDisabled && "disabled"}`}
              disabled={isDisabled}
              onClick={() =>
                dispatchForm({
                  type: "DELETE_ITEMS",
                  payload: { rowId: field.id },
                })
              }
            >
              <Delete className="delete-icon" aria-hidden="true"/>
            </button>
          </fieldset>
        );
      })}
      <button
        type="button"
        className="add-btn"
        onClick={() =>
          dispatchForm({
            type: "ADD_ITEMS",
          })
        }
        aria-label={t('Add New Item')}
      >
        <Add aria-hidden="true" /> Add New Item
      </button>
    </div>
  );
}

export default Items;
