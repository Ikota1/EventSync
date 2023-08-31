import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./views/LandingPageView/LandingPage/LandingPage";
import { AuthContextProvider } from "./context/UserContext";
import { AppContextProvider } from "./context/AppContext";

const App = () => (
  <AuthContextProvider>
    <AppContextProvider>
      <BrowserRouter>
        <div className="bg-primary w-full overflow-hidden">
          {<LandingPage /> && <AppRouter />}
        </div>
      </BrowserRouter>
    </AppContextProvider>
  </AuthContextProvider>
)


export default App;
