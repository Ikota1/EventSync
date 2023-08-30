import { useState, useEffect } from 'react';
import { getPublicEvents } from '../../services/events.service';

const PublicEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [publicEvents, setPublicEvents] = useState([]);

  const eventsPerPage = 6; 

  useEffect(() => {
    const fetchPublicEvents = async () => {
      const startIndex = (currentPage - 1) * eventsPerPage;
      const endIndex = startIndex + eventsPerPage;
      const publicEventsData = await getPublicEvents(); 

      const paginatedEvents = publicEventsData.slice(startIndex, endIndex);
      setPublicEvents(paginatedEvents);
    };

    fetchPublicEvents();
  }, [currentPage, publicEvents]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2>Public Events</h2>
      <div className="grid grid-cols-3 gap-2">
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

      {/* Pagination controls */}
      <div className={`fixed bottom-0 right-0 py-2 px-6 shadow`}>
      <div className="pagination text-blue-500">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Page
        </button>
        <span className='mx-3 my-3'>{currentPage}</span>
        <button onClick={handleNextPage}>
          Next Page
        </button>
      </div>
      </div>
    </div>
  );
};

export default PublicEvents;


