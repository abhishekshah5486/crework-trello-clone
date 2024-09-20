import React, {useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext';

function ProtectedRoute({children}) {
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user){
            navigate('/');
        }
    }, [loading, user, navigate]);
    if (loading){
        return <div>Loading...</div>
    }
    return children;
}

export default ProtectedRoute;
