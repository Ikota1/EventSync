import EventBox from "./EventBox";

const Day = ({ day, date, onChange, active, events }) => {
  const boxStyles = active
    ? "min-w-[50px] h-[140px] p-2 bg-pink-600 bg-opacity-50 border-t-5 border-white cursor-pointer"
    : "min-w-[50px] h-[140px] p-2 border-t-1 border-gray-300 cursor-pointer";

  return (
    <div
      className={boxStyles}
      onClick={() => onChange(new Date(date.setDate(day)))}
    >
      {events && (
        <>
          <p className="text-sm">{day}</p>
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

export default Day;
