import { Link, Outlet } from 'react-router-dom';
import CreateEventButton from "../../../components/CreateEventButton/CreateEventButton"

const Events = () => {
  const handleEventCreated = () => {
    // TBD mb
  };

  return (
    <div className="bg-event-gradient min-h-screen">
      <div className="container mx-auto pt-16 px-6">
        <h1 className="text-3xl font-semibold text-white mb-6">Events</h1>
        <CreateEventButton onEventCreated={handleEventCreated} />

        <nav className="mt-6">
          <ul className="flex space-x-6">
            <li>
              <Link to="public-events" className="text-white hover:text-blue-300">
                Public Events
              </Link>
            </li>
            <li>
              <Link to="my-events" className="text-white hover:text-blue-300">
                My Events
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center mt-6">
          <input
            type="text"
            placeholder="Search events..."
            className="bg-white rounded-l-md p-2 focus:outline-none w-64"
          />
          <button className="bg-blue-500 text-white rounded-r-md p-2 hover:bg-blue-600">
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Events;
