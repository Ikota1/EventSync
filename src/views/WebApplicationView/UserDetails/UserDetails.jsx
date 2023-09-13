import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get, ref } from 'firebase/database';
import { db } from '../../../firebase/firebase-config';
import { getInitials } from '../../../constants/helpersFns/getInitials';
import { AuthContext } from '../../../context/UserContext';
import { sendFriendRequest } from '../../../services/social.service';
import toast from 'react-hot-toast';

const UserDetails = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const { userData } = useContext(AuthContext)
  const [friendRequestSent, setFriendRequestSent] = useState(false);

  let selectedUserId = params.id;
  console.log(params.id)

  const isFriend = userData?.outGoingFriendRequests?.includes(selectedUserId)
  console.log(isFriend)
  // selectedUserData?.incomingFriendRequests?.includes(userData?.uid)
  // console.log(isFriend)

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userId = ref(db, `users/${params.id}`)
      const snapshot = await get(userId);

      if (snapshot.exists()) {
        const data = snapshot.val();

        setSelectedUserData(data);
      } else {
        console.log('User not found.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Unable to fetch event data', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);


  const handleAddFriendClick = async () => {

    try {

      if (selectedUserData.uid && selectedUserId) {
        await sendFriendRequest(userData.uid, selectedUserId);
        setFriendRequestSent(true);
        toast.success('Friend request has been sent!')
      }

    } catch (error) {
      console.error('Unable to send Friend Request', error);
      toast.error('Unable to send friend request')
    }

  }
  console.log(selectedUserData)


  return (
    <div className="bg-primary font-poppins">
      <div className="container mx-auto py-8">
        <div className="flex gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-gray-800 shadow rounded-lg p-3 w-[300px]">
              <div className={`flex flex-col items-center ${selectedUserData && selectedUserData.doNotDisturb === false ? "ring-green-500" : "ring-red-500"} inset-x-0 top-0 flex items-center justify-center`} >
                {selectedUserData && selectedUserData?.photo ? (
                  <div className="relative">
                    <img
                      className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl flex items-center justify-center text-indigo-500"
                      src={selectedUserData?.photo}
                      alt={getInitials(selectedUserData?.firstName, selectedUserData?.lastName)}
                    />
                  </div>
                ) : (
                  <span className="font-normal font-poppins text-5xl bg-white rounded-full p-2 w-48 h-48 mx-auto flex items-center justify-center">
                    {getInitials(selectedUserData?.firstName, selectedUserData?.lastName)}
                  </span>
                )}

                <h1 className="text-xl font-bold text-white">{selectedUserData?.userName || ''}</h1>
                <p className="text-white">{selectedUserData?.firstName || ''} {selectedUserData?.lastName || ''}</p>
                <p className="text-white">{selectedUserData?.email}</p>
                <p className="text-white">{selectedUserData?.country}</p>

                <div className="mt-4 flex flex-wrap gap-4 justify-center">
                  <div className='flex flex-col justify-between items-center'>
                    <p className='text-lg text-white'>Events Created:</p>
                    <span className='font-bold text-lg text-white'>{selectedUserData?.eventStatistics.eventsCreated || '0'}</span>
                  </div>
                  <div className='flex flex-col justify-between items-center'>
                    <p className='text-lg text-white'>Friends:</p>
                    <span className='font-bold text-lg text-white'>{selectedUserData?.friends ? Object.keys(selectedUserData?.friends)?.length : '0'}</span>
                  </div>
                </div>
                {isFriend ? (
                  <button
                    disabled
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg cursor-not-allowed" >
                    Unavailable
                  </button>
                ) : friendRequestSent ? (
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg cursor-not-allowed" >
                    Friend Request Sent
                  </button>
                ) : selectedUserData?.doNotDisturb === false ? (
                  <button
                    onClick={handleAddFriendClick} className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`} >
                    Add Friend
                  </button>
                ) : (
                  <button
                    disabled className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg cursor-not-allowed">
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9 w-[700px]">
            <div className="bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-white">About Me</h2>
              <p className='text-white'>{selectedUserData?.about || 'Current user has not provided informaiton about.'}</p>
              <h3 className="font-semibold text-center mt-3 -mb-2 text-white">
                Find me on
              </h3>
              <div className="flex justify-center items-center gap-6 my-6">
                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds LinkedIn" href=""
                  target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6">
                    <path fill="currentColor"
                      d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z">
                    </path>
                  </svg>
                </a>
                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds YouTube" href=""
                  target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-6">
                    <path fill="currentColor"
                      d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z">
                    </path>
                  </svg>
                </a>
                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds Facebook" href=""
                  target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-6">
                    <path fill="currentColor"
                      d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
                    </path>
                  </svg>
                </a>
                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds Instagram" href=""
                  target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6">
                    <path fill="currentColor"
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
                    </path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails