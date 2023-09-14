import { getAllUsers, blockUser, unblockUser } from '../../../services/user.services'
import { useEffect, useState } from "react"
import { getInitials } from '../../../constants/helpersFns/getInitials'
import AdminLinks from './AdminLinks'
import getCountryNameByCode from "../../../constants/countries"
import getUserRoleByCode, { USER_ROLES } from "../../../constants/userRoles"
import toast from 'react-hot-toast'
import ReactCountryFlag from 'react-country-flag'


export const ControlUsers = () => {
    const [searchItem, setSearchItem] = useState('')
    const [selectedSearchType, setSelectedSearchType] = useState('email');
    const [filteredUsers, setFilteredUsers] = useState([])
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const usersPerPage = 6;
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const fetchedUsers = await getAllUsers();
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
    }, [rerender]);


    const handleSearchTypeChange = (e) => {
        setSelectedSearchType(e.target.value);
    };


    const handleInputChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();

        setSearchItem(searchTerm);

        const searchWords = searchTerm.split(" ");
        let filteredItems = [];

        if (selectedSearchType === 'fullname') {
            filteredItems = users.filter((user) => {
                const fullName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
                return searchWords.every(word => fullName.includes(word));
            });
        } else if (selectedSearchType === 'email') {
            filteredItems = users.filter((user) => user.email.toLowerCase().includes(searchTerm));
        } else if (selectedSearchType === 'username') {
            filteredItems = users.filter((user) => user.userName.toLowerCase().includes(searchTerm));
        }

        setFilteredUsers(filteredItems);
        setCurrentPage(1);
    };

    const handleBlockUser = async (uid) => {
        try {
            const updatedUsers = users.map((user) => {
                if (user.uid === uid) {
                    return { ...user, userRole: USER_ROLES.Blocked };
                }
                return user;
            });

            setUsers(updatedUsers);
            setRerender((prev) => !prev);
            await blockUser(uid);
            toast.success('User has been blocked successfully!')
        } catch (error) {

            toast.error('Failed to block user')
        }
    }

    const handleUnblockUser = async (uid) => {
        try {
            const updatedUsers = users.map((user) => {
                if (user.uid === uid) {
                    return { ...user, userRole: USER_ROLES.RegularUser };
                }
                return user;
            });

            setUsers(updatedUsers);
            setRerender((prev) => !prev);
            await unblockUser(uid);
            toast.success('User has been unblocked successfully!')
        } catch (error) {
            toast.success('Failed to unblock user!')
        }
    }

    const handleNextPage = () => {
        const totalPages = Math.ceil(users.length / usersPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='font-poppins'>
            <AdminLinks />
            <div className="flex justify-center gap-2 mt-8">
                <input
                    type="text"
                    value={searchItem}
                    onChange={handleInputChange}
                    className="border bg-blue-100 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Type to search.." />
                <select value={selectedSearchType} onChange={handleSearchTypeChange} className="border bg-blue-100 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500">
                    <option value="fullname">FirstName & LastName</option>
                    <option value="email">Email</option>
                    <option value="username">Username</option>
                </select>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>There was an error loading the users</p>}

            <div className="mx-auto px-4 py-8 sm:px-8">
                <div className="overflow-y-hidden rounded-lg border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-800 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                    <th className="px-6 py-4">Country</th>
                                    <th className="px-6 py-4">Username</th>
                                    <th className="px-6 py-4">@email</th>
                                    <th className="px-6 py-4">FullName</th>
                                    <th className="px-6 py-4">User Role</th>
                                    <th className="px-6 py-4">Created at</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-3 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-500">

                                {!loading && !error && filteredUsers.length === 0 ? (

                                    <span className="text-purple-500">No users found</span>

                                ) : (
                                    filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
                                        .map((user) => (
                                            <tr key={user.uid} className="mt-2 text-white">
                                                <td className="border-b border-gray-200 px-6 py-6 text-sm">
                                                    <ReactCountryFlag
                                                        countryCode={user.country}
                                                        svg
                                                        style={{
                                                            width: '32px',
                                                            height: '32px',
                                                        }} />
                                                    <span className="whitespace-no-wrap ml-4">{getCountryNameByCode(user.country)}</span>
                                                </td>

                                                <td className="border-b border-gray-200 px-6 py-6 text-sm">
                                                    <div className="flex items-center">
                                                        {users && user.photo ? (
                                                            <div className="h-10 w-10 flex-shrink-0">
                                                                <img className="h-full w-full rounded-full" src={user.photo} alt="Avatar" />
                                                            </div>
                                                        ) : (
                                                            <div className="h-10 w-10 flex-shrink-0">
                                                                <span className="font-normal font-poppins text-3xl text-white dark:text-slate-500">
                                                                    {getInitials(user.firstName, user.lastName)}
                                                                </span>
                                                            </div>
                                                        )}

                                                        <div className="ml-3">
                                                            <p className="text-blue-no-wrap">{user.userName}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border-b border-gray-200 px-6 py-6 text-sm">
                                                    <span className="whitespace-no-wrap">{user.email}</span>
                                                </td>
                                                <td className="border-b border-gray-200 px-6 py-6 text-sm">
                                                    <span className="whitespace-no-wrap">{user.firstName} {user.lastName}</span>
                                                </td>
                                                <td className="border-b border-gray-200 px-6 py-6 text-sm">
                                                    <span className="whitespace-no-wrap">{getUserRoleByCode(user.userRole)}</span>
                                                </td>
                                                <td className="border-b border-gray-200 px-6 py-6 text-sm">
                                                    <span className="whitespace-no-wrap">{user.createdOn}</span>
                                                </td>
                                                <td className="border-b border-gray-200 px-6 py-6 text-sm">
                                                    {users && user.doNotDisturb === false ? (
                                                        <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-green-900">
                                                            Inactive
                                                        </span>
                                                    )}

                                                </td>
                                                <td className="border-b border-gray-200 px-6 py-6 text-sm">
                                                    <button onClick={() => handleBlockUser(user.uid)} className="bg-red-600 hover:bg-red-700 mr-4 text-white px-2 py-1 rounded"> Block </button>
                                                    <button onClick={() => handleUnblockUser(user.uid)} className="bg-thirdly hover:bg-thirdlyHover text-white py-1 rounded px-2"> Unblock </button>
                                                </td>
                                            </tr>
                                        ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-end pt-6">
                    {filteredUsers.length > 0 && (
                        <div className="mt-2 sm:mt-0">
                            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="mr-2 h-12 w-12 rounded-full text-sm font-semibold text-white transition duration-150 bg-thirdly hover:bg-thirdlyHover">Prev</button>
                            <button onClick={handleNextPage} className="h-12 w-12 rounded-full text-sm font-semibold text-white bg-thirdly transition duration-150 hover:bg-thirdlyHover">Next</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ControlUsers

