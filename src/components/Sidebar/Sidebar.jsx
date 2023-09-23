import { useContext, useEffect, useState } from 'react';
import { navLinksSidebar } from '../../constants/navLinks';
import { NavLink } from 'react-router-dom';
import { logoIcon, control, adminIcon, signOut } from '../../assets';
import { logoutUser } from '../../services/auth.service';
import { AuthContext } from '../../context/UserContext';
import { USER_ROLES } from '../../constants/userRoles';
import { LocationResults } from '../Weather/Weather';

const Sidebar = () => {
  const { userData, setAuthState, userLocation } = useContext(AuthContext)
  const [open, setOpen] = useState(true);
  const [weatherInfo, setWeatherInfo] = useState({})

  const isAdmin = userData?.userRole === USER_ROLES.Admin;

  useEffect(() => {

    const weather = import.meta.env.VITE_Weather;

    const weatherFetch = async () => {

      const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weather}&q=${userLocation?.latitude},${userLocation?.longitude}`)
      const fetchedWeather = await res.json();

      setWeatherInfo(fetchedWeather)
   
    }
    weatherFetch()
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
      <div className={` ${open ? "w-64" : "w-20 "} font-poppins h-screen p-5 pt-8 relative duration-300 bg-gray-900`}>
        <img src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)} />
        <div className="flex gap-x-4 items-center">
          <img src={logoIcon} className={`cursor-pointer duration-500 w-[32px] h-auto `} />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
            Menu
          </h1>
        </div>
        <ul className="pt-6">
          {navLinksSidebar.map((nav) => (
            <NavLink key={nav.id} to={nav.id} className=''>
              <li className={`flex items-center gap-x-4 rounded-md p-2 cursor-pointer font-normal font-poppins text-white hover:bg-thirdlyHover  text-sm ${nav.gap ? "mt-9" : "mt-2"}`}>
                <img src={nav.img} className='w-[20px] h-auto' />
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {nav.title}
                </span>
              </li>
            </NavLink>
          ))}
          {isAdmin && (<NavLink to='/application/admin' className={`flex rounded-md p-2 cursor-pointer text-white hover:bg-thirdlyHover text-sm items-center gap-x-4 `}>
            <img src={adminIcon} className='w-[20px] h-auto' />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Admin
            </span>
          </NavLink>)}
        </ul>
        {open ? (
          <div className='sticky top-[100vh] duration-300'>
            <LocationResults location={weatherInfo} />
            <NavLink to="/" className='flex rounded-md p-2 cursor-pointer font-normal font-poppins text-white hover:bg-thirdlyHover text-sm items-center gap-x-4' onClick={onLogout}>
              <img src={signOut} className='w-[20px] h-auto' />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </NavLink>
          </div>
        ) : (
          <div className='sticky top-[100vh]'>
            {null}
            <NavLink to="/" className='flex rounded-md p-2 cursor-pointer font-normal font-poppins text-white hover:bg-bg-thirdlyHover text-sm items-center gap-x-4' onClick={onLogout}>
              <img src={signOut} className='w-[20px] h-auto' />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </NavLink>
          </div>
        )}
      </div>

    </>
  )
}

export default Sidebar