import React, { useEffect, useState } from "react";
import defaultAvatar from "../../../assets/images/default-avatar.jpg";
import { useAccount } from "wagmi";
import Createpraposal from "./create";
import { useSelector } from "react-redux";
import useContract from "../../../hooks/useContract";
import CopyToClipboard from "react-copy-to-clipboard";
import { ethers } from "ethers";
const DaoLeftPanel = (props) => {
  const user = useSelector((state: any) => state.auth.user);
  const { address } = useAccount();
  const { getStakedAmount } = useContract();
  const [isChecked, setIsChecked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [loader,setLoader]=useState(false)
  const getStakeAmount = async () => {
    setLoader(true)
    let response = await getStakedAmount();
    let _amt = response?.toString();
    if (_amt) {
      setStakedAmount(parseFloat(ethers.utils.formatEther(_amt)));
    }
    setLoader(false)
  };
  useEffect(() => {
    getStakeAmount();
  }, [address]);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  const handleRedirectCreatepraposalScreen = () => {
        setIsChecked(true);
  };
  const handleCancel = () => {
    setIsChecked(false);
  };

  return (
    <>
      <div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 ">
            <img
              src={user?.profilePicUrl || defaultAvatar}
              alt="Dao profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold mb-1 text-secondary capitalize">
              {user.firstName && user.lastName ? (
                (user.firstName + " " + user.lastName).toLowerCase()
              ) : (
                <>
                  <span className="tooltip" data-tip={address}>
                    {address?.slice(0, 4)}...{address?.slice(-4)}
                  </span>
                  <CopyToClipboard
                    text={address}
                    options={{ format: "text/plain" }}
                    onCopy={() => handleCopy()}
                  >
                    <span
                      className={
                        !copied
                          ? "icon md copy-icon cursor-pointer ms-0 pl-4"
                          : "icon md check-icon pl-4"
                      }
                    />
                  </CopyToClipboard>
                </>
              )}
            </h1>
            <p className="text-secondary">63k Members</p>
          </div>
        </div>
       {stakedAmount>=5000 && !loader && <button
          onClick={handleRedirectCreatepraposalScreen}
          className="bg-secondary w-full my-2 rounded-[28px] h-[42px] text-lg font-semibold text-base-100 px-8"
        >
          New Proposal
        </button>}
        <div>
          <h1 className="text-base font-semibold my-5 text-secondary">
            Proposals
          </h1>
          {/* <p className={`mb-5 text-secondary opacity-60`}>About </p>
                    <p className={`mb-5 text-secondary opacity-60`}>Settings</p> */}
          <div className="flex gap-2">
            {" "}
            <span className={`icon facebook-md `}></span>
            <span className={`icon instagram-md `}></span>
            <span className={`icon telegram-md `}></span>
            <span className={`icon discord-md `}></span>
            <span className={`icon network-md `}></span>
          </div>
        </div>
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
              <Createpraposal close={handleCancel} pjctInfo={props?.pjctInfo} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DaoLeftPanel;
