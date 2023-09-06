import { differenceInMinutes, differenceInHours } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { getEventsForDate, isIntermediateDate } from "../../../constants/UIconstants/dateContstants";
import { AuthContext } from "../../../context/UserContext";
import { getSpecificEventPropsByID } from "../../../services/events.service";
import { areDatesTheSame } from "../../../constants/UIconstants/calendarHelpers";
import EventBoxDay from "./EventBoxDay";


const EventsColumn = ({ date, isUsedInWeek = false }) => {
  const { userData } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (userData?.events !== undefined) {
      Promise.all(userData.events.map(getSpecificEventPropsByID))
        .then((allEvents) => setEvents(getEventsForDate(allEvents, date)))
        .catch((e) => console.error(e));
    }
  }, [date, userData?.events]);

  const borderColor = "#ffff";
  const bgColor = 'transparent';

  return (
    <div className="grid" style={{
      backgroundImage: `repeating-linear-gradient(180deg, ${borderColor}, ${borderColor} 1px, ${bgColor} 1px, ${bgColor} 30px)`,
      gridTemplateRows: "repeat(48, 30px)",
      flexGrow: 1,
      gridTemplateColumns: `repeat(auto-fit, minmax(${isUsedInWeek ? "30px" : "50px"}, 1fr))`,
    }}>
      {Object.values(events).map((e, i) => (
        <div
          className={`col-span-1 bg-pink-600 border-[0.5px] p-1`}
          style={{
            gridRowStart:
              areDatesTheSame(date, e.endDate) && !areDatesTheSame(e.startDate, e.endDate)
                ? 0
                : !areDatesTheSame(e.startDate, date) && isIntermediateDate(date, e)
                  ? 0
                  : e.startHour * 2 + (e.startAtHalf ? 2 : 1),
            gridRowSpan:
              areDatesTheSame(date, e.endDate) && !areDatesTheSame(e.startDate, e.endDate)
                ? 48
                : !areDatesTheSame(e.startDate, date) && isIntermediateDate(date, e)
                  ? 48
                  : differenceInHours(e.endDate, e.startDate) * 2,
          }} key={i}>
          <EventBoxDay isIntermediate={isIntermediateDate(date, e)} isUsedInWeek={isUsedInWeek} {...e} />
        </div>
      ))}
    </div >
  );
}

export default EventsColumn;
