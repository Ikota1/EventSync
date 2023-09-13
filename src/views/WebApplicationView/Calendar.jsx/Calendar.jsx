import { useState } from "react";
import { calendarViews } from "../../../constants/UIconstants/calendarEnumsConstants";
import MonthCalendar from "../../../components/Calendar/Month/MonthCalendar";
import ViewControl from "../../../components/Calendar/ViewControl";
import DayCalendar from "../../../components/Calendar/Day/DayCalendar";
import WeekCalendar from "../../../components/Calendar/Week/WeekCalendar";
import CreateEventButton from "../../../components/CreateEventButton/CreateEventButton";

function Calendar() {
  const [view, setView] = useState(calendarViews.MONTH);
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex flex-col lg:flex-row gap-5 font-poppins">
      <div className="flex-grow">
        <div className="flex justify-between items-center max-h-[800px]">
          <ViewControl view={view} setView={setView} />
          <CreateEventButton />
        </div>
        <div className="max-h-[750px] overflow-y-scroll rounded text-white">
          {view === calendarViews.MONTH && <MonthCalendar date={date} setDate={setDate} />}
          {view === calendarViews.DAY && <DayCalendar date={date} setDate={setDate} />}
          {view === calendarViews.WEEK && <WeekCalendar date={date} setDate={setDate} fullWeek={true} />}
          {view === calendarViews.WORK_WEEK && <WeekCalendar date={date} setDate={setDate} fullWeek={false} />}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
