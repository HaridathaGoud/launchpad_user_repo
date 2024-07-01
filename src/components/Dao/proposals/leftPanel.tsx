import React, { useEffect, useMemo, useState } from "react";
import defaultBG from "../../../assets/images/default-bg.png";
import { useAccount } from "wagmi";
import CreateProposal from "./create";
import { useDispatch, useSelector } from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";
import useContract from "../../../hooks/useContract";
import { getOwnerAddress, getRewardBalance } from "./utils";
import { setError } from "../../../reducers/layoutReducer";
import NaviLink from "../../../ui/NaviLink";
import facebookImg from '../../../assets/images/fb.svg';
import instaImg from '../../../assets/images/insta.svg';
import telegramImg from '../../../assets/images/telegram.svg';
import discordImg from '../../../assets/images/discord.svg';
import formatNumber from "../../../ui/formatNumber";

const DaoLeftPanel = (props) => {
  const { readRewardBalance, getOwner } = useContract();
  const { isConnected, address } = useAccount();
  const rootDispatch = useDispatch();
  const daoDetails= useSelector((state: any) =>state.proposal.daoDetails.data);
  const  user = useSelector((state: any) => state?.auth?.user);
  const proposals = useSelector((state: any) => state.proposal?.proposals);

  const [userDetailsFromContract, setUserDetailsFromContract] =
    useState<any>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (
      daoDetails &&
      daoDetails.membershipTokenAddress &&
      isConnected &&
      address
    ) {
      getDetails();
    }
  }, [isConnected, address,daoDetails]);
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
    let detailsToUpdate: any = userDetailsFromContract || {};
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
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  const handleProposalCreation = () => {
    setIsChecked(true);
  };
  const handleCancel = () => {
    setIsChecked(false);
  };
  const isEligibleForProposal = useMemo(() => {
    const eligibleFromContract =
      userDetailsFromContract &&
      (userDetailsFromContract?.owner === address ||
        (userDetailsFromContract?.balance &&
          userDetailsFromContract?.balance >=
            Number(daoDetails?.proposalCreationBalance)));
    return (
      isConnected &&
      address &&
      user?.id &&
      daoDetails?.votingContractAddress &&
      ((props?.from!=='project' && proposals?.data?.length !== 0) ||
      (props.from==='project' && ((proposals?.data?.length !== 0 && proposals.nextPage===2) || (proposals.nextPage>2)))
    ) &&
      eligibleFromContract
    );
  }, [
    address,
    isConnected,
    userDetailsFromContract,
    daoDetails,
    user?.id,
    proposals,
    props?.from
  ]);
  return (
    <>
      <div
        className={`${
          props.from === "project" ? "md:flex justify-between mb-4" : "block rounded-lg bgDaocard p-4 mb-4"
        }`}
      >
        <div className="">
          {props.showHeader && (
            <div className="">
              <div className="w-12 h-12 ">
                <img
                  src={daoDetails?.image || defaultBG}
                  alt="Dao profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div>              
                <h1 className="mr-1 truncate text-[18px] font-semibold text-[#111111] capitalize">
                  {daoDetails?.name}
                </h1>
                
                {<p className="text-md text-[#57606a] lg:text-base font-medium">{formatNumber(daoDetails?.members || 0)} members</p>}
              </div>             
            </div>            
          )}
          {isEligibleForProposal && (
            <button
              onClick={handleProposalCreation}
              className="bg-secondary w-full my-4 rounded-[28px] h-[42px] text-lg font-semibold text-base-100 px-6 text-start"
            >
              New Proposal
            </button>
          )}
          {props.from !== "project" && <div className="flex gap-4 items-center mt-4">
                <img src={facebookImg} alt="social-icons"/>
                <img src={instaImg} alt="social-icons"/>
                <img src={telegramImg} alt="social-icons"/>
                <img src={discordImg} alt="social-icons"/>
              </div>}
        </div>
        {props.showHeader && isConnected && (
          <div>
            {/* <h1 className="text-base font-semibold my-5 text-secondary">
            Proposals
          </h1> */}
            {/* <p className={`mb-5 text-secondary opacity-60`}>About </p>
                    <p className={`mb-5 text-secondary opacity-60`}>Settings</p> */}
            <div
              className={`flex gap-2 ${props.from === "project" ? "" : "my-5"}`}
            >
              {" "}
              {user.facebook && (
                <NaviLink
                  path={user.facebook}
                  type="footerNav"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={`icon facebook-md `}></span>{" "}
                </NaviLink>
              )}
              {user.linkedIn && (
                <NaviLink
                  path={user.linkedIn}
                  type="footerNav"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={`icon instagram-md `}></span>{" "}
                </NaviLink>
              )}
              {user.twitter && (
                <NaviLink
                  path={user.twitter}
                  type="footerNav"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={`icon telegram-md `}></span>{" "}
                </NaviLink>
              )}
              {/* {user.discordUrl && 
              <NaviLink
                path=""
                type="footerNav"
                target="_blank"
                rel="noreferrer">
                <span className={`icon discord-md `}></span> 
                 </NaviLink> } */}
              {user.websiteUrl && (
                <NaviLink
                  path={user.websiteUrl}
                  type="footerNav"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={`icon network-md `}></span>{" "}
                </NaviLink>
              )}
            </div>
          </div>
        )}
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
              onClick={handleCancel}
            ></label>
            <div className="menu p-4 w-full md:w-80 min-h-full bg-white text-base-content pt-6">
              <CreateProposal
                close={handleCancel}
                pjctInfo={props?.pjctInfo}
                votingContractAddress={daoDetails?.votingContractAddress}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DaoLeftPanel;
