import  { useState } from 'react';
import styles from "../../style"
import EventForm from '../EventForm/EventForm';

export const CreateEventButton = ({ onEventCreated }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateButtonClick = () => {
    setShowCreateForm(true);
  };

  return (
    <div>
      <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={handleCreateButtonClick}>Create Event</button>
      {showCreateForm && (
        <EventForm onEventCreated={() => {
          setShowCreateForm(false);
          onEventCreated();
        }} />
      )}
    </div>
  );
};

export default CreateEventButton;
