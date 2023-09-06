import { useEffect, useState, useContext } from "react"
import { getAllUsers } from "../../../services/user.services"
import { sendFriendRequest } from '../../../services/social.service'
import { AuthContext } from "../../../context/UserContext"
import toast from "react-hot-toast"

const SearchFriends = () => {
  const { userData } = useContext(AuthContext);
  const [usernameInput, setUsernameInput] = useState('');
  const [users, setUsers] = useState(null);
  const [filteredUser, setFilteredUser] = useState(null);
  const [friendRequestSent, setFriendRequestSent] = useState(false);

  const handleUsernameInput = (e) => {
    setUsernameInput(e.target.value);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users from db', error);
      }
    }
    fetchUsers();
  }, []);

  const handleFindThemClick = () => {
    const searchResult = users.filter((user) => user.userName.includes(usernameInput));
    setFilteredUser(searchResult);
    setFriendRequestSent(false);
  }

  const handleAddFriendClick = async () => {
    try {
      if (filteredUser && filteredUser.length > 0 && filteredUser[0].uid) {
        console.log('Sent');
        await sendFriendRequest(userData.uid, filteredUser[0].uid);
        setFriendRequestSent(true);
        toast.success('Friend request has been sent!')
      }
    } catch (error) {
      console.error('Error: unable to send friend request', error);
      toast.error('Unable to send friend request')
    }
  }

  return (
    <div>

      <div className="flex justify-center mt-20">
        <input
          type="text"
          onChange={handleUsernameInput}
          value={usernameInput}
          placeholder="Search friends by username..."
          className="bg-white rounded-l-md p-2 focus:outline-none w-64" />
        <button onClick={handleFindThemClick} className="bg-blue-500 text-white px-2 py-1 rounded">Find them!</button>
      </div>
      {filteredUser && (
        <div className="text-blue-300 mt-8">
          {filteredUser[0]?.userName ? (
            <>
              <div className="w-full max-w-sm mx-auto my-auto pt-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-end px-4 pt-4">
                </div>
                <div className="flex flex-col items-center pb-10">
                  <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={filteredUser[0].photo} alt="Bonnie image" />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{filteredUser[0].firstName} {filteredUser[0].lastName}</h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{filteredUser[0].userName}</span>
                  <div className="flex mt-4 space-x-3 md:mt-6">
                    {friendRequestSent ? (
                      <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg cursor-not-allowed">
                        Friend Request Sent
                      </button>
                    ) : (
                      <button
                        onClick={handleAddFriendClick}
                        className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                        Add Friend
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>User Not Found</p>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchFriends