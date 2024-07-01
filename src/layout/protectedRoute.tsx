import React from 'react';
import { useSelector } from 'react-redux';
// import ConnectToWallet from '../components/ConnectToWallet';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user=useSelector((store:any)=>store.auth.user)
    if (!user || !user?.id) {
        return <Navigate to={'/dashboard'}/>;
    }
    return children;
};

export default ProtectedRoute;
