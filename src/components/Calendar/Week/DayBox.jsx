import { format } from "date-fns";
import EventsColumn from "../Day/EventsColumn";

const DayBox = ({ date }) => {
  return (
    <div className="grid grid-rows-[40px,1fr]">
      <div className="border-l border-t">
        <p className="text-sm text-center py-2">{format(date, "do E")}</p>
      </div>
      <div className="border-r-2">
        <EventsColumn date={date} isUsedInWeek />
      </div>
      <hr className="border-t" />
    </div>
  );
};

export default DayBox;
