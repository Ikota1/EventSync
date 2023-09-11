import { useState } from "react";
import {
  format,
  getWeek,
  subMonths,
  subWeeks,
  addMonths,
  addWeeks,
} from "date-fns";
import ControlsWeekView from "./ControlsWeekView";
import HoursAndDays from "./HoursAndDays";
import PropTypes from 'prop-types';

const WeekCalendar = ({ date, setDate, fullWeek }) => {
  const [currentWeek, setCurrentWeek] = useState(getWeek(date));

  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setDate(subMonths(date, 1));
    }
    if (btnType === "next") {
      setDate(addMonths(date, 1));
    }
  };

  const changeWeekHandle = (btnType) => {
    if (btnType === "prev") {
      setDate(subWeeks(date, 1));
      setCurrentWeek(getWeek(subWeeks(date, 1)));
    }
    if (btnType === "next") {
      setDate(addWeeks(date, 1));
      setCurrentWeek(getWeek(addWeeks(date, 1)));
    }
  };

  return (
    <div className="flex justify-center rounded">
      <div className="w-full">
        <ControlsWeekView
          value={format(date, "MMMM yyyy")}
          onChange={changeMonthHandle}
          isMonth={true} />
        <ControlsWeekView
          value={currentWeek}
          onChange={changeWeekHandle}
          isMonth={false} />
        <HoursAndDays date={date} fullWeek={fullWeek} />
      </div>
    </div>
  );
};

WeekCalendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired,
  fullWeek: PropTypes.bool.isRequired,
};

export default WeekCalendar;
