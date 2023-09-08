import styles from "../../../style"
import { getAllUsers } from '../../../services/user.services'
import { useEffect, useState } from "react"
import { getAllEvents } from "../../../services/events.service"
import { NavLink, Outlet, useNavigate } from "react-router-dom"


export const Admin = () => {
  const [users, setUsers] = useState([])
  const [events, setEvents] = useState([])

  const navigate = useNavigate();


  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getUsers();
  }, []);


  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchedEvents = await getAllEvents()
        setEvents(fetchedEvents)

      } catch (error) {
        console.error('Error:', error);
      }
    }

    getEvents();
  }, [])


  return (
    <>
      <div className={`flex justify-center ${styles.boxWidth}`}>
        <div className={`flex justify-between space-x-6 text-white ${styles.flexCenter}`}>

          {location.pathname !== '/application/admin/controlusers' &&
            location.pathname !== '/application/admin/controlevents' && (
              <>
                <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
                  <div className="border-b border-purple-700 mb-2 pb-2 bg-blend-color">Total registered users</div>
                  <div className="text-3xl font-semibold">{users.length}</div>
                </div>
                <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
                  <div className="border-b border-purple-700 mb-2 pb-2">Total Events created</div>
                  <div className="text-3xl font-semibold">{events.length}</div>
                </div>
                <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
                  <div className="border-b border-purple-700 mb-2 pb-2">Tickets sold to date</div>
                  <div className="text-3xl font-semibold">0</div>
                </div>
              </>
            )}

          {(location.pathname === '/application/admin/controlusers' ||
            location.pathname === '/application/admin/controlevents') && (
              <button onClick={() => navigate('/application/admin')} className="bg-blue-700 text-white px-2 py-1 rounded">Back to Admin Charts</button>
            )}
        </div>
      </div>
      <div className="h-[100%]">
        <div className='flex justify-center pb-8'>
          {location.pathname !== '/application/admin/controlusers' &&
            location.pathname !== '/application/admin/controlevents' && (
              <nav className="mt-6">
                <ul className="flex space-x-6">
                  <li><NavLink to="controlusers" className="bg-purple- text-white px-2 py-1 rounded"> Control Users</NavLink></li>
                  <li><NavLink to="controlevents" className="bg-purple-500 text-white px-2 py-1 rounded"> Control Events</NavLink></li>
                </ul>
              </nav>
            )}
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default Admin;