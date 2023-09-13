
import PropTypes from 'prop-types';
import EventEditForm from './EventEditForm';
import { useState } from 'react';

const EventEditBtn = ({ eventId }) => {
  const [showUpdateFrom, setShowUpdateForm] = useState(false);
  const handleShowForm = () => {
    setShowUpdateForm(!showUpdateFrom);
  };

  const handleCloseForm = () => {
    setShowUpdateForm(false);
  };

  return (
    <div className='font-poppins'>
      <button className="bg-blue-400 hover:bg-blue-500 font-normal font-poppins text-white px-2 py-1 rounded mt-4"
        onClick={handleShowForm}>Edit Event</button>
      {showUpdateFrom && (
        <div className="overlay">
          <EventEditForm eventId={eventId} onClose={handleCloseForm} />
        </div>
      )}
    </div>
  )
}

EventEditBtn.propTypes = {
  eventId: PropTypes.string,
};

export default EventEditBtn