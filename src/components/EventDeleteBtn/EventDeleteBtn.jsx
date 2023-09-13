import { deleteEvent } from "../../services/events.service";

import toast from 'react-hot-toast'
import PropTypes from 'prop-types';


const EventDeleteBtn = ({ eventId, userId, onDelete }) => {
  const handleDeleteBtnClick = async () => {
    try {
      await deleteEvent(eventId, userId);
      onDelete()
      toast.success('Event has been deleted successfully!')
    } catch (error) {
      console.error('Error:', error);
      toast.error('Event could not be deleted!')
    }
  };

  return (
    <button onClick={handleDeleteBtnClick} className="bg-pink-800 hover:bg-pink-900 font-normal font-poppins text-white px-2 py-1 rounded mt-4">Delete Event</button>
  );
};

EventDeleteBtn.propTypes = {
  eventId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EventDeleteBtn;
