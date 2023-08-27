import CreateEventButton from "../../../components/CreateEventButton/CreateEventButton"

const Events = () => {
  const handleEventCreated = () => {

  };

  return (
    <div>
      <h1>Events</h1>
      <CreateEventButton onEventCreated={handleEventCreated} />
      {/* Render existing events */}
      {/* ... */}
    </div>
  );
};

export default Events;
