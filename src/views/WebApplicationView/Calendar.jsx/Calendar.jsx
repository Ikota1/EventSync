import React, { useState } from "react";
import { calendarViews } from "../../../constants/UIconstants/calendarEnumsConstants";
import MonthCalendar from "../../../components/Calendar/Month/MonthCalendar";
import ViewControl from "../../../components/Calendar/ViewControl";
import DayCalendar from "../../../components/Calendar/Day/DayCalendar";
import WeekCalendar from "../../../components/Calendar/Week/WeekCalendar";
import CreateEventButton from "../../../components/CreateEventButton/CreateEventButton";

function Calendar() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState(calendarViews.MONTH);
  const [date, setDate] = useState(new Date());

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <div className="flex-grow">
        <div className="flex justify-between items-center max-h-800">
          <ViewControl view={view} setView={setView} />
        </div>
        <div className="max-h-750 overflow-y-scroll bg-gray-900 rounded p-2 text-white">
          {view === calendarViews.MONTH && <MonthCalendar date={date} setDate={setDate} />}
          {view === calendarViews.DAY && <DayCalendar date={date} setDate={setDate} />}
          {view === calendarViews.WEEK && <WeekCalendar date={date} setDate={setDate} fullWeek={true} />}
          {view === calendarViews.WORK_WEEK && <WeekCalendar date={date} setDate={setDate} fullWeek={false} />}
        </div>
      </div>
      <CreateEventButton />
      {/* {(view === calendarViews.MONTH || view === calendarViews.DAY) && <Agenda date={date} />} */}
      {/* {isOpen && <AddEventModal onClose={closeModal} />} */}
    </div>
  );
}

export default Calendar;
