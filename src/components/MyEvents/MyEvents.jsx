import { useState, useEffect } from 'react';
import { getEventsByCurrentUser, getEventByHandle } from '../../services/events.service';
import { auth } from '../../firebase/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import format from 'date-fns/format';
import EventDeleteBtn from '../EventDeleteBtn/EventDeleteBtn';

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

  const handleEventDelete = (eventId) => {
    const updatedEvents = myEventsData.filter((event) => event.id !== eventId);
    setMyEventsData(updatedEvents);

  }

  const paginatedEvents = myEventsData.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {paginatedEvents.map(event => (
          <div key={event.id} className="bg-gray-900 text-blue-300 rounded-lg shadow p-4">
              <img src={event.photo} alt={event.title} className="w-full h-60 object-cover rounded-lg mb-4" />
              <h2 className="text-lg font-semibold">{event.title}</h2>
              <p className='pt-6 pb-6'>{event.description}</p>
              <p className='pb-4'>Location: {event.location}</p>
              <p>{format(new Date(event.startDate), "do MMM")} | {event.startHour}h - {event.endHour}h</p>
              <p>Type: {event.isOnline ? 'Online' : 'Live'}</p>
              <EventDeleteBtn eventId={event.id} onDelete={() => handleEventDelete(event.id)} />
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


