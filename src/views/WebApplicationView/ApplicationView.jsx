import Sidebar from '../../components/Sidebar/Sidebar';
import NotificationCenter from '../../components/NotificationCenter/NotificationCenter';
import { AuthContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

import { Outlet } from "react-router-dom";
import { useContext } from 'react';

const ApplicationView = () => {
  const { userData } = useContext(AuthContext);
  const nav = useNavigate();

  const handlePhotoClick = () => {
    nav('/application/settings')
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className='flex-1 h-screen overflow-hidden'>
        <div className='flex justify-end bg-gray-700 px-7 py-2 items-center gap-4'>
          <div onClick={handlePhotoClick} className="h-12 w-12 flex-shrink-0 ">
            {userData && userData.photo ? (
              <img className="h-full w-full rounded-full" src={userData.photo} alt="Avatar" />
            ) : (
              <span className="h-full w-full rounded-full flex items-center justify-center bg-indigo-100">
                {getInitials(userData?.firstName, userData?.lastName)}
              </span>
            )}
          </div>
          <NotificationCenter />
        </div>
        <div className="flex-1 p-7" >
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ApplicationView;