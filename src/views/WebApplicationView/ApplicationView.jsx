import Sidebar from '../../components/Sidebar/Sidebar';
import NotificationCenter from '../../components/NotificationCenter/NotificationCenter';
import { AuthContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

import { Outlet } from "react-router-dom";
import { useContext } from 'react';
import { getInitials } from '../../constants/helpersFns/getInitials';

import { useState,useEffect } from 'react';
import { updateUserProfile } from '../../services/user.services';


const ApplicationView = () => {
  const { userData } = useContext(AuthContext);
  const nav = useNavigate();

  const [doNotDisturb, setDoNotDisturb] = useState(true);

  useEffect(() => {
    setDoNotDisturb(userData?.doNotDisturb)
  }, [userData]);

  const handleDoNotDisturb = async () => {
    let updatedProfile = { ...userData, doNotDisturb: !doNotDisturb };

    await updateUserProfile(userData.uid, updatedProfile);
    setDoNotDisturb(!doNotDisturb)
  }

  const handlePhotoClick = () => {
    nav('/application/settings')
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className='flex-1 h-screen overflow-hidden'>
        <div className='flex justify-end bg-gray-700 px-7 py-2 items-center gap-4'>
          <div onClick={handlePhotoClick} className="h-12 w-12 flex-shrink-0 cursor-pointer">
            {userData && userData.photo ? (
              <img className="h-full w-full rounded-full" src={userData.photo} alt="Avatar" />
            ) : (
              <span className="h-full w-full rounded-full flex items-center justify-center bg-indigo-100">
                {getInitials(userData?.firstName, userData?.lastName)}
              </span>
            )}
          </div>
          <NotificationCenter />
          <label className="relative flex mb-5 cursor-pointer items-center justify-center mt-5">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={doNotDisturb || ''}
              onChange={handleDoNotDisturb}
            />
            <div className={`
              w-9 h-5 bg-gray-200 rounded-full peer
              ${doNotDisturb === true ? 'peer-checked:bg-purple-500' : 'dark:bg-gray-300'}
              dark:border-gray-600  dark:peer-checked:after:translate-x-full
              dark:peer-checked:bg-purple-500 after:content-[''] after:absolute after:top-0.5
              after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
              after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:after:border-white
            `}></div>
            <span className={`${doNotDisturb === true ? `ml-3 text-sm font-normal font-poppins text-purple-500` : `ml-3 text-sm font-normal font-poppins text-gray-900 dark:text-gray-300`} `}>DND</span>
          </label>
        </div>        
        <div className="flex-1 p-7" >
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ApplicationView;