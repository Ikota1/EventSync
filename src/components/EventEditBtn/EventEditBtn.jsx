
import PropTypes from 'prop-types';

const EventEditBtn = ({ eventId }) => {

// TBD 

  return (
    <button  className="bg-blue-700 text-white px-2 py-1 rounded mb-4">Edit Event</button>
  )
}

EventEditBtn.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default EventEditBtn