import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const EventBox = ({ startDate, title, id }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex h-22 pl-2 gap-2 bg-rgba-140-163-215-20 items-center border-l-2 border-accent-primary z-50 hover:bg-rgba-140-163-215-40 cursor-pointer"
      onClick={() => navigate(`/events/${id}`)}>
      <p className="whitespace-nowrap overflow-hidden overflow-ellipsis text-xs lg:text-sm">
        {format(startDate, "p")} {title}
      </p>
    </div>
  );
}

export default EventBox;
