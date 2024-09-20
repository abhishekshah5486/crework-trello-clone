import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const initializeUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axiosInstance.get('/get-current-user');
                if (response.data.success) {
                    setUser(response.data.user); 
                }
            } catch (error) {
                console.error("Error fetching user", error);
            }
        }
        setLoading(false); 
    };

    useEffect(() => {1
        initializeUser();
    }, []);

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;