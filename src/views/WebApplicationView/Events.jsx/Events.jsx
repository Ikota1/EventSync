import { useState, useEffect } from 'react';
import { archiveExpiredEvents, getAllEvents, getPublicEvents } from '../../../services/events.service';
import DropDownFilterBtn from '../../../components/DropDownFilterBtn/DropDownFilterBtn';
import TicketPurchaseBtn from '../../../components/TicketPurchaseBtn/TicketPurchaseBtn';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import EventLinks from './EventLinks';
import { isEventExpired } from '../../../constants/helpersFns/helpers';

const Events = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [publicEvents, setPublicEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterByOnline, setFilterByOnline] = useState(false);
  const [filterByLive, setFilterByLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const eventsPerPage = 4;

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const publicEventsData = await getPublicEvents();
        console.log('Fetched public events:', publicEventsData)
        setPublicEvents(publicEventsData);

        const allEventsData = await getAllEvents();
        console.log('Fetched public events:', allEventsData)
        setAllEvents(allEventsData)

      } catch (error) {
        console.error('Unable to fetch public events', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


  useEffect(() => {
    let filteredItems = publicEvents;

    if (searchItem) {
      filteredItems = filteredItems.filter((event) => event.title.toLowerCase().includes(searchItem.toLowerCase()));
    }

    if (filterByOnline) {
      filteredItems = filteredItems.filter((event) => event.isOnline);
    }

    if (filterByLive) {
      filteredItems = filteredItems.filter((event) => !event.isOnline);
    }

    setFilteredEvents(filteredItems);
  }, [searchItem, filterByOnline, filterByLive, publicEvents]);


  useEffect(() => {
    const updateExpiredEvents = async () => {

      try {
        const updatedEvents = await Promise.all(allEvents.map(async (event) => {
          if (isEventExpired(event)) {

            await archiveExpiredEvents(
              event.id,
              event.title,
              event.eventOwner,
              event.endDate,
              event.location,
              event.description,
              event.participants,
              event.photo
            );
          }
          return event;
        }));
    
        setAllEvents(updatedEvents);
        
      } catch (error) {
        console.error(error)
      }
 
    };
  
    updateExpiredEvents();
  }, []);

  const handleFilterOnline = () => {
    setFilterByOnline(true);
    setFilterByLive(false);
  };

  const handleFilterLive = () => {
    setFilterByOnline(false);
    setFilterByLive(true);
  };

  const handleAllEventsFilter = () => {
    setFilterByOnline(false);
    setFilterByLive(false);
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

  const paginatedEvents = filteredEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage);

  return (
    <>
    <EventLinks/>
      
        <div className="block p-5">
          <div className="flex justify-center pb-12">
            <input
              type="text"
              placeholder="Search events..."
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              className="bg-white rounded-l-lg p-2 focus:outline-none w-64 border border-gray-300" />
            <DropDownFilterBtn
              onFilterOnline={handleFilterOnline}
              onFilterLive={handleFilterLive}
              onFilterAll={handleAllEventsFilter} />
            <div className="flex justify-end pl-16">
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-400"></div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-blue-300 text-4xl">No Events Found</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 p-5 h-[100%]">
              {paginatedEvents
                .map((event) => (
                  <div
                    key={event.id}
                    onClick={() => navigate(`${event.id}`)}
                    className="bg-gray-900 text-blue-300 rounded-lg shadow-md p-4 hover:bg-gray-800 hover:text-blue-400 transition-transform duration-300 transform scale-100 hover:scale-105 cursor-pointer">
                    <img src={event.photo} alt={event.title} className="w-full h-60 object-cover rounded-lg mb-4" />
                    <h2 className="text-lg font-semibold">{event.title}</h2>
                    <p className="pt-6 pb-6">{event.description}</p>
                    <TicketPurchaseBtn />
                    <p className="pb-4">Tickets Remaining 42</p>
                    <p className="pb-4">Location: {event.location}</p>
                    <p> {format(new Date(event.startDate), 'do MMM')} |{' '} {event.startHour}h - {event.endHour}h </p>
                  </div>
                ))}
            </div>
          )}
          {/* Pagination controls */}
          <div className={`fixed bottom-0 right-0 py-2 px-6 shadow`}>
            <button onClick={handlePreviousPage} className="mr-2 h-12 w-12 rounded-full bg-blue-700 border-blue-600 text-sm text-white transition duration-150 hover:bg-blue-500" disabled={currentPage === 1}>Prev</button>
            <button onClick={handleNextPage} className="mr-2 h-12 w-12 rounded-full bg-blue-700 border-blue-600 text-sm  text-white transition duration-150 hover:bg-blue-500">Next</button>
          </div>
        </div>

    </>
  );
};

export default Events;
