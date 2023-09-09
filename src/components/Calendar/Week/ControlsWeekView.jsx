import React from "react";

const ControlsWeekView = ({ value, onChange, isMonth }) => {
  return (
    <div className="flex justify-center gap-5 h-10">
      <span
        className="rounded cursor-pointer"
        onClick={() => onChange("prev")}>
        {"<"}
      </span>
      <h2 className="text-lg font-light">
        {isMonth ? value : ` Week: ${value}`}
      </h2>
      <span className="rounded cursor-pointer" onClick={() => onChange("next")}> {">"} </span>
    </div>
  );
}

export default ControlsWeekView;
