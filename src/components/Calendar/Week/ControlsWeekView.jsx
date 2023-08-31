import React from "react";

const ControlsWeekView = ({ value, onChange, isMonth }) => {
  return (
    <div className="grid grid-cols-5 gap-1 h-10">
      <div
        className="flex items-center justify-center w-full h-10 rounded cursor-pointer"
        onClick={() => onChange("prev")}>
        {"<"}
      </div>
      <div className="col-span-3">
        <div className="flex items-center justify-center w-110p pr-1/24 h-10">
          <h2 className="text-lg font-light">
            {isMonth ? value : ` Week: ${value}`}
          </h2>
        </div>
      </div>
      <div
        className="flex items-center justify-center w-full h-10 rounded cursor-pointer"
        onClick={() => onChange("next")}>
        {">"}
      </div>
    </div>
  );
}

export default ControlsWeekView;
