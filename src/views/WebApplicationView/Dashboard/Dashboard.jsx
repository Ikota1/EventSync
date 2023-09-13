import { useEffect, useState } from "react";
import { getAllEvents } from "../../../services/events.service";
import { getAllUsers } from "../../../services/user.services";
import { getInitials } from "../../../constants/helpersFns/getInitials";
import { useNavigate } from "react-router";
import getCountryNameByCode from "../../../constants/countries";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [onlineEvents, setOnlineEvents] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [allPublicEvents, setAllPublicEvents] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const onlineEventsPercentage = allPublicEvents.length > 0 ? (onlineEvents.length / allPublicEvents.length) * 100 : 0;
  const liveEventsPercentage = allPublicEvents.length > 0 ? (liveEvents.length / allPublicEvents.length) * 100 : 0;


  useEffect(() => {
    const fetchAllEventsAndUsers = async () => {
      setLoading(true);
      try {
        const fetchedEvents = await getAllEvents();
        setAllPublicEvents(fetchedEvents);

        const filteredItemsOnline = fetchedEvents.filter((event) => event.isOnline);
        const filteredItemsLive = fetchedEvents.filter((event) => !event.isOnline);

        setOnlineEvents(filteredItemsOnline);
        setLiveEvents(filteredItemsLive);

        const fetchedUsers = await getAllUsers();
        setAllUsers(fetchedUsers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEventsAndUsers();
  }, []);



  return (
    <div className="flex">
      <div id="main-content" className="h-[800px] w-full relative overflow-y-scroll">
        <main>
          <div className="px-4">
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
              <div className="bg-gray-800 shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Latest Events</h3>
                    <span className="text-base font-normal text-gray-400">
                      This is a list of latest events
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <button className="text-sm font-medium text-white hover:bg-gray-700 rounded-lg p-2" onClick={() => navigate(`../events`)}>View All</button>
                  </div>
                </div>
                {loading ? (
                  <div className="text-center text-white">Loading...</div>
                ) : (
                  <div className="flex flex-col mt-8">
                    <div className="rounded-lg">
                      <div className="align-middle inline-block min-w-full">
                        <div className="overflow-hidden sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-800">
                              <tr>
                                <th scope="col" className="p-4 text-left text-xs font-medium text-white uppercase tracking-wider">Events</th>
                                <th scope="col" className="p-4 text-left text-xs font-medium text-white uppercase tracking-wider">Start Time</th>
                                <th scope="col" className="p-4 text-left text-xs font-medium text-white uppercase tracking-wider">Location</th>
                              </tr>
                            </thead>
                            <tbody className="bg-gray-800">
                              {allPublicEvents.slice(-5).map((ev) => (
                                <tr key={ev.id}>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-white">
                                    <Link to={`../events/${ev.id}`} className="font-semibold">{ev.title}</Link>
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-normal text-white">
                                    {ev.startDate}
                                  </td>
                                  <td className="p-4 whitespace-nowrap text-sm font-semibold text-white">
                                    {ev.location}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {loading ? (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4"></div>
              ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4">
                  <div className="bg-gray-800 shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-white">
                          {liveEvents.length}
                        </span>
                        <h3 className="text-base font-normal text-gray-400">Live Events</h3>
                      </div>
                      <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                        {liveEventsPercentage.toFixed(1)}%
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800 shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-white">
                          {onlineEvents.length}
                        </span>
                        <h3 className="text-base font-normal text-gray-400">Online Events</h3>
                      </div>
                      <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                        {onlineEventsPercentage.toFixed(1)}%
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg" >
                          <path d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4 gap-3">
              <div className="bg-gray-800 shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold leading-none text-white">Latest Users</h3>
                </div>
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200">
                    {allUsers.slice(-5).map((user) => (
                      <li key={user.uid} className="py-3 sm:py-4">
                        <div className="flex items-center justify-between space-x-4">
                          <div className="flex items-center space-x-2">
                            {user && user.photo ? (
                              <img className="h-12 w-12 rounded-full" src={user.photo} alt="Avatar" />
                            ) : (
                              <span className="h-12 w-12 rounded-full flex items-center justify-center bg-indigo-100 text-gray-800">
                                {getInitials(user?.firstName, user?.lastName)}
                              </span>
                            )}
                            <div>
                              <p className="text-lg font-semibold text-white">{user.userName}</p>
                              <p className="text-sm text-gray-400">{getCountryNameByCode(user.country)}</p>
                            </div>
                          </div>
                          <div>
                            <ReactCountryFlag
                              countryCode={user.country}
                              svg
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: '2px solid white',
                              }} />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
