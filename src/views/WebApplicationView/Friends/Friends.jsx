import { NavLink, Outlet } from "react-router-dom"
import { AuthContext } from "../../../context/UserContext"
import { useContext, useEffect, useState } from "react"
import { getUserByHandle } from "../../../services/user.services";


const Friends = () => {
  const { userData } = useContext(AuthContext);
  const [userFriends, setUserFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (userData && userData.friends) {
        const friendIDs = userData.friends;

        try {
          const friendsDataPromises = Object.keys(friendIDs).map(async (friendID) => {
            const userSnapshot = await getUserByHandle(friendID);
            return userSnapshot.val();
          });

          const friendsData = await Promise.all(friendsDataPromises);

          setUserFriends(friendsData);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [userData]);

  return (
    <>
      <h1 className="text-blue-500">Friends</h1>
      <div className='flex justify-center pb-8'>
        <nav className="mt-6">
          <ul className="flex space-x-6">
            <li><NavLink to="../search-friends" className={({ isActive }) => (isActive ? 'text-orange-500' : "text-blue-500 hover:text-blue-300")}> Search Friends </NavLink></li>
            <li><NavLink to="../pending-friends" className={({ isActive }) => (isActive ? 'text-orange-500' : "text-blue-500 hover:text-blue-300")}> Pending requests </NavLink></li>
          </ul>
        </nav>
      </div>
      {userFriends.map((user) => (
  <div key={user.uid} className="w-full max-w-sm  pt-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-end px-4 pt-4">
      <button className="bg-blue-500 text-white px-2 py-1 rounded mb-4">Gift Ticket</button>
    </div>
    <div className="flex flex-col items-center pb-10">
      <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user.photo} alt={`${user.firstName}'s profile`} />
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.firstName} {user.lastName}</h5>
      <span className="text-sm text-gray-500 dark:text-gray-400">{user.userName}</span>
      <p className="text-sm text-gray-500 dark:text-gray-400">{user.country}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{user.phone}</p>
      <div className="flex mt-4 space-x-3 md:mt-6">
      </div>
    </div>
  </div>
))}



      <Outlet />
    </>
  )
}

export default Friends
