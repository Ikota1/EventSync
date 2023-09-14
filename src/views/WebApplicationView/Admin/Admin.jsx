import { getAllUsers } from '../../../services/user.services'
import { useEffect, useState } from "react"
import { getAllEvents } from "../../../services/events.service"
import AdminLinks from "./AdminLinks"
import BarChartUsers from '../../../components/BarChart/barChartUsers'
import BarChartEvents from '../../../components/BarChart/BarChartEvents'
import BarChartOnlineEvents from '../../../components/BarChart/BarChartOnlineEvents'
import BarChartLiveEvents from '../../../components/BarChart/BarChartLiveEvents'

export const Admin = () => {
  const [users, setUsers] = useState([])
  const [events, setEvents] = useState([])
  const [isUsersFetched, setIsUsersFetched] = useState(false)
  const [isEventsFetched, setIsEventsFetched] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
        setIsUsersFetched(true)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getUsers();
  }, [setUsers]);


  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchedEvents = await getAllEvents()
        setEvents(fetchedEvents)
        setIsEventsFetched(true)
      } catch (error) {
        console.error('Error:', error);
      }
    }

    getEvents();
  }, [])

  const liveEvents = events.filter((event) => event.isOnline);
  const onlineEvents = events.filter((event) => !event.isOnline);


  return (
    <>

      <AdminLinks />

      <div className={`flex justify-center pt-12 space-x-6 text-white font-poppins`}>
        <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
          <div className="border-b border-thirdly mb-2 pb-2 bg-blend-color">Total registered users</div>
          <div className="text-3xl font-semibold">{users.length}</div>
        </div>
        <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
          <div className="border-b border-thirdly mb-2 pb-2">Total Events created</div>
          <div className="text-3xl font-semibold">{events.length}</div>
        </div>
        <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
          <div className="border-b border-thirdly mb-2 pb-2">Online Events</div>
          <div className="text-3xl font-semibold">{onlineEvents.length}</div>
        </div>
        <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
          <div className="border-b border-thirdly mb-2 pb-2">Live Events</div>
          <div className="text-3xl font-semibold">{liveEvents.length}</div>
        </div>
      </div>

      {(isUsersFetched && isEventsFetched) && (
        <>
          <div className='flex justify-center pt-20 font-poppins'>
            <BarChartUsers users={users} />
            <BarChartEvents events={events} />
          </div>
          <div className='flex justify-center font-poppins'>
            <BarChartOnlineEvents events={events} />
            <BarChartLiveEvents events={events} />
          </div>
        </>
      )}

    </>
  )
}

export default Admin;