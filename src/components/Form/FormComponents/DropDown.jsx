import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import React, { useContext } from "react";
import { DataContext } from "../../../App";
import "../form.css";
import { formatWord } from "../../../utils/formatWord";
import { AnimatePresence, motion } from "framer-motion";
import { pageVariants } from "../../../variants";

function DropDown({ data, isOpen, toggleStateKey, name, selected, caption }) {
  const { dispatchForm } = useContext(DataContext);
  return (
    <div className="dropdown">
      <label className="dropdown-label" htmlFor={`${name}-dropdown`}>
        {caption}
      </label>
      <button
        type="button"
        className="dropdown-header-btn"
        id={`${name}-dropdown`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() =>
          dispatchForm({
            type: "TOGGLE_DROPDOWN",
            payload: { key: toggleStateKey },
          })
        }
      >
        {formatWord(selected)}
        {isOpen ? (
          <KeyboardArrowUp className="arrow-icon" />
        ) : (
          <KeyboardArrowDown className="arrow-icon" />
        )}
      </button>
      <AnimatePresence mode="wait">
        <motion.ul
          className={`dropdown-list ${isOpen ? "open" : "close"}`}
          variants={pageVariants}
          initial="initial"
          animate="visible"
          exit="exit"
          key={toggleStateKey}
          role="listbox"
          aria-labelledby={`${name}-dropdown`}
        >
          {data.map((item) => {
            return (
              <React.Fragment key={item.value}>
                {isOpen && (
                  <li
                    className="dropdown-item"
                    role="option"
                    aria-selected={selected === item}
                  >
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
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}

export default DropDown;
