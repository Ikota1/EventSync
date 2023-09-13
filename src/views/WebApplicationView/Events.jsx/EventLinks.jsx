
import { NavLink } from 'react-router-dom'

const EventLinks = () => {
    return (
        <div className="flex justify-center font-poppins">
            <nav className="mt-6">
                <ul className="flex space-x-6">
                    <li><NavLink to="../events" className={({ isActive }) => (isActive ? 'text-orange-500' : "text-blue-500 hover:text-blue-300")}> Events </NavLink></li>
                    <li><NavLink to="../my-events" className={({ isActive }) => (isActive ? 'text-orange-500' : "text-blue-500 hover:text-blue-300")}> My Events </NavLink></li>
                    <li><NavLink to="../event-history" className={({ isActive }) => (isActive ? 'text-orange-500' : "text-blue-500 hover:text-blue-300")}> Archive </NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export default EventLinks