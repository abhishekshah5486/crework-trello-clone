import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { getCurrentUser } from "../APICalls/users";

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const initializeUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await getCurrentUser();
                if (response.success) {
                    setUser(response.user); 
                }
                else
                {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user", error);
                setUser(null);
            }
        }
        setLoading(false); 
    };

    useEffect(() => {
        initializeUser();
    }, []);

    return(
        <UserContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;