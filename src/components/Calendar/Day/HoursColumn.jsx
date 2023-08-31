import React from "react";
import { hoursWithMinutes } from "../../../constants/UIconstants/calendarHelpers";

const HoursColumn = () => {
  const borderColor = "border-gray-300"; // You can adjust the color based on your design

  return (
    <div className={`grid border-r ${borderColor} grid-rows-48 gap-1`}>
      {hoursWithMinutes.map((hour, i) => (
        <div
          key={hour}
          className={`grid border-t`}>
          <div className="grid gap-2">
            <div className={`grid ${i % 2 === 0 ? "text-sm" : "text-xs"} pr-2 pt-1 text-right`}>
              {hour}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HoursColumn;
