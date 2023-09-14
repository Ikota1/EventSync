import { NavLink, Outlet } from "react-router-dom"
import { AuthContext } from "../../../context/UserContext"
import { useContext, useEffect, useState } from "react"
import { getUserByHandle } from "../../../services/user.services";
import FriendsLinks from "./FriendsLinks";
import { deleteFriend } from "../../../services/social.service";
import toast from 'react-hot-toast'
import { getInitials } from "../../../constants/helpersFns/getInitials";
import ReactCountryFlag from "react-country-flag";
import getCountryNameByCode from "../../../constants/countries";
import animationData from '../../../assets/animation_lmi4803y.json';
import Lottie from "lottie-react";

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
      <div className="py-8 font-poppins">
        {userFriends.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-gray-500 dark:text-gray-400">Your friendlist is empty.</p>
            <Lottie className="w-[400px] h-[400px]" animationData={animationData} />
          </div>
        ) : <div className="grid grid-cols-4 gap-4">
          {userFriends.map((user) => (
            <NavLink key={user?.uid} to={`../user-profile/${user.uid}`} className={`flex justify-center items-center flex-col my-4 p-4 border border-gray-900 rounded-lg shadow-md bg-gray-900`}>
              <div className="flex flex-col justify-center items-center">
                {user && user.photo ? (
                  <img className="w-24 h-24 mb-3 rounded-full shadow-lg mx-auto" src={user?.photo} alt={`${user?.firstName}'s profile`} />
                ) : (
                  <span className="w-24 h-24 rounded-full flex items-center justify-center bg-indigo-100 cursor:pointer">
                    {getInitials(user?.firstName, user?.lastName)}
                  </span>
                )}
                <h5 className="mb-1 pt-2 text-xl font-medium text-gray-900  dark:text-white">{user?.firstName} {user?.lastName}</h5>
                <span className="text-lg text-gray-500 dark:text-gray-400">{user?.userName}</span>
                <div className="flex pt-2">
                  <ReactCountryFlag
                    countryCode={user.country}
                    svg
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '2px solid white',
                    }} />
                  <p className="text-lg text-gray-500 pt-2 ml-2 dark:text-gray-400">{getCountryNameByCode(user?.country)}</p>
                </div>

                <p className="text-lg text-gray-500 pt-2 dark:text-gray-400">Email: {user?.email}</p>
                <p className="text-lg text-gray-500 pt-2 dark:text-gray-400">Phone: {user?.phone}</p>
                <div className="flex mt-4 space-x-3 md:mt-6">
                </div>
              </div>
              <div className="flex justify-end px-4 pt-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveFriendBtnClick(user.uid, user.userName);
                  }}
                  className="bg-thirdly hover:bg-thirdlyHover text-white px-2 py-1 rounded mb-4">
                  Remove Friend
                </button>
              </div>
            </NavLink>
          ))}

        </div>}
      </div >
      <Outlet />
    </>
  );

}
export default Friends
