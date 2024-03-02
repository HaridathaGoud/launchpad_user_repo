import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { proposalViewData } from "../../../reducers/proposlaReducer";
import { Button } from "react-bootstrap";
import shimmers from "../shimmers/shimmers";
import PlaceHolder from "../shimmers/placeholder";
import { useParams, useLocation } from "react-router-dom";
import WalletConnect from "../../shared/connect.wallet";
import moment from "moment";
import Moment from "react-moment";
function TestingPraposalflow(props: any) {
  const PublishShimmers = shimmers.PublishProposal(3);
  const errorMsg = useSelector(
    (state: any) => state?.proposal?.proViewData?.error
  );
  const proposalId = useSelector(
    (state: any) => state?.proposal?.saveProposal?.data?.id
  );
  const proposalView = useSelector(
    (state: any) => state?.proposal?.proViewData
  );
  const [modalShow, setModalShow] = React.useState(false);
  const location = useLocation();
  const params = useParams();
  let locationSplit: any = location?.pathname?.split("/");
  const scrollableRef = useRef<any>(null);
  useEffect(() => {
    scrollableRef?.current?.scrollIntoView(0, 0);
    props?.proViewData(proposalId || params?.id);
  }, []);

  let currentDate = moment(new Date()).utc().format("YYYY-MM-DDTHH:mm:ss");
  const createdDate = moment(proposalView?.data?.startDate).format("X");
  const ended = moment(proposalView?.data?.endDate).format("X");
  const presentDate = moment(currentDate).format("X");
  const showButton = presentDate >= createdDate && presentDate <= ended;

  const getRecorderValue = (recorder) => {
    const recorderValues = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    return recorderValues[recorder - 1];
  };

  return (
    <>
      <div ref={scrollableRef}></div>
      <WalletConnect
        showWalletModal={modalShow}
        onWalletConect={(addr) => {}}
        onWalletClose={() => setModalShow(false)}
      />
      <div className="bg-base-300 py-[18px] px-5 rounded-lg shadow-md">
        {errorMsg && (
          <Alert variant="danger">
            <span>{errorMsg}</span>
          </Alert>
        )}
        {!proposalView?.loading ? (
          <div className="">
            <div className="">
              <div className="">
                <div className="">
                  <span className="text-2xl font-semibold text-secondary">
                    {proposalView?.data?.title}
                  </span>
                  {locationSplit[2] !== "voting" && (
                    <span className=" text-secondary">
                      {" "}
                      (Published by <span className=" text-secondary">you</span>
                      )
                    </span>
                  )}
                </div>
                {/* <div className=''>
                {(locationSplit[2] === "voting" && showButton) && <Button className='yes-btn' onClick={() => setModalShow(true)}>VOTE</Button>}
            </div> */}
              </div>{" "}
              <p className="mt-0 mb-2  text-secondary">
                {proposalView?.data?.description}
              </p>
            </div>
            <hr />
            <div className="py-2">
              <div className="md-d-flex items-center justify-between">
                <h1 className="mb-3 text-base font-semibold mt-3 text-secondary">
                  Voting{" "}
                </h1>
              </div>
              <div>
                <p className=" text-secondary ">Your proposal options</p>
                {proposalView?.data?.options?.map((item: any) => (
                  <div key={item?.id}>
                    <p className=" text-secondary">
                      {getRecorderValue(item?.recorder)}. {item?.option}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div className="pb-0">
              <h3 className="mb-3 text-base font-semibold mt-3 text-secondary">
                Duration{" "}
              </h3>
              <div className="flex items-center justify-between mb-4">
                <p className=" text-secondary">Start Date & Time</p>
                <p className=" text-secondary">
                  <Moment format={"DD/MM/YYYY HH:mm"}>
                    {proposalView?.data?.startDate}
                  </Moment>
                </p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className=" text-secondary">End Date & Time</p>
                <p className=" text-secondary">
                  <Moment format={"DD/MM/YYYY HH:mm"}>
                    {proposalView?.data?.endDate}
                  </Moment>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <PlaceHolder contenthtml={PublishShimmers} />
        )}
      </div>
    </>
  );
}
const connectStateToProps = ({ oidc }: any) => {
  return { oidc: oidc };
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    proViewData: (proposalId: any) => {
      dispatch(proposalViewData(proposalId));
    },
  };
};
export default connect(
  connectStateToProps,
  connectDispatchToProps
)(TestingPraposalflow);