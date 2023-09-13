import { hoursWithMinutes } from "../../../constants/UIconstants/calendarHelpers";

const HoursColumn = () => {
  return (
    <div className={`grid border-r border-gray-300 grid-rows-2 gap-1 font-poppins`}>
      {hoursWithMinutes.map((hour, i) => (
        <div
          key={hour}
          className={`
        ${i === 0 ? 'border-t border-solid' : ''}
          ${i % 2 === 0 ? 'border-dashed border-b' : i !== hoursWithMinutes.length - 1 ? 'border-b' : ''}`}>
          <div className="grid gap-2">
            <div className={` ${i % 4 === 0 ? "text-sm" : "text-xs"} pr-2 p-1 text-right`}>
              {hour}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HoursColumn;
