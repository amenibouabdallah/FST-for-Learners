import React from 'react';
import {  Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const UnprotectedRoute = ({ element }) => {
    const token = localStorage.getItem('token');

    if (token) {
        const decodedToken = jwtDecode(token);
        const userType = decodedToken.userType;

        // Redirect to the appropriate page based on the user type
        if (userType) {
            return <Navigate to="/docs" />;
        } else{
            return <Navigate to="/admin/users" />;
        }
    } 

    // If no token, render the requested element
    return element;
};

export default UnprotectedRoute;
