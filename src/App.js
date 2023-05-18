import React, { Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
// import Users from "./user/pages/Users";
import PageNotFound from "./pages/PageNotFound";
// import NewPlace from "./places/pages/NewPlace";
// import UserPlaces from "./places/pages/UserPlaces";
// import UpdatePlaces from "./places/pages/UpdatePlaces";
// import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import useAuth from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/loading/LoadingSpinner";

// lazy loading of components in react :- only workes in Routes 
const Users = React.lazy(() => import('./user/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const UpdatePlaces = React.lazy(() => import('./places/pages/UpdatePlaces'));
const Auth = React.lazy(() => import('./user/pages/Auth'));

function App() {
  const {userId, token, login, logOut} = useAuth();

  let routes;

  if (token) {
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

  // NOTE: - !! operatore is used to convert any value into boolean value

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, login: login, logOut: logOut, userId, token }}
    >
      <Suspense fallback={<div className="center"><LoadingSpinner/></div>}>
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
      </Suspense>
    </AuthContext.Provider>
  );
}

export default App;
