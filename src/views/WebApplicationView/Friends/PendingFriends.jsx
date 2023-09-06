import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/UserContext";
import { getUserByHandle } from "../../../services/user.services";
import { acceptFriendRequest, rejectFriendRequest } from "../../../services/social.service";
import toast from "react-hot-toast";
import FriendsLinks from "./FriendsLinks";

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

        const updatedPendingFriends = pendingFriends.map((user) => user.uid === senderUserID ? { ...user, isClosed: true } : user );

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
        const updatedPendingFriends = pendingFriends.map((user) => user.uid === senderUserID ? { ...user, isClosed: true } : user );

        setPendingFriends(updatedPendingFriends);
      } catch (error) {
        console.error(error);
        toast.error("Couldn't reject friend request");
      }
    };

    return (
      <>
      <FriendsLinks/>
        <div className="mx-auto px-4 py-8 sm:px-8">
          {pendingFriends.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No Pending requests at the moment.</p>
          ) : (
            pendingFriends.map((user) => !user.isClosed && (
              <div key={user.uid} className="my-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-center">
                  <img className="w-24 h-24 rounded-full shadow-lg" src={user.photo} alt="User image" />
                </div>
                <h5 className="mt-3 mb-1 text-xl font-medium text-gray-900 dark:text-white text-center">{user.firstName} {user.lastName}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400 text-center">@{user.userName}</span>
                <div className="flex mt-4 justify-center space-x-3 md:mt-6">
                  <button onClick={() => handleAcceptFriendFunction(user.uid)} className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Accept</button>
                  <button onClick={() => handleRejectFriendFunction(user.uid)} className="px-4 py-2 text-sm font-medium text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Reject</button>
                </div>
              </div>
            ))
          )}
        </div>
        </>
      )
}

export default PendingFriends