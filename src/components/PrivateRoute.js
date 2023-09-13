// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// function PrivateRoute({ userRole, element, children }) {
//     const { user, userType } = useAuth();
    
//     if (!user) {
//         return <Navigate to="/" />;
//     }

//     return children;
// }

// export default PrivateRoute;

import React, { useEffect } from 'react';
import { Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ userRole, element, children }) {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Check if user data is in sessionStorage when component mounts
    useEffect(() => {
        const userDataString = sessionStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            login(userData); // Restore user data in context
            if((userData.type === 'user' && location.pathname.includes('admin')) || (userData.type === 'admin' && location.pathname.includes('home'))){
                navigate('/')
            } else {
                navigate(location.pathname)
            }
        }
    }, []);
    // useEffect(() => {
    //     const userDataString = sessionStorage.getItem('userData');
    //     if (userDataString) {
    //         try {
    //             const userData = JSON.parse(userDataString);
    
    //             if (userData && (userData.type === 'user' || userData.type === 'admin')) {
    //                 login(userData); // Restore user data in context
    //                 if ((userData.type === 'user' && location.pathname.includes('admin')) || 
    //                     (userData.type === 'admin' && location.pathname.includes('home'))) {
    //                     navigate('/');
    //                 } else {
    //                     navigate(location.pathname);
    //                 }
    //             } else {
    //                 // Invalid user data, clear sessionStorage
    //                 sessionStorage.removeItem('userData');
    //             }
    //         } catch (error) {
    //             // Handle JSON parse error, or any other errors
    //             console.error('Error parsing user data:', error);
    //             sessionStorage.removeItem('userData');
    //         }
    //     }
    // }, [login, location.pathname, navigate]);

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
}

export default PrivateRoute;