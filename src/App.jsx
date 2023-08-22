import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import { AuthContextProvider } from "./context/UserContext"; 

const App = () => (
  <AuthContextProvider>
  <BrowserRouter>
    <div className="bg-primary w-full overflow-hidden">
      {<LandingPage /> && <AppRouter />}
    </div>
  </BrowserRouter>
  </AuthContextProvider>
)


export default App;
