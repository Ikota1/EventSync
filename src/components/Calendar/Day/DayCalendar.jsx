import DayControls from "./DayControls";
import HoursColumn from "./HoursColumn";
import EventsColumn from "./EventsColumn";
import PropTypes from 'prop-types';

const DayCalendar = ({ date, setDate }) => {
  return (
    <div className="space-y-4 font-poppins">
      <DayControls date={date} setDate={setDate} />
      <div className="flex">
        <HoursColumn />
        <EventsColumn date={date} />
      </div>
    </div>
  );
}

DayCalendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired,
};

export default DayCalendar;
