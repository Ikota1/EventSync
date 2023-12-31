import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdNotifications } from 'react-icons/md';
import { AuthContext } from "../../context/UserContext";
import { removeIncomingEventRequest } from "../../services/social.service";
import PropTypes from 'prop-types';

const NotificationCenter = () => {
    const [expanded, setExpanded] = useState(false);
    const { userData } = useContext(AuthContext)
    const nav = useNavigate();
    const notificationCenterRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    const handleDocumentClick = (e) => {
        if (notificationCenterRef.current && !notificationCenterRef.current.contains(e.target)) {
            setExpanded(false);
        }
    };

    const notifications = [
        ...userData?.incomingFriendRequests?.map((request) => ({
            type: 'friendRequest',
            request,
        })) || [],
        ...Object.keys(userData?.incomingEventRequests || {}).map((eventInvite) => ({
            type: 'eventInvite',
            eventInvite,
        })),
    ];

    const totalNotifications = notifications.length;

    const handleNotificationCenterClick = () => {
        setExpanded(!expanded);
    };

    const handleNotificationClick = async (notification) => {
        if (notification.type === 'friendRequest') {
            nav('/application/pending-friends');
        } else if (notification.type === 'eventInvite') {
            await removeIncomingEventRequest(userData.uid, notification.eventInvite)
            nav(`/application/events/${notification.eventInvite}`);
        }

        setExpanded(false);
    };

    return (
        <div className="notification-center font-poppins" ref={notificationCenterRef}>
            <div onClick={handleNotificationCenterClick} className={`notification-badge ${totalNotifications > 0 ? 'bg-thirdly text-white' : 'text-white'} flex items-center cursor-pointer rounded-full p-1`}>
                <MdNotifications className="mr-1 fill-white" />
                {totalNotifications}
            </div>
            {expanded && (
                <div id="toast-undo" className="flex flex-col gap-3 z-30 absolute top-16 right-7 items-center w-80 max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                    {totalNotifications === 0 ? (
                        <div className="notification-item">
                            <p>You&apos;re all caught up and have no pending requests or event invitations right now.</p>
                        </div>
                    ) : (
                        notifications.map((notification, index) => (
                            <div key={index} className="notification-item">
                                {notification.type === 'friendRequest' ? (
                                    <div>
                                        <p>You have a new friend request</p>
                                        <button onClick={() => handleNotificationClick(notification)} className="text-thirdly hover:text-thirdlyHover">See more</button>
                                    </div>
                                ) : (
                                    <div>
                                        <p>You have a new event invite from.</p>
                                        <button onClick={() => handleNotificationClick(notification)} className="text-thirdly hover:text-thirdlyHover">View Event</button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
NotificationCenter.propTypes = {
    onClick: PropTypes.func,
};

export default NotificationCenter;

