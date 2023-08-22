import { Routes, Route } from "react-router-dom";

import LandingPage from "../views/LandingPage/LandingPage";
import Login from '../views/Login/Login';
import SignUpPartTwo from '../views/SignUp/SignUpPartTwo'
import SignUp from '../views/SignUp/SingUp'
import News from "../views/News/News";
import FAQ from "../views/FAQ/FAQ";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/news" element={<News />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signupparttwo" element={<SignUpPartTwo />} />
  </Routes>
)


export default AppRouter