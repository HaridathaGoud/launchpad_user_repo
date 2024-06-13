import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCustomerDetails } from "../../../reducers/authReducer";
import { useAccount } from "wagmi";
import Daos from "./daos";

const Dashboard = (props: any) => {
  const { address } = useAccount();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (address) {
      props.customers?.(address);
    }
  }, [address,props]);

  return (
    <div>
      <Daos />
    </div>
  );
};
const connectStateToProps = ({ oidc }: any) => {
  return { oidc: oidc };
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    customers: (address: any, callback: any) => {
      dispatch(getCustomerDetails(address, callback));
    },
    dispatch,
  };
};
export default connect(connectStateToProps, connectDispatchToProps)(Dashboard);
