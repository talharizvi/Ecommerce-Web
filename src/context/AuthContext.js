import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null);

    const login = (userData) => {
        console.log('userdata', userData)
        setUser(userData);
        setUserType(userData.type);
    };

    const logout = () => {
        setUser(null);
        setUserType(null);
        //clear session storage to avoid stale user data in local storage
        sessionStorage.clear();
    };

    const value = {
        user,
        userType,
        login,
        logout,
      };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>  

}  
