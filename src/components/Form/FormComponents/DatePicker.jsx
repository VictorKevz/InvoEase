import React, { useContext } from "react";
import { DataContext } from "../../../App";
import dayjs from "dayjs";
import "../project.css"
import { CalendarToday } from "@mui/icons-material";
function DatePickerMUI() {
  const { dispatchForm, form } = useContext(DataContext);
  const { invoiceDate } = form.project;

  return (
    
    <label htmlFor="invoiceDate" className="form-label date">
      Invoice Date (DD.MM.YYYY)
      <input
        id="invoiceDate"
        type="date"
        
        value={dayjs(invoiceDate).format("YYYY-MM-DD")}
        onChange={(e) =>
          dispatchForm({
            type: "UPDATE_PROJECT_FORM",
            payload: { name: "invoiceDate", value: e.target.value },
          })
        }
        className="input-field invoiceDate"
      />
      <CalendarToday className="calendar-icon"/>
      {/* <span>{dayjs(invoiceDate).format("D MMM YYYY")}</span>{" "} */}
    </label>
  );
}

export default DatePickerMUI;
