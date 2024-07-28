import './App.css';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContextProvider from './Context/UserContextProvider';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route exact path='/' Component={LandingPage}/>
          <Route exact path='/login' Component={LoginPage}/>
          <Route exact path='/signup' Component={SignUpPage}/>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
