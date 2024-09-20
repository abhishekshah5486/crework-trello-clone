import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext';

function ProtectedRoute({children}) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user)
    {   
        // Navigate to the landing page if the user is not logged in
        return navigate('/');
    }
    return children;
}

export default ProtectedRoute;
