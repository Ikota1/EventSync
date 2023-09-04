import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../views/LandingPageView/LandingPage/LandingPage";
import Login from "../views/LandingPageView/Login/Login";
import SignUpPartTwo from "../views/LandingPageView/SignUp/SignUpPartTwo";
import SignUp from "../views/LandingPageView/SignUp/SignUp";
import News from "../views/LandingPageView/News/News";
import FAQ from "../views/LandingPageView/FAQ/FAQ";
import ApplicationView from "../views/WebApplicationView/ApplicationView";
import { auth } from "../firebase/firebase-config";
import { useAuthState } from 'react-firebase-hooks/auth';
import Dashboard from "../views/WebApplicationView/Dashboard/Dashboard";
import Calendar from "../views/WebApplicationView/Calendar.jsx/Calendar";
import Inbox from "../views/WebApplicationView/Inbox/Inbox";
import Events from "../views/WebApplicationView/Events.jsx/Events";
import Friends from "../views/WebApplicationView/Friends/Friends";
import Support from "../views/WebApplicationView/Suppport/Support";
import Settings from "../views/WebApplicationView/Settings/Settings";
import Admin from "../views/WebApplicationView/Admin/Admin";
import MyEvents from "./MyEvents/MyEvents";
import OnlineFriends from "../views/WebApplicationView/Friends/OnlineFriends";
import AllFriends from "../views/WebApplicationView/Friends/AllFriends";
import AdminRoute from "../views/WebApplicationView/Admin/AdminRoute";
import ControlUsers from "../views/WebApplicationView/Admin/ControlUsers";
import ControlEvents from "../views/WebApplicationView/Admin/ControlEvents";

const AuthenticatedRoute = ({ element }) => {
  const [user, loading] = useAuthState(auth);

  return user ? <> {element} </> : !loading && <Navigate to="/login" />
 
};

const AppRouter = () => (
  <Routes>
    {/* Landing Page View */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/news" element={<News />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signupparttwo" element={<SignUpPartTwo />} />

    {/* Application view */}
    <Route path="/application" element={<AuthenticatedRoute element={<ApplicationView />} />}>
      <Route path="/application/dashboard" element={<Dashboard />} />
      <Route path="inbox" element={<Inbox />} />
      <Route path="events" element={<Events />}> 
      <Route path="my-events" element={<MyEvents />} />
      </Route>
      <Route path="friends" element={<Friends />}> 
      <Route path="online-friends" element={<OnlineFriends />} />
      <Route path="all-friends" element={<AllFriends />} />
       </Route>
      <Route path="calendar" element={<Calendar />} />
      <Route path="support" element={<Support />} />
      <Route path="settings" element={<Settings />} />

      <Route element={<AdminRoute  />}>
          <Route path="admin" element={<Admin />}>
          <Route path="controlusers" element={<ControlUsers />} />
          <Route path="controlevents" element={<ControlEvents />} />
      </Route>
      </Route>
    
      <Route path="/application" element={<Navigate to="/application/dashboard" />} />
    </Route>
  </Routes>
)


export default AppRouter

