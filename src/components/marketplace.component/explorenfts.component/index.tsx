import React, {useRef} from "react";
import { connect} from "react-redux";
import WalletConnect from "../../../layout/Login/index";
import { Modal, modalActions } from "../../../ui/Modal";
import BreadCrumb from "../../../ui/breadcrumb";
import Nfts from '../../nfts.component'

function ExploreNfts(props: any) {
  const scrollableRef = useRef<any>(null);
  return (
    <>
      <div ref={scrollableRef}></div>
      <div className="container mx-auto pt-5 px-3 lg:px-0">
      <BreadCrumb/>
        <h2 className="text-[24px] text-secondary font-semibold mb-3">
          Explore NFTs
        </h2>
        {
          <Modal id={"connect-wallet-model-exploreNfts"}>
            <WalletConnect
              onWalletConect={() => {}}
              onWalletClose={() => {
                modalActions("connect-wallet-model-exploreNfts", "close");
              }}
            />
          </Modal>
        }
        <Nfts type="explorenfs" customerId={props.auth.user?.id}/>
      </div>
    </>
  );
}
const connectStateToProps = ({ auth }: any) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(ExploreNfts);
