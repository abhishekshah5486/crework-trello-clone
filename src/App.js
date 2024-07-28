import './App.css';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={LandingPage}/>
        <Route exact path='/login' Component={LoginPage}/>
        <Route exact path='/signup' Component={SignUpPage}/>
      </Routes>
    </Router>
  );
}

export default App;
