import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import React, { useContext } from "react";
import { DataContext } from "../../../App";
import "../form.css";
function DropDown({ data, isOpen, toggleStateKey, name, selected, caption }) {
  const { dispatchForm } = useContext(DataContext);
  return (
    <div className="dropdown">
      <label className="dropdown-label">{caption}</label>
      <button
        type="button"
        className="dropdown-header-btn"
        onClick={() =>
          dispatchForm({
            type: "TOGGLE_DROPDOWN",
            payload: { key: toggleStateKey },
          })
        }
      >
        {selected.charAt(0).toUpperCase() + selected.slice(1)}
        {isOpen ? (
          <KeyboardArrowUp className="arrow-icon" />
        ) : (
          <KeyboardArrowDown className="arrow-icon" />
        )}
      </button>
      <ul  className={`dropdown-list ${isOpen ? "open" : "close"}`}>
      {data.map((item) => {
        return (
          <React.Fragment key={item.value}>
            {isOpen && (
              
                <li className="dropdown-item">
                  <button
                    type="button"
                    className="dropdown-btn"
                    onClick={() =>
                      dispatchForm({
                        type: "UPDATE_DROPDOWN_SELECTION",
                        payload: {
                          key: name,
                          option: item.value,
                          dropDownKey: toggleStateKey,
                        },
                      })
                    }
                  >
                    {item.label}
                  </button>
                </li>
             
            )}
          </React.Fragment>
        );
      })} 
      </ul>
    </div>
  );
}

export default DropDown;
