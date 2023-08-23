import { useState } from 'react';
import { navLinksSidebar } from '../../constants/navLinks';
import { NavLink } from 'react-router-dom';
import { logoIcon, control } from '../../assets';

const Sidebar = () => {
  const [open, setOpen] = useState(true);

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
                {/* <NavLink to={ }> */}
                {nav.title}
                {/* </NavLink> */}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Sidebar