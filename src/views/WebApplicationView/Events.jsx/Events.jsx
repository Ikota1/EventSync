import { useState, useEffect } from 'react';
import { getPublicEvents } from '../../../services/events.service';
import DropDownFilterBtn from '../../../components/DropDownFilterBtn/DropDownFilterBtn';
import TicketPurchaseBtn from '../../../components/TicketPurchaseBtn/TicketPurchaseBtn';
import MyEvents from '../../../components/MyEvents/MyEvents';
import { format } from 'date-fns';

const Events = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [publicEvents, setPublicEvents] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterByOnline, setFilterByOnline] = useState(false);
  const [filterByLive, setFilterByLive] = useState(false);
  const [showMyEvents, setShowMyEvents] = useState(false);
  const [loading, setLoading] = useState(true);


  const eventsPerPage = 4;

  useEffect(() => {
    const fetchPublicEvents = async () => {
      try {
        const publicEventsData = await getPublicEvents();
        setPublicEvents(publicEventsData);
      } catch (error) {
        console.error('Unable to fetch public events', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchPublicEvents();
  }, [searchItem, publicEvents]);


  useEffect(() => {
    const filteredItems = publicEvents.filter((event) => event.title.toLowerCase().includes(searchItem.toLowerCase()));

    if (filterByOnline) {
      setFilteredEvents(filteredItems.filter((event) => event.isOnline));
    } else if (filterByLive) {
      setFilteredEvents(filteredItems.filter((event) => !event.isOnline));
    } else {
      setFilteredEvents(filteredItems);
    }
  }, [searchItem, publicEvents]);

  const handleFilterOnline = (e) => {
    e.preventDefault();
    setFilterByOnline(true);
    setFilterByLive(false);
  };

  const handleFilterLive = (e) => {
    e.preventDefault();
    setFilterByOnline(false);
    setFilterByLive(true);
  };

  const handleAllEventsFilter = (e) => {
    e.preventDefault();
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

  const handleMyEventsBtnClick = () => {
    setShowMyEvents(!showMyEvents);
  };

  const handleBackToPublicClick = () => {
    setShowMyEvents(false);
  };

  return (
    <>
      {showMyEvents ? (
        <MyEvents onBackToPublicClick={handleBackToPublicClick} />
      ) : (
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
              <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300" onClick={handleMyEventsBtnClick}>My Events</button>
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
              {filteredEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)
                .map((event) => (
                  <div key={event.id} className="bg-gray-900 text-blue-300 rounded-lg shadow-md p-4 hover:bg-gray-800 hover:text-blue-400 transition-transform duration-300 transform scale-100 hover:scale-105">
                    <img src={event.photo} alt={event.title} className="w-full h-60 object-cover rounded-lg mb-4" />
                    <h2 className="text-lg font-semibold">{event.title}</h2>
                    <p className="pt-6 pb-6">{event.description}</p>
                    <TicketPurchaseBtn />
                    <p className="pb-4">Tickets Remaining 42</p>
                    <p className="pb-4">Location: {event.location}</p>
                    <p> {format(new Date(event.startDate), 'do MMM')} |{' '} {event.startHour}h - {event.endHour}h </p>
                    {/* <p>Type: {event.isOnline ? 'Online' : 'Live'}</p> */}
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
      )}
    </>
  );
};

export default Events;


























