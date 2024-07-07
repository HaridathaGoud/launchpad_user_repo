import React, { useEffect, useMemo, useState } from "react";
import praposalImage from "../../../assets/images/proposal.png";
import { useAccount } from "wagmi";
import CreateProposal from "./create";
import Button from "../../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getOwnerAddress, getRewardBalance } from "./utils";
import useContract from "../../../hooks/useContract";
import { setError } from "../../../reducers/layoutReducer";
export default function CreateFirstPraposal(props: any) {
  const { readRewardBalance, getOwner } = useContract();
  const [isChecked, setIsChecked] = useState(false);
  const { isConnected, address } = useAccount();
  const rootDispatch = useDispatch();
  const daoDetails= useSelector((store: any) =>store.proposal.daoDetails.data);
  const user=useSelector((store:any)=>store.auth.user)
  const [userDetailsFromContract, setUserDetailsFromContract] =
    useState<any>(null);
  useEffect(() => {
    if (
      daoDetails &&
      daoDetails.membershipTokenAddress &&
      isConnected &&
      address
    ) {
      getDetails();
    }
  }, [isConnected, address, user?.id,daoDetails]);
  const getDetails = async () => {
    const { amount, balanceError } = await getRewardBalance(
      readRewardBalance,
      daoDetails.membershipTokenAddress,
      daoDetails.tokenType
    );
    const { ownerAddress, error } = await getOwnerAddress(
      getOwner,
      daoDetails.membershipTokenAddress
    );
    let detailsToUpdate: any = userDetailsFromContract||{};
    if (amount) {
      detailsToUpdate = { ...detailsToUpdate, balance: amount };
      setUserDetailsFromContract({ ...detailsToUpdate, balance: amount });
    } else {
      rootDispatch(setError({ message: balanceError, from: "contract" }));
    }
    if (ownerAddress) {
      detailsToUpdate = { ...detailsToUpdate, owner: ownerAddress };
    } else {
      rootDispatch(setError({ message: error, from: "contract" }));
    }
    if (Object.keys(detailsToUpdate).length > 0) {
      setUserDetailsFromContract(detailsToUpdate);
    }
  };
  const handleProposalCreation = () => {
    setIsChecked(true);
  };
  const handleCancel = () => {
    setIsChecked(false);
  };
  const isEligibleForProposal = useMemo(() => {
    return (
      isConnected &&
      address &&
      user?.id &&
      daoDetails?.votingContractAddress &&
      userDetailsFromContract &&
      (userDetailsFromContract?.owner === address ||
        (userDetailsFromContract?.balance &&
          userDetailsFromContract?.balance >=
            Number(daoDetails?.proposalCreationBalance)))
    );
  }, [
    address,
    isConnected,
    userDetailsFromContract,
    daoDetails,
    user?.id,
  ]);
  return (
    <>
      <div className="dao-card py-[18px] px-5 rounded-lg shadow-md text-center border-dao-emp-img">
        <div className="flex justify-center mb-6">
          <img src={praposalImage} alt="Create Proposal" width={300} />
        </div>
        {isEligibleForProposal && (
          <div className="">
            <Button
              btnClassName="bg-primary min-w-[164px] py-3 rounded-[12px] text-lg font-semibold text-base-100 px-8 inline-block"
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
          <div className="drawer-side z-[999]">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
              // onClick={handleCancel}
            ></label>
            <div className="menu p-4 w-full md:w-80 min-h-full bg-white text-base-content pt-6">
              <CreateProposal close={handleCancel} pjctInfo={props?.pjctInfo} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
