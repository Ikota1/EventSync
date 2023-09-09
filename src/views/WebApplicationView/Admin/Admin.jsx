import { getAllUsers } from '../../../services/user.services'
import { useEffect, useState } from "react"
import { getAllEvents } from "../../../services/events.service"
import AdminLinks from "./AdminLinks"


export const Admin = () => {
  const [users, setUsers] = useState([])
  const [events, setEvents] = useState([])


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
      <AdminLinks />
      <div className={`flex justify-center pt-12 space-x-6 text-white`}>
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
      </div>

    </>
  )
}

export default Admin;