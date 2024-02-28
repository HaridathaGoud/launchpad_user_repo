import React, { useEffect, useReducer } from "react";
import {connect, useSelector,useDispatch } from "react-redux";
import { getCustomerDetails } from "../../../reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { walletAddressChecking } from "../../../reducers/proposlaReducer";
import DaoCards from "./daos";
const reducers = (state, action) => {
  switch (action.type) {
    case "daoData":
      return { ...state, daoData: action.payload };
  }
};
function Dashboard(props: any) {
  const loading = useSelector(
    (state: any) => state?.proposal?.getWalletAddressChecking?.isLoading
  );
  const router = useNavigate();
  const { address } = useAccount();
  const [state, dispatch] = useReducer(reducers, { daoData: [] });
  const rootDispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    props.trackWallet((callback: any) => {
      dispatch({ type: "daoData", payload: callback });
    });
    if (address) {
      props.customers(address);
    }
  }, []);

  const goToHome = (item: any) => {
    rootDispatch({ type: "fetchSelectingDaoData", payload: item });
    router(`/dao/${item?.daoId}/${item.votingContractAddress}`);
  };

  return (
    <div>
      <DaoCards
        daoData={state?.daoData}
        loading={loading}
        goToHome={(item:any) => goToHome(item)}
      />
    </div>
  );
}
const connectStateToProps = ({ oidc }: any) => {
  return { oidc: oidc };
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    customers: (address: any, callback: any) => {
      dispatch(getCustomerDetails(address, callback));
    },
    trackWallet: (callback: any) => {
      dispatch(walletAddressChecking(callback));
    },
    dispatch,
  };
};
export default connect(connectStateToProps, connectDispatchToProps)(Dashboard);
