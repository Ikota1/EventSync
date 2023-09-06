
import { NavLink } from 'react-router-dom'

const FriendsLinks = () => {
    return (
        <div className="flex justify-center">
             <nav className="mt-6">
            <ul className="flex space-x-6">
                <li><NavLink to="../friends" className={({ isActive }) => (isActive ? 'text-orange-500' : "text-blue-500 hover:text-blue-300")}> Friends </NavLink></li>
                <li><NavLink to="../search-friends" className={({ isActive }) => (isActive ? 'text-orange-500' : "text-blue-500 hover:text-blue-300")}> Search Friends </NavLink></li>
                <li><NavLink to="../pending-friends" className={({ isActive }) => (isActive ? 'text-orange-500' : "text-blue-500 hover:text-blue-300")}> Pending requests </NavLink></li>
            </ul>
            </nav>
        </div>
    )
}

export default FriendsLinks