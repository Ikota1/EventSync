import { useState, useEffect } from 'react';
import { format } from "date-fns";
import { getAllEvents } from '../../../services/events.service';
import EventDeleteBtn from '../../../components/EventDeleteBtn/EventDeleteBtn';
import EventEditBtn from '../../../components/EventEditBtn/EventEditBtn';
import { useNavigate } from 'react-router';
import AdminLinks from './AdminLinks';

const ControlEvents = () => {
  const [searchItem, setSearchItem] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()

  const eventsPerPage = 4;

  useEffect(() => {
    const getEventsData = async () => {
      try {
        const fetchedEvents = await getAllEvents();
        setEvents(fetchedEvents);
        setFilteredEvents(fetchedEvents);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getEventsData();
  }, []);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    setSearchItem(searchTerm);

    const searchWords = searchTerm.split(" ");

    const filteredItems = events.filter((event) => {
      const titleName = `${event.title.toLowerCase()}`;
      return searchWords.every(word => titleName.includes(word));
    });

    setFilteredEvents(filteredItems);

    setCurrentPage(1);
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
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
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);

    const updatedFilteredEvents = filteredEvents.filter((event) => event.id !== eventId);
    setFilteredEvents(updatedFilteredEvents);
  }

  return (
    <>
      <AdminLinks />
      <div className="flex justify-center mt-8">
        <input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          className="border bg-blue-100 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Events by title.." />
      </div>
      <div className="grid grid-cols-4 gap-3 p-5">
        {filteredEvents.length === 0 ? (
          <p className="flex justify-center text-blue-300">No Events Found</p>
        ) : (
          filteredEvents
            .slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)
            .map((event) => (
              <div onClick={() => navigate(`../../events/${event.id}`)}
                key={event.id}
                className="bg-gray-900 text-gray-300 rounded-lg shadow p-4 cursor-pointer">
                <img src={event.photo} alt={event.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <p className='pt-6 pb-6'>{event.description}</p>
                <p className='pb-4'>Tickets Remaining 42</p>
                <p className='pb-4'>Location: {event.location}</p>
                <p>{format(new Date(event.startDate), "do MMM")} | {event.startHour}h - {event.endHour}h</p>
                <EventEditBtn eventId={event.id} />
                <EventDeleteBtn eventId={event.id} onDelete={() => handleEventDelete(event.id)} />
              </div>
            )))
        }
      </div>
      <div className="flex justify-end pt-6">
        {filteredEvents.length > 0 && (
          <div className="mt-2 sm:mt-0">
            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Prev</button>
            <button onClick={handleNextPage} className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Next</button>
          </div>
        )}
      </div>
    </>
  );
}

export default ControlEvents;
