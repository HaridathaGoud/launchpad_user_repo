import React, { useEffect, useState } from "react";
import praposalImage from "../../../assets/images/proposal.png";
import { useAccount } from "wagmi";
import CreateProposal from "./create";
import Button from "../../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getRewardBalance } from "./utils";
import useContract from "../../../hooks/useContract";
import { setError } from "../../../reducers/layoutReducer";
export default function CreateFirstPraposal(props: any) {
  const { readRewardBalance } = useContract();
  const [isChecked, setIsChecked] = useState(false);
  const { isConnected, address } = useAccount();
  const rootDispatch = useDispatch();
  const daoDetails = useSelector(
    (state: any) => state.proposal.daoDetails.data
  );
  const [userBalance, setUserBalance] = useState<any>(null);
  useEffect(() => {
    if (
      daoDetails &&
      daoDetails.membershipTokenAddress &&
      isConnected &&
      address
    ) {
      setBalance();
    }
  }, [isConnected,address]);
  const setBalance = async () => {
    const { amount, error } = await getRewardBalance(
      readRewardBalance,
      daoDetails.membershipTokenAddress
    );
    if (amount) {
      setUserBalance(amount);
    } else {
      rootDispatch(setError({ message: error, from: "contract" }));
    }
  };
  const handleProposalCreation = () => {
    setIsChecked(true);
  };
  const handleCancel = () => {
    setIsChecked(false);
  };
  return (
    <>
      <div className="bg-base-300 py-[18px] px-5 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-6">
          <img src={praposalImage} alt="Create Proposal" width={300} />
        </div>
        {isConnected &&
          address &&
          daoDetails?.votingContractAddress &&
          userBalance &&
          userBalance > Number(daoDetails?.proposalCreationBalance) && (
            <div className="">
              <Button
                btnClassName="bg-primary min-w-[164px] py-3 rounded-[28px] text-lg font-semibold text-base-100 px-8 inline-block"
                handleClick={handleProposalCreation}
                type="primary"
              >
                <span className="mt-2 mb-2">Create Your First Proposal</span>
              </Button>
            </div>
          )}
        <p className="text-secondary mt-3">
          Get your community involved in the decision making process.
          <br />
          Learn more in our proposal guide.
        </p>
      </div>
      {isChecked && (
        <div className="drawer drawer-end">
          <input
            id="my-drawer-4"
            type="checkbox"
            className="drawer-toggle"
            checked={isChecked}
          />
          <div className="drawer-content">
            {/* <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label> */}
          </div>
          <div className="drawer-side z-10">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
              onClick={handleCancel}
            ></label>
            <div className="menu p-4 w-full md:w-80 min-h-full bg-white text-base-content pt-24">
              <CreateProposal close={handleCancel} pjctInfo={props?.pjctInfo} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
