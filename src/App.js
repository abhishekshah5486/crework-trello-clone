import './App.css';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContextProvider from './Context/UserContextProvider';
import HomePage from './Pages/HomePage';
import TaskModal from './Components/TaskModal';

function App() {
  return (
    // <UserContextProvider>
    //   <Router>
    //     <Routes>
    //       <Route exact path='/' Component={LandingPage}/>
    //       <Route exact path='/login' Component={LoginPage}/>
    //       <Route exact path='/signup' Component={SignUpPage}/>
    //       <Route exact path='/abhishekshah/home' Component={HomePage}/>
    //     </Routes>
    //   </Router>
    // </UserContextProvider>
    <TaskModal/>
  );
}

export default App;
