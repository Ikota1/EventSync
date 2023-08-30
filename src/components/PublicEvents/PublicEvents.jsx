import { useEffect, useState } from 'react';
import { getPublicEvents } from '../../services/events.service';

const PublicEvents = () => {
  const [publicEvents, setPublicEvents] = useState([]);

  useEffect(() => {
    const fetchPublicEvents = async () => {
      const publicEventsData = await getPublicEvents();
      setPublicEvents(publicEventsData);
    };

    fetchPublicEvents();
  }, [publicEvents]);

  return (
    <div>
      <h2>Public Events</h2>
      <div className="grid grid-cols-3 gap-4">
        {publicEvents.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold">Event: {event.title}</h3>
            <p>Description: {event.description}</p>
            <p>Date: {event.startDate}  Time: {event.startHour}</p>
            <p>Location: {event.location}</p>
            <img src={event.photo} alt={event.title} className="w-full h-40 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicEvents;
