import React from "react";
function StatusBar({ obj }) {
  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  return (
    <span className={`status ${obj?.status}`}>
      <span className={`dot ${obj?.status}`}></span>
      {formatStatus(obj?.status)}
    </span>
  );
}

export default StatusBar;
