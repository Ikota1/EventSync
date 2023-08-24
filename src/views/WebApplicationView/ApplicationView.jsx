import Sidebar from '../../components/Sidebar/Sidebar';

import { Outlet } from "react-router-dom";

const ApplicationView = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 p-7">
        <Outlet />
      </div>
    </div>
  )
}

export default ApplicationView;