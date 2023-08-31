import { useState, useEffect } from 'react';
import { getEventsByCurrentUser, getEventByHandle } from '../../services/events.service';
import { auth } from '../../firebase/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

const MyEvents = () => {
  const [user] = useAuthState(auth);
  const [myEventsData, setMyEventsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (user) {
        const userEventsSnapshot = await getEventsByCurrentUser(user.uid);
        const userEventsArray = userEventsSnapshot.val();

        if (userEventsArray) {
          const eventDataPromises = userEventsArray.map(async (eventID) => {
            const eventSnapshot = await getEventByHandle(eventID);
            return eventSnapshot.exists() ? eventSnapshot.val() : null;
          });
          const eventDataArray = await Promise.all(eventDataPromises);
          setMyEventsData(eventDataArray.filter(eventData => eventData !== null));
        }
      }
    };

    fetchUserEvents();
  }, [user]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedEvents = myEventsData.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {paginatedEvents.map(event => (
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
          <button onClick={handlePreviousPage} disabled={currentPage === 1}> Page </button>
          <span className='mx-3 my-3'>{currentPage}</span>
          <button onClick={handleNextPage}>Next Page</button>
        </div>
      </div>
    </div>
  );
};

export default MyEvents;


