import { NavLink } from 'react-router-dom'

const AdminLinks = () => {
    return (
        <div className="flex justify-center font-poppins">
            <nav className="mt-6">
                <ul className="flex space-x-6">
                    <li><NavLink to="../admin" className={({ isActive }) => (isActive ? 'text-white' : "text-thirdly hover:text-thirdlyHover")}> Stats </NavLink></li>
                    <li><NavLink to="../control-users" className={({ isActive }) => (isActive ? 'text-white' : "text-thirdly hover:text-thirdlyHover")}> Control Users </NavLink></li>
                    <li><NavLink to="../control-events" className={({ isActive }) => (isActive ? 'text-white' : "text-thirdly hover:text-thirdlyHover")}> Control Events </NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export default AdminLinks