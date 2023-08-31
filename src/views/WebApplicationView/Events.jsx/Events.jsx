import { NavLink, Outlet } from 'react-router-dom';
import CreateEventButton from "../../../components/CreateEventButton/CreateEventButton"

const Events = () => {

  return (
    <div className="bg-event-gradient min-h-screen">
      <div className="container mx-auto pt-16 px-6">
        <div className='flex justify-end'>
          <CreateEventButton />
        </div>
        <div className='flex justify-center pb-8'>
          <nav className="mt-6">
            <ul className="flex space-x-6">
              <li><NavLink to="public-events" className={({ isActive }) => (isActive ? 'text-orange-500' : "text-blue-500 hover:text-blue-300")}> Public Events</NavLink></li>
              <li><NavLink to="my-events" className={({ isActive }) => (isActive ? 'text-orange-500' : "text-blue-500 hover:text-blue-300")}> My Events</NavLink></li>
            </ul>
          </nav>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Events;
