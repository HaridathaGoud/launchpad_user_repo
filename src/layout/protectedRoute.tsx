import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ConnectWallet from '../ui/connectButton';

const ProtectedRoute = ({ children }) => {
    const user=useSelector((store:any)=>store.auth.user)

    if (!user || !user?.id) {
        return <ConnectWallet/>;
    }

    return children;
};

export default ProtectedRoute;
