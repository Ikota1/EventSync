import { useState, useEffect } from 'react';
import { getPublicEvents } from '../../services/events.service';
import DropDownFilterBtn from '../DropDownFilterBtn/DropDownFilterBtn';

const PublicEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [publicEvents, setPublicEvents] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterByOnline, setFilterByOnline] = useState(false);
  const [filterByLive, setFilterByLive] = useState(false);
  const eventsPerPage = 6;

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

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
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
          className="bg-white rounded-l-md p-2 focus:outline-none w-64" />
        <DropDownFilterBtn onFilterOnline={handleFilterOnline} onFilterLive={handleFilterLive} onFilterAll={handleAllEventsFilter} />
      </div>
      <div className="grid grid-cols-3 gap-2 p-5">
        {filteredEvents.length === 0 ? (
          <p className="flex justify-center text-blue-300">No Events Found</p>
        ) : (
          filteredEvents
            .slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)
            .map((event) => (
              <div key={event.id} className="bg-gray-900 text-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold">Event: {event.title}</h3>
                <p>Description: {event.description}</p>
                <p>Date: {event.startDate} Time: {event.startHour}</p>
                <p>Location: {event.location}</p>
                <p>Type: {event.isOnline ? 'Online' : 'Live'}</p>
                <img src={event.photo} alt={event.title} className="w-full h-40 object-cover" />
              </div>
            )))}
      </div>
      {/* Pagination controls */}
      <div >
        <div className="pagination text-blue-500">
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


