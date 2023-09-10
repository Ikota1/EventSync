import Sidebar from '../../components/Sidebar/Sidebar';
import NotificationCenter from '../../components/NotificationCenter/NotificationCenter';
import { AuthContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import { useContext } from 'react';
import { getInitials } from '../../constants/helpersFns/getInitials';



const ApplicationView = () => {
  const { userData } = useContext(AuthContext);
  const nav = useNavigate();

  const handlePhotoClick = () => {
    nav('/application/settings')
  }

  return (
    <div className="flex relative">
      <Sidebar />
      <div className='flex-1 h-screen overflow-hidden'>
        <div className='flex justify-end bg-gray-900 px-7 py-2 items-center gap-4'>
          <NotificationCenter />
          <div onClick={handlePhotoClick} className="h-9 w-9 flex-shrink-0 cursor-pointer">
            {userData && userData.photo ? (
              <img className="h-full w-full rounded-full" src={userData.photo} alt="Avatar" />
            ) : (
              <span className="h-full w-full rounded-full flex items-center justify-center bg-indigo-100">
                {getInitials(userData?.firstName, userData?.lastName)}
              </span>
            )}
          </div>
        </div>
        <div className="flex-1 p-7" >
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ApplicationView;