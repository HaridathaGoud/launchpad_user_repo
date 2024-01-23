import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAccount, useDisconnect,useConnect } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { get,getKyc } from '../../../utils/api';
import { setUserID } from "../../../reducers/rootReducer";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import KycStatusPage from '../../sumsub/kycStatus';

const supportedChains = [
    80001,
    0x13881
]
const WalletCheck = ({ children }) => {
    const { connectAsync } = useConnect();
    const user_details = useSelector((state: any) => state.auth.user);
    const { isConnected,address } = useAccount();
    const { disconnectAsync } = useDisconnect();
    const dispatch = useDispatch();
    const router = useNavigate();
    const [loader,setIsLoader]=useState(false);    
    useEffect(()=>{
        if(address){
            getCustomerDetails(address);
        }
    },[address])
    const getCustomerDetails = async (addr: string) => {
        setIsLoader(true);
        let response = await getKyc(`User/CustomerDetails/${addr}`);
        if (response) {
            setIsLoader(false);
            dispatch(setUserID(response.data));
        }
    };
    useEffect(() => {
        const _connector: any = window?.ethereum;
        if(_connector){        
        _connector.on('chainChanged', async (chain_id) => {
            if (!supportedChains.includes(chain_id)) {
                await disconnectAsync();
                router('/');
            }
        });
        _connector.on('accountsChanged', async (account) => {
            if (!isConnected) {
                await connectAsync( {connector: new MetaMaskConnector()});
                getCustomerDetails(account[0])
              } else {
                getCustomerDetails(account[0])
              }
           
        });
    }
    }, []);
    if (isConnected) {
        if (!user_details?.kycStatus || user_details?.kycStatus?.toLowerCase() !== "completed") {
            return <KycStatusPage  loader={loader}/>
        }
    }

    return <>{children}</>
}


export default WalletCheck;