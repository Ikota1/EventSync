import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const EventBox = ({ startDate, title, id }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex font-poppins h-22 pl-2 gap-2 bg-rgba-140-163-215-20 items-center border-l-2 border-white z-50 hover:bg-pink-800 cursor-pointer"
      onClick={() => navigate(`../events/${id}`)}>
      <p className="whitespace-nowrap overflow-hidden overflow-ellipsis text-xs lg:text-sm">
        {format(startDate, "p")} {title}
      </p>
    </div>
  );
}

EventBox.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default EventBox;
