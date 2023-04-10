import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Users from "./user/pages/Users";
import PageNotFound from "./pages/PageNotFound";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlaces from "./places/pages/UpdatePlaces";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useCallback, useState } from "react";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  const login = useCallback(() => {
    setIsLoggedin(true);
  }, []);

  const logOut = useCallback(() => {
    setIsLoggedin(false);
  }, []);

  let routes;

  if (isLoggedin) {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlaces />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedin, login: login, logOut: logOut }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            {routes}
            {/*Route not found */}
            {/* <Route path="*" element={<PageNotFound/>}/> */}
            {/* Route not found Navigate to / route  */}
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
