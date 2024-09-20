import React, {useEffect, useContext} from 'react'
import NavBar from '../../Components/NavBar'
import Header from '../../Components/Header'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext';

const LandingPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    
    useEffect(() => {
      if (user){
          return navigate('/home');
      }
    }, [user, navigate]);

    return (
      <div>
        <NavBar/>
        <Header/>
      </div>
    )
}

export default LandingPage;
