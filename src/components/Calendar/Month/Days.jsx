import Day from './Day';
import { areDatesTheSame, getDateObj } from "../../../constants/UIconstants/calendarHelpers";
import { getEventsForDate } from "../../../constants/UIconstants/dateContstants";

const Days = ({ date, onChange, emptyDaysAtStart, emptyDaysAtEnd, numDays, events }) => {
  const month = date.getMonth();
  const year = date.getFullYear();

  console.log(events)

  return (
    <div className="grid grid-cols-7 grid-rows-5 h-[100%] rounded-md">
      {Array.from({ length: emptyDaysAtStart }).map((_, index) => (
        <div key={index} className="col-span-1">
          <Day />
        </div>
      ))}

      {Array.from({ length: numDays }).map((_, index) => {
        return (
          <Day
            date={date}
            onChange={onChange}
            active={areDatesTheSame(date, getDateObj(index + 1, month, year))}
            key={index}
            day={index + 1}
            month={month}
            year={year}
            events={getEventsForDate(events, getDateObj(index + 1, month, year)).sort((a, b) =>
              a.startDate > b.startDate ? 1 : b.startDate > a.startDate ? -1 : 0
            )} />
        );
      })}

      {Array.from({ length: emptyDaysAtEnd }).map((_, index) => (
        <div key={index} className="col-span-1">
          <Day />
        </div>
      ))}
    </div>
  );
}

export default Days;
