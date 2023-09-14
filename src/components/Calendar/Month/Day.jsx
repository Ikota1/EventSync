import EventBox from "./EventBox";
import PropTypes from 'prop-types';

const Day = ({ day, date, onChange, active, events }) => {
  const boxStyles = active
    ? "font-poppins min-w-[50px] h-[140px] p-2 bg-thirdly bg-opacity-50 border-t-5 border-white cursor-pointer border-b-[1px]"
    : "font-poppins min-w-[50px] h-[140px] p-2 border-t-1 border-gray-300 cursor-pointer border-b-[1px]";

  return (
    <div
      className={boxStyles}
      onClick={() => onChange(new Date(date.setDate(day)))}
    >
      {events && (
        <>
          <p className="text-lg">{day}</p>
          <div className="space-y-2">
            {events.slice(0, 3).map((ev, index) => (
              <EventBox key={index} {...ev} />
            ))}
            {events.length > 3 && (
              <div className="h-3 pb-1.5">...</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

Day.propTypes = {
  day: PropTypes.number,
  date: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  active: PropTypes.bool,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      eventName: PropTypes.string,
      eventTime: PropTypes.string,
    })
  ),
};

export default Day;
