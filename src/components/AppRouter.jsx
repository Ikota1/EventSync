import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../views/LandingPageView/LandingPage/LandingPage";
import Login from "../views/LandingPageView/Login/Login";
import SignUpPartTwo from "../views/LandingPageView/SignUp/SignUpPartTwo";
import SignUp from "../views/LandingPageView/SignUp/SignUp";
import FAQ from "../views/LandingPageView/FAQ/FAQ";
import ApplicationView from "../views/WebApplicationView/ApplicationView";
import AboutUs from "../views/LandingPageView/AboutUs/AboutUs";
import { auth } from "../firebase/firebase-config";
import { useAuthState } from 'react-firebase-hooks/auth';
import Dashboard from "../views/WebApplicationView/Dashboard/Dashboard";
import Calendar from "../views/WebApplicationView/Calendar.jsx/Calendar";
import Events from "../views/WebApplicationView/Events.jsx/Events";
import Friends from "../views/WebApplicationView/Friends/Friends";
import Settings from "../views/WebApplicationView/Settings/Settings";
import Admin from "../views/WebApplicationView/Admin/Admin";
import MyEvents from "./MyEvents/MyEvents";
import AdminRoute from "../views/WebApplicationView/Admin/AdminRoute";
import ControlUsers from "../views/WebApplicationView/Admin/ControlUsers";
import ControlEvents from "../views/WebApplicationView/Admin/ControlEvents";
import PendingFriends from "../views/WebApplicationView/Friends/PendingFriends";
import SearchFriends from "../views/WebApplicationView/Friends/SearchFriends";
import EventsDetails from "../views/WebApplicationView/EventsDetails/EventsDetails";
import EventHistory from "../views/WebApplicationView/Events.jsx/EventHistory";
import PropTypes from 'prop-types';
import ContactUsForm from "../views/WebApplicationView/Support/ContactUsForm";
import UserDetails from "../views/WebApplicationView/UserDetails/UserDetails";
import ThankYouPage from "../views/WebApplicationView/ThankYouPage/ThankYouPage";


const AuthenticatedRoute = ({ element }) => {
  const [user, loading] = useAuthState(auth);

  return user ? <> {element} </> : !loading && <Navigate to="/login" />

};

AuthenticatedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

const AppRouter = () => (
  <Routes>
    {/* Landing Page View */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signupparttwo" element={<SignUpPartTwo />} />
    <Route path="/about" element={<AboutUs />} />

    {/* Application view */}
    <Route path="/application" element={<AuthenticatedRoute element={<ApplicationView />} />}>
      <Route exact path="/application/dashboard" element={<Dashboard />} />
      <Route path="events" element={<Events />} />
      <Route path="my-events" element={<MyEvents />} />
      <Route path="event-history" element={<EventHistory />} />
      <Route exact path="events/:id" element={<EventsDetails />} />
      <Route exact path="user-profile/:id" element={<UserDetails />} />
      <Route path="friends" element={<Friends />} />
      <Route path="pending-friends" element={<PendingFriends />} />
      <Route path="search-friends" element={<SearchFriends />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="support" element={<ContactUsForm />} />
      <Route path="settings" element={<Settings />} />
      <Route path="thank-you" element={<ThankYouPage />} />
      <Route element={<AdminRoute />}>
        <Route path="admin" element={<Admin />} />
        <Route path="control-users" element={<ControlUsers />} />
        <Route path="control-events" element={<ControlEvents />} />
      </Route>

      <Route path="/application" element={<Navigate to="/application/dashboard" />} />
    </Route>
  </Routes>
)


export default AppRouter

