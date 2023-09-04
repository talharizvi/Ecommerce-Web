import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// function PrivateRoute({ type, path, element }) {
//     const isAuthenticated = type === 'admin';

//     if (!isAuthenticated) {
//         // Redirect to login or unauthorized page if not authenticated
//         return <Navigate to="/" />;
//     }

//     return <Route path={path} element={element} />;
// }

function PrivateRoute({ userType, element }) {
    const { user, userType: currentUserType } = useAuth();

    if (!user || userType !== currentUserType) {
        return <Navigate to="/login" />;
    }

    return <Route element={element} />;
}

export default PrivateRoute;