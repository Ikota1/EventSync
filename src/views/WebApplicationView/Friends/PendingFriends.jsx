import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/UserContext";
import { getUserByHandle } from "../../../services/user.services";
import { acceptFriendRequest, rejectFriendRequest } from "../../../services/social.service";
import { getInitials } from "../../../constants/helpersFns/getInitials";
import toast from "react-hot-toast";
import FriendsLinks from "./FriendsLinks";
import animationData from '../../../assets/animation_lmi4803y.json';
import Lottie from "lottie-react";

const PendingFriends = () => {
  const [pendingFriends, setPendingFriends] = useState([]);
  const { userData } = useContext(AuthContext)

  const requestSenders = userData?.incomingFriendRequests || [];

  useEffect(() => {
    const fetchSenderRequests = async () => {

      try {
        const userPromises = requestSenders.map(userId => getUserByHandle(userId));
        const sendersDataSnapshots = await Promise.all(userPromises);
        const sendersData = sendersDataSnapshots.map(snapshot => snapshot.val());

        setPendingFriends(sendersData);

      } catch (error) {
        console.error('Error fetching senderRequests', error)
      }

    }

    fetchSenderRequests();

  }, [])

  const handleAcceptFriendFunction = async (senderUserID) => {
    try {
      await acceptFriendRequest(senderUserID, userData.uid);
      toast.success('You have one new friend now!');

      const updatedPendingFriends = pendingFriends.map((user) => user.uid === senderUserID ? { ...user, isClosed: true } : user);

      setPendingFriends(updatedPendingFriends);
    } catch (error) {
      console.error(error);
      toast.error("Couldn't accept friend request");
    }
  };

  const handleRejectFriendFunction = async (senderUserID) => {
    try {
      await rejectFriendRequest(userData.uid, senderUserID);
      toast.success('Friend request rejected!');
      const updatedPendingFriends = pendingFriends.map((user) => user.uid === senderUserID ? { ...user, isClosed: true } : user);

      setPendingFriends(updatedPendingFriends);
    } catch (error) {
      console.error(error);
      toast.error("Couldn't reject friend request");
    }
  };

  return (
    <>
      <FriendsLinks />
      <div className="mx-auto px-4 py-8 sm:px-8 font-poppins">
        {pendingFriends.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <p className="text-center text-gray-500 dark:text-gray-400">No Pending requests at the moment.</p>
            <Lottie className="w-[400px] h-[400px]" animationData={animationData} />
          </div>
        ) : (
          pendingFriends.map((user) => !user.isClosed && (
            <div key={user.uid} className="grid grid-cols-4">
              <div className="flex flex-col my-4 p-4 border border-gray-900 rounded-lg shadow-md bg-gray-900">
                <div className="flex items-center justify-center flex-col">
                  {user && user.photo ? (
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user?.photo} alt={`${user?.firstName}'s profile`} />
                  ) : (
                    <span className="w-24 h-24 rounded-full flex items-center justify-center bg-indigo-100 cursor:pointer">
                      {getInitials(user?.firstName, user?.lastName)}
                    </span>
                  )}
                </div>
                <h5 className="mt-3 mb-1 text-xl font-medium text-gray-900 dark:text-white text-center">{user.firstName} {user.lastName}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400 text-center">@{user.userName}</span>
                <div className="flex mt-4 justify-center space-x-3 md:mt-6">
                  <button onClick={() => handleAcceptFriendFunction(user.uid)} className="px-4 py-2 text-sm font-medium text-white bg-thirdly rounded-lg hover:bg-thirdlyHover focus:ring-4 focus:outline-none">Accept</button>
                  <button onClick={() => handleRejectFriendFunction(user.uid)} className="px-4 py-2 text-sm font-medium text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-800 dark:hover:bg-red-900 dark:focus:ring-red-800">Reject</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default PendingFriends