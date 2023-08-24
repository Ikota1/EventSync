import { Routes, Route } from "react-router-dom";
import LandingPage from "../views/LandingPageView/LandingPage/LandingPage";
import Login from "../views/LandingPageView/Login/Login";
import SignUpPartTwo from "../views/LandingPageView/SignUp/SignUpPartTwo";
import SignUp from "../views/LandingPageView/SignUp/SignUp";
import News from "../views/LandingPageView/News/News";
import FAQ from "../views/LandingPageView/FAQ/FAQ";
import ApplicationView from "../views/WebApplicationView/ApplicationView";
import { AuthenticatedRoute } from "../constants/AuthenticatedRoutes";

const AppRouter = () => (
  <Routes>
    {/* Landing Page View */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/news" element={<News />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signupparttwo" element={<SignUpPartTwo />} />

    {/* Application View */}
    <Route exact path="/*" element={<AuthenticatedRoute element={<ApplicationView />} />} />

  </Routes>
)


export default AppRouter