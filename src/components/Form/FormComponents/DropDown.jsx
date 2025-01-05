import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import React, { useContext } from "react";
import { DataContext } from "../../../App";

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
        {selected}
        {isOpen ? (
          <KeyboardArrowUp className="arrow-icon" />
        ) : (
          <KeyboardArrowDown className="arrow-icon" />
        )}
      </button>
      {data.map((item) => {
        return (
          <React.Fragment key={item.value}>
            {isOpen && (
              <ul  className="dropdown-list">
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
                        },
                      })
                    }
                  >
                    {item.label}
                  </button>
                </li>
              </ul>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default DropDown;
