
import { NavLink } from 'react-router-dom'

const FriendsLinks = () => {
    return (
        <div className="flex justify-center font-poppins">
            <nav className="mt-6">
                <ul className="flex space-x-6">
                    <li><NavLink to="../friends" className={({ isActive }) => (isActive ? 'text-red-800' : "text-thirdly hover:text-thirdlyHover")}> Friends </NavLink></li>
                    <li><NavLink to="../search-friends" className={({ isActive }) => (isActive ? 'text-red-800' : "text-thirdly hover:text-thirdlyHover")}> Search Friends </NavLink></li>
                    <li><NavLink to="../pending-friends" className={({ isActive }) => (isActive ? 'text-red-800' : "text-thirdly hover:text-thirdlyHover")}> Pending requests </NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export default FriendsLinks