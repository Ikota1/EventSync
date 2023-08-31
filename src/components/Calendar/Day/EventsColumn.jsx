import { differenceInMinutes } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { messageTypes } from "../../../constants/UIconstants/messageTypes";
import { getEventsForDate, isIntermediateDate } from "../../../constants/UIconstants/dateContstants";
import { useAppContext } from "../../../context/AppContext";
import { AuthContext } from "../../../context/UserContext";
import { getEventByHandle } from "../../../services/events.service";
import { areDatesTheSame } from "../../../constants/UIconstants/calendarHelpers";
import EventBoxDay from "./EventBoxDay";

const EventsColumn = ({ date, isUsedInWeek = false }) => {
  const { userData } = useContext(AuthContext);
  const { addToast } = useAppContext();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (userData?.events !== undefined) {
      Promise.all(userData.events.map(getEventByHandle))
        .then((allEvents) => setEvents(getEventsForDate(allEvents, date)))
        .catch((e) => addToast(messageTypes.error, e.message));
    }
  }, [date, userData?.events]);

  const borderColor = "#ffff"; // Replace with your color values
  const bgColor = 'transparent'; // Replace with your color values

  return (
    <div className="grid" style={{
      backgroundImage: `repeating-linear-gradient(180deg, ${borderColor}, ${borderColor} 1px, ${bgColor} 1px, ${bgColor} 30px)`,
      gridTemplateRows: "repeat(48, 30px)",
      flexGrow: 1,
      gridTemplateColumns: `repeat(auto-fit, minmax(${isUsedInWeek ? "30px" : "50px"}, 1fr))`,
    }}>
      {Object.values(events).map((e, i) => (
        <div
          style={{
            gridRowStart: e.isAllDay
              ? 0
              : areDatesTheSame(date, e.endDate) && !areDatesTheSame(e.startDate, e.endDate)
                ? 0
                : !areDatesTheSame(e.startDate, date) && (e.isAllDay || isIntermediateDate(date, e))
                  ? 0
                  : e.startHour * 2 + (e.startAtHalf ? 2 : 1),
            gridRowSpan: e.isAllDay
              ? 48
              : areDatesTheSame(date, e.endDate) && !areDatesTheSame(e.startDate, e.endDate)
                ? (differenceInMinutes(e.endDate, new Date(e.endDate).setHours(0, 0, 0, 0)) / 60) * 2
                : !areDatesTheSame(e.startDate, date) && (e.isAllDay || isIntermediateDate(date, e))
                  ? 48
                  : e.duration * 2,
          }}
          key={i}>
          <EventBoxDay isAllDay={e.isAllDay || isIntermediateDate(date, e)} {...e} isUsedInWeek={isUsedInWeek} />
        </div>
      ))}
    </div>
  );
}

export default EventsColumn;
