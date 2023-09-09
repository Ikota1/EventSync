import { useState, useEffect, useContext } from "react";
import { differenceInDays, endOfMonth, startOfMonth } from "date-fns/esm";
import MonthControl from "./MonthControl";
import Days from "./Days";
import Week from "./Week";
import { AuthContext } from "../../../context/UserContext";
import { getSpecificEventPropsByID } from "../../../services/events.service";

const MonthCalendar = ({ date, setDate }) => {
  const { userData } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (userData?.userName && userData.events) {
      Promise.all(userData.events.map(getSpecificEventPropsByID))
        .then((eventData) => {
          setEvents(eventData);
        })
        .catch((er) => {
          console.error("Error fetching events:", er);
        });
    }
  }, [userData?.events]);


  const onChange = (date) => {
    setDate(date);
  };

  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);
  const numDays = differenceInDays(endDate, startDate) + 1;
  const emptyDaysAtStart = startDate.getDay() - 1 <= 0 ? startDate.getDay() + 6 : startDate.getDay() - 1;
  const emptyDaysAtEnd = 6 - endDate.getDay() + 1;

  return (
    <div className="flex flex-col justify-center">
      <div>
        <MonthControl date={date} onChange={onChange} />
        <hr className="mb-2" />
        <Week />
      </div>
      <Days
        date={date}
        onChange={onChange}
        numDays={numDays}
        emptyDaysAtStart={emptyDaysAtStart}
        emptyDaysAtEnd={emptyDaysAtEnd}
        events={events} />
    </div>
  );
};

export default MonthCalendar;
