import styles from "../../../style"
import { getAllUsers, blockUser, unblockUser, promoteUserToPremium } from '../../../services/user.services'
import { useEffect, useState } from "react"
import { getAllEvents } from "../../../services/events.service"


export const Admin = () => {
    const [searchItem, setSearchItem] = useState('')
    const [selectedSearchType, setSelectedSearchType] = useState('email'); // Default to firstname
    const [filteredUsers, setFilteredUsers] = useState([])
    const [users, setUsers] = useState([])
    const [events, setEvents] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getUsers = async () => {
            try {
                const fetchedUsers = await getAllUsers();
                console.log(fetchedUsers);

                setUsers(fetchedUsers);
                setFilteredUsers(fetchedUsers);
            } catch (error) {
                console.error('Error:', error);

                setError(error);
            } finally {

                setLoading(false)
            }
        };

        getUsers();
    }, []);


    useEffect(() => {
      const getEvents = async () => {

        try {

            const fetchedEvents = await getAllEvents()
            setEvents(fetchedEvents)
        } catch (error) {
            console.error('Error:', error);
        }
      }

      getEvents();
    }, [])

    const handleSearchTypeChange = (e) => {
        setSelectedSearchType(e.target.value);
    };


    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        const searchWords = searchTerm.toLowerCase().split(" ");
        

        let filteredItems = [];

        if (selectedSearchType === 'fullname') {
            filteredItems = users.filter((user) => {
                const fullName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
                return searchWords.every(word => fullName.includes(word));
            });
        }  else if (selectedSearchType === 'email') {
            filteredItems = users.filter((user) =>
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else if (selectedSearchType === 'username') {
            filteredItems = users.filter((user) =>
                user.userName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredUsers(filteredItems);
    };


    const handleBlockUser = async (uid) => {
        try {
            await blockUser(uid);
        } catch (error) {
            console.error('Error:', error)
        }
     
    }
    const handleUnblockUser = async (uid) => {
        try {
            await unblockUser(uid);
        } catch (error) {
            console.error('Error:', error)
        }
     
    }
    const handlePremiumUser = async (uid) => {
        try {
            await promoteUserToPremium(uid);
        } catch (error) {
            console.error('Error:', error)
        }
     
    }

    return (
        <>
            <div className='text-white'>Admin</div>
            <div className={`flex justify-center ${styles.boxWidth}`}>
            <div className={`flex justify-between space-x-6 text-white ${styles.flexCenter}`}>
                   <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
                        <div className="border-b border-gray-300 mb-2 pb-2 bg-blend-color">Total registred users</div>
                        <div className="text-3xl font-semibold">{users.length}</div>
                    </div>
                    <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
                        <div className="border-b border-gray-300 mb-2 pb-2">Total Events created</div>
                        <div className="text-3xl font-semibold">{events.length}</div>
                    </div>
                    <div className="flex flex-col items-center border border-gray-300 rounded-lg p-6">
                        <div className="border-b border-gray-300 mb-2 pb-2">Tickets sold to date</div>
                        <div className="text-3xl font-semibold">0</div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-8">

            <input
                    type="text"
                    value={searchItem}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Type to search.."

                />
                    <select
                    value={selectedSearchType}
                    onChange={handleSearchTypeChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                >
                    <option value="fullname">FirstName & LastName</option>
                    <option value="email">Email</option>
                    <option value="username">Username</option>
                    {/* <option value="lastname">Lastname</option> */}
                </select>
           
                   {/* if the data is loading, show a proper message */}
                  {loading && <p>Loading...</p>}
                  {error && <p>There was an error loading the users</p>}

            </div>
            <div className="flex justify-start">
                {!loading && !error && filteredUsers.length === 0 
                    ? <p className="text-white">No users found</p>
                    : <ul>
                        {filteredUsers.map(user => (
                            <li key={user.uid} className="mt-2 text-white">
                                <div>
                                    {`Firstname: ${user.firstName} Lastname: ${user.lastName} Username: ${user.userName} Email: ${user.email}`}
                                    <button onClick={() => handleBlockUser(user.uid)} className="bg-blue-500 text-white px-2 py-1 rounded">
                                        Block
                                    </button>
                                    <button onClick={() => handleUnblockUser(user.uid)} className="bg-red-500 text-white px-2 py-1 rounded ">
                                        Unblock
                                    </button>
                                    <button onClick={() =>handlePremiumUser(user.uid)} className="bg-green-500 text-white px-2 py-1 rounded ">
                                       Premium
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                }
            </div>

        </>

    )
}


export default Admin
