import React, { useContext } from "react";
import { DataContext } from "../App";
import { formatWord } from "../utils/formatWord";
function StatusBar({ obj }) {
  const{t} = useContext(DataContext)
  return (
    <span className={`status ${obj?.status}`}>
      <span className={`dot ${obj?.status}`}></span>
      {t(formatWord(obj?.status))}
    </span>
  );
}

export default StatusBar;
