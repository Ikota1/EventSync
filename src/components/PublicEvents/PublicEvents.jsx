import { useState, useEffect } from 'react';
import { getPublicEvents } from '../../services/events.service';
import DropDownFilterBtn from '../DropDownFilterBtn/DropDownFilterBtn';
import TicketPurchaseBtn from '../TicketPurchaseBtn/TicketPurchaseBtn';
import { format } from "date-fns";


const PublicEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [publicEvents, setPublicEvents] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterByOnline, setFilterByOnline] = useState(false);
  const [filterByLive, setFilterByLive] = useState(false);
  const eventsPerPage = 4;

  useEffect(() => {
    const fetchPublicEvents = async () => {
      try {
        const publicEventsData = await getPublicEvents();
        setPublicEvents(publicEventsData);
      } catch (error) {
        console.error('Unable to fetch public events', error)
      }
    };

    fetchPublicEvents();
  }, [searchItem, publicEvents]);

  useEffect(() => {
    const filteredItems = publicEvents.filter((event) => event.title.toLowerCase().includes(searchItem.toLowerCase())
    );

    if (filterByOnline) {
      setFilteredEvents(filteredItems.filter((event) => event.isOnline));
    } else if (filterByLive) {
      setFilteredEvents(filteredItems.filter((event) => !event.isOnline));
    } else {
      setFilteredEvents(filteredItems);
    }
  }, [searchItem, publicEvents]);

  const handleFilterOnline = (e) => {
    e.preventDefault()
    setFilterByOnline(true);
    setFilterByLive(false);
  };

  const handleFilterLive = (e) => {
    e.preventDefault()
    setFilterByOnline(false);
    setFilterByLive(true);
  };

  const handleAllEventsFilter = (e) => {
    e.preventDefault()
    setFilterByOnline(false);
    setFilterByLive(false);
  };

  // const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

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

  return (
    <div className='block p-5'>
      <div className="flex justify-center ">
        <input
          type="text"
          placeholder="Search events..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="bg-white rounded-l-lg p-2 focus:outline-none w-64" />
        <DropDownFilterBtn onFilterOnline={handleFilterOnline} onFilterLive={handleFilterLive} onFilterAll={handleAllEventsFilter} />
      </div>
      <div className="grid grid-cols-4 gap-3 p-5 h-[100%]">
        {filteredEvents.length === 0 ? (
          <p className="flex justify-center text-blue-300">No Events Found</p>
        ) : (
          filteredEvents
            .slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)
            .map((event) => (
              <div key={event.id} className="bg-gray-900 text-gray-300 rounded-lg shadow p-4">
                <img src={event.photo} alt={event.title} className="w-full h-60 object-cover rounded-lg mb-4" />
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <p className='pt-6 pb-6'>{event.description}</p>
                <TicketPurchaseBtn />
                <p className='pb-4'>Tickets Remaining 42</p>
                <p className='pb-4'>Location: {event.location}</p>
                <p>{format(new Date(event.startDate), "do MMM")} | {event.startHour}h - {event.endHour}h</p>
                {/* <p>Type: {event.isOnline ? 'Online' : 'Live'}</p> */}
              </div>
            )))}
      </div>
      {/* Pagination controls */}
      <div className='text-white '>
        <div className={`fixed bottom-0 right-0 py-2 px-6 shadow`}>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Page
          </button>
          <span className="mx-3 my-3">{currentPage}</span>
          <button onClick={handleNextPage}>Next Page</button>
        </div>
      </div>
    </div>
  );
};

export default PublicEvents;


