import React from "react";
import { addDays, startOfWeek } from "date-fns";
import HoursColumn from "../Day/HoursColumn";
import DayBox from "./DayBox";
import PropTypes from 'prop-types';

const HoursAndDays = ({ date, fullWeek }) => {
  const daysOfWeek = fullWeek
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const startDate = startOfWeek(date, { weekStartsOn: 1 });
  const dates = Array.from({ length: daysOfWeek.length - 1 }).reduce(
    (acc, curr, i) => [...acc, addDays(acc[i], 1)],
    [startDate]
  );

  return (
    <div className={`grid ${fullWeek ? "grid-cols-[60px,repeat(7,1fr)]" : "grid-cols-[60px,repeat(5,1fr)]"} grid-rows-[40px,1fr]`}>
      <hr />
      <div className="col-end-2 row-start-2">
        <HoursColumn />
      </div>
      {dates.map((date, index) => (
        <div key={index} className={`col-start-${2 + index} row-span-2 `}>
          <DayBox date={date} />
        </div>
      ))}
    </div>
  );
};

HoursAndDays.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  fullWeek: PropTypes.bool.isRequired,
};

export default HoursAndDays;
