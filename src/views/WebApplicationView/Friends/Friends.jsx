import { NavLink, Outlet } from "react-router-dom"


const Friends = () => {
  return (
    <div>
         <h1 className="text-blue-500">Friends</h1>
      <div className='flex justify-center pb-8'>
        <nav className="mt-6">
          <ul className="flex space-x-6">  
            <li><NavLink to="online-friends" className={({ isActive }) => (isActive ? 'text-orange-500' : "text-blue-500 hover:text-blue-300")}> Online </NavLink></li>
            <li><NavLink to="all-friends" className={({ isActive }) => (isActive ? 'text-orange-500' : "text-blue-500 hover:text-blue-300")}> All </NavLink></li>
            {/* this features might be implemented later */}
            {/* <li><NavLink to="pending" className={({ isActive }) => (isActive ? 'text-orange-500' : "text-blue-500 hover:text-blue-300")}> Pending </NavLink></li>
            <li><NavLink to="blocked" className={({ isActive }) => (isActive ? 'text-orange-500' : "text-blue-500 hover:text-blue-300")}> Blocked </NavLink></li> */}
          </ul>
        </nav>
      </div>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search friends by username..."
          className="bg-white rounded-l-md p-2 focus:outline-none w-64" />
          <button className="bg-blue-500 text-white px-2 py-1 rounded">Find them!</button>
      </div>
      <Outlet />
    </div>
  )
}

export default Friends