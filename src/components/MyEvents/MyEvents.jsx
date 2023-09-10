import { useState, useEffect } from 'react';
import { getEventsByCurrentUser, getEventByHandle } from '../../services/events.service';
import { auth } from '../../firebase/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import format from 'date-fns/format';
import EventDeleteBtn from '../EventDeleteBtn/EventDeleteBtn';
import EventLinks from '../../views/WebApplicationView/Events.jsx/EventLinks';


const MyEvents = () => {
  const [user] = useAuthState(auth);
  const [myEventsData, setMyEventsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const eventsPerPage = 4;

  useEffect(() => {
    const fetchUserEvents = async () => {
      setLoading(true)

      try {
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

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }

    };


    fetchUserEvents();
  }, [user]);


  const handleNextPage = () => {
    const totalPages = Math.ceil(myEventsData.length / eventsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
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
    <>
      <EventLinks />
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-400"></div>
        </div>
      ) : myEventsData.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-blue-300 text-2xl">No Events Found</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-4 gap-4">
            {paginatedEvents.map((event) => (
              <div key={event.id} className="bg-gray-900 text-blue-300 rounded-lg shadow-md p-4 hover:bg-gray-800 hover:text-blue-400 transition-transform duration-300 transform scale-100 hover:scale-105" >
                <img src={event.photo} alt={event.title} className="w-full h-60 object-cover rounded-lg mb-4" />
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <p className="pt-6 pb-6">{event.description}</p>
                <p className="pb-4">Location: {event.location}</p>
                <p>{format(new Date(event.startDate), 'do MMM')} | {event.startHour}h - {event.endHour}h</p>
                <p>Type: {event.isOnline ? 'Online' : 'Live'}</p>
                <EventDeleteBtn eventId={event.id} onDelete={() => handleEventDelete(event.id)} />
              </div>
            ))}
          </div>
          {/* Pagination controls */}
          <div className={`fixed bottom-0 right-0 py-2 px-6 shadow`}>
            <div className="pagination text-blue-500">
              <button onClick={handlePreviousPage} className="mr-2 h-12 w-12 rounded-full bg-blue-700 border-blue-600 text-sm text-white transition duration-150 hover:bg-blue-500" disabled={currentPage === 1}>Prev </button>
              <button onClick={handleNextPage} className="mr-2 h-12 w-12 rounded-full bg-blue-700 border-blue-600 text-sm  text-white transition duration-150 hover:bg-blue-500" > Next</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default MyEvents;

