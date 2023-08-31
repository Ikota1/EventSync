import { useState } from "react";
import { differenceInDays, endOfMonth, startOfMonth } from "date-fns/esm";
import MonthControl from "./MonthControl";
import Days from "./Days";
import Week from "./Week";

const MonthCalendar = ({ date, setDate }) => {
  const [events, setEvents] = useState([])
  // TODO events

  // const { addToast } = useAppContext();
  // const { userData } = useAuthContext();
  // const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   if (userData?.username) {
  //     Promise.all(userData.events.map(getEventsById))
  //       .then(setEvents)
  //       .catch(() =>
  //         addToast(toastTypes.error, toastMessages.SOMETHING_WENT_WRONG)
  //       );
  //   }
  // }, [userData?.events]);

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
      <div className="sticky top-0 z-60 bg-white dark:bg-gray-900">
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
}

export default MonthCalendar;
