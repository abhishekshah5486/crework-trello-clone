import './App.css';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import TaskModal from './Components/TaskModal';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {

  return (
      <Router>
        <Routes>
          <Route exact path='/' element={<LandingPage/>}/>
          <Route exact path='/login' element={<LoginPage/>} />
          <Route exact path='/signup' element={<SignUpPage/>} />
          <Route 
          exact path='/home' 
          element = {
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
          />
          <Route 
          exact path='/home/create-task' 
          element= {
            <ProtectedRoute>
              <TaskModal />
            </ProtectedRoute>
          }
          />
          <Route 
          exact path='/home/edit-task' 
          element= {
            <ProtectedRoute>
              <TaskModal />
            </ProtectedRoute>
          }
          />
        </Routes>
      </Router>
  );
}

export default App;
