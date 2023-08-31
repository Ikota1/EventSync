import { formatDuration } from "date-fns";
import { useNavigate } from "react-router-dom";

const EventBoxDay = ({ title, id, duration, isAllDay, isUsedInWeek }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`h-full border-b-2 ${isUsedInWeek ? "w-96" : "w-98"
        } p-1 bg-rgba-140-163-215-30 flex flex-col`}
      style={{
        borderBottomColor: "light.bg.primary", // Replace with your color value
        borderLeftWidth: isUsedInWeek ? "2px" : "4px",
        borderLeftColor: "accent.primary", // Replace with your color value
      }}
      onClick={() => navigate(`/events/${id}`)}
    >
      <h2 className={`truncate text-${isUsedInWeek ? "sm" : "md"} mb-1`}>
        {title}
      </h2>
      {duration > 1 && (
        <p className="text-xs">
          {isAllDay
            ? "All day"
            : formatDuration(
              duration < 24 ? { hours: duration } : { days: Math.floor(duration / 24), hours: duration % 24 }
            )}
        </p>
      )}
    </div>
  );
}

export default EventBoxDay;
