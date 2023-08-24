import { Routes, Route } from "react-router-dom";

import Sidebar from '../../components/Sidebar/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import Events from './Events.jsx/Events';
import Calendar from './Calendar.jsx/Calendar';
import Inbox from './Inbox/Inbox';
import Friends from './Friends/Friends';
import Support from './Suppport/Support';
import Settings from './Settings/Settings';
import News from '../LandingPageView/News/News';

import { AuthenticatedRoute } from "../../constants/AuthenticatedRoutes";

const ApplicationView = () => {

  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 p-7">
        <Routes>
          <Route path="/*" element={<AuthenticatedRoute element={<Dashboard />} />} />
          <Route path="/inbox/*" element={<AuthenticatedRoute element={<Inbox />} />} />
          <Route path="/events/*" element={<AuthenticatedRoute element={<Events />} />} />
          <Route path="/calendar/*" element={<AuthenticatedRoute element={<Calendar />} />} />
          <Route path="/news/*" element={<AuthenticatedRoute element={<News />} />} />
          <Route path="/friends/*" element={<AuthenticatedRoute element={<Friends />} />} />
          <Route path="/support/*" element={<AuthenticatedRoute element={<Support />} />} />
          <Route path="/settings/*" element={<AuthenticatedRoute element={<Settings />} />} />
        </Routes>
      </div>
    </div>
  )
}

export default ApplicationView;