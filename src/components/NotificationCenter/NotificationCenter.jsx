import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdNotifications } from 'react-icons/md';
import { AuthContext } from "../../context/UserContext";

const NotificationCenter = ({ onClick }) => {
    const [expanded, setExpanded] = useState(false);
    const { userData } = useContext(AuthContext)

    const notificationCount = userData?.incomingFriendRequests?.length || 0;
    const nav = useNavigate();

    const handleNotificationCenterClick = () => {
        if (notificationCount > 0) {
            setExpanded(!expanded);
        }
    };

    const handleNotificationBtnClick = () => {
        nav('/application/friends/pending-friends');
        setExpanded(!expanded);
    };

    return (
        <div className="notification-center">
             <div onClick={handleNotificationCenterClick} className={`notification-badge ${notificationCount > 0 ? 'bg-purple-500 text-white' : ''} flex items-center cursor-pointer rounded-full p-1`}>
                <MdNotifications className="mr-1" />
                {notificationCount}
            </div>
            {expanded && (
                <div id="toast-undo" className="flex absolute top-16 right-7 items-center w-50 max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                    <div className="text-sm font-normal">
                        You have a new friend request.
                    </div>
                    <div className="flex items-center ml-auto space-x-2">
                        <button onClick={handleNotificationBtnClick} className="text-sm font-medium text-blue-600 p-1.5 hover:bg-blue-100 rounded-lg dark:text-blue-500 dark:hover:bg-gray-700">See more</button>
                        <button onClick={handleNotificationCenterClick} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-undo" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default NotificationCenter;