import { formatDuration } from "date-fns";
import { useNavigate } from "react-router-dom";

const EventBoxDay = ({ title, id, duration, isAllDay, isUsedInWeek }) => {
  const navigate = useNavigate();

  console.log(title)
  console.log(id)
  console.log(duration)
  console.log(isAllDay)
  console.log(isUsedInWeek)

  return (
    <div
      className={`h-full border-b-2  p-1 bg-pink-200 flex flex-col`}
      style={{
        borderBottomColor: "bg-pink-200",
        borderLeftWidth: isUsedInWeek ? "2px" : "4px",
        borderLeftColor: "bg-pink-200",
      }}
      onClick={() => navigate(`/events/${id}`)}>
      <h2 className={`truncate text-${isUsedInWeek ? "sm" : "md"} mb-1`}>
        {title}
      </h2>
      {duration > 1 && (
        <p className="text-xs">
          {isAllDay
            ? "All day"
            : formatDuration(
              duration < 24 ? { hours: duration } : { days: Math.floor(duration / 24), hours: duration % 24 })}
        </p>
      )}
    </div>
  );
}

export default EventBoxDay;
