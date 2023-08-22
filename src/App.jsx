import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";

const App = () => (
  <BrowserRouter>
    <div className="bg-primary w-full overflow-hidden">
      {<LandingPage /> && <AppRouter />}
    </div>
  </BrowserRouter>
)


export default App;
