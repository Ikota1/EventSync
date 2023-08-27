import { useContext, useState } from 'react';
import styles from "../../style"
import EventForm from '../EventForm/EventForm';
import { GlobalContext } from '../../context/UserContext';

export const CreateEventButton = ({ onEventCreated }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateButtonClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
  };

  return (
    <div>
      <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={handleCreateButtonClick}>Create Event</button>
      {showCreateForm && (
        <div className="overlay">
          <EventForm onEventCreated={onEventCreated} onClose={handleCloseForm} />
        </div>
      )}
    </div>
  );
};

export default CreateEventButton;
