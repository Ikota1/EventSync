import { deleteEvent } from "../../services/events.service";

const EventDeleteBtn = ({ eventId }) => {
  const handleDeleteBtnClick = async () => {
    try {
      await deleteEvent(eventId);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleDeleteBtnClick} className="bg-purple-700 text-white px-2 py-1 rounded mb-4">Delete Event</button>
  );
};

export default EventDeleteBtn;
