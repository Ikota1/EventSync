import { NavLink } from 'react-router-dom'

const AdminLinks = () => {
    return (
        <div className="flex justify-center">
            <nav className="mt-6">
                <ul className="flex space-x-6">
                    <li><NavLink to="../admin" className={({ isActive }) => (isActive ? 'text-purple-500' : "text-blue-500 hover:text-blue-300")}> Stats </NavLink></li>
                    <li><NavLink to="../control-users" className={({ isActive }) => (isActive ? 'text-purple-500' : "text-blue-500 hover:text-blue-300")}> Control Users </NavLink></li>
                    <li><NavLink to="../control-events" className={({ isActive }) => (isActive ? 'text-purple-500' : "text-blue-500 hover:text-blue-300")}> Control Events </NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export default AdminLinks