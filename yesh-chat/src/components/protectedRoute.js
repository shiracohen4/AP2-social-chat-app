import React from 'react';
import { Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';

export const Protected = ({ isLoggedIn, children }) => {
    
    if (isLoggedIn === false || isLoggedIn === null) {
        return <Navigate to="/" replace />;
    }
    return children;
};
