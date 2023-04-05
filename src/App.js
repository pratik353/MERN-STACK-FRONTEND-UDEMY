import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Users from './user/pages/Users';
import PageNotFound from './pages/PageNotFound';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';

function App() {
  return (
    <Router>
      <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<Users/>}/>
            <Route path="/places/new" element={<NewPlace/>}/>
            {/*Route not found */}
            {/* <Route path="*" element={<PageNotFound/>}/> */}
            {/* Route not found Navigate to / route  */}
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Routes>
        </main>
    </Router>
  )
}

export default App;
