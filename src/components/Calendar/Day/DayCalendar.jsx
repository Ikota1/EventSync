import DayControls from "./DayControls";
import HoursColumn from "./HoursColumn";
import EventsColumn from "./EventsColumn";

const DayCalendar = ({ date, setDate }) => {
  return (
    <div className="space-y-4">
      <DayControls date={date} setDate={setDate} />
      <div className="flex">
        <HoursColumn />
        <EventsColumn date={date} />
      </div>
    </div>
  );
}

export default DayCalendar;
