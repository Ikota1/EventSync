import { Link, Outlet } from 'react-router-dom';
import CreateEventButton from "../../../components/CreateEventButton/CreateEventButton"

const Events = () => {
  const handleEventCreated = () => {
    // TBD 
  };

  return (
    <div className="bg-event-gradient min-h-screen">
      <div className="container mx-auto pt-16 px-6">
        <div className='flex justify-end'>
          <CreateEventButton onEventCreated={handleEventCreated} />

        </div>

        <div className='flex justify-center pb-16'>
          <nav className="mt-6">
            <ul className="flex space-x-6">
              <li><Link to="public-events" className="text-blue-500 hover:text-blue-300"> Public Events</Link></li>
              <li><Link to="my-events" className="text-blue-500 hover:text-blue-300"> My Events</Link></li>
             </ul>
          </nav>
          <div className="flex items-center mt-4 ml-6">
            <input
              type="text"
              placeholder="Search events..."
              className="bg-white rounded-l-md p-2 focus:outline-none w-64"/>
            <button className="bg-blue-500 text-white rounded-r-md p-2 hover:bg-blue-600"></button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Events;
