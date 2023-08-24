import { useContext, useState } from 'react';
import { navLinksSidebar } from '../../constants/navLinks';
import { Link, NavLink } from 'react-router-dom';
import { logoIcon, control } from '../../assets';
import { logoutUser } from '../../services/auth.service';
import { AuthContext } from '../../context/UserContext';
import { getAuth } from 'firebase/auth';

const Sidebar = () => {
  const { setAuthState } = useContext(AuthContext)
  const [open, setOpen] = useState(true);

  // const auth = getAuth();
  // const user = auth.currentUser;
  // console.log(user)

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
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img src={logoIcon} className={`cursor-pointer duration-500 w-[32px] h-auto `} />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
            Menu
          </h1>
        </div>
        <ul className="pt-6">
          {navLinksSidebar.map((nav, index) => (
            <li key={nav.id} className={`flex rounded-md p-2 cursor-pointer text-white hover:bg-dimWhite text-sm items-center gap-x-4 
            ${nav.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-dimWhite"
              }`}>
              <img src={nav.img} className='w-[20px] h-auto' />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <NavLink to={nav.id}>
                  {nav.title}
                </NavLink>
              </span>
            </li>
          ))}
        </ul>
        <NavLink to="/" className='flex w-[20px] h-auto' onClick={onLogout}>
          Logout
        </NavLink>
      </div>
    </>
  )
}

export default Sidebar