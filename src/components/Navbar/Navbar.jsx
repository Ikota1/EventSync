import { useState } from 'react'

import { close, menu, logo } from '../../assets';
import { navLinksNavbar } from '../../constants/navLinks';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className='w-full flex py-6 justify-between items-center navbar'>
      <NavLink to='/'><img src={logo} alt='eventSync' className='w-[124px] h-[50px]' /></NavLink>
      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinksNavbar.map((nav, index) => (
          <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[16px] ${index === navLinksNavbar.length - 1 ? 'mr-0' : 'mr-10'} text-white`}>
            <NavLink to={`/${nav.id}`}>{nav.title}</NavLink>
          </li>
        ))}
      </ul>

      <div className='sm:hidden flex flex-1 justify-end items-center'>
        <img src={toggle ? close : menu} alt="menu" className='w-[28px] h-[28px] object-contain' onClick={() => setToggle((prev) => !prev)} />

        <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
          <ul className='list-none flex flex-col justify-end items-center flex-1'>
            {navLinksNavbar.map((nav, index) => (
              <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[16px] ${index === navLinksNavbar.length - 1 ? 'mr-0' : 'mb-4'} text-white`}>
                <NavLink to={`/${nav.id}`}>{nav.title}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar