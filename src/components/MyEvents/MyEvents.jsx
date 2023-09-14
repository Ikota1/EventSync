import { useState, useEffect } from 'react';
import { getEventsByCurrentUser, getEventByHandle } from '../../services/events.service';
import { auth } from '../../firebase/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import format from 'date-fns/format';
import EventDeleteBtn from '../EventDeleteBtn/EventDeleteBtn';
import EventEditBtn from '../EventEditBtn/EventEditBtn';
import EventLinks from '../../views/WebApplicationView/Events.jsx/EventLinks';
import { NavLink } from 'react-router-dom';

import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase/firebase-config';
import Lottie from 'lottie-react';
import animationData from '../../assets/animation_lmi4803y.json';


const MyEvents = () => {
  const [user] = useAuthState(auth);
  const [myEventsData, setMyEventsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([])

  const eventsPerPage = 4;

  useEffect(() => {
    const fetchUserEvents = async () => {
      setLoading(true);

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
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserEvents();
  }, [allEvents]);

  //listen for changes of any event in events folder
  useEffect(() => {
    const eventsRef = ref(db, 'events');
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      setAllEvents(data)
    });
  }, [user])

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

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className='font-poppins'>
      <EventLinks />
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2"></div>
        </div>
      ) : myEventsData.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full pt-4">
          <p className="text-center text-gray-500 dark:text-gray-400">No Pending requests at the moment.</p>
          <Lottie className="w-[400px] h-[400px]" animationData={animationData} />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-4 gap-4">
            {paginatedEvents.map((event) => (
              // <div className="bg-gray-900 text-white rounded-lg shadow-md p-4 transition-transform duration-300 hover:-translate-y-2" key={event.id}>
              <div className="bg-gray-900 text-white rounded-lg shadow-md p-4" key={event.id}>
                <NavLink to={`../events/${event.id}`}>
                  <img src={event.photo} alt={event.title} className="w-full h-60 object-cover rounded-lg mb-4" />
                </NavLink>
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <div>
                  <p
                    className={`pt-6 pb-6 ${showFullDescription ? 'max-h-full overflow-y-auto' : 'max-h-[6em] overflow-hidden'}`}
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                  {!showFullDescription && event.description.length > 100 && (
                    <span className="text-gray-400">...</span>
                  )}
                </div>
                {event.description.length > 100 && (
                  <button
                    onClick={toggleDescription}
                    className="text-pink-800 hover:text-pink-900 focus:outline-none"
                  >
                    {showFullDescription ? 'Read Less' : 'Read More'}
                  </button>
                )}
                <p className="pb-4">Location: {event.location}</p>
                <p>{format(new Date(event.startDate), 'do MMM')} | {event.startHour}h - {event.endHour}h</p>
                <p>Type: {event.isOnline ? 'Online' : 'Live'}</p>
                <div className="flex items-center justify-between">
                  <EventEditBtn eventId={event.id} />
                  <EventDeleteBtn eventId={event.id} onDelete={() => handleEventDelete(event.id)} userId={user.uid} />
                </div>
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
    </div>
  );
};


export default MyEvents;

