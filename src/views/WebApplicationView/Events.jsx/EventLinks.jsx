
import { NavLink } from 'react-router-dom'

const EventLinks = () => {
    return (
        <div className="flex justify-center font-poppins">
            <nav className="mt-6">
                <ul className="flex space-x-6">
                    <li><NavLink to="../events" className={({ isActive }) => (isActive ? 'text-white' : "text-thirdly hover:text-thirdlyHover")}> Events </NavLink></li>
                    <li><NavLink to="../my-events" className={({ isActive }) => (isActive ? 'text-white' : "text-thirdly hover:text-thirdlyHover")}> My Events </NavLink></li>
                    <li><NavLink to="../event-history" className={({ isActive }) => (isActive ? 'text-white' : "text-thirdly hover:text-thirdlyHover")}> Archive </NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export default EventLinks