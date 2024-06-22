import React from 'react';
import { useSelector } from 'react-redux';
import ConnectToWallet from '../components/ConnectToWallet';

const ProtectedRoute = ({ children }) => {
    const user=useSelector((store:any)=>store.auth.user)
    if (!user || !user?.id) {
        return <ConnectToWallet/>;
    }
    return children;
};

export default ProtectedRoute;
