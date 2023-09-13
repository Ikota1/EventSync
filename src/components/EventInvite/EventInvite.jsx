import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/UserContext';
import { getUserByHandle } from '../../services/user.services';
import { Link, useParams } from 'react-router-dom';
import { friendEventInvite } from '../../services/social.service';
import toast from 'react-hot-toast'

const EventInvite = () => {
  const params = useParams()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // DropDown Open/Closed
  const [selectedFriends, setSelectedFriends] = useState([]);  // SelectedFriends From DropDown List
  const { userData } = useContext(AuthContext)          // userData
  const [userFriends, setUserFriends] = useState([]);   // User's Friends


  useEffect(() => {
    const fetchData = async () => {

      if (userData && userData.friends) {
        const userFriendsArr = Object.keys(userData.friends)

        try {
          const friendsDataPromises = userFriendsArr.map(async (friendID) => {
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

  const handleFriendSelect = (friendId) => {
    if (!selectedFriends.includes(friendId)) {
      setSelectedFriends([...selectedFriends, friendId]);
    } else {
      setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const sendInvites = async () => {
    try {
      console.log('Selected', selectedFriends)
      await Promise.all(
        selectedFriends.map(async (friendID) => {
          await friendEventInvite(friendID, params.id, userData.uid);
          toast.success('Event request sent.')
        })
      );

      setIsDropdownOpen(!isDropdownOpen);

      setSelectedFriends([]);
    } catch (error) {
      console.error(error);
      toast.error('Event request failed.')
    }
  };


  return (
    <div className='mb-4 relative font-poppins'>
      <button onClick={toggleDropdown} data-dropdown-toggle="dropdownUsers" data-dropdown-placement="bottom" className="text-white bg-pink-800 hover:bg-pink-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-pink-800 dark:hover:bg-pink-900 w-full" type="button">Add Friends
        <svg className={`w-2.5 h-2.5 ml-2.5 ${isDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" /></svg>
      </button>
      {isDropdownOpen && (
        <div id="dropdownUsers" className="absolute z-10 bg-white rounded-lg shadow dark:bg-gray-700 mt-2 w-full" >
          {userFriends.length === 0 ? (
            <p className="py-2 px-4 text-gray-700 dark:text-gray-200">Your friendlist is empty. Go to the <Link to="../dashboard" className="hover:underline dark:text-pink-800">dashboard</Link> to discover new people or add your friends to contacts <Link to="../search-friends" className="hover:underline dark:text-yellow-300">here</Link> </p>
          ) : (
            <>
              <ul className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton" >
                {userFriends.map((friend) => (
                  <li key={friend.uid}>
                    <button onClick={() => handleFriendSelect(friend.uid)} className={`flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${selectedFriends.includes(friend.uid) ? 'bg-blue-200 dark:bg-blue-500' : ''}`}>
                      <img className="w-6 h-6 mr-2 rounded-full" src={friend.photo} alt={friend.name} />
                      {friend.firstName} {friend.lastName}
                    </button>
                  </li>
                ))}
              </ul>
              <button onClick={sendInvites} className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mx-4">Send Invitations</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EventInvite;
