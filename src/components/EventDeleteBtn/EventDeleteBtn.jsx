import { deleteEvent } from "../../services/events.service";
import toast from 'react-hot-toast'

const EventDeleteBtn = ({ eventId, onDelete }) => {
  const handleDeleteBtnClick = async () => {
    try {
      await deleteEvent(eventId);
      onDelete()
      toast.success('Event has been deleted successfully!')
    } catch (error) {
      console.error('Error:', error);
      toast.error('Event could not be deleted!')
    }
  };

  return (
    <button onClick={handleDeleteBtnClick} className="bg-purple-700 text-white px-2 py-1 rounded mb-4">Delete Event</button>
  );
};

export default EventDeleteBtn;
