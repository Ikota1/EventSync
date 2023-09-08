import { useContext, useEffect, useState } from 'react';
import { navLinksSidebar } from '../../constants/navLinks';
import { NavLink } from 'react-router-dom';
import { logoIcon, control, adminIcon } from '../../assets';
import { logoutUser } from '../../services/auth.service';
import { AuthContext } from '../../context/UserContext';
import { USER_ROLES } from '../../constants/userRoles';
import { LocationResults } from '../Weather/Weather';

const Sidebar = () => {
  const { userData, setAuthState, userLocation } = useContext(AuthContext)
  const [open, setOpen] = useState(true);
  const [city, setCity] = useState({})


  const isAdmin = userData?.userRole === USER_ROLES.Admin;

  useEffect(() => {
    const API_KEY = "66abec26fe034546987185308232907"

    fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${userLocation?.latitude},${userLocation?.longitude}&aqi=no`)
      .then(res => res.json())
      .then(setCity);
  }, [])


  const onLogout = () => {
    logoutUser().then(() => {
      setAuthState({
        user: null,
        userData: null,
      });
    });

  };

  return (
    <>
      <div className={` ${open ? "w-72" : "w-20 "} h-screen p-5  pt-8 relative duration-300 bg-gray-800`}>
        <img src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)} />
        <div className="flex gap-x-4 items-center">
          <img src={logoIcon} className={`cursor-pointer duration-500 w-[32px] h-auto `} />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
            Menu
          </h1>
        </div>
        <ul className="pt-6">
          {navLinksSidebar.map((nav, index) => (
            <NavLink key={nav.id} to={nav.id} className=''>
              <li className={`flex items-center gap-x-4 rounded-md p-2 cursor-pointer text-white hover:bg-dimWhite text-sm ${nav.gap ? "mt-9" : "mt-2"}`}>
                <img src={nav.img} className='w-[20px] h-auto' />
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {nav.title}
                </span>
              </li>
            </NavLink>
          ))}
          {isAdmin && (<NavLink to='/application/admin' className={`flex rounded-md p-2 cursor-pointer text-white hover:bg-dimWhite text-sm items-center gap-x-4 `}>
            <img src={adminIcon} className='w-[20px] h-auto' />  Admin
          </NavLink>)}
        </ul>
        <NavLink to="/" className='flex w-[20px] h-auto' onClick={onLogout}>
          Logout
        </NavLink>
        {open ? (
          <div className='sticky top-[100vh] duration-300'>
            <LocationResults location={city} />
          </div>
        ) : (
          <div className='sticky top-[100vh]'>
            {null}
          </div>
        )}

      </div>
    </>
  )
}

export default Sidebar