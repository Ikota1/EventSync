import { Outlet } from "react-router-dom"
import { AuthContext } from "../../../context/UserContext"
import { useContext, useEffect, useState } from "react"
import { getUserByHandle } from "../../../services/user.services";
import FriendsLinks from "./FriendsLinks";
import { deleteFriend } from "../../../services/social.service";
import toast from 'react-hot-toast'
import { getInitials } from "../../../constants/helpersFns/getInitials";


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

  const handleRemoveFriendBtnClick = async (userToDeleteID, deletedUserName) => {
    try {
      await deleteFriend(userData.uid, userToDeleteID)

      const updatedUserFriends = userFriends.filter((user) => user.uid !== userToDeleteID);

      setUserFriends(updatedUserFriends);
      toast.success(`${deletedUserName} has been deleted from your Friendlist.`)
    } catch (error) {
      console.error(error)
      toast.error(`Unable to delete ${deletedUserName} from your Friendlist. `)
    }

  }

  return (
    <>
      <FriendsLinks />
      <div className="grid grid-cols-4 gap-2 py-8">
        {userFriends.length === 0 ? (
          <div className="flex items-center justify-center col-span-4"> {/* Use col-span-4 to span all columns */}
            <p className="text-center text-gray-500 dark:text-gray-400">Your friendlist is empty.</p>
          </div>
        ) : (
          userFriends.map((user) => (
            <div key={user?.uid} className="w-full max-w-sm pt-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center pb-10">
                {user && user.photo ? (
                  <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user?.photo} alt={`${user?.firstName}'s profile`} />
                ) : (
                  <span className="w-24 h-24 rounded-full flex items-center justify-center bg-indigo-100 cursor:pointer">
                  {getInitials(user?.firstName, user?.lastName)}
                </span>
                )}                
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user?.firstName} {user?.lastName}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{user?.userName}</span>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.country}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.phone}</p>
                <div className="flex mt-4 space-x-3 md:mt-6">
                </div>
              </div>
              <div className="flex justify-end px-4 pt-4">
                <button onClick={() => handleRemoveFriendBtnClick(user.uid, user.userName)} className="bg-blue-500 text-white px-2 py-1 rounded mb-4">Remove Friend</button>
              </div>
            </div>
          ))
        )}
      </div>
      <Outlet />
    </>
  );

}
export default Friends
