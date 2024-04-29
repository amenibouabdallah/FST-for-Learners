import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ element, allowedUserTypes }) => {
    const token = localStorage.getItem('token');

    if (token) {
        const decodedToken = jwtDecode(token);
        const userType = decodedToken.userType;

        if (allowedUserTypes.includes(userType) || (allowedUserTypes.includes('admin') && !userType)) {
            return element;
        } else {
            if (userType) {
                return <Navigate to="/docs" />;
            } else {
                return <Navigate to="/admin/users" />;
            }
        }
    } else {
        return <Navigate to="/" />;
    }
};

export default ProtectedRoute;
